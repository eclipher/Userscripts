/** Get the index of a child node within its immediate parent */
export function getElementIndex(element: Element) {
    if (!element.parentNode) throw new Error("Element has no parent node");
    return Array.from(element.parentNode.children).indexOf(element);
}
