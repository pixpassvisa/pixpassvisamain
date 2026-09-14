/**
 * Optimized compression for 3MB max size
 * - Fast (no recursion)
 * - Predictable output
 * - Passport/visa quality safe
 */

const TARGET_SIZE = 3.0 * 1024 * 1024; // 🎯 3.0 MB
const MAX_DIMENSION = 1600; // Good balance for face quality

export async function compressImage(file: File): Promise<File> {
  // ✅ Skip if already small
  if (file.size <= TARGET_SIZE) {
    console.log("[compressImage] ✅ Already under 3MB");
    return file;
  }

  console.log(
    `[compressImage] Original: ${(file.size / 1024 / 1024).toFixed(2)} MB → compressing`
  );

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = async () => {
      URL.revokeObjectURL(url);

      let width = img.width;
      let height = img.height;

      // ✅ Step 1: Resize once
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const scale = MAX_DIMENSION / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas error");

      ctx.drawImage(img, 0, 0, width, height);

      // ✅ Step 2: Controlled compression
      const qualities = [0.9, 0.8, 0.7, 0.6];

      for (const q of qualities) {
        const blob: Blob | null = await new Promise((res) =>
          canvas.toBlob(res, "image/jpeg", q)
        );

        if (!blob) continue;

        console.log(
          `[compressImage] q=${q}, size=${(blob.size / 1024 / 1024).toFixed(2)} MB`
        );

        if (blob.size <= TARGET_SIZE) {
          return resolve(
            new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
              type: "image/jpeg",
              lastModified: Date.now(),
            })
          );
        }
      }

      // ✅ Final fallback (force under limit)
      const fallbackBlob: Blob | null = await new Promise((res) =>
        canvas.toBlob(res, "image/jpeg", 0.5)
      );

      if (!fallbackBlob) return reject("Compression failed");

      const finalFile = new File(
        [fallbackBlob],
        file.name.replace(/\.\w+$/, ".jpg"),
        {
          type: "image/jpeg",
          lastModified: Date.now(),
        }
      );

      console.warn(
        `[compressImage] ⚠️ Fallback used: ${(finalFile.size / 1024 / 1024).toFixed(2)} MB`
      );

      resolve(finalFile);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      console.warn("[compressImage] Image load failed, returning original");
      resolve(file);
    };

    img.src = url;
  });
}