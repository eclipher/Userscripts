<script lang="ts">
    import Button from "$components/Button.svelte";
    import { getTitle } from "../description/copy-title.svelte";
    import { toaster } from "$lib/toast";

    import { GM_getResourceText } from "$";
    const editorialsMarkdown = GM_getResourceText("editorials");

    /** Extracts the screenshot link for a given LeetCode problem title from markdown content */
    function extractScreenshotLink(problemTitle: string) {
        // Clean the problem title for reliable matching
        const cleanTitle = problemTitle.trim();

        // Create a regex pattern that looks for the heading with the problem title
        // Format is #### [1. Two Sum](https://github.com/...)
        const headingPattern = new RegExp(
            `####\\s+\\[${cleanTitle.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&",
            )}\\]\\((.*?)\\)`,
            "i",
        );

        // Search for the pattern in the markdown
        const match = editorialsMarkdown.match(headingPattern);

        // Return the captured URL or null if not found
        return match ? match[1] : null;
    }

    async function goToEditorialScreenshot() {
        const title = await getTitle();
        const link = extractScreenshotLink(title);
        if (link) {
            window.open(link, "_blank");
        } else {
            toaster.error(
                `Editorial screenshot not found for problem: ${title}`,
            );
        }
    }
</script>

<Button onclick={goToEditorialScreenshot}>Find Screenshot</Button>
