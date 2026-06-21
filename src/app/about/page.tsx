import type { Metadata } from "next";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export const metadata: Metadata = {
  title: "About | BEWEAR",
  description:
    "BEWEAR — premium streetwear, sneakers and accessories engineered for everyday motion.",
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

        <div className="mt-10 max-w-3xl space-y-12">
          {SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 space-y-2"
            >
              <h2 className="text-xl font-bold tracking-tight">
                {section.title}
              </h2>
              <p className="text-muted-foreground leading-7">{section.body}</p>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
