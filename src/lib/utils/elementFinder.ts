import { toast } from "./toast";

type FinderConfig = {
    /** The subject to watch for changes, i.e. the `target` of an Mutation Observer */
    subject: Document | Element;
    observerOption: MutationObserverInit;
    /** The max time to wait before stopping find the item. If value is `0`, the observer will continue indefinitely until it finds the item. */
    timeout: number;
    /** The thing we're looking for. Used for error message. */
    itemName: string;
};

class TimeoutError extends Error {
    name = this.constructor.name;
    constructor(item: string, timeout: number) {
        super();
        this.message = `"${item}" not found within timeout (${timeout}ms)`;
    }
}

/** Using a mutation observer to find something */
export function find<T>(
    finderFn: () => T | null,
    {
        subject = document,
        observerOption = {
            childList: true,
            subtree: true,
        },
        timeout = 5000,
        itemName = "Item",
    }: Partial<FinderConfig>,
) {
    return new Promise<T>((resolve, reject) => {
        // If the element is already present, resolve immediately
        const item = finderFn();
        if (item) return resolve(item);

        let timeoutId: ReturnType<typeof setTimeout>;

        // If not found, set an mutation observer
        const observer = new MutationObserver(() => {
            const item = finderFn();
            if (item) {
                observer.disconnect();
                clearTimeout(timeoutId);
                return resolve(item);
            }
        });

        observer.observe(subject, observerOption);

        // Timeout mechanism to prevent indefinite waiting
        if (timeout > 0) {
            timeoutId = setTimeout(() => {
                observer.disconnect();
                toast.error(
                    `${itemName} not found within timeout. Please refresh the page or disable the script.`,
                );
                const error = new TimeoutError(itemName, timeout);
                console.error(error);
                return reject(error);
            }, timeout);
        }
    });
}

export async function findElement<T extends Element>(
    selector: string,
    {
        parent = document,
        timeout = 500,
        additionalRule,
    }: {
        parent?: Document | Element;
        timeout?: number;
        additionalRule?: (el: T) => boolean;
    } = {},
): Promise<T> {
    const element = await find<T>(
        () => {
            const el = parent.querySelector(selector) as T | null;
            if (additionalRule && el) {
                // if the found element does not meet the rule,
                // return `null` so the finder will proceed as if not found
                return additionalRule(el) ? el : null;
            } else {
                return el;
            }
        },
        {
            subject: parent,
            timeout,
            itemName: `Element ${selector}`,
        },
    );
    return element;
}
