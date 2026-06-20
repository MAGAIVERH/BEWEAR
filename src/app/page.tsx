import { desc } from "drizzle-orm";

import Brands from "@/components/common/brands";
import CampaignGrid from "@/components/common/campaign-grid";
import EditorialBanner from "@/components/common/editorial-banner";
import FeatureCards from "@/components/common/feature-cards";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Hero from "@/components/common/hero";
import ImpactSection from "@/components/common/impact-section";
import ProductList from "@/components/common/product-list";
import Reveal from "@/components/common/reveal";
import SectionHeader from "@/components/common/section-header";
import SplitEditorial from "@/components/common/split-editorial";
import TrendingSection from "@/components/common/trending-section";
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

      <div className="space-y-16 py-16 md:space-y-24 md:py-20">
        <Reveal>
          <Brands title="Featured brands" />
        </Reveal>

        <Reveal>
          <FeatureCards categories={categories} />
        </Reveal>

        <section id="best-sellers" className="scroll-mt-24">
          <Reveal>
            <ProductList products={products} title="Best sellers" floating />
          </Reveal>
        </section>

        <Reveal className="space-y-8">
          <SectionHeader
            align="center"
            eyebrow="Featured"
            title={
              <>
                Built for the <span className="text-brand">bold</span>
              </>
            }
            className="container-bw"
          />
          <EditorialBanner />
        </Reveal>

        <Reveal className="space-y-8">
          <SectionHeader
            align="center"
            eyebrow="The drop"
            title={
              <>
                The latest <span className="text-brand">drops</span>
              </>
            }
            className="container-bw"
          />
          <CampaignGrid />
        </Reveal>

        <section id="new-arrivals" className="scroll-mt-24">
          <Reveal>
            <ProductList
              products={newlyCreateProducts}
              title="New arrivals"
              floating
            />
          </Reveal>
        </section>

        <Reveal>
          <ImpactSection />
        </Reveal>

        <Reveal className="space-y-8">
          <SectionHeader
            align="center"
            eyebrow="Collections"
            title={
              <>
                Engineered for every <span className="text-brand">move</span>
              </>
            }
            className="container-bw"
          />
          <SplitEditorial />
        </Reveal>

        <Reveal>
          <TrendingSection products={products} />
        </Reveal>
      </div>

      <Footer />
    </>
  );
};

export default Home;
