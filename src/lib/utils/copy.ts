import { toast } from "./toast";
import { globalState } from "../state";

export async function copy(text: string, toastId?: string | number) {
    try {
        await navigator.clipboard.writeText(text);
        toast.success(
            globalState.site === "cn"
                ? "复制到剪贴板!"
                : "Copied to clipboard!",
            {
                id: toastId, // update an already present toast, if given the id of that toast
            },
        );
    } catch (err) {
        if (err instanceof Error) {
            const errorMessage =
                globalState.site === "cn" ? "复制失败" : "Failed to copy";
            toast.error(errorMessage + ": " + err.message, {
                id: toastId,
            });
            console.error(errorMessage + err);
        } else throw err;
    }
}
