"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbsProps {
  items?: { label: string; href: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // If items are not provided, try to generate from pathname
  const segments = items || pathname
    .split("/")
    .filter((segment) => segment !== "")
    .map((segment, index, array) => {
      const href = "/" + array.slice(0, index + 1).join("/");
      // Convert slug to label (e.g. "visa-photo-validator" -> "Visa Photo Validator")
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { label, href };
    });

  if (pathname === "/") return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <ol className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
        <li>
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
        </li>
        {segments.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            <span aria-hidden="true" className="opacity-30">/</span>
            {index === segments.length - 1 ? (
              <span className="text-slate-900 truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-blue-600 transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
