"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ConditionalNavFooter({
  children,
  navbar,
  footer,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFrench = pathname === "/fr" || pathname?.startsWith("/fr/");
  const isGerman = pathname === "/de" || pathname?.startsWith("/de/");
  const isLocalized = isFrench || isGerman;

  useEffect(() => {
    if (isFrench) document.documentElement.lang = "fr";
    else if (isGerman) document.documentElement.lang = "de";
    else document.documentElement.lang = "en";
  }, [isFrench, isGerman]);

  const isGallery = pathname === "/cloudinary-gallery" || pathname?.startsWith("/cloudinary-gallery");
  const isAdmin = pathname === "/admin" || pathname?.startsWith("/admin/") || pathname?.startsWith("/admin");

  if (isLocalized || isGallery || isAdmin) {
    // Localized layouts, standalone gallery, and admin portal render without global navbar/footer
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main id="main-content" className="grow">
        {children}
      </main>
      {footer}
    </>
  );
}
