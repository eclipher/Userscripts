import { GM_getResourceText, monkeyWindow } from "$";
import { findElement } from "$utils/elementFinder";

import { CONFIG } from "$lib/config";
import { toKebabCase } from "remeda";
import { problemState } from "../state";

/*
    format as:
    Rating	ID	Title	Title ZH	Title Slug	Contest Slug	Problem Index
    3018.4940165727	1719	Number Of Ways To Reconstruct A Tree	重构一棵树的方案数	number-of-ways-to-reconstruct-a-tree	biweekly-contest-43	Q4
    2872.0290327119	1982	Find Array Given Subset Sums	从子集的和还原数组	find-array-given-subset-sums	weekly-contest-255	Q4
*/
const ratingsTxt = GM_getResourceText("ratings");

/**
 * This function is used to extract the slug from the URL.
 *
 * @param url - The URL or Location object from which to extract the slug.
 * @returns The slug as a string, or null if the slug cannot be determined.
 *
 * @example
 * getSlug(new URL("https://leetcode.com/problems/valid-boomerang/solutions/")); // returns "valid-boomerang"
 * getSlug(window.location); // returns the slug from the current page URL
 * getSlug(new URL("https://leetcode.com/problems/")); // returns null
 */
function getSlug(url: URL | Location) {
    const pathParts = url.pathname.split("/");
    if (pathParts.length < 3) return null;
    return pathParts[2];
}

function getRating(slugToSearch: string) {
    const lines = ratingsTxt.split("\n");
    for (const line of lines) {
        const parts = line.split("\t");
        if (parts.length < 2) continue;

        const slug = parts[4];
        if (slug === slugToSearch) {
            return Math.round(parseFloat(parts[0]));
        }
    }
    return null;
}

async function getOrCreateRatingElement() {
    const difficultyEl = await findElement<HTMLDivElement>(
        "div[class*='text-difficulty']",
        { timeout: 5000 },
    );
    const id = toKebabCase(CONFIG.APP_NAME) + "-rating";
    const el = difficultyEl.querySelector<HTMLSpanElement>(`#${id}`);
    if (el) {
        return el;
    } else {
        const span = document.createElement("span");
        span.id = id;
        difficultyEl.append(span);
        return span;
    }
}

async function appendRating() {
    const slug = getSlug(window.location);
    if (!slug) return;
    if (slug === problemState.slug) {
        // No need to re-fetch if the slug hasn't changed
        return;
    }
    problemState.slug = slug;

    const rating = getRating(slug);
    if (rating) {
        console.log("got a rating for slug", slug, ":", rating);
    }

    const el = await getOrCreateRatingElement();
    el.textContent = rating?.toString() ?? "";
}

export function initRatings() {
    appendRating();
    // `onurlchange` is specific to TamperMonkey
    if (monkeyWindow.onurlchange === null) {
        monkeyWindow.addEventListener("urlchange", () => {
            appendRating();
        });
    }
}
