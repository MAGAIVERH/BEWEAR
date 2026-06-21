"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BLUR_DATA_URL } from "@/helpers/image";

const ImpactSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[4/5] min-h-[460px] w-full sm:aspect-[3/2] md:aspect-video">
        {prefersReducedMotion ? (
          <Image
            src="/home/impact.jpg"
            alt="No off-season"
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            poster="/home/impact.jpg"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/home/impact.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        <div className="container-bw absolute inset-0 flex flex-col justify-end pb-16 md:pb-24">
          <p className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase">
            Performance
          </p>
          <h2 className="text-display mt-3 max-w-2xl text-white">
            No limits.
          </h2>
          <p className="mt-4 max-w-md text-white/80 md:text-lg">
            Gear engineered to push every session further.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="hover:text-foreground rounded-full border-white/40 bg-transparent text-white hover:bg-white"
            >
              <Link href="#new-arrivals">Explore</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
