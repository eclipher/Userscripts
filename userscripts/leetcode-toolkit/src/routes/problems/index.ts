import { globalState } from "$lib/state";

import { problemState } from "./state";

import { initDescriptionTab } from "./description";
import { initEditorialTab } from "./editorial";
import { initSolutionsTab } from "./solutions";

async function main() {
    const initPromises: Promise<void>[] = [];

    initPromises.push(problemState.patchMonacoEditor());
    initPromises.push(initDescriptionTab());
    initPromises.push(initSolutionsTab());

    if (globalState.site === "global") {
        initPromises.push(initEditorialTab());
    }

    await Promise.all(initPromises);
}

export { main as problemPage };
