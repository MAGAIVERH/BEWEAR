import Image from "next/image";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BLUR_DATA_URL } from "@/helpers/image";
import { formatCentsToUSD } from "@/helpers/money";

interface CartSummaryProps {
  subtotalInCents: number;
  totalInCents: number;
  discountInCents?: number;
  couponCode?: string | null;
  products: Array<{
    id: string;
    name: string;
    variantName: string;
    size: string | null;
    quantity: number;
    priceInCents: number;
    imageUrl: string;
  }>;
}

const CartSummary = ({
  subtotalInCents,
  totalInCents,
  discountInCents = 0,
  couponCode,
  products,
}: CartSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <p className="text-sm">Subtotal</p>
          <p className="text-muted-foreground text-sm font-medium">
            {formatCentsToUSD(subtotalInCents)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Shipping</p>
          <p className="text-muted-foreground text-sm font-medium">FREE</p>
        </div>
        {discountInCents > 0 && (
          <div className="flex justify-between">
            <p className="text-sm">
              Discount{couponCode ? ` (${couponCode})` : ""}
            </p>
            <p className="text-brand text-sm font-medium">
              −{formatCentsToUSD(discountInCents)}
            </p>
          </div>
        )}
        <div className="flex justify-between">
          <p className="text-sm font-semibold">Total</p>
          <p className="text-sm font-semibold">
            {formatCentsToUSD(totalInCents)}
          </p>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        {products.map((product) => (
          <div className="flex items-center justify-between" key={product.id}>
            <div className="flex items-center gap-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={78}
                height={78}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="rounded-lg"
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">{product.name}</p>
                <p className="text-muted-foreground text-xs font-medium">
                  {product.variantName}
                  {product.size ? ` · Size ${product.size}` : ""}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-center gap-2">
              <p className="text-sm font-bold">
                {formatCentsToUSD(product.priceInCents)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CartSummary;
