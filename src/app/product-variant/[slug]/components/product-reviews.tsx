import StarRating from "@/components/common/star-rating";

import ReviewForm from "./review-form";

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: { name: string };
};

type ProductReviewsProps = {
  productId: string;
  reviews: Review[];
  isLoggedIn: boolean;
  userReview?: { rating: number; comment: string | null };
};

const ProductReviews = ({
  productId,
  reviews,
  isLoggedIn,
  userReview,
}: ProductReviewsProps) => {
  const count = reviews.length;
  const average = count
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / count
    : 0;

  return (
    <section id="reviews" className="scroll-mt-24 space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight">Reviews</h2>
        <div className="flex items-center gap-2">
          <StarRating value={average} />
          <span className="text-muted-foreground text-sm">
            {count
              ? `${average.toFixed(1)} · ${count} ${count === 1 ? "review" : "reviews"}`
              : "No reviews yet"}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border p-5">
        <h3 className="mb-3 text-sm font-semibold">
          {userReview ? "Your review" : "Write a review"}
        </h3>
        <ReviewForm
          productId={productId}
          isLoggedIn={isLoggedIn}
          initialRating={userReview?.rating ?? 0}
          initialComment={userReview?.comment ?? ""}
        />
      </div>

      {count > 0 && (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="space-y-1 border-t pt-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">
                  {review.user.name}
                </span>
                <StarRating value={review.rating} />
              </div>
              {review.comment && (
                <p className="text-muted-foreground text-sm leading-6">
                  {review.comment}
                </p>
              )}
              <p className="text-muted-foreground text-xs">
                {new Date(review.createdAt).toLocaleDateString("en-US")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProductReviews;
