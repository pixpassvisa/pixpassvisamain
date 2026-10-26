'use client';
import { useRef, useState } from 'react';
import { checkVisaFile } from '@/lib/visa-file-check';

export default function VisaFileCheck() {
  const [checks, setChecks] = useState<ReturnType<typeof checkVisaFile> | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const sequence = useRef(0);
  async function inspect(file?: File) {
    const current = ++sequence.current;
    setChecks(null); setError(''); setBusy(false);
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) { setError('Choose a file smaller than 20 MB. This file is already above the visa upload limit.'); return; }
    setBusy(true);
    let url: string | undefined;
    try {
      const signature = new Uint8Array(await file.slice(0, 3).arrayBuffer());
      const jpeg = signature[0] === 0xff && signature[1] === 0xd8 && signature[2] === 0xff;
      url = URL.createObjectURL(file);
      const image = new Image(); image.src = url;
      await image.decode();
      if (current === sequence.current) setChecks(checkVisaFile({ jpeg, bytes: file.size, width: image.naturalWidth, height: image.naturalHeight }));
    } catch {
      if (current === sequence.current) setError('This image could not be read. Export a fresh JPEG from your original photograph and try again.');
    } finally {
      if (url) URL.revokeObjectURL(url);
      if (current === sequence.current) setBusy(false);
    }
  }
  return <section id="file-check" aria-labelledby="visa-file-check-title" className="my-10 rounded-2xl border border-emerald-200 bg-white p-6 sm:p-8">
    <h2 id="visa-file-check-title" className="text-2xl font-semibold">Free DS-160 photo file check</h2>
    <p className="mt-3 leading-7">Check the file format, square dimensions and file size before opening your application. This check runs in your browser; it does not upload, edit or save your photo.</p>
    <label className="mt-5 block font-semibold" htmlFor="visa-file-input">Choose the photo file you plan to submit</label>
    <input id="visa-file-input" className="mt-3 block max-w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-900 file:px-4 file:py-3 file:text-white" type="file" accept="image/jpeg,image/png,image/webp" onChange={event => void inspect(event.target.files?.[0])} />
    <div aria-live="polite" aria-atomic="true" className="mt-5">
      {busy && <p>Reading file properties…</p>}
      {error && <p className="text-red-800">{error}</p>}
      {checks && <><p className="font-semibold">{checks.every(c => c.passed) ? 'These three file checks pass. Review the remaining photo requirements below.' : 'One or more file properties need attention.'}</p><ul className="mt-3 space-y-3">{checks.map(check => <li key={check.label}><strong>{check.passed ? 'Pass' : 'Needs attention'}: {check.label}</strong><p className="text-sm text-slate-600">{check.detail}</p></li>)}</ul></>}
    </div>
    <p className="mt-5 text-sm leading-6 text-slate-600">This is not a complete visa photo assessment. It does not check your face, background, photo age, sRGB profile, colour depth or compression ratio, and does not predict government acceptance. Keep your original photograph and follow the <a className="underline" href="https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos/digital-image-requirements.html">State Department’s requirements</a>.</p>
  </section>;
}
