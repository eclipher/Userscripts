import { ToastRack } from "toast-rack";
import { CONFIG } from "./config";

export const toaster = new ToastRack({
    title: CONFIG.APP_NAME,
    position: "top-center",
});
