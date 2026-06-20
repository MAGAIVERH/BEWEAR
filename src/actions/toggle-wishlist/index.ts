"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { wishlistItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { ToggleWishlistSchema, toggleWishlistSchema } from "./schema";

export const toggleWishlist = async (
  data: ToggleWishlistSchema,
): Promise<{ saved: boolean }> => {
  toggleWishlistSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const existing = await db.query.wishlistItemTable.findFirst({
    where: (wishlistItem, { and, eq }) =>
      and(
        eq(wishlistItem.userId, session.user.id),
        eq(wishlistItem.productVariantId, data.productVariantId),
      ),
  });

  if (existing) {
    await db
      .delete(wishlistItemTable)
      .where(eq(wishlistItemTable.id, existing.id));
    return { saved: false };
  }

  await db.insert(wishlistItemTable).values({
    userId: session.user.id,
    productVariantId: data.productVariantId,
  });
  return { saved: true };
};
