import type { editor } from "monaco-editor";
import { unsafeWindow } from "$";
import { find } from "@userscripts/utils/src/elementFinder";

interface MonacoEditorOptions extends editor.IEditorOptions {
    "bracketPairColorization.enabled": boolean;
}

const overrideOptions: MonacoEditorOptions = {
    selectionHighlight: true,
    parameterHints: { enabled: true },
    hover: { enabled: true },
    quickSuggestions: true,
    suggestOnTriggerCharacters: true,
    "bracketPairColorization.enabled": true,
};

/** Add Intellisense to the monaco editor */
export function addIntellisense(editor: editor.ICodeEditor): void {
    const originalUpdateOptions = editor.updateOptions.bind(editor);
    editor.updateOptions = (options: MonacoEditorOptions): void => {
        originalUpdateOptions({
            ...options,
            ...overrideOptions,
        });
    };
}

export async function findMonacoEditor() {
    function getEditor(): editor.ICodeEditor | null {
        // @ts-expect-error: monaco is supplied by LeetCode site.
        return unsafeWindow.monaco?.editor.getEditors()[0] ?? null;
    }

    const editor = find(getEditor, {
        subject: document.head,
        observerOption: { childList: true },
        itemName: "Monaco Editor",
    });

    return editor;
}
