import toastOriginal, { Toaster } from "svelte-french-toast";

const messageToastTypes = ["error", "success", "loading", "info"];

function createToastWithPrefix(prefix: string) {
    function addPrefix(message: string): string {
        if (typeof message === "string") {
            return `${prefix}${message}`;
        }
        return message;
    }

    return new Proxy(toastOriginal, {
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
                return (...args: Parameters<typeof toastOriginal>) => {
                    if (args.length > 0 && typeof args[0] === "string") {
                        args[0] = addPrefix(args[0]);
                    }
                    return originalProp.apply(this, args);
                };
            }

            // Handle toast.promise specifically
            if (prop === "promise") {
                return <T>(
                    ...args: Parameters<typeof toastOriginal.promise<T>>
                ) => {
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
}

export { createToastWithPrefix, Toaster };
