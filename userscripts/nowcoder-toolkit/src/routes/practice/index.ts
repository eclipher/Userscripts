import { findElement } from "$utils/elementFinder";
import { mount } from "svelte";

import ProblemButtons from "./ProblemButtons.svelte";

async function main() {
    const problemEl = await findElement(".ta-question");

    const container = document.createElement("div");
    container.style.cssText = "display: contents;";
    problemEl.prepend(container);
    mount(ProblemButtons, {
        target: container,
    });
}
export { main as practicePage };
