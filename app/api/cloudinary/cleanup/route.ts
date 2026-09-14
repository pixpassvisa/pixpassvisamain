import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export const revalidate = 0; // Disable caching

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[Cloudinary Cleanup] Starting cleanup job...');

    // Search for images with the specific tag uploaded more than 1 day ago (older than 24 hours)
    const result = await cloudinary.search
      .expression('tags:us-visa-photo AND uploaded_at<1d')
      .max_results(500)
      .execute();

    if (!result || !result.resources || result.resources.length === 0) {
      console.log('[Cloudinary Cleanup] No images found older than 24 hours.');
      return NextResponse.json({ message: 'No images to delete', deletedCount: 0 });
    }

    const publicIds = result.resources.map((resource: any) => resource.public_id);
    
    // Delete resources
    // The cloudinary.api.delete_resources function accepts an array of public_ids
    const deleteResult = await cloudinary.api.delete_resources(publicIds);
    
    console.log(`[Cloudinary Cleanup] Deleted ${publicIds.length} images.`);
    
    return NextResponse.json({
      message: 'Cleanup successful',
      deletedCount: publicIds.length,
      details: deleteResult
    });

  } catch (error: any) {
    console.error('[Cloudinary Cleanup] Error:', error);
    return NextResponse.json(
      { error: 'Cleanup failed', details: error.message },
      { status: 500 }
    );
  }
}
