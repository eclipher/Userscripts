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

        // Handle toast.promise specifically
        if (prop === "promise") {
            return <T>(...args: Parameters<typeof sonner.promise<T>>) => {
                const [promise, data] = args;
                if (!data) return originalProp;

                const prefixedData = {
                    ...data,
                    loading:
                        typeof data.loading === "string"
                            ? addPrefix(data.loading)
                            : data.loading,
                    success:
                        typeof data.success === "string"
                            ? addPrefix(data.success)
                            : data.success,
                    error:
                        typeof data.error === "string"
                            ? addPrefix(data.error)
                            : data.error,
                };
                return originalProp.call(this, promise, prefixedData);
            };
        }

        // Return other properties/methods unchanged
        return originalProp;
    },
});

export { prefixToast as toast, Toaster };
