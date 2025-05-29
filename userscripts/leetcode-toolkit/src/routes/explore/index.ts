import { findElement } from "@userscripts/utils/src/elementFinder";
import { mount } from "svelte";
import ExploreButtons from "./ExploreButtons.svelte";

async function main() {
    const toolbar = await findElement("div.left-side", { timeout: 0 });

    const container = document.createElement("div");
    container.style.cssText = "display: contents;";
    toolbar.append(container);
    mount(ExploreButtons, {
        target: container,
    });
}

export { main as explorePage };
