export { Toaster } from "$utils/toast";
import { createToastWithPrefix } from "$utils/toast";
import { CONFIG } from "./config";

export const toast = createToastWithPrefix(CONFIG.APP_NAME + ": ");
