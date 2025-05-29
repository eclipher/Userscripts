<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { CONFIG } from "$lib/config";
</script>

<Button href={CONFIG.EDITORIAL_READER_URL} variant="green">
    Read Saved Editorial
</Button>
