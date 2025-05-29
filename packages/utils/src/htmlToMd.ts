import TurndownService from "turndown";
import { tables } from "@joplin/turndown-plugin-gfm";
import { convertSrcToDataURL } from "./data-url";

/** <`src`, `dataURL`> */
const imageCache = new Map<string, string>();

async function prefetchImages(node: TurndownService.Node) {
    const images = Array.from(node.querySelectorAll("img"));

    const fetchPromises = images.map(async ({ src }) => {
        if (imageCache.has(src)) return;
        const dataURL = await convertSrcToDataURL(src);
        imageCache.set(src, dataURL);
    });
    await Promise.all(fetchPromises);
}

export function createTurndownService() {
    const turndown = new TurndownService({
        emDelimiter: "*",
        bulletListMarker: "-",
    });
    turndown.addRule("pre", {
        filter: ["pre"],
        replacement: (_content, node) =>
            "\n```txt\n" + node.textContent?.trim() + "\n```\n",
    });
    turndown.addRule("superscript", {
        filter: ["sup"],
        replacement: (content) => "^" + content,
    });
    turndown.addRule("paragraph", {
        filter: ["p"],
        replacement: (content) => "\n\n" + content + "\n\n",
    });
    turndown.addRule("convert-img-src-to-base64", {
        filter: ["img"],
        replacement: (_content, node) => {
            const { src, alt } = node as HTMLImageElement;

            const dataURL = imageCache.get(src);
            if (dataURL) {
                return `![${alt}](${dataURL})`;
            }
            return `![${alt}](${src})`; // Fallback to original URL if not cached
        },
    });

    turndown.use(tables);

    return turndown;
}

export async function htmlToMd(
    node: TurndownService.Node,
    {
        turndownService = createTurndownService(),
        convertImage = true,
    }: { turndownService?: TurndownService; convertImage?: boolean } = {},
) {
    // Prefetch images before converting to Markdown
    if (convertImage) await prefetchImages(node);

    const md = turndownService.turndown(node);

    // Clear the image cache since we don't need it anymore
    if (convertImage) imageCache.clear();

    return md;
}
