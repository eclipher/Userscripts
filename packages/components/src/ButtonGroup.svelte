<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    let {
        children,
        ...props
    }: HTMLAttributes<HTMLDivElement> & { children: Snippet } = $props();
</script>

<div {...props}>
    {@render children()}
</div>

<style>
    div {
        display: inline-flex;
        flex-wrap: wrap;
        gap: 0.4rem;
    }
</style>
