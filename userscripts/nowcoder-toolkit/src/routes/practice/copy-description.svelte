<script lang="ts" module>
    import { findElement } from "$utils/elementFinder";
    import { scrapeDescription } from "./scrape-description";
    export async function getDescription() {
        const sectionBoxEl = await findElement("div.section-box");
        const descEl = sectionBoxEl?.parentElement;
        if (!descEl) throw new Error("no description found");

        return scrapeDescription(descEl);
    }
</script>

<script lang="ts">
    import Button from "$components/Button.svelte";
    import { copyText } from "$utils/copy";
    import { toaster } from "$lib/toast";

    export async function copyDescription() {
        const desc = await getDescription();
        copyText(desc);
        toaster.success("已复制题目描述到剪贴板");
    }
</script>

<Button variant="green" onclick={copyDescription}>复制描述</Button>
