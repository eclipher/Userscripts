<script>
    import ButtonGroup from "$components/ButtonGroup.svelte";

    import FindEditorialScreenshot from "./find-editorial-screenshot.svelte";
    import SaveEditorial from "./save-editorial.svelte";
    import ReadSavedEditorial from "$lib/read-saved-editorial.svelte";
</script>

<ButtonGroup style="z-index: 10; position:relative; padding: 0.5rem">
    <FindEditorialScreenshot />
    <SaveEditorial />
    <ReadSavedEditorial />
</ButtonGroup>
