import { desc } from "drizzle-orm";
import Image from "next/image";

import Brands from "@/components/common/brands";
import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Hero from "@/components/common/hero";
import ProductList from "@/components/common/product-list";
import Reveal from "@/components/common/reveal";
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
      <Hero />

      <div className="space-y-6 pt-6">
        <Reveal>
          <Brands title="Featured brands" />
        </Reveal>

        <section id="best-sellers" className="scroll-mt-24">
          <Reveal>
            <ProductList products={products} title="Best sellers" />
          </Reveal>
        </section>

        <Reveal className="px-5">
          <CategorySelector categories={categories} />
        </Reveal>

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

        <section id="new-arrivals" className="scroll-mt-24">
          <Reveal>
            <ProductList products={newlyCreateProducts} title="New arrivals" />
          </Reveal>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Home;
