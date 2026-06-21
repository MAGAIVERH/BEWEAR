"use client";

import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

import { formatCentsToUSD } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

const Cart = () => {
  const { data: cart } = useCart();
  const items = cart?.items ?? [];
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const total = cart?.totalPriceInCents ?? 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Open cart"
          className="relative rounded-full"
        >
          <ShoppingBagIcon />
          {itemCount > 0 && (
            <span className="bg-foreground text-background absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>Cart{itemCount > 0 ? ` (${itemCount})` : ""}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 text-center">
            <div className="bg-muted flex h-14 w-14 items-center justify-center rounded-full">
              <ShoppingBagIcon className="text-muted-foreground h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold">Your cart is empty</p>
              <p className="text-muted-foreground text-sm">
                Add something you love to get started.
              </p>
            </div>
            <SheetClose asChild>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/">Continue shopping</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-6 px-5 py-6">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productVariantId={item.productVariant.id}
                    productName={item.productVariant.product.name}
                    productVariantName={item.productVariant.name}
                    productVariantImageUrl={item.productVariant.imageUrl}
                    productVariantPriceInCents={item.productVariant.priceInCents}
                    size={item.size}
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </ScrollArea>

            <div className="flex flex-col gap-3 border-t px-5 py-5">
              <div className="flex items-center justify-between text-sm">
                <p className="text-muted-foreground">Subtotal</p>
                <p className="font-medium">{formatCentsToUSD(total)}</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="text-muted-foreground">Shipping</p>
                <p className="font-medium">Free</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-base font-semibold">
                <p>Total</p>
                <p>{formatCentsToUSD(total)}</p>
              </div>
              <SheetClose asChild>
                <Button asChild size="lg" className="mt-2 rounded-full">
                  <Link href="/cart/identification">Checkout</Link>
                </Button>
              </SheetClose>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
