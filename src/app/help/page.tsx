import type { Metadata } from "next";
import Image from "next/image";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BLUR_DATA_URL } from "@/helpers/image";

export const metadata: Metadata = {
  title: "Help center",
  description:
    "Orders, shipping, returns and answers to common questions about BEWEAR.",
  alternates: { canonical: "/help" },
};

const FAQ = [
  {
    q: "How do I track my order?",
    a: "Once your order ships, you can follow its status in the “My orders” section of your account.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards securely through Stripe.",
  },
  {
    q: "How do I choose the right size?",
    a: "Each product page includes a “Size & Fit” section. Most items fit true to size.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Reach out within 1 hour of placing your order and we’ll do our best to help.",
  },
];

const SECTIONS = [
  {
    id: "contact",
    title: "Contact us",
    body: "Questions? Email us at support@bewear.com and we’ll get back to you within 24 hours, Monday to Friday.",
  },
  {
    id: "shipping",
    title: "Shipping",
    body: "Free standard shipping on orders over $100. Orders ship within 1–2 business days and arrive in 3–7 business days across the US.",
  },
  {
    id: "returns",
    title: "Returns",
    body: "Free 30-day returns. Items must be unworn with original tags. Start a return from the “My orders” section.",
  },
];

const HelpPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main id="main-content" className="container-bw flex-1 py-12">
        <div className="lg:grid lg:grid-cols-[1fr_minmax(0,440px)] lg:items-start lg:gap-16">
          {/* Content */}
          <div className="max-w-3xl">
            <div className="space-y-2">
              <p className="text-eyebrow-brand">Support</p>
              <h1 className="section-title">Help center</h1>
              <p className="section-subtitle">
                Everything you need to know about orders, shipping and returns.
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

              <section id="faq" className="scroll-mt-24 space-y-4">
                <h2 className="text-xl font-bold tracking-tight">
                  Frequently asked questions
                </h2>
                <Accordion type="single" collapsible className="border-t">
                  {FAQ.map((item) => (
                    <AccordionItem key={item.q} value={item.q}>
                      <AccordionTrigger>{item.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-7">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>
          </div>

          {/* Editorial image (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-28 overflow-hidden rounded-3xl">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/home/feature-1.jpg"
                  alt="BEWEAR sneakers"
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

export default HelpPage;
