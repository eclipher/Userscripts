import { findElement } from "$utils/elementFinder";
import { toKebabCase } from "remeda";
import { CONFIG } from "$lib/config";
import { mount } from "svelte";

import SolutionButtons from "./SolutionButtons.svelte";
import { globalState } from "$lib/state";

export async function initSolutionsTab() {
    const allSolutionText =
        globalState.site === "cn" ? "全部题解" : "All Solutions";
    const solutionsTab = await findElement<HTMLDivElement>(
        `//div[@class='flexlayout__tab' and .//div[text()='${allSolutionText}']]`,
        {
            finderType: "xpath",
            timeout: 0,
            additionalRule: (el) => el.style.display !== "none",
        },
    );

    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.cssText = "display: contents;";
    buttonsContainer.setAttribute(
        "id",
        toKebabCase(CONFIG.APP_NAME) + "-solutions",
    );

    solutionsTab.prepend(buttonsContainer);
    mount(SolutionButtons, {
        target: buttonsContainer,
    });
}
