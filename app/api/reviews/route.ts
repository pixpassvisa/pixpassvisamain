import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET() {
  try {
    await connectMongo();
    const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
    
    // Format them to match the existing INITIAL_REVIEWS shape
    const formattedReviews = reviews.map((r: any) => ({
      id: r._id.toString(),
      name: r.name,
      text: r.text,
      rating: r.rating,
      date: new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(r.createdAt)),
      country: r.country
    }));

    return NextResponse.json({ success: true, reviews: formattedReviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, text, rating, country } = await req.json();

    const cleanName = String(name || "").slice(0, 100).trim();
    const cleanText = String(text || "").slice(0, 1000).trim();
    const cleanCountry = country ? String(country).slice(0, 50).trim() : "USA";
    const numericRating = Math.min(5, Math.max(1, Number(rating) || 5));

    if (!cleanName || !cleanText) {
      return NextResponse.json({ success: false, error: "Name and review text are required" }, { status: 400 });
    }

    await connectMongo();
    
    // Default isApproved to false so reviews require admin moderation before going live
    const newReview = await Review.create({
      name: cleanName,
      text: cleanText,
      rating: numericRating,
      country: cleanCountry,
      isApproved: false 
    });

    const formattedReview = {
      id: newReview._id.toString(),
      name: newReview.name,
      text: newReview.text,
      rating: newReview.rating,
      date: "Just now",
      country: newReview.country
    };

    return NextResponse.json({ success: true, review: formattedReview }, { status: 201 });
  } catch (error) {
    console.error("Error storing review:", error);
    return NextResponse.json({ success: false, error: "Failed to save review" }, { status: 500 });
  }
}
