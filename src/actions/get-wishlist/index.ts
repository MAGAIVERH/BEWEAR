"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { wishlistItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const getWishlist = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return [];
  }

  return db.query.wishlistItemTable.findMany({
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
};
