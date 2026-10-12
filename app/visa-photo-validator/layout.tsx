import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Passport Photo & Visa Validator | Instant Biometric Check",
  description:
    "Get a free automated photo report. Review issues before preparing your photo, with a free editor preview and optional paid downloads. Acceptance is decided by the issuing authority.",
  keywords: [
    "passport photo validator",
    "visa photo checker",
    "free passport photo compliance check",
    "AI biometric photo check",

  ],
  alternates: {
    canonical: "https://www.pixpassvisa.com/visa-photo-validator",
    languages: {
      en: "https://www.pixpassvisa.com/visa-photo-validator",
      "x-default": "https://www.pixpassvisa.com/visa-photo-validator",
    },
  },
};

export default function ValidatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
