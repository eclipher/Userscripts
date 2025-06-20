<script lang="ts" module>
    import { simulateMouseClickReact } from "$utils/click";

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
    import Button from "$components/Button.svelte";
    import { findElement } from "$utils/elementFinder";
    import { copyText } from "$utils/copy";
    import { globalState } from "$lib/state";
    import { toaster } from "$lib/toast";

    async function copyTitle() {
        copyText(await getTitle());
        toaster.success(
            globalState.site === "cn"
                ? "已复制题目标题到剪贴板"
                : "Problem title copied to clipboard",
        );
    }
</script>

<Button onclick={copyTitle}>
    {globalState.site === "cn" ? "复制标题" : "Copy Title"}
</Button>
