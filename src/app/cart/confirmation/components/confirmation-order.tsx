"use client";

import { useState } from "react";
import { toast } from "sonner";

import type { ValidatedCoupon } from "@/actions/validate-coupon/find-valid-coupon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useValidateCoupon } from "@/hooks/mutations/use-validate-coupon";

import CartSummary from "../../components/cart-summary";
import FinishOrderButton from "./finish-order-button";

type ConfirmationOrderProps = {
  subtotalInCents: number;
  products: React.ComponentProps<typeof CartSummary>["products"];
};

const ConfirmationOrder = ({
  subtotalInCents,
  products,
}: ConfirmationOrderProps) => {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<ValidatedCoupon | null>(null);
  const validateCouponMutation = useValidateCoupon();

  const discountInCents = applied?.discountInCents ?? 0;
  const totalInCents = subtotalInCents - discountInCents;

  const handleApply = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!code.trim()) return;
    try {
      const coupon = await validateCouponMutation.mutateAsync({
        code,
        subtotalInCents,
      });
      setApplied(coupon);
      toast.success(`Coupon ${coupon.code} applied.`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "This coupon is invalid.";
      toast.error(message);
    }
  };

  const handleRemove = () => {
    setApplied(null);
    setCode("");
  };

  return (
    <div className="space-y-4">
      <CartSummary
        subtotalInCents={subtotalInCents}
        totalInCents={totalInCents}
        discountInCents={discountInCents}
        couponCode={applied?.code}
        products={products}
      />

      <form onSubmit={handleApply} className="flex items-center gap-2">
        <Input
          placeholder="Coupon code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          disabled={Boolean(applied) || validateCouponMutation.isPending}
          aria-label="Coupon code"
        />
        {applied ? (
          <Button type="button" variant="outline" onClick={handleRemove}>
            Remove
          </Button>
        ) : (
          <Button
            type="submit"
            variant="outline"
            disabled={validateCouponMutation.isPending || !code.trim()}
          >
            {validateCouponMutation.isPending ? "Applying…" : "Apply"}
          </Button>
        )}
      </form>

      <FinishOrderButton couponCode={applied?.code ?? null} />
    </div>
  );
};

export default ConfirmationOrder;
