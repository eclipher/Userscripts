import { unsafeWindow } from "$";

/**
 * I don't know if it comes from some ancient package during the Prototype.js craze or their devs are fucking maniacs, but nowcoder.com hijacks built-in EventTarget prototype and modifies `addEventListener` method, causing svelte component `onclick` not working.
 *
 * To solve that, this function creates a temporary iframe, and use its `addEventListener` (which will be the pristine, built-in version) to replace the one fucked up by nowcoder.
 *
 * Might have unknown side effects that remain to be seen.
 */
export function correctAddEventListener() {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.documentElement.appendChild(iframe); // Append to DOM
    const cleanListener = (iframe.contentWindow as typeof window | null)
        ?.EventTarget.prototype.addEventListener;
    iframe.parentNode?.removeChild(iframe); // Clean up

    if (cleanListener) {
        unsafeWindow.EventTarget.prototype.addEventListener = cleanListener;
    }
}
