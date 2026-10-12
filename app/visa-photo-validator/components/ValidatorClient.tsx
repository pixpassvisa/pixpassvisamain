"use client";
import PhotoCheckerTool from "@/app/components/PhotoCheckerTool";

export default function ValidatorClient() {
  return <PhotoCheckerTool
    initialCountry="US"
    initialDocType="visa"
    badgeText="Free automated photo check"
    title="Passport & Visa Photo Validator"
    subtitle="Check your photo before preparing an application. Get automated feedback, then choose whether you need a paid digital photo or print sheet. Final acceptance is decided by the issuing authority."
    faqs={[
      { question: "Is validation free?", answer: "Yes. The report and editor preview are free. Prepared digital files and print sheets are paid downloads, with the price shown before purchase." },
      { question: "Does a pass guarantee acceptance?", answer: "No. Automated checks can miss problems. The current validation service uses passport configurations, including when a visa is selected. Check the rules for your exact application." },
      { question: "What happens to my photo?", answer: "Your photo is uploaded for server processing and may be stored with Cloudinary. Read our privacy policy for storage and deletion details. Continuing to the editor keeps the original file in this tab temporarily so you do not need to select it again." },
      { question: "Can editing fix every failed photo?", answer: "No. Retake a blurry photo or one with poor lighting or an unsuitable expression. Review the authority's restrictions on editing before using a prepared file." },
    ]}
    relatedTools={[
      { title: "US visa photo editor", desc: "Review application guidance and the US visa preset.", href: "/us-visa-photo-editor" },
      { title: "Passport photo directory", desc: "Find guidance for your country and document.", href: "/passport-photos" },
    ]}
  />;
}
