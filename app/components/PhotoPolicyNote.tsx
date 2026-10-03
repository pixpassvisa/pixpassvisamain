import Link from "next/link";
export default function PhotoPolicyNote() {
  return <aside className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-xs leading-relaxed text-slate-700 my-4">
    <strong>Start with a real, unretouched photo.</strong> Automated checks are guidance, not government approval. Some applications prohibit background replacement and other digital alterations. Follow the <a className="underline" href="https://www.gov.uk/photos-for-passports">UK photo rules</a> or your issuing authority’s instructions before editing. Photo processing may use our servers and storage providers; read our <Link className="underline" href="/privacy-policy">privacy policy</Link>.
  </aside>;
}
