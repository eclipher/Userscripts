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
    filter: (node) => node.nodeName === "SPAN" && node.matches(".math, .maths"),
    replacement: (_content, node) => (node as HTMLSpanElement).outerHTML,
});

/** This only works for same-origin iframes */
function waitForIframeToLoad(iframe: HTMLIFrameElement) {
    return new Promise((resolve) => {
        // if all these conditions are met,
        // it means the iframe document is already loaded,
        // resolve immediately
        // https://stackoverflow.com/a/69694808
        if (
            iframe.src !== "about:blank" &&
            iframe.contentWindow?.location.href !== "about:blank" &&
            iframe.contentDocument?.readyState === "complete"
        ) {
            resolve(undefined);
        } else {
            // otherwise, start an event listener and wait for it loads
            iframe.addEventListener("load", resolve, { once: true });
        }
    });
}

const playgroundCache = new Map<string, string>();
async function prefetchPlayground(editorialEl: HTMLDivElement) {
    const iframes = Array.from(editorialEl.querySelectorAll("iframe"));
    const promises = iframes.map(async (iframe) => {
        await waitForIframeToLoad(iframe);
        const { src, contentDocument } = iframe;
        if (!src.includes("playground")) return;

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

// skip element that has "data-skip-me-turndown" label
turndown.remove(
    (node) => node.getAttribute("data-skip-me-turndown") === "true",
);

export async function scrapeEditorial(
    editorialEl: HTMLDivElement,
): Promise<string> {
    await prefetchPlayground(editorialEl);
    await preFetchSlides(editorialEl);

    const editorial = await htmlToMd(editorialEl, turndown);

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

            return {
                editorial: await scrapeEditorial(editorialEl),
                title: await titleFinder(),
            };
        },
        {
            loading: "Scraping Editorial...",
            success: ({ editorial, title }) => {
                const blob = new Blob([`# ${title}\n\n`, editorial], {
                    type: "text/markdown; charset=UTF-8",
                });
                downloadFile(blob, title, "md");
                return "Start downloading...";
            },
            error: (err) => {
                console.error(err);
                return "Something went wrong while scraping.";
            },
        },
    );
}
