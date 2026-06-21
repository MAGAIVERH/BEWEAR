import type { Metadata } from "next";
import Image from "next/image";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { BLUR_DATA_URL } from "@/helpers/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "BEWEAR — premium streetwear, sneakers and accessories engineered for everyday motion.",
  alternates: { canonical: "/about" },
};

const SECTIONS = [
  {
    id: "about",
    title: "Our story",
    body: "BEWEAR was built on a simple idea: premium streetwear should move with you — from the gym to the street. We design pieces that pair performance with everyday style.",
  },
  {
    id: "careers",
    title: "Careers",
    body: "We’re a small, ambitious team obsessed with craft. Interested in building the future of retail with us? Email careers@bewear.com.",
  },
  {
    id: "sustainability",
    title: "Sustainability",
    body: "We’re committed to responsible materials and long-lasting products — built to last, not to be replaced.",
  },
];

const AboutPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main id="main-content" className="container-bw flex-1 py-12">
        <div className="lg:grid lg:grid-cols-[1fr_minmax(0,440px)] lg:items-start lg:gap-16">
          {/* Content */}
          <div className="max-w-3xl">
            <div className="space-y-2">
              <p className="text-eyebrow-brand">BEWEAR</p>
              <h1 className="section-title">
                Built to <span className="text-brand">move</span>
              </h1>
              <p className="section-subtitle">
                Premium streetwear, sneakers and accessories — engineered for
                everyday motion.
              </p>
            </div>

            <div className="mt-10 space-y-12">
              {SECTIONS.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 space-y-2"
                >
                  <h2 className="text-xl font-bold tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-7">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </div>

          {/* Editorial image (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-28 overflow-hidden rounded-3xl">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/home/feature-2.jpg"
                  alt="BEWEAR streetwear styling"
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  sizes="440px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
