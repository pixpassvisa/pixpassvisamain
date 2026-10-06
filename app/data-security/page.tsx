import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Photo Processing, Storage & Download Access | PixPassVisa',
  description: 'How PixPassVisa processes and stores photos, handles paid download access, and schedules cleanup. Review the limitations before uploading.',
  alternates: { canonical: 'https://www.pixpassvisa.com/data-security' },
};
export default function DataSecurityPage() {
  return <main className="max-w-3xl mx-auto px-6 py-16 space-y-6">
    <h1 className="text-3xl font-bold">Photo processing, storage, and access</h1>
    <p>PixPassVisa uses server processing and storage providers. The web interface does not mean your photograph stays only in your browser.</p>
    <h2 className="text-xl font-semibold">Where photos are processed</h2>
    <p>Photos can be sent to the Next.js application, the photo processing service, and Cloudinary storage. Keep your original photograph and read the <Link href="/privacy-policy" className="underline">privacy policy</Link> before uploading.</p>
    <h2 className="text-xl font-semibold">Cleanup and retention</h2>
    <p>Scheduled cleanup jobs are intended to remove eligible photo files older than 24 hours. Their successful operation and coverage need production verification. Closing the browser, downloading an image, or reaching a link expiry does not prove that stored copies have been deleted.</p>
    <h2 className="text-xl font-semibold">Preview and paid download access</h2>
    <p>Paid download routes check payment status and owner credentials or download tokens. Preview routes and storage URLs have different access paths; a private-page indexing directive is not an access-control guarantee. Contact support if you need help with a stored photo or deletion request.</p>
    <h2 className="text-xl font-semibold">Payments</h2>
    <p>The application integrates Razorpay for checkout. Available payment methods appear there. This page makes no unsupported claim that PixPassVisa or its payment setup holds a security certification.</p>
    <p><Link href="/contact" className="underline">Contact support</Link> · <Link href="/privacy-policy" className="underline">Privacy policy</Link></p>
  </main>;
}
