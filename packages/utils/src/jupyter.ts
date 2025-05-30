// https://nbformat.readthedocs.io/en/latest/format_description.html

import type {
    INotebookContent,
    ICodeCell,
    IMarkdownCell,
    MultilineString,
    ICell,
} from "@jupyterlab/nbformat";
import { downloadFile } from "./download-file";

export class NotebookBuilder {
    #cells: ICell[] = [];
    #metadata: INotebookContent["metadata"] = {};
    #nbformat: number = 5;
    #nbformat_minor: number = 10;

    addMarkdown(content: MultilineString) {
        const md: IMarkdownCell = {
            cell_type: "markdown",
            metadata: {},
            source: content,
        };
        this.#cells.push(md);
        return this;
    }

    /** Add a level one heading. There should be only one title in a document. */
    addTitle(title: string, url?: string) {
        this.addMarkdown(`# [${title}](${url})`);
        return this;
    }

    addSection(heading: string, content?: MultilineString) {
        this.addMarkdown(`## ${heading}\n\n ${content ?? ""}`);
        return this;
    }

    /** Add a horizontal rule (`<hr>` in html) or line that visually separates content */
    addHorizontalRule() {
        this.addMarkdown("---\n\n");
        return this;
    }

    addCode(content: MultilineString) {
        const code: ICodeCell = {
            cell_type: "code",
            metadata: {},
            source: content,
            execution_count: null,
            outputs: [],
        };
        this.#cells.push(code);
        return this;
    }

    setLanguage(language: string) {
        this.#metadata.language_info = {
            name: language,
        };
        return this;
    }

    build(): INotebookContent {
        return {
            metadata: this.#metadata,
            nbformat: this.#nbformat,
            nbformat_minor: this.#nbformat_minor,
            cells: this.#cells,
        };
    }

    download(filename: string) {
        const notebook = this.build();
        const blob = new Blob([JSON.stringify(notebook)], {
            type: "application/x-ipynb+json",
        });
        downloadFile(blob, filename, "ipynb");
    }
}
