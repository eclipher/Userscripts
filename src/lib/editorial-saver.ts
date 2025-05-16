import { simulateMouseClickReact } from "./utils/click";
import { downloadFile } from "./utils/download-file";
import { findElement } from "./utils/elementFinder";
import { htmlToMd, createTurndownService } from "./utils/htmlToMd";
import { toast } from "./utils/toast";
import { convertSrcToDataURL } from "./utils/data-url";

const turndown = createTurndownService();
// remove the link before section heading in LeetCode editorials
turndown.addRule("remove-heading-link", {
    filter: (node) =>
        node.nodeName === "A" && node.getAttribute("aria-hidden") === "true",
    replacement: () => "",
});

// do not process math equation, save html as is
turndown.addRule("save-math-as-is", {
    filter: (node) =>
        ["SPAN", "DIV"].includes(node.nodeName) &&
        node.matches(".math, .maths, .math-tex"),
    replacement: (_content, node) => (node as HTMLSpanElement).outerHTML,
});

/** This only works for same-origin iframes
 * @see {@link https://stackoverflow.com/a/69694808}
 */
function waitForIframeToLoad(iframe: HTMLIFrameElement) {
    return new Promise((resolve) => {
        // chrome initialize iframe src with "about:blank", so it definitely isn't loaded
        if (iframe.src !== "about:blank") {
            const isSameOrigin =
                new URL(iframe.src).hostname === window.location.hostname;

            // 1. if not same origin, we don't care if it is loaded, resolve immediately (and because we can't get things inside cross-origin iframe)
            // 2. if same origin, even if src is set, the document still might be not loaded, so need to check the contentWindow href AND its readystate to determine if it's loaded (cannot simply check readystate before because about:blank document could be "complete" too)
            if (
                !isSameOrigin ||
                (iframe.contentWindow?.location?.href !== "about:blank" &&
                    iframe.contentWindow?.document.readyState == "complete")
            ) {
                resolve(undefined);
                return;
            }
        }

        // if promise didn't resolve to this point, meaning it's still loading, therefore add onload event listener
        console.log("wait for iframe to load...");
        iframe.contentWindow?.addEventListener("load", resolve, {
            once: true,
        });
    });
}

const playgroundCache = new Map<string, string>();
async function prefetchPlayground(editorialEl: HTMLDivElement) {
    const iframes = Array.from(editorialEl.querySelectorAll("iframe"));
    const promises = iframes.map(async (iframe) => {
        await waitForIframeToLoad(iframe);
        const { src, contentDocument } = iframe;
        if (!src.includes("playground")) return;

        console.log(iframe.contentWindow?.location?.href);

        const langTab = await findElement("div.lang-btn-set", {
            parent: contentDocument!,
            timeout: 1000,
        });
        const textarea = contentDocument?.querySelector<HTMLTextAreaElement>(
            "textarea[name='lc-codemirror']",
        );

        let result = `<MixedCodeBlock> \n\n`;
        Array.from(
            langTab.children as HTMLCollectionOf<HTMLButtonElement>,
        ).forEach((button) => {
            let lang = button.textContent?.toLowerCase();
            if (lang === "python3") lang = "python";
            button.click();

            const code = textarea?.textContent;
            result += `\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
        });
        result += `</MixedCodeBlock>`;
        playgroundCache.set(src, result);
    });
    await Promise.all(promises);
}

// save LeetCode Playground Link
turndown.addRule("save-code-playground", {
    filter: ["iframe"],
    replacement: (_content, node) => {
        const { src } = node as HTMLIFrameElement;
        if (!src.includes("playground")) return ""; // skip iframe that aren't playground (videos, etc.)
        return (
            `[LeetCode Playground](${src})\n\n` +
            (playgroundCache.get(src) ?? "")
        );
    },
});

/** <plainSrcOfFirstSlide, dataURLOfSlide[]> */
const slideCache = new Map<string, string[]>();

// this currently requires user did not interact with the slides before scraping,
// so that the scrapped slides are in correct order.
async function preFetchSlides(editorialEl: HTMLDivElement) {
    const slideImages =
        editorialEl.querySelectorAll<HTMLImageElement>("img[alt='Current']");
    const promises = Array.from(slideImages).map(async (image) => {
        const slideContainer = image.parentElement?.parentElement;
        if (!slideContainer) {
            throw new Error("Slide container not found");
        }

        const slideNumIndicator = slideContainer.children[2].children[1];
        slideNumIndicator.setAttribute("data-skip-me-turndown", "true"); // prevent this indicator appear in scraped markdown
        const slidesCountStr =
            slideNumIndicator.textContent?.match(/\d+$/)?.[0];
        if (!slidesCountStr) {
            throw new Error("Slide count not found");
        }

        const nextSlideButton =
            slideContainer.querySelector("svg:nth-child(3)");
        if (!nextSlideButton) {
            throw new Error("Next slide button not found");
        }

        const firstSlideSrc = image.src; // use as key of cache
        slideCache.set(firstSlideSrc, []);

        // add the slide pictures
        for (let i = 0; i < Number(slidesCountStr); i++) {
            // The clicks doesn't need special conditional handling:
            // 1. For some reason, the `image.src` we got is delayed by 1 with each click
            // 2. After the final image, we need to click one more time so it's back to first slide, so that turndown can get the src of first slide as key to fetch from the cache
            simulateMouseClickReact(nextSlideButton);

            const dataURL = await convertSrcToDataURL(image.src);
            slideCache.get(firstSlideSrc)!.push(dataURL);
        }
    });
    await Promise.all(promises);
}

turndown.addRule("save-slides", {
    filter: (node) =>
        node.tagName === "IMG" && (node as HTMLImageElement).alt === "Current",
    replacement: (_content, node) => {
        const { src } = node as HTMLImageElement;
        const dataURLs = slideCache.get(src);
        if (!dataURLs) return "";

        let res = `<Slides> \n\n`;
        dataURLs.forEach((dataURL, index) => {
            res += `![Slide ${index + 1}](${dataURL}) \n`;
        });
        res += `\n</Slides>`;
        return res;
    },
});

turndown.addRule("save-details-as-is", {
    filter: ["details"],
    replacement: (_content, node) => {
        const { children } = node as HTMLDetailsElement;

        [...children].forEach((child) => {
            if (!child.textContent) node.removeChild(child); // filter out empty paragraphs
        });
        return (node as HTMLDetailsElement).outerHTML;
    },
});

// skip element that has "data-skip-me-turndown" label
turndown.remove(
    (node) => node.getAttribute("data-skip-me-turndown") === "true",
);

export async function scrapeEditorial(
    editorialEl: HTMLDivElement,
): Promise<string> {
    await prefetchPlayground(editorialEl);
    await preFetchSlides(editorialEl);

    const editorial = await htmlToMd(editorialEl, {
        turndownService: turndown,
    });

    playgroundCache.clear();
    slideCache.clear();

    return editorial;
}

export async function downloadEditorial(
    editorialFinder: () => Promise<HTMLDivElement>,
    titleFinder: () => Promise<string>,
) {
    toast.promise(
        async () => {
            const editorialEl = await editorialFinder();
            const editorial = await scrapeEditorial(editorialEl);
            const title = await titleFinder();

            const blob = new Blob([`# ${title}\n\n`, editorial], {
                type: "text/markdown; charset=UTF-8",
            });
            downloadFile(blob, title, "md");
        },
        {
            loading: "Scraping editorial...",
            success: "Editorial scraped. Downloading...",
            error: "Something went wrong while scraping. See browser console for more detail.",
        },
    );
}
