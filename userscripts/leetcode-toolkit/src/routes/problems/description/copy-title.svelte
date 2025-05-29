<script lang="ts" module>
    import { simulateMouseClickReact } from "@userscripts/utils/src/click";

    export const getTitle = async () => {
        const descriptionTabButton = (
            await findElement("#description_tab")
        ).closest(".flexlayout__tab_button")!;

        if (
            !descriptionTabButton?.classList.contains(
                ".flexlayout__tab_button--selected",
            )
        ) {
            // open the description tab if it's not selected
            simulateMouseClickReact(descriptionTabButton);
        }

        return (await findElement(".text-title-large")).textContent ?? "";
    };
</script>

<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { findElement } from "@userscripts/utils/src/elementFinder";
    import { copy } from "@userscripts/utils/src/copy";
    import { globalState } from "$lib/state";

    async function copyTitle() {
        copy(await getTitle());
    }
</script>

<Button onclick={copyTitle}>
    {globalState.site === "cn" ? "复制标题" : "Copy Title"}
</Button>
