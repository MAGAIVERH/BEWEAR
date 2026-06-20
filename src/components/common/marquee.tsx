import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  /** Horizontal spacing applied to each item (margin-right keeps the seam uniform). */
  itemSpacingClassName?: string;
};

// Number of copies must match the keyframe shift in globals.css (4 copies → -25%).
const COPIES = 4;

/**
 * Seamless, always-filled infinite marquee. Renders the children several times
 * and translates the track by exactly one copy, so the loop never shows a gap.
 * Spacing uses margin-right on every item, so the seam between copies matches
 * the inner spacing. Pauses on hover; disabled for reduced motion (globals.css).
 */
const Marquee = ({
  children,
  className,
  itemSpacingClassName = "[&>*]:mr-10 md:[&>*]:mr-16",
}: MarqueeProps) => {
  return (
    <div className={cn("group overflow-hidden", className)}>
      <div className="marquee-track group-hover:[animation-play-state:paused]">
        {Array.from({ length: COPIES }).map((_, index) => (
          <div
            key={`marquee-copy-${index}`}
            aria-hidden={index > 0}
            className={cn("flex shrink-0 items-center", itemSpacingClassName)}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
