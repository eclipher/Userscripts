<script lang="ts">
    import Button from "$components/Button.svelte";
    import { toast } from "$lib/toast";

    import { globalState } from "$lib/state";
    import { problemState } from "../state";

    import { getTitle } from "./copy-title.svelte";
    import { getDescription } from "./copy-description.svelte";
    import { NotebookBuilder } from "$utils/jupyter";

    async function saveAsJupyter() {
        const builder = new NotebookBuilder();

        // title
        const title = await getTitle();
        const url = window.location.href;
        const urlRegex =
            /^(https:\/\/(leetcode\.com|leetcode\.cn)\/problems\/[a-zA-Z0-9_-]+)/;
        const urlMatch = url.match(urlRegex);
        builder.addTitle(title, urlMatch ? urlMatch[0] : url);

        // problem description
        const description = await getDescription();
        builder.addSection(
            globalState.site === "cn" ? "题目描述" : "Description",
            description,
        );

        builder.addHorizontalRule();

        // code
        builder.addSection(globalState.site === "cn" ? "解答" : "Solution");
        const code = problemState.editor?.getModel()?.getValue();
        if (!code) {
            toast.error("Fail to retrieve current code in the editor");
        } else {
            builder.addCode(code);
        }

        // set language
        const language =
            problemState.editor?.getModel()?.getLanguageId() ?? "python";
        builder.setLanguage(language);

        builder.download(title);
    }
</script>

<Button
    variant="orange"
    onclick={() => {
        toast.promise(saveAsJupyter(), {
            loading: "Scraping problem description and code...",
            success: "Start downloading jupyter notebook...",
            error: "Something went wrong while scraping. See browser console for more detail.",
        });
    }}
>
    {globalState.site === "cn"
        ? "保存为 Jupyter Notebook"
        : "Save as Jupyter Notebook"}
</Button>
