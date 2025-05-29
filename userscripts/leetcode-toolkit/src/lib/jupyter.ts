import type {
    INotebookContent,
    ICodeCell,
    IMarkdownCell,
    MultilineString,
} from "@jupyterlab/nbformat";
import { globalState } from "./state";
import { downloadFile } from "@userscripts/utils/src/download-file";

export function createNotebook({
    title,
    description,
    code,
    language = "python",
    url,
}: {
    title: string;
    description: string;
    code: string;
    language?: string;
    url: string;
}): INotebookContent {
    const notebook: INotebookContent = {
        metadata: {
            language_info: {
                name: language,
            },
        },
        nbformat: 5,
        nbformat_minor: 10,
        cells: [],
    };
    const regex =
        /^(https:\/\/(leetcode\.com|leetcode\.cn)\/problems\/[a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    const titleCell = createMarkdownCell(
        `# [${title}](${match ? match[0] : url})`,
    );

    const descriptionPrefix =
        globalState.site === "cn" ? "题目描述" : "Description";
    const descriptionCell = createMarkdownCell(
        `## ${descriptionPrefix} \n\n` + description,
    );

    const partitionCell = createMarkdownCell("---\n\n");

    const solutionPrefix = globalState.site === "cn" ? "解答" : "Solution";
    const solutionCell = createMarkdownCell(`## ${solutionPrefix}`);
    const codeCell = createCodeCell(code);

    notebook.cells.push(
        titleCell,
        descriptionCell,
        partitionCell,
        solutionCell,
        codeCell,
    );
    return notebook;
}

function createMarkdownCell(content: MultilineString): IMarkdownCell {
    return {
        cell_type: "markdown",
        metadata: {},
        source: content,
    };
}

function createCodeCell(content: MultilineString): ICodeCell {
    return {
        cell_type: "code",
        metadata: {},
        source: content,
        execution_count: null,
        outputs: [],
    };
}

export function downloadNotebook(notebook: INotebookContent, filename: string) {
    const blob = new Blob([JSON.stringify(notebook)], {
        type: "application/x-ipynb+json",
    });
    downloadFile(blob, filename, "ipynb");
}
