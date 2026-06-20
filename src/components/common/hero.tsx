"use client";

import { useReducedMotion } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Slide = {
  type: "video" | "image";
  src: string;
  poster?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
};

const SLIDES: Slide[] = [
  {
    type: "video",
    src: "/hero.mp4",
    poster: "/hero-poster.jpg",
    eyebrow: "New collection",
    title: "Built to move.",
    subtitle: "Premium streetwear, sneakers and accessories.",
    ctaLabel: "Shop now",
    ctaHref: "#best-sellers",
  },
  {
    type: "image",
    src: "/home/hero-2.jpg",
    eyebrow: "Training",
    title: "No off-season.",
    ctaLabel: "Shop training",
    ctaHref: "/category/t-shirts",
  },
  {
    type: "image",
    src: "/home/hero-3.jpg",
    eyebrow: "Sneakers",
    title: "Own the street.",
    ctaLabel: "Shop sneakers",
    ctaHref: "/category/sneakers",
  },
];

const SLIDE_DURATION = 6000;

const CONTROL_CLASS =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white backdrop-blur-sm transition hover:bg-white hover:text-black";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const count = SLIDES.length;

  const goNext = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const goPrev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count],
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setPlaying(false);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!playing || prefersReducedMotion) return;
    const timer = setTimeout(goNext, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [playing, prefersReducedMotion, index, goNext]);

  const active = SLIDES[index];

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[4/5] min-h-[460px] w-full sm:aspect-[3/2] md:aspect-video">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              i === index ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            {slide.type === "video" && !prefersReducedMotion ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                poster={slide.poster}
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={slide.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={slide.type === "video" ? (slide.poster as string) : slide.src}
                alt={slide.title}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          </div>
        ))}

        {/* Active slide content */}
        <div className="container-bw absolute inset-0 flex flex-col justify-end pb-16 md:pb-24">
          <p className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase">
            {active.eyebrow}
          </p>
          <h1 className="text-display mt-3 max-w-3xl text-white">
            {active.title}
          </h1>
          {active.subtitle && (
            <p className="mt-4 max-w-md text-base text-white/80 md:text-lg">
              {active.subtitle}
            </p>
          )}
          <div className="mt-8">
            <Button asChild size="lg" className="rounded-full">
              <Link href={active.ctaHref}>{active.ctaLabel}</Link>
            </Button>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/50",
              )}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="absolute right-6 bottom-6 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.3"
                strokeWidth="2"
              />
              <circle
                key={index}
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                pathLength={100}
                strokeDasharray={100}
                style={{
                  animation: `hero-progress ${SLIDE_DURATION}ms linear forwards`,
                  animationPlayState:
                    playing && !prefersReducedMotion ? "running" : "paused",
                }}
              />
            </svg>
            {playing ? (
              <PauseIcon className="relative h-4 w-4" />
            ) : (
              <PlayIcon className="relative h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className={CONTROL_CLASS}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className={CONTROL_CLASS}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
