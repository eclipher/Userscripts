<script lang="ts" module>
    export const getDescription = async (convertImage = true) => {
        const el = await findElement<HTMLDivElement>(
            "div[data-track-load='description_content']",
        );
        return htmlToMd(el, { convertImage });
    };
</script>

<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { copy } from "@userscripts/utils/src/copy";
    import { findElement } from "@userscripts/utils/src/elementFinder";
    import { htmlToMd } from "@userscripts/utils/src/htmlToMd";
    import { globalState } from "$lib/state";

    async function copyDescription() {
        const desc = await getDescription(false);
        copy(desc);
    }
</script>

<Button variant="green" onclick={copyDescription}>
    {globalState.site === "cn" ? "复制描述" : "Copy Description"}
</Button>
