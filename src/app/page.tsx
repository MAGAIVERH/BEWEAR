import type { Metadata } from "next";
import dynamic from "next/dynamic";

import Brands from "@/components/common/brands";
import CampaignGrid from "@/components/common/campaign-grid";
import EditorialBanner from "@/components/common/editorial-banner";
import FeatureCards from "@/components/common/feature-cards";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Hero from "@/components/common/hero";
import ProductList from "@/components/common/product-list";
import Reveal from "@/components/common/reveal";
import SectionHeader from "@/components/common/section-header";
import SplitEditorial from "@/components/common/split-editorial";
import TrendingSection from "@/components/common/trending-section";
import {
  getCategories,
  getNewestProductsWithVariants,
  getProductsWithVariants,
} from "@/db/queries";

// Below-the-fold, motion-heavy client section: code-split so its JS (and the
// video poster logic) is not part of the initial home bundle.
const ImpactSection = dynamic(
  () => import("@/components/common/impact-section"),
);

// Refresh the statically rendered home periodically (ISR) so new catalog data
// appears without a rebuild.
export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const Home = async () => {
  const [products, newlyCreateProducts, categories] = await Promise.all([
    getProductsWithVariants(),
    getNewestProductsWithVariants(),
    getCategories(),
  ]);

  return (
    <>
      <Header />

      <main id="main-content">
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
      </main>

      <Footer />
    </>
  );
};

export default Home;
