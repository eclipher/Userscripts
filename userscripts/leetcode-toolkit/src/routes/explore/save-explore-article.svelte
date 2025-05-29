<script lang="ts">
    import Button from "$components/Button.svelte";

    import { findElement } from "$utils/elementFinder";
    import { getElementIndex } from "$utils/elementIndex";
    import { downloadEditorial } from "$lib/editorial-saver";

    async function findExploreEditorial() {
        return await findElement<HTMLDivElement>("div.block-markdown");
    }

    async function getExploreTitle() {
        const tocContainer = await findElement(
            "div.list-group:not(.item-list-group)",
        );

        const titleContainer = tocContainer.querySelector(
            ".list-group-item .selected",
        );
        if (!titleContainer) {
            throw new Error("Title container not found");
        }

        const title =
            titleContainer.querySelector(".title")?.textContent?.trim() ?? "";

        const articleNumber = getElementIndex(titleContainer) + 1;

        const chapterEl = titleContainer.closest("div.chapter-item");
        if (!chapterEl) {
            throw new Error("Chapter not found");
        }

        const chapterNumber = getElementIndex(chapterEl);

        return `${chapterNumber}.${articleNumber} ${title}`;
    }
</script>

<Button
    onclick={() => downloadEditorial(findExploreEditorial, getExploreTitle)}
>
    Save Article as Markdown
</Button>
