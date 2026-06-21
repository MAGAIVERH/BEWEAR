import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import CheckoutSteps from "@/components/common/checkout-steps";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import Addresses from "./components/addresses";

const IdentificationPage = async () => {
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
  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  });
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="container-bw flex-1 py-8 md:py-12">
        <CheckoutSteps current="address" />

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_380px]">
          <Addresses
            shippingAddresses={shippingAddresses}
            defaultShippingAddressId={cart.shippingAddress?.id || null}
          />
          <div className="lg:sticky lg:top-24">
            <CartSummary
              subtotalInCents={cartTotalInCents}
              totalInCents={cartTotalInCents}
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
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default IdentificationPage;
