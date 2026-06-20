import "dotenv/config";

import { getSizesForCategory } from "../helpers/sizes";
import { db } from ".";
import { productVariantStockTable } from "./schema";

async function main() {
  console.log("🌱 Seeding variant stock...");

  const variants = await db.query.productVariantTable.findMany({
    with: {
      product: {
        with: {
          category: true,
        },
      },
    },
  });

  await db.delete(productVariantStockTable);

  let inserted = 0;
  for (const variant of variants) {
    const sizes = getSizesForCategory(variant.product.category.slug);
    for (let i = 0; i < sizes.length; i++) {
      // Demo: leave one mid size out of stock when there are several sizes.
      const outOfStock = sizes.length > 2 && i === sizes.length - 2;
      const stock = outOfStock ? 0 : 8 + ((i * 5) % 13);
      await db.insert(productVariantStockTable).values({
        productVariantId: variant.id,
        size: sizes[i],
        stock,
      });
      inserted += 1;
    }
  }

  console.log(`✅ Stock seeded: ${inserted} rows for ${variants.length} variants.`);
}

main().catch(console.error);
