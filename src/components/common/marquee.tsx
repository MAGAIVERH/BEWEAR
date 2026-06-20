import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  /** Gap utility applied between items in each copy (e.g. "gap-12"). */
  gapClassName?: string;
};

/**
 * Seamless infinite marquee. Renders two identical copies and translates the
 * track by -50%, so the loop is seamless. Pauses on hover and is disabled for
 * users who prefer reduced motion (handled in globals.css).
 */
const Marquee = ({
  children,
  className,
  gapClassName = "gap-12",
}: MarqueeProps) => {
  return (
    <div className={cn("group overflow-hidden", className)}>
      <div className="marquee-track group-hover:[animation-play-state:paused]">
        <div className={cn("flex shrink-0 items-center", gapClassName)}>
          {children}
        </div>
        <div
          aria-hidden
          className={cn("flex shrink-0 items-center", gapClassName)}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
