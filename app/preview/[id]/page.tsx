import PreviewLoader from "./PreviewLoader";
import { getLocalPrice } from "@/lib/currency";

export default async function PreviewPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await props.params;
  const query = await props.searchParams;
  const [localPrice, expertPrice] = await Promise.all([
    getLocalPrice(4.99), getLocalPrice(6.99, undefined, true),
  ]);
  // A refresh renders a stable shell. Load the saved photo through the same
  // public endpoint that succeeds after processing, without a second auth/DB
  // render path. Download endpoints still enforce payment and authorization.
  return <PreviewLoader photoId={id} localPrice={localPrice} expertPrice={expertPrice}
    from={typeof query.from === "string" ? query.from : undefined}
    downloadToken={typeof query.token === "string" ? query.token : ""} />;
}
