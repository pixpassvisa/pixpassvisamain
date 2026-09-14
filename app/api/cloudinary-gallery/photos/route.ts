import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export const revalidate = 0; // Disable caching to fetch fresh images every time

const EXPECTED_PASSWORD = process.env.ADMIN_PASSWORD || process.env.CLOUDINARY_GALLERY_SECRET;

// In-memory cache to avoid repeated slow Cloudinary Search API roundtrips
interface CachedGallery {
  timestamp: number;
  count: number;
  totalBytes: number;
  photos: any[];
}

let galleryCache: CachedGallery | null = null;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const authHeader = request.headers.get('x-gallery-password');
    const providedPassword = body.password || authHeader;
    const forceRefresh = body.refresh === true;

    if (!EXPECTED_PASSWORD || providedPassword !== EXPECTED_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Return from cache if fresh and not forced refresh
    if (!forceRefresh && galleryCache && Date.now() - galleryCache.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        success: true,
        cached: true,
        count: galleryCache.count,
        totalBytes: galleryCache.totalBytes,
        photos: galleryCache.photos,
      });
    }

    let allResources: any[] = [];
    let nextCursor: string | undefined = undefined;
    let pageCount = 0;
    const MAX_PAGES = 3; // Fetch up to 1500 most recent items to keep response fast

    // First attempt: Use Cloudinary Search API (returns detailed metadata like tags, folder, etc.)
    try {
      do {
        let query = cloudinary.search
          .expression('resource_type:image')
          .sort_by('created_at', 'desc')
          .max_results(500);

        if (nextCursor) {
          query = query.next_cursor(nextCursor);
        }

        const result = await query.execute();
        if (result && result.resources && Array.isArray(result.resources)) {
          allResources.push(...result.resources);
        }
        nextCursor = result.next_cursor;
        pageCount++;
      } while (nextCursor && pageCount < MAX_PAGES);
    } catch (searchError) {
      console.warn('[Cloudinary Gallery] Search API fallback to resources API:', searchError);
      // Fallback: Use Admin API resources
      let cursor: string | undefined = undefined;
      let fallbackPages = 0;
      do {
        const res: any = await cloudinary.api.resources({
          type: 'upload',
          resource_type: 'image',
          max_results: 500,
          next_cursor: cursor,
        });

        if (res && res.resources && Array.isArray(res.resources)) {
          allResources.push(...res.resources);
        }
        cursor = res.next_cursor;
        fallbackPages++;
      } while (cursor && fallbackPages < MAX_PAGES);
    }

    // Transform resources into structured payload
    const photos = allResources.map((res: any) => ({
      id: res.public_id,
      url: res.url,
      secure_url: res.secure_url,
      created_at: res.created_at || res.uploaded_at,
      bytes: res.bytes || 0,
      format: res.format || 'jpg',
      width: res.width || 0,
      height: res.height || 0,
      folder: res.folder || (res.public_id.includes('/') ? res.public_id.split('/')[0] : ''),
      filename: res.public_id.split('/').pop() || res.public_id,
      tags: res.tags || [],
    }));

    const totalBytes = photos.reduce((acc, curr) => acc + (curr.bytes || 0), 0);

    // Update in-memory cache
    galleryCache = {
      timestamp: Date.now(),
      count: photos.length,
      totalBytes,
      photos,
    };

    return NextResponse.json({
      success: true,
      cached: false,
      count: photos.length,
      totalBytes,
      photos,
    });
  } catch (error: any) {
    console.error('[Cloudinary Gallery Error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch photos from Cloudinary' },
      { status: 500 }
    );
  }
}

