import gmFetch from "@sec-ant/gm-fetch";
import { compressImage } from "./compress-image";

function blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
    });
}

/**
 * Converts an image source URL to a data URL (base64 encoded).
 * If the source is already a data URL, it returns the source as-is.
 *
 * @param src - The source URL of the image.
 * @returns A promise that resolves with the data URL of the image.
 */
export async function convertSrcToDataURL(src: string) {
    if (src.startsWith("data:")) {
        return src; // return as-is if it's already Data URL
    }

    try {
        const response = await gmFetch(src); // cannot use native fetch because of CORS issues
        let blob = await response.blob();

        const incompressableTypes = ["image/gif", "image/svg+xml"];
        if (!incompressableTypes.includes(blob.type)) {
            blob = await compressImage(blob);
        }
        const dataURL = await blobToDataURL(blob);
        return dataURL;
    } catch (err) {
        console.error(`Failed to convert image: ${src}`, err);
        throw err;
    }
}
