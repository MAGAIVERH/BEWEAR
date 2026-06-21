import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type StarRatingProps = {
  value: number;
  className?: string;
  starClassName?: string;
};

const StarRating = ({ value, className, starClassName }: StarRatingProps) => {
  const rounded = Math.round(value);
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${value.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={cn(
            "h-4 w-4",
            star <= rounded
              ? "fill-foreground text-foreground"
              : "text-muted-foreground/40",
            starClassName,
          )}
        />
      ))}
    </div>
  );
};

export default StarRating;
