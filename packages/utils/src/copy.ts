export async function copyText(text: string) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err);
        }
        throw err;
    }
}
