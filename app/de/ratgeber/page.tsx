import GermanGuidesHubPage, { metadata as hubMetadata } from "../guides/page";

export const metadata = {
  ...hubMetadata,
  alternates: {
    canonical: "https://www.pixpassvisa.com/de/ratgeber",
    languages: {
      de: "https://www.pixpassvisa.com/de/ratgeber",
    },
  },
};

export default function RatgeberPage() {
  return <GermanGuidesHubPage />;
}
