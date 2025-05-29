export { Toaster } from "@userscripts/utils/src/toast";
import { createToastWithPrefix } from "@userscripts/utils/src/toast";
import { CONFIG } from "./config";

export const toast = createToastWithPrefix(CONFIG.APP_NAME + ": ");
