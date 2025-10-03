<script lang="ts">
    import Button from "$components/Button.svelte";
    import { copyText } from "$utils/copy";
    import { findElement } from "$utils/elementFinder";
    import { htmlToMd } from "$utils/htmlToMd";
    import { globalState } from "$lib/state";
    import { toaster } from "$lib/toast";

    let buttonEl: HTMLButtonElement | null = null;

    async function copySolution() {
        const tab = buttonEl!.closest("div.flexlayout__tab")!;
        const content = await findElement<HTMLDivElement>("div.WRmCx", {
            parent: tab,
        });
        copyText(await htmlToMd(content));
        toaster.success(
            globalState.site === "cn"
                ? "已复制题解到剪贴板"
                : "Problem solution copied to clipboard",
        );
    }
</script>

<Button bind:ref={buttonEl} variant="green" onclick={copySolution}>
    {globalState.site === "cn"
        ? "复制题解为Markdown （实验性）"
        : "Copy Solution as Markdown (Experimental)"}
</Button>
