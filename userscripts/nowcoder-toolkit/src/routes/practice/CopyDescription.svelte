<script lang="ts" module>
    import { findElement } from "$utils/elementFinder";
    export async function getDescription() {
        const sectionBoxEl = await findElement("div.section-box");
        const descEl = sectionBoxEl?.parentElement;
        if (!descEl) throw new Error("no description found");

        return await htmlToMd(descEl);
    }
</script>

<script lang="ts">
    import Button from "$components/Button.svelte";
    import { htmlToMd } from "$utils/htmlToMd";
    import { copyText } from "$utils/copy";

    export async function copyDescription() {
        const desc = await getDescription();
        copyText(desc);
    }
</script>

<!-- nowcoder hijacks `addEventListener` for click event, so `onclick` won't work. I don't know if this comes from some ancient package or their devs are fucking maniac. Use `onpointerdown` here can work, but error still emits. -->
<Button variant="green" onpointerdown={copyDescription}>复制描述</Button>
