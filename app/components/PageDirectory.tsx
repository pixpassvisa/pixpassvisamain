import Link from "next/link";
import { getPublicPages } from "@/lib/public-pages";
import { directoryGroups } from "@/lib/page-directory";

export default async function PageDirectory({ expanded = false }: { expanded?: boolean }) {
  const pages = await getPublicPages();
  return <nav className="page-directory" aria-label={expanded ? "All website pages" : "Footer page directory"}>
    {directoryGroups.map(group => {
      const entries = pages.filter(page => page.group === group).sort((a, b) => a.title.localeCompare(b.title));
      if (!entries.length) return null;
      return <details key={group} open={expanded} className="page-directory-group">
        <summary>{group}<span>{entries.length} pages</span></summary>
        <ul>{entries.map(page => <li key={page.path}><Link prefetch={false} href={page.path} lang={group === "Français" ? "fr" : group === "Deutsch" ? "de" : undefined}>{page.title}</Link></li>)}</ul>
      </details>;
    })}
  </nav>;
}
