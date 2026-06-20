"use client";

import { HeartIcon } from "lucide-react";
import { toast } from "sonner";

import { useToggleWishlist } from "@/hooks/mutations/use-toggle-wishlist";
import { useWishlist } from "@/hooks/queries/use-wishlist";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

type WishlistButtonProps = {
  productVariantId: string;
  className?: string;
};

const WishlistButton = ({
  productVariantId,
  className,
}: WishlistButtonProps) => {
  const { data: session } = authClient.useSession();
  const { data: wishlist } = useWishlist();
  const toggleWishlistMutation = useToggleWishlist(productVariantId);

  const saved =
    wishlist?.some((item) => item.productVariantId === productVariantId) ??
    false;

  const handleClick = (event: React.MouseEvent) => {
    // The button can live inside a product Link — never navigate on toggle.
    event.preventDefault();
    event.stopPropagation();

    if (!session?.user) {
      toast.error("Sign in to save favorites.");
      return;
    }

    toggleWishlistMutation.mutate(undefined, {
      onSuccess: (result) => {
        toast.success(
          result.saved ? "Added to wishlist." : "Removed from wishlist.",
        );
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={saved}
      disabled={toggleWishlistMutation.isPending}
      className={cn(
        "bg-background/80 hover:bg-background flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition disabled:opacity-60",
        className,
      )}
    >
      <HeartIcon
        className={cn(
          "h-4 w-4 transition",
          saved ? "fill-foreground text-foreground" : "text-foreground",
        )}
      />
    </button>
  );
};

export default WishlistButton;
