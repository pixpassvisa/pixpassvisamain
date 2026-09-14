import { Metadata } from "next";

export const metadata: Metadata = {
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
