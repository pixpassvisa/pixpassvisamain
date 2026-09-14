import type { Metadata } from "next";
import ToolPage from "./passport-photo-online/page";

export const metadata: Metadata = {
  title: "Create Passport & Visa Photos Online – 50+ Countries | PixPassVisa",
  description:
    "Create passport and visa photos online for 50+ countries. Automatic cropping, background removal and biometric photo checks.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <ToolPage />;
}
