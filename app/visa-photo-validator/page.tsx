import React from "react";
import ValidatorClient from "./components/ValidatorClient";

export const metadata = {
  openGraph: { title: "Visa Photo Validator – Passport & Biometric Photo Checker", description: "Validate passport and visa photos online with automatic biometric checks for face position, head size, background, lighting and photo requirements.", url: "https://www.pixpassvisa.com/visa-photo-validator", siteName: "PixPassVisa", type: "website", images: ["https://www.pixpassvisa.com/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Visa Photo Validator – Passport & Biometric Photo Checker", description: "Validate passport and visa photos online with automatic biometric checks for face position, head size, background, lighting and photo requirements.", images: ["https://www.pixpassvisa.com/opengraph-image"] },
  title: "Visa Photo Validator – Passport & Biometric Photo Checker",
  description: "Validate passport and visa photos online with automatic biometric checks for face position, head size, background, lighting and photo requirements.",
};

export default function VisaPhotoValidatorPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <ValidatorClient />
    </div>
  );
}
