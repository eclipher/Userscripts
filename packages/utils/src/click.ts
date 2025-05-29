import { unsafeWindow } from "$";

const mouseClickEvents = ["mousedown", "mouseup", "click"];
/**
 *
 * @see {@link https://stackoverflow.com/a/54316368}
 *
 * why is react like this
 */
export function simulateMouseClickReact(element: Element) {
    mouseClickEvents.forEach((mouseEventType) =>
        element.dispatchEvent(
            new MouseEvent(mouseEventType, {
                view: unsafeWindow,
                bubbles: true,
                cancelable: true,
                buttons: 1,
            }),
        ),
    );
}
