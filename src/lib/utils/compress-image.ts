import Compressor from "compressorjs";

export async function compressImage(image: File | Blob) {
    return new Promise<File | Blob>((resolve, reject) => {
        new Compressor(image, {
            success: resolve,
            error: reject,
        });
    });
}
