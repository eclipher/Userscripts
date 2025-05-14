import { toast as sonner, Toaster } from "svelte-sonner";
import { CONFIG } from "../config";
import type { Component } from "svelte";

const messageToastTypes = [
    "success",
    "info",
    "warning",
    "error",
    "message",
    "loading",
];

function addPrefix(message: string | Component): string | Component {
    if (typeof message === "string") {
        return `${CONFIG.APP_NAME}: ${message}`;
    }
    return message;
}

const prefixToast = new Proxy(sonner, {
    // Handle direct function calls: toast('message')
    apply(target, thisArg, args) {
        if (args.length > 0) {
            args[0] = addPrefix(args[0]);
        }
        return Reflect.apply(target, thisArg, args);
    },

    get(target, prop, receiver) {
        const originalProp = Reflect.get(target, prop, receiver);

        // If accessing a method that takes a message
        if (
            typeof originalProp === "function" &&
            messageToastTypes.includes(prop.toString())
        ) {
            return (...args: Parameters<typeof sonner>) => {
                if (args.length > 0) {
                    args[0] = addPrefix(args[0]);
                }
                return originalProp.apply(this, args);
            };
        }

        // Return other properties/methods unchanged
        return originalProp;
    },
});

export { prefixToast as toast, Toaster };
