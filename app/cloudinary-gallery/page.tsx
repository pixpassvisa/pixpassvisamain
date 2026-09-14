import type { Metadata } from 'next';
import CloudinaryGalleryClient from './CloudinaryGalleryClient';

export const metadata: Metadata = {
  title: 'Cloudinary Gallery | Private',
  description: 'Private image gallery',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function CloudinaryGalleryPage() {
  return (
    <>
      <head>
        <meta name="robots" content="noindex, nofollow, noimageindex" />
        <meta name="googlebot" content="noindex, nofollow, noimageindex" />
      </head>
      <CloudinaryGalleryClient />
    </>
  );
}
