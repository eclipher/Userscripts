<script lang="ts" module>
    export const getDescription = async (convertImage = true) => {
        const el = await findElement<HTMLDivElement>(
            "div[data-track-load='description_content']",
        );
        return htmlToMd(el, { convertImage });
    };
</script>

<script lang="ts">
    import Button from "$components/Button.svelte";
    import { copyText } from "$utils/copy";
    import { findElement } from "$utils/elementFinder";
    import { htmlToMd } from "$utils/htmlToMd";
    import { globalState } from "$lib/state";
    import { toaster } from "$lib/toast";

    async function copyDescription() {
        const desc = await getDescription(false);
        copyText(desc);
        toaster.success(
            globalState.site === "cn"
                ? "已复制题目描述到剪贴板"
                : "Problem description copied to clipboard",
        );
    }
</script>

<Button variant="green" onclick={copyDescription}>
    {globalState.site === "cn" ? "复制描述" : "Copy Description"}
</Button>
