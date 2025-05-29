import { CONFIG } from "$lib/config";
import { findElement } from "$lib/utils/elementFinder";
import { toKebabCase } from "remeda";
import { mount } from "svelte";
import DescriptionButttons from "./DescriptionButttons.svelte";

export async function initDescriptionTab() {
    // waiting indefinitely until description tab is loaded AND not hidden
    const descriptionTab = await findElement<HTMLDivElement>(
        ".flexlayout__tab:has([data-track-load='description_content'])",
        {
            timeout: 0,
            additionalRule: (el) => el.style.display !== "none",
        },
    );

    const titleContainer = await findElement("div:has(> .text-title-large)", {
        parent: descriptionTab,
    });
    const buttonsContainer = document.createElement("div");
    buttonsContainer.setAttribute(
        "id",
        toKebabCase(CONFIG.APP_NAME) + "-description",
    );
    buttonsContainer.style.cssText = "display: contents;";
    titleContainer.parentElement?.before(buttonsContainer);

    mount(DescriptionButttons, {
        target: buttonsContainer,
    });
}
