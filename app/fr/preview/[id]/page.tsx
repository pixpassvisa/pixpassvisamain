import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import PreviewClientFr from "./PreviewClientFr";
import { getLocalPrice } from "@/lib/currency";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function FrPreviewPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  let photoRecord;
  try {
    await dbConnect();
    photoRecord = await Photo.findById(params.id);
  } catch {
    // ignore
  }

  if (!photoRecord) {
    redirect("/fr/passport-photo-online");
  }

  const session = await getServerSession(authOptions);
  const isPaid = photoRecord.status === "paid";

  if (isPaid && session?.user) {
    redirect("/dashboard");
  }

  const localPrice = await getLocalPrice(7.99);
  const expertPrice = await getLocalPrice(13.99, undefined, true);

  return (
    <PreviewClientFr
      photoId={photoRecord._id.toString()}
      previewUrl={photoRecord.previewUrl}
      documentType={photoRecord.documentType}
      metrics={photoRecord.metrics ? JSON.parse(JSON.stringify(photoRecord.metrics)) : {}}
      localPrice={localPrice}
      expertPrice={expertPrice}
      initialIsPaid={isPaid}
    />
  );
}
