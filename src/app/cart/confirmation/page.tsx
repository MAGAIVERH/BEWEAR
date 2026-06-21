import { headers } from "next/headers";
import { redirect } from "next/navigation";

import CheckoutSteps from "@/components/common/checkout-steps";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import { formatAddress } from "../helpers/address";
import ConfirmationOrder from "./components/confirmation-order";

const ConfirmationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/");
  }
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
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
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container-bw flex-1 py-8 md:py-12">
        <CheckoutSteps current="payment" />

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_380px]">
          <Card>
            <CardHeader>
              <CardTitle>Shipping address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/40 rounded-xl border p-4">
                <p className="text-sm">{formatAddress(cart.shippingAddress)}</p>
              </div>
            </CardContent>
          </Card>

          <div className="lg:sticky lg:top-24">
            <ConfirmationOrder
              subtotalInCents={cartTotalInCents}
              products={cart.items.map((item) => ({
                id: item.productVariant.id,
                name: item.productVariant.product.name,
                variantName: item.productVariant.name,
                size: item.size,
                quantity: item.quantity,
                priceInCents: item.productVariant.priceInCents,
                imageUrl: item.productVariant.imageUrl,
              }))}
            />
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ConfirmationPage;
