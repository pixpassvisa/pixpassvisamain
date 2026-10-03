import type { Metadata } from "next";
import Link from "next/link";
import video from "@/data/photo-video.json";

const url = "https://www.pixpassvisa.com/passport-photo-video";
const title = "How to Make a Passport or Visa Photo Online";
const description = "Watch the PixPassVisa photo preparation guide: choose your document, upload a real photo, preview the result, and purchase your digital photo and print sheet.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, type: "website", images: [{ url: "/videos/thumbnail.jpg", width: 1920, height: 1080 }] },
};

export default function PhotoVideoPage() {
  const youtubeId = process.env.NEXT_PUBLIC_PHOTO_VIDEO_YOUTUBE_ID;
  const validId = youtubeId && /^[A-Za-z0-9_-]{11}$/.test(youtubeId) ? youtubeId : null;
  const schema = {
    "@context": "https://schema.org", "@type": "VideoObject",
    name: title, description,
    thumbnailUrl: ["https://www.pixpassvisa.com/videos/thumbnail.jpg"],
    uploadDate: video.createdAt, duration: `PT${video.duration}S`,
    contentUrl: "https://www.pixpassvisa.com/videos/pixpassvisa-photo-guide.mp4",
    ...(validId ? { embedUrl: `https://www.youtube.com/embed/${validId}` } : {}),
    publisher: { "@id": "https://www.pixpassvisa.com/#organization" },
    transcript: video.chapters.map(c => c.text).join(" "),
  };
  return <article className="mx-auto max-w-5xl px-5 py-12">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <p className="mb-3 text-sm font-semibold text-green-800">PIXPASSVISA VIDEO GUIDE</p>
    <h1 className="mb-4 text-3xl font-bold sm:text-5xl">{title}</h1>
    <p className="mb-7 text-lg text-slate-600">{description}</p>
    {validId ? <iframe className="aspect-video w-full rounded-xl" src={`https://www.youtube-nocookie.com/embed/${validId}`} title={title} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen /> :
      <video className="aspect-video w-full rounded-xl bg-slate-900" controls preload="metadata" poster="/videos/thumbnail.jpg">
        <source src="/videos/pixpassvisa-photo-guide.mp4" type="video/mp4" />
        <track kind="captions" src="/videos/captions.vtt" srcLang="en" label="English" default />
        <a href="/videos/pixpassvisa-photo-guide.mp4">Download the video</a>
      </video>}
    <div className="my-8 flex flex-wrap gap-4"><Link href="/passport-photo-online" className="rounded-lg bg-green-900 px-6 py-3 font-semibold text-white">Create my photo</Link><Link href="/#pricing" className="rounded-lg border px-6 py-3 font-semibold">View photo packages</Link></div>
    <h2 className="mb-4 text-2xl font-bold">Video transcript</h2>
    {video.chapters.map((chapter,i) => <section key={chapter.start} className="mb-6"><h3 className="font-semibold">{["Prepare your photo online", "Choose your document", "Take a suitable photo", "Review your preview", "Purchase your photo package", "Get started"][i]}</h3><p className="mt-2 leading-7 text-slate-600">{chapter.text}</p></section>)}
    <p className="border-t pt-6 text-sm text-slate-600">Narration uses a synthetic voice. Graphics are illustrative. <Link className="underline" href="/passport-photo-sizes">Compare photo sizes</Link> or read <Link className="underline" href="/editorial-methodology">how we research requirements</Link>.</p>
  </article>;
}
