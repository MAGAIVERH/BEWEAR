import { desc } from "drizzle-orm";
import Image from "next/image";

import Brands from "@/components/common/brands";
import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const newlyCreateProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner01.png"
            alt="Live your life with style"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <Brands title="Featured brands" />

        <ProductList products={products} title="Best sellers" />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image
            src="/banner02.png"
            alt="Live your life with style"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductList products={newlyCreateProducts} title="New arrivals" />
        <Footer />
      </div>
    </>
  );
};

export default Home;
