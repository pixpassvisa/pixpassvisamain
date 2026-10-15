import crypto from "crypto";
import Photo from "@/models/Photo";

// The browser callback and webhook may arrive together. Only the first writer
// creates the token; both delivery paths must receive the same stable value.
export async function ensureDownloadToken(photoId: unknown): Promise<string> {
  const updated = await Photo.findOneAndUpdate(
    { _id: photoId, $or: [{ downloadToken: { $exists: false } }, { downloadToken: null }, { downloadToken: "" }] },
    { $set: { downloadToken: crypto.randomBytes(24).toString("hex") } },
    { new: true },
  );
  const photo = updated || await Photo.findById(photoId);
  if (!photo?.downloadToken) throw new Error("Could not create secure download access");
  return photo.downloadToken;
}
