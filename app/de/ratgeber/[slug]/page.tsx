import GermanGuideDetailPage, {
  generateMetadata as detailGenerateMetadata,
  generateStaticParams as detailGenerateStaticParams,
} from "../../guides/[slug]/page";

export const generateStaticParams = detailGenerateStaticParams;
export const generateMetadata = detailGenerateMetadata;

export default GermanGuideDetailPage;
