<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { createNotebook, downloadNotebook } from "$lib/jupyter";
    import { getDescription } from "./copy-description.svelte";
    import { getTitle } from "./copy-title.svelte";
    import { globalState } from "$lib/state";
    import { problemState } from "../state";
    import { toast } from "$lib/toast";

    async function saveAsJupyter() {
        const title = await getTitle();
        const notebook = createNotebook({
            title: title,
            description: await getDescription(),
            code: problemState.editor?.getModel()?.getValue() ?? "",
            language:
                problemState.editor?.getModel()?.getLanguageId() ?? "python",
            url: window.location.href,
        });
        downloadNotebook(notebook, title);
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
        ? "保存为 Jupyter Notebook (.ipynb)"
        : "Save as Jupyter Notebook (.ipynb)"}
</Button>
