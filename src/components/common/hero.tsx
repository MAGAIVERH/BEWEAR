"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

// Curated free stock (Mixkit/Unsplash licenses, commercial use) in /public.
// Swap for real brand footage later — keep the same file names.
const HERO_VIDEO = "/hero.mp4";
const HERO_POSTER = "/hero-poster.jpg";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const item: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Mobile crops the sides (keeps full height → no cut heads/feet);
          desktop matches the 16:9 video exactly, so nothing is cropped. */}
      <div className="relative aspect-[4/5] min-h-[460px] w-full sm:aspect-[3/2] md:aspect-video">
        {prefersReducedMotion ? (
          <Image
            src={HERO_POSTER}
            alt="Model wearing the new BEWEAR collection"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}
        {/* Contrast overlay so text stays readable on any photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="container-bw absolute inset-0 flex flex-col justify-end pb-12 md:pb-20"
        >
          <motion.p
            variants={item}
            className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase"
          >
            New collection
          </motion.p>

          <motion.h1
            variants={item}
            className="text-display mt-3 max-w-3xl text-white"
          >
            Built to move.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 max-w-md text-base text-white/80 md:text-lg"
          >
            Premium streetwear, sneakers and accessories — engineered for
            everyday motion.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg" className="rounded-full">
              <Link href="#best-sellers">Shop now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="hover:text-foreground rounded-full border-white/40 bg-transparent text-white hover:bg-white"
            >
              <Link href="#new-arrivals">Explore</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
