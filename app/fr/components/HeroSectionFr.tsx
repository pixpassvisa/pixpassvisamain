"use client";

import Image from "next/image";
import Link from "next/link";
import { fr } from "../translations";

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  showImage?: boolean; // 👈 changed
  showTrustBadges?: boolean;
  showAnimatedText?: boolean;
}

export default function HeroSectionFr({
  title,
  subtitle,
  description,
  ctaText = fr.buttons.getApprovedPhoto,
  ctaHref = "/fr/passport-photo-online?type=france-passport",
  showImage = true,
  showTrustBadges = true,
  showAnimatedText = false,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-10 pb-10 lg:pt-14 lg:pb-10 ">
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${showImage ? "lg:grid lg:grid-cols-2 lg:gap-12 items-center" : "max-w-3xl mx-auto text-center"}`}>
          
          {/* LEFT CONTENT */}
          <div>
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">
                  {fr.preview.aiVerification}
                </span>
              </div>
            </div>

            <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-3">
              {title}
            </h1>

            <p className="text-lg lg:text-xl font-medium text-blue-700 mb-4">
              {subtitle}
            </p>

            {showAnimatedText && (
              <div className="text-lg font-medium text-emerald-600 mb-4">
                {fr.hero.home.animText}
              </div>
            )}

            <p className="text-base lg:text-lg text-slate-600 mb-8 max-w-xl">
              {description}
            </p>

            <Link
              href={ctaHref}
                  className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-3 rounded transition-colors"
            >
              {ctaText}
            </Link>
          </div>

          {/* RIGHT IMAGE (NO SLIDER) */}
          {showImage && (
            <div className="mt-12 lg:mt-0 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[400px] aspect-square rounded-xl overflow-hidden ">
                <Image
                  src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg"
                  alt="Photo biométrique conforme"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}