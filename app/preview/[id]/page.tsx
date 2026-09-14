import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Photo from "@/models/Photo";
import PreviewClient from "./PreviewClient";
import { getLocalPrice } from "@/lib/currency";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function PreviewPage(props: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  let photoRecord;
  try {
    await dbConnect();
    photoRecord = await Photo.findById(params.id);
  } catch (error) {
    // Invalid ID format
  }

  if (!photoRecord) {
    redirect("/passport-photo-online");
  }

  const session = await getServerSession(authOptions);
  const isPaid = photoRecord.status === "paid";

  const localPrice = await getLocalPrice(6.99);
  const expertPrice = await getLocalPrice(9.99, undefined, true);
  const downloadToken = photoRecord.downloadToken || (searchParams.token as string) || "";

  return (
    <PreviewClient
      photoId={photoRecord._id.toString()}
      previewUrl={photoRecord.previewUrl}
      documentType={photoRecord.documentType}
      metrics={photoRecord.metrics ? JSON.parse(JSON.stringify(photoRecord.metrics)) : {}}
      localPrice={localPrice}
      expertPrice={expertPrice}
      initialIsPaid={isPaid}
      from={searchParams.from as string}
      downloadToken={downloadToken}
    />
  );
}
