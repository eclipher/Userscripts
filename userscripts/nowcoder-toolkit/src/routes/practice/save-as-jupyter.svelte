<script lang="ts">
    import Button from "$components/Button.svelte";
    import { toaster } from "$lib/toast";
    import { findElement } from "$utils/elementFinder";
    import { NotebookBuilder } from "$utils/jupyter";
    import { getDescription } from "./copy-description.svelte";

    async function saveAsJupyter() {
        const builder = new NotebookBuilder();

        // title
        const titleEl = await findElement("div.question-title");
        const title = titleEl.textContent?.match(/[^\s\\n]+/g)?.join(" ");
        if (!title) {
            throw new Error("Fail to retrieve title");
        }

        const url = window.location.href;
        builder.addTitle(title, url);

        // description
        const description = await getDescription();
        builder.addMarkdown(description);

        builder.addHorizontalRule();

        // code
        builder.addSection("解答");
        const codeDownloadAnchor = await findElement<HTMLAnchorElement>(
            ".monaco-toolbar a[aria-label='Download']",
        );
        const response = await fetch(codeDownloadAnchor.href);
        const code = await response.text();
        builder.addCode(code);

        // language
        const monaco = await findElement("#monaco");
        const language = monaco.getAttribute("data-mode-id") ?? "python";
        builder.setLanguage(language);

        builder.download(title);
    }
</script>

<Button
    variant="orange"
    onclick={() =>
        toaster.promise(saveAsJupyter(), {
            loading: "正在获取题目描述和代码...",
            success: "开始下载 Jupyter Notebook...",
            error: "获取过程中发生错误，请查看浏览器控制台以获取更多信息。",
        })}
>
    保存为 Jupyter Notebook
</Button>
