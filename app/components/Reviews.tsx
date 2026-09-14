"use client";

import { useState, useEffect } from "react";const INITIAL_REVIEWS = [
  { id: 1, name: "Alexander Ivanov", text: "Incredible service! The background removal was flawless for my visa application. Saved me a trip to the studio.", rating: 5, date: "2 days ago", country: "Russia" },
  { id: 2, name: "Sophia Müller", text: "Very fast and accurate. The automated checks gave me confidence my green card photo would be accepted.", rating: 5, date: "3 days ago", country: "Germany" },
  { id: 3, name: "Marco Rossi", text: "Perfect dimensions and the lighting adjustment was exactly what I needed. Highly recommend for Italian passports too!", rating: 5, date: "1 week ago", country: "Italy" },
  { id: 4, name: "Chen Wei", text: "Amazing tool. I managed to get my family's DV lottery photos done in under 10 minutes. Fantastic!", rating: 5, date: "1 week ago", country: "China" },
  { id: 5, name: "Elena Popova", text: "I was worried about the shadow on my face, but the system fixed it perfectly. My visa was approved yesterday.", rating: 5, date: "2 weeks ago", country: "Ukraine" },
  { id: 6, name: "Ahmed Al-Farsi", text: "Very easy to use on mobile. The cropping tool centered my face perfectly according to the US guidelines.", rating: 5, date: "2 weeks ago", country: "UAE" },
  { id: 7, name: "Lucia Fernandez", text: "The BEST passport photo maker! It even warned me about my glasses. 10/10.", rating: 5, date: "3 weeks ago", country: "Spain" },
  { id: 8, name: "Yuki Tanaka", text: "Clean interface and excellent results. Downloaded the high-res file immediately.", rating: 5, date: "1 month ago", country: "Japan" },
  { id: 9, name: "Oliver Smith", text: "I've tried other apps, but this one has the best background removal by far. Super clean edges around my hair.", rating: 5, date: "1 month ago", country: "UK" },
  { id: 10, name: "Anaïs Dubois", text: "Super useful for my J1 visa! Recommending this to all my exchange student friends.", rating: 5, date: "1 month ago", country: "France" },
  { id: 11, name: "Lars Jensen", text: "Quick, cheap, and strictly follows the biometric requirements. Couldn't ask for more.", rating: 5, date: "1 month ago", country: "Denmark" },
  { id: 12, name: "Isabella Silva", text: "Perfect tool for baby passport photos. Took a picture of my son on the bed and it made the background perfectly white.", rating: 5, date: "2 months ago", country: "Brazil" },
  { id: 13, name: "Dmitry Volkov", text: "Excellent quality. Passed the Department of State photo checker without any issues.", rating: 5, date: "2 months ago", country: "Russia" },
  { id: 14, name: "Ji-Yoon Kim", text: "Saves so much time! The processed photo looks very professional.", rating: 5, date: "2 months ago", country: "South Korea" },
  { id: 15, name: "Mateo Garcia", text: "Used it for the DV lottery. Everything was cropped beautifully. Fingers crossed!", rating: 5, date: "2 months ago", country: "Mexico" },
  { id: 16, name: "Emma Johansson", text: "So convenient. I did it right from my living room, and the result was indistinguishable from a pro studio.", rating: 5, date: "3 months ago", country: "Sweden" },
  { id: 17, name: "Liam O'Connor", text: "Brilliant bit of kit. The validators told me exactly what was wrong with my first raw photo.", rating: 4, date: "3 months ago", country: "Ireland" },
  { id: 18, name: "Fatima Benali", text: "Accurate and affordable. The instructions were very clear.", rating: 5, date: "3 months ago", country: "Morocco" },
  { id: 19, name: "Kamil Kowalski", text: "Great service! Very satisfied with the final A4 photo sheet.", rating: 5, date: "3 months ago", country: "Poland" },
  { id: 20, name: "Nikos Papadopoulos", text: "Very good experience. The website is fast and the image processing took just seconds.", rating: 5, date: "4 months ago", country: "Greece" },
  { id: 21, name: "Amelia Taylor", text: "A lifesaver. Needed a visa photo urgently late at night and this delivered.", rating: 5, date: "4 months ago", country: "Australia" },
  { id: 22, name: "Jan Novak", text: "Flawless validation. It caught that my head was too tilted.", rating: 5, date: "4 months ago", country: "Czech Republic" },
  { id: 23, name: "Sofia Ribeiro", text: "I love the preview feature. You know exactly what you're getting.", rating: 5, date: "5 months ago", country: "Portugal" },
  { id: 24, name: "Artem Sokolov", text: "Solid product. Clean backgrounds and great resolution.", rating: 5, date: "5 months ago", country: "Russia" },
  { id: 25, name: "Chloé Laurent", text: "C'est parfait! It handled my curly hair so well during background removal.", rating: 5, date: "5 months ago", country: "France" },
  { id: 26, name: "Hassan Mahmoud", text: "Highly automated. Just upload and boom - perfect visa photo.", rating: 5, date: "6 months ago", country: "Egypt" },
  { id: 27, name: "Martina Bauer", text: "Works exactly as advertised. Totally worth it.", rating: 5, date: "6 months ago", country: "Austria" },
  { id: 28, name: "Diego Martinez", text: "Made the dreadful US visa process slightly easier. The photo part was at least effortless.", rating: 5, date: "6 months ago", country: "Argentina" },
  { id: 29, name: "Youssef Ibrahim", text: "Tested multiple sites, this one had the best result by far.", rating: 5, date: "7 months ago", country: "Lebanon" },
  { id: 30, name: "Olga Smirnova", text: "Great result, straightforward and no hidden fees.", rating: 5, date: "7 months ago", country: "Russia" },
  { id: 31, name: "Minh Pham", text: "Fast processing! My printed photos looked perfectly sharp.", rating: 5, date: "8 months ago", country: "Vietnam" },
  { id: 32, name: "Carlos Ruiz", text: "Very intuitive UI. Even my parents used it without help.", rating: 5, date: "8 months ago", country: "Colombia" },
  { id: 33, name: "Freja Nielsen", text: "Absolutely brilliant background removal system.", rating: 5, date: "8 months ago", country: "Denmark" },
  { id: 34, name: "Tariq Ali", text: "No issues with acceptance at the embassy with this photo.", rating: 5, date: "9 months ago", country: "Pakistan" },
  { id: 35, name: "Mikael Virtanen", text: "Good quality and very fast load times. Excellent tool.", rating: 4, date: "9 months ago", country: "Finland" },
  { id: 36, name: "Catalina Muñoz", text: "Loved it! Will definitely use it again for my next renewal.", rating: 5, date: "10 months ago", country: "Chile" },
  { id: 37, name: "Igor Zoric", text: "The automatic centering saved my photo. Good job.", rating: 5, date: "10 months ago", country: "Serbia" },
  { id: 38, name: "Saskia De Jong", text: "Really happy with how my green card photo turned out.", rating: 5, date: "11 months ago", country: "Netherlands" },
  { id: 39, name: "Andrei Munteanu", text: "Superb results right from the phone's browser.", rating: 5, date: "11 months ago", country: "Romania" },
  { id: 40, name: "Katarina Horvat", text: "Everything was perfectly aligned to their biometric mask.", rating: 5, date: "1 year ago", country: "Croatia" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex text-amber-400 text-sm">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? "fill-current" : "text-gray-300 fill-current"}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>(INITIAL_REVIEWS);
  const [visibleCount, setVisibleCount] = useState(8);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const data = await res.json();
          if (data.reviews && data.reviews.length > 0) {
            setReviews([...data.reviews, ...INITIAL_REVIEWS]);
          }
        }
      } catch (error) {
        console.error("Error fetching reviews", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchReviews();
  }, []);

  const displayedReviews = reviews.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, reviews.length));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const text = formData.get("review") as string;

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, text, rating: 5, country: "USA" }), // Defaulting to USA & 5 stars for simplicity
      });

      if (res.ok) {
        const data = await res.json();
        // Insert exactly at the top of the combined array
        setReviews([data.review, ...reviews]);
        setFormState("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormState("idle"), 3000);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 3000);
      }
    } catch (error) {
      console.error("Failed to submit review", error);
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by Thousands Worldwide
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            See what our users have to say about their successful visa applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {displayedReviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <StarRating rating={review.rating} />
                <p className="mt-4 text-gray-600 line-clamp-4 italic">"{review.text}"</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                <div>
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{review.country} • {review.date}</div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs uppercase">
                  {review.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < reviews.length && (
          <div className="flex justify-center mb-16">
            <button
              onClick={handleShowMore}
              className="px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Load More Reviews
            </button>
          </div>
        )}

        <div className="mt-16 bg-white rounded-3xl shadow-xl overflow-hidden max-w-2xl mx-auto border border-gray-100">
          <div className="px-6 py-8 sm:p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Write a Review</h3>
            <p className="text-gray-500 mb-6">How was your photo editing experience?</p>

            {formState === "success" ? (
              <div className="bg-emerald-50 text-emerald-800 rounded-xl p-6 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <svg className="w-12 h-12 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <h4 className="font-bold text-lg mb-1">Thank you for your review!</h4>
                <p className="text-sm">Your feedback helps us continuously improve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {formState === "error" && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm border border-red-100 flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold">Something went wrong.</p>
                      <p className="mt-1">We couldn't submit your review at this time. Please try again later.</p>
                    </div>
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Display Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border placeholder-gray-400"
                    placeholder="Enter your name"
                    disabled={formState === "submitting"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <StarRating rating={5} />
                </div>
                <div>
                  <label htmlFor="review" className="block text-sm font-medium text-gray-700">Your Review</label>
                  <textarea
                    id="review"
                    name="review"
                    rows={4}
                    required
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border placeholder-gray-400 resize-none"
                    placeholder="Tell us about your experience..."
                    disabled={formState === "submitting"}
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shrink-0 shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70"
                >
                  {formState === "submitting" ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
