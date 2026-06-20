"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createReview } from "@/actions/create-review";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const reviewFormSchema = z.object({
  rating: z.number().min(1, "Please select a rating.").max(5),
  comment: z.string().max(1000).optional(),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

type ReviewFormProps = {
  productId: string;
  isLoggedIn: boolean;
  initialRating?: number;
  initialComment?: string;
};

const ReviewForm = ({
  productId,
  isLoggedIn,
  initialRating = 0,
  initialComment = "",
}: ReviewFormProps) => {
  const router = useRouter();
  const [hover, setHover] = useState(0);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { rating: initialRating, comment: initialComment },
  });

  if (!isLoggedIn) {
    return (
      <p className="text-muted-foreground text-sm">
        <Link href="/authentication" className="text-foreground underline">
          Sign in
        </Link>{" "}
        to write a review.
      </p>
    );
  }

  const rating = form.watch("rating");

  const onSubmit = (values: ReviewFormValues) => {
    startTransition(async () => {
      try {
        await createReview({
          productId,
          rating: values.rating,
          comment: values.comment?.trim() || undefined,
        });
        toast.success("Review submitted.");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <div className="space-y-1">
        <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              onMouseEnter={() => setHover(star)}
              onClick={() =>
                form.setValue("rating", star, { shouldValidate: true })
              }
            >
              <StarIcon
                className={cn(
                  "h-6 w-6 transition",
                  (hover || rating) >= star
                    ? "fill-foreground text-foreground"
                    : "text-muted-foreground/40",
                )}
              />
            </button>
          ))}
        </div>
        {form.formState.errors.rating && (
          <p className="text-destructive text-xs">
            {form.formState.errors.rating.message}
          </p>
        )}
      </div>

      <textarea
        {...form.register("comment")}
        rows={3}
        placeholder="Share your thoughts (optional)"
        className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm shadow-xs focus-visible:ring-2 focus-visible:outline-none"
      />

      <Button type="submit" disabled={isPending} className="rounded-full">
        {isPending
          ? "Submitting..."
          : initialRating > 0
            ? "Update review"
            : "Submit review"}
      </Button>
    </form>
  );
};

export default ReviewForm;
