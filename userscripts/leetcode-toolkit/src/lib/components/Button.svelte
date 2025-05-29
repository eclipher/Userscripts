<!-- @component
design adapted from https://uiverse.io/krlozCJ/blue-dodo-17

if passes `href`, will render as an anchor tag.

if `onclick` handler is async, the button will display a loader icon until the promise is resolved.
 -->

<script lang="ts">
    import { isPromise } from "remeda";
    import type {
        HTMLButtonAttributes,
        HTMLAnchorAttributes,
    } from "svelte/elements";

    let {
        onclick,
        children,
        variant = "purple",
        type = "button",
        href,
        ...restProps
    }: HTMLButtonAttributes &
        HTMLAnchorAttributes & {
            variant?: keyof typeof variants;
        } = $props();

    const variants = {
        purple: "--bg: #6c5ce7; --shadow: #a29bfe",
        green: "--bg: #1ba13e; --shadow: #42de6e",
        orange: "--bg: #ffa116; --shadow: #fedd9b",
    };

    let loading = $state(false);

    async function handleOnClick(
        e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
    ) {
        if (!onclick) return;
        const returnValue = onclick(e);
        if (isPromise(returnValue)) {
            loading = true;
            await returnValue;
            loading = false;
        }
    }
</script>

{#if href}
    <a style={variants[variant]} {href} target="_blank" {...restProps}>
        {@render children?.()}
    </a>
{:else}
    <button
        style={variants[variant]}
        {type}
        disabled={loading}
        onclick={handleOnClick}
        {...restProps}
    >
        {#if loading}
            {@render loaderIcon()}
        {/if}
        {@render children?.()}
    </button>
{/if}

{#snippet loaderIcon()}
    <!-- animate-spin is using tailwind class from leetcode site -->
    <svg
        class="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        width="1rem"
        height="1rem"
        viewBox="0 0 24 24"
    >
        <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 2v4m4.2 1.8l2.9-2.9M18 12h4m-5.8 4.2l2.9 2.9M12 18v4m-7.1-2.9l2.9-2.9M2 12h4M4.9 4.9l2.9 2.9"
        />
    </svg>
{/snippet}

<style>
    button,
    a {
        color: #fff;
        background-color: var(--bg, #6c5ce7);
        box-shadow: 0px 3px 0px 0px var(--shadow, #a29bfe);
        padding: 5px 20px;
        font-size: 0.8rem;
        font-weight: 500;
        border-radius: 5px;
        transition: all ease 0.1s;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        user-select: none;

        &:active {
            transform: translateY(3px);
            box-shadow: 0px 0px 0px 0px var(--shadow, #a29bfe);
        }

        &:disabled {
            pointer-events: none;
            opacity: 50%;
        }
    }
</style>
