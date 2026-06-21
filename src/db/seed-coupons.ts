import "dotenv/config";

import { db } from ".";
import { couponTable } from "./schema";

const COUPONS: Array<typeof couponTable.$inferInsert> = [
  {
    code: "WELCOME10",
    discountType: "percent",
    value: 10,
    minOrderInCents: 0,
    active: true,
  },
  {
    code: "SAVE20",
    discountType: "fixed",
    value: 2000, // $20.00
    minOrderInCents: 10000, // requires a $100.00 subtotal
    active: true,
  },
];

async function main() {
  console.log("🌱 Seeding coupons...");
  await db.delete(couponTable);
  await db.insert(couponTable).values(COUPONS);
  console.log(`✅ Coupons seeded: ${COUPONS.map((c) => c.code).join(", ")}`);
}

main().catch(console.error);
