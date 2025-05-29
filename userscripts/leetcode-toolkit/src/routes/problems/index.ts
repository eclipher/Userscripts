import { globalState } from "$lib/state";

import { problemState } from "./state";

import { initDescriptionTab } from "./description";
import { initEditorialTab } from "./editorial";

async function main() {
    const initPromises: Promise<void>[] = [];

    initPromises.push(problemState.patchMonacoEditor());
    initPromises.push(initDescriptionTab());

    if (globalState.site === "global") {
        initPromises.push(initEditorialTab());
    }

    await Promise.all(initPromises);
}

export { main as problemPage };
