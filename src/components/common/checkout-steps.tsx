import { cn } from "@/lib/utils";

const STEPS = [
  { key: "bag", label: "Bag" },
  { key: "address", label: "Address" },
  { key: "payment", label: "Payment" },
] as const;

type CheckoutStepsProps = {
  current: "address" | "payment";
};

const CheckoutSteps = ({ current }: CheckoutStepsProps) => {
  const currentIndex = STEPS.findIndex((step) => step.key === current);

  return (
    <ol className="flex items-center justify-center gap-2 sm:gap-3">
      {STEPS.map((step, index) => {
        const isDone = index <= currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <li key={step.key} className="flex items-center gap-2 sm:gap-3">
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                isDone
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {index + 1}
            </span>
            <span
              className={cn(
                "text-sm font-medium",
                isCurrent ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
            {index < STEPS.length - 1 && (
              <span className="bg-border h-px w-6 sm:w-10" />
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default CheckoutSteps;
