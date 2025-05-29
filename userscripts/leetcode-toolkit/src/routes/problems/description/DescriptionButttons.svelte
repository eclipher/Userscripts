<script lang="ts">
    import ButtonGroup from "$components/ButtonGroup.svelte";

    import CopyTitle from "./copy-title.svelte";
    import CopyDescription from "./copy-description.svelte";
    import DownloadAsJupyter from "./download-as-jupyter.svelte";
</script>

<ButtonGroup>
    <CopyTitle />
    <CopyDescription />
    <DownloadAsJupyter />
</ButtonGroup>
