import { htmlToMd, createTurndownService } from "$utils/htmlToMd";

const turndown = createTurndownService();

function processKatexSpan(span: HTMLSpanElement) {
    const latexEl = span.querySelector("annotation");
    const tex = latexEl?.textContent;
    if (!tex) {
        return span.textContent ?? "";
    }

    switch (tex) {
        case `\\hspace{15pt}`:
            return ""; // remove useless first line indent
        case `\\hspace{23pt}\\bullet\\,`:
            return "- "; // parse bullet point to markdown format
    }

    if (span.parentElement?.nodeName === "CENTER") {
        return `$$${tex}$$`; // block level
    } else {
        return `$${tex}$`;
    }
}

turndown.addRule("parse-tex", {
    filter: (node) => node.nodeName === "SPAN" && node.matches(".katex"),
    replacement: (_content, node) => {
        return processKatexSpan(node as HTMLSpanElement);
    },
});

turndown.addRule("parse-pre-with-tex", {
    filter: (node) => node.nodeName === "PRE" && node.childElementCount > 0,
    replacement: (_content, node) => {
        const text = [...node.childNodes]
            .map((node) => {
                if (
                    node.nodeName === "SPAN" &&
                    (node as HTMLSpanElement).matches(".katex")
                ) {
                    const spantext = processKatexSpan(node as HTMLSpanElement);
                    return spantext;
                } else if (node.nodeName === "BR") {
                    return "\n\n";
                } else {
                    return node.textContent ?? "";
                }
            })
            .join("");
        return text;
    },
});

turndown.remove("button");

export async function scrapeDescription(node: Parameters<typeof htmlToMd>[0]) {
    return await htmlToMd(node, {
        turndownService: turndown,
    });
}
