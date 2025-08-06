import type { editor } from "monaco-editor";
import { unsafeWindow } from "$";
import { find } from "$utils/elementFinder";

declare global {
    interface Window {
        // The global monaco object provided by the Monaco Editor
        // it could be undefined if the Monaco Editor is not loaded yet when the script is running
        monaco?: typeof import("monaco-editor");
    }
}
interface MonacoEditorOptions extends editor.IEditorOptions {
    "bracketPairColorization.enabled": boolean;
}

/** Add Intellisense to the monaco editor */
export function addIntellisense(editor: editor.ICodeEditor): void {
    // We can use `window.monaco.editor.getEditors()[0].getRawOptions()` to get the options that are different from default, which are set by LeetCode
    // and here we override those changes to enable intellisense features
    const overrideOptions: MonacoEditorOptions = {
        "bracketPairColorization.enabled": true,
        hover: { enabled: true },
        parameterHints: { enabled: true },
        quickSuggestions: true,
        selectionHighlight: true,
        suggest: {
            filterGraceful: true,
            preview: true,
            showColors: true,
            showConstants: true,
            showConstructors: true,
            showDeprecated: true,
            showEnumMembers: true,
            showEnums: true,
            showEvents: true,
            showFields: true,
            showFiles: true,
            showFolders: true,
            showFunctions: true,
            showIcons: true,
            showInterfaces: true,
            showIssues: true,
            showKeywords: true,
            showMethods: true,
            showModules: true,
            showOperators: true,
            showReferences: true,
            showSnippets: true,
            showStatusBar: true,
            showStructs: true,
            showTypeParameters: true,
            showUnits: true,
            showUsers: true,
            showValues: true,
            showVariables: true,
            showWords: true,
        },
        suggestOnTriggerCharacters: true,
    };
    editor.updateOptions(overrideOptions);
}

export async function findMonacoEditor() {
    function getEditor() {
        return unsafeWindow.monaco?.editor.getEditors().at(0);
    }

    const editor = await find(getEditor, {
        subject: document.head,
        observerOption: { childList: true },
        itemName: "Monaco Editor",
    });

    return editor;
}
