import type { editor } from "monaco-editor";
import {
    findMonacoEditor,
    addIntellisense,
} from "src/routes/problems/intellisense";
import { toaster } from "$lib/toast";

class ProblemPageState {
    editor: editor.ICodeEditor | null = null;

    async patchMonacoEditor() {
        this.editor = await findMonacoEditor();
        this.enableFormatOnSave();
        addIntellisense(this.editor);
    }

    enableFormatOnSave() {
        document.addEventListener("keydown", async (e) => {
            if (!(e.ctrlKey && e.key === "s")) return;

            try {
                await this.editor
                    ?.getAction("editor.action.formatDocument")
                    ?.run();
            } catch (err) {
                console.error(err);
                if (err instanceof Error) {
                    toaster.error("Failed to format code:" + err.message);
                }
            }
        });
    }
}

export const problemState = new ProblemPageState();
