import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: { title: "Frequently Asked Questions | PixPassVisa Support", description: "Find answers to common questions about passport and visa photo requirements, biometric compliance, payment, and privacy.", url: "https://www.pixpassvisa.com/faq", siteName: "PixPassVisa", type: "website", images: ["https://www.pixpassvisa.com/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Frequently Asked Questions | PixPassVisa Support", description: "Find answers to common questions about passport and visa photo requirements, biometric compliance, payment, and privacy.", images: ["https://www.pixpassvisa.com/opengraph-image"] },
  title: "Frequently Asked Questions | PixPassVisa Support",
  description: "Find answers to common questions about passport and visa photo requirements, biometric compliance, payment, and privacy.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/faq",
    languages: {
      en: "https://www.pixpassvisa.com/faq",
      "x-default": "https://www.pixpassvisa.com/faq",
    },
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
