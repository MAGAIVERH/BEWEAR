import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import Orders from "./components/order";

const MyOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/authentication");
  }
  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session?.user.id),
    orderBy: (order, { desc }) => [desc(order.createdAt)],
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container-bw flex-1 py-10">
        <div className="space-y-2">
          <p className="text-eyebrow-brand">Account</p>
          <h1 className="section-title">My orders</h1>
          <p className="text-muted-foreground text-sm">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>

        <div className="mt-8 max-w-3xl">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
              <p className="text-lg font-semibold">No orders yet</p>
              <p className="text-muted-foreground text-sm">
                When you place an order, it&apos;ll show up here.
              </p>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/">Start shopping</Link>
              </Button>
            </div>
          ) : (
            <Orders
              orders={orders.map((order) => ({
                id: order.id,
                totalPriceInCents: order.totalPriceInCents,
                status: order.status,
                createdAt: order.createdAt,
                items: order.items.map((item) => ({
                  id: item.id,
                  imageUrl: item.productVariant.imageUrl,
                  productName: item.productVariant.product.name,
                  productVariantName: item.productVariant.name,
                  size: item.size,
                  priceInCents: item.productVariant.priceInCents,
                  quantity: item.quantity,
                })),
              }))}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyOrdersPage;
