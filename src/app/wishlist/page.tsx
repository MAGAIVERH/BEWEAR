import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductItem from "@/components/common/product-item";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { wishlistItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";

const WishlistPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/authentication");
  }

  const items = await db.query.wishlistItemTable.findMany({
    where: eq(wishlistItemTable.userId, session.user.id),
    orderBy: (wishlistItem, { desc }) => [desc(wishlistItem.createdAt)],
    with: {
      productVariant: {
        with: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main id="main-content" className="container-bw flex-1 py-10">
        <div className="space-y-2">
          <p className="text-eyebrow-brand">Account</p>
          <h1 className="section-title">Wishlist</h1>
          <p className="text-muted-foreground text-sm">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
            <p className="text-lg font-semibold">Your wishlist is empty</p>
            <p className="text-muted-foreground text-sm">
              Tap the heart on a product to save it for later.
            </p>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/">Browse products</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <ProductItem
                key={item.id}
                product={{
                  ...item.productVariant.product,
                  variants: [item.productVariant],
                }}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;
