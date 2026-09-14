import { NextResponse } from 'next/server';

const EXPECTED_PASSWORD = process.env.ADMIN_PASSWORD || process.env.CLOUDINARY_GALLERY_SECRET;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
    const filenameParam = searchParams.get('filename');
    const pwdParam = searchParams.get('pwd');
    const authHeader = request.headers.get('x-gallery-password');

    if (!EXPECTED_PASSWORD || (pwdParam !== EXPECTED_PASSWORD && authHeader !== EXPECTED_PASSWORD)) {
      return NextResponse.json(
        { error: 'Unauthorized download request' },
        { status: 401 }
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Missing image URL parameter' },
        { status: 400 }
      );
    }

    // Enforce SSRF protection: validate that URL is https and belongs to Cloudinary
    try {
      const parsedUrl = new URL(imageUrl);
      if (
        parsedUrl.protocol !== 'https:' ||
        !(parsedUrl.hostname === 'res.cloudinary.com' || parsedUrl.hostname.endsWith('.cloudinary.com'))
      ) {
        return NextResponse.json(
          { error: 'Invalid or untrusted image domain' },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: 'Malformed image URL' },
        { status: 400 }
      );
    }

    // Fetch the raw image content from Cloudinary
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to download image from storage' },
        { status: imageResponse.status }
      );
    }

    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
    const imageBuffer = await imageResponse.arrayBuffer();

    // Derive filename
    let filename = filenameParam;
    if (!filename) {
      const urlParts = imageUrl.split('/');
      filename = urlParts[urlParts.length - 1] || 'downloaded-image.jpg';
    }

    // Ensure extension
    if (!filename.includes('.')) {
      const ext = contentType.split('/')[1] || 'jpg';
      filename = `${filename}.${ext}`;
    }

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    });
  } catch (error: any) {
    console.error('[Cloudinary Download Error]:', error);
    return NextResponse.json(
      { error: 'Download failed: ' + (error.message || 'Unknown error') },
      { status: 500 }
    );
  }
}
