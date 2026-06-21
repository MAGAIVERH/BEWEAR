import { ChevronLeftIcon } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { formatAddress } from "@/app/cart/helpers/address";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { BLUR_DATA_URL } from "@/helpers/image";
import { formatCentsToUSD } from "@/helpers/money";
import { auth } from "@/lib/auth";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

const OrderDetailPage = async ({ params }: OrderDetailPageProps) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }

  const order = await db.query.orderTable.findFirst({
    where: (orderRow, { and, eq }) =>
      and(eq(orderRow.id, id), eq(orderRow.userId, session.user.id)),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!order) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main id="main-content" className="container-bw flex-1 py-10">
        <Link
          href="/my-orders"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to orders
        </Link>

        <div className="mt-6 max-w-3xl space-y-8">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {order.status === "paid" && <Badge>Paid</Badge>}
              {order.status === "pending" && (
                <Badge variant="outline">Payment pending</Badge>
              )}
              {order.status === "canceled" && (
                <Badge variant="destructive">Canceled</Badge>
              )}
            </div>
            <h1 className="section-title">Order details</h1>
            <p className="text-muted-foreground text-sm">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US")} · #
              {order.id.slice(0, 8)}
            </p>
          </div>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-muted relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={item.productVariant.imageUrl}
                      alt={item.productVariant.product.name}
                      fill
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      sizes="78px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">
                      {item.productVariant.product.name}
                    </p>
                    <p className="text-muted-foreground text-xs font-medium">
                      {item.productVariant.name}
                      {item.size ? ` · Size ${item.size}` : ""} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-bold">
                  {formatCentsToUSD(item.priceInCents * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold">Shipping address</h2>
            <div className="bg-muted/40 rounded-xl border p-4">
              <p className="text-sm">{formatAddress(order)}</p>
            </div>
          </div>

          <div>
            <Separator className="mb-4" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">Subtotal</p>
                <p className="font-medium">
                  {formatCentsToUSD(order.totalPriceInCents)}
                </p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">Shipping</p>
                <p className="font-medium">Free</p>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <p>Total</p>
                <p>{formatCentsToUSD(order.totalPriceInCents)}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderDetailPage;
