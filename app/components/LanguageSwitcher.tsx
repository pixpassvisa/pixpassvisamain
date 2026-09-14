"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const languages = [
  { code: "en", name: "🇺🇸 English" },
  { code: "de", name: "🇩🇪 Deutsch" },
  { code: "fr", name: "🇫🇷 Français" },
  { code: "es", name: "🇪🇸 Español" },
  { code: "it", name: "🇮🇹 Italiano" },
  { code: "pt", name: "🇵🇹 Português" },
  { code: "nl", name: "🇳🇱 Nederlands" },
  { code: "pl", name: "🇵🇱 Polski" },
  { code: "zh-CN", name: "🇨🇳 中文 (简体)" },
  { code: "ja", name: "🇯🇵 日本語" },
  { code: "ko", name: "🇰🇷 한국어" },
  { code: "ar", name: "🇸🇦 العربية" },
  { code: "hi", name: "🇮🇳 हिन्दी" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    // Determine current language from path or cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const googtrans = getCookie("googtrans");

    const isDeRoute = pathname === "/de" || pathname.startsWith("/de/");
    const isFrRoute = pathname === "/fr" || pathname.startsWith("/fr/");

    if (isDeRoute) {
      setCurrentLang("de");
    } else if (isFrRoute) {
      setCurrentLang("fr");
    } else if (googtrans) {
      // googtrans format: /en/es
      const targetLang = googtrans.split("/").pop();
      if (targetLang && targetLang !== "en") {
        setCurrentLang(targetLang);
      }
    } else {
      setCurrentLang("en");
    }

    // Only load Google Translate script if non-native translation cookie is active
    if (googtrans && !isDeRoute && !isFrRoute) {
      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en", autoDisplay: false },
            "google_translate_hidden_element"
          );
        };
      }
    }
  }, [pathname]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    
    // Helper to clear googtrans cookies
    const clearGoogleTranslateCookies = () => {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname + ";";
    };

    if (lang === "de") {
      clearGoogleTranslateCookies();
      router.push("/de");
    } else if (lang === "fr") {
      clearGoogleTranslateCookies();
      router.push("/fr");
    } else if (lang === "en") {
      clearGoogleTranslateCookies();
      router.push("/");
    } else {
      // For other languages, use Google Translate via cookie
      // The cookie format is /sourceLang/targetLang
      document.cookie = `googtrans=/en/${lang}; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=/en/${lang}; path=/`; // Also set without domain
      
      // Navigate to home page to avoid translating the native localized pages
      const isDeRoute = pathname === "/de" || pathname.startsWith("/de/");
      const isFrRoute = pathname === "/fr" || pathname.startsWith("/fr/");
      if (isDeRoute || isFrRoute) {
        window.location.href = "/";
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Hidden element required by Google Translate */}
      <div id="google_translate_hidden_element" className="hidden"></div>
      
      <select
        value={currentLang}
        onChange={handleLanguageChange}
        aria-label="Select language"
        className="bg-white border border-gray-200 text-slate-700 text-sm rounded-sm px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-blue-500 transition-colors"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.name}
          </option>
        ))}
      </select>
    </div>
  );
}
