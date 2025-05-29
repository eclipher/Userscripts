<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { downloadEditorial } from "$lib/editorial-saver";
    import { findElement } from "@userscripts/utils/src/elementFinder";
    import { getTitle } from "../description/copy-title.svelte";
    async function findEditorial() {
        const editorialEl = await findElement<HTMLDivElement>(
            ".flexlayout__tab:has(#editorial-quick-navigation) div.WRmCx",
            {
                timeout: 2000,
            },
        ); // `div.WRmCx` part is not reliable
        return editorialEl;
    }
</script>

<Button
    onclick={() => downloadEditorial(findEditorial, getTitle)}
    variant="orange">Save Editorial as Markdown</Button
>
