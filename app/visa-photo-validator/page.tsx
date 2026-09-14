import React from "react";
import ValidatorClient from "./components/ValidatorClient";

export const metadata = {
  title: "Visa Photo Validator – Passport & Biometric Photo Checker",
  description: "Validate passport and visa photos online with automatic biometric checks for face position, head size, background, lighting and photo requirements.",
};

export default function VisaPhotoValidatorPage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      <ValidatorClient />
    </main>
  );
}
