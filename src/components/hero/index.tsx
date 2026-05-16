"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

export function Hero() {
  return (
    <section className="hero-fullscreen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex min-h-screen w-screen flex-col justify-end overflow-hidden bg-background">
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero-interior.png"
          alt="Luxury living room interior with curated furnishings"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease }}
        className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/55 to-background/15"
      />
      <motion.div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-cream/25" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease }}
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-beige/25 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.35, ease }}
        className="pointer-events-none absolute bottom-20 left-1/3 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
      />

      <motion.div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-12 lg:pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl lg:max-w-3xl"
        >
          <motion.p
            variants={item}
            className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.35em] text-accent sm:text-xs"
          >
            Transforming Home Into Heaven
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 font-display text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-dark sm:mt-6 sm:text-5xl md:text-6xl lg:text-[3.65rem]"
          >
            Curated spaces crafted for timeless living
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl font-sans text-base leading-relaxed text-dark/75 sm:mt-7 sm:text-lg"
          >
            Premium home decor, wallpapers, furnishings and bespoke interiors.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
          >
            <Link
              href="/collection"
              className="group inline-flex items-center justify-center border border-dark bg-dark px-8 py-3.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-background transition-all duration-500 ease-premium hover:border-accent hover:bg-accent"
            >
              Explore Collection
            </Link>
            <Link
              href="/gallery"
              className="group inline-flex items-center justify-center border border-dark/25 bg-cream/50 px-8 py-3.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-dark backdrop-blur-sm transition-all duration-500 ease-premium hover:border-accent hover:bg-beige/40"
            >
              View Gallery
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease }}
        className="relative z-10 hidden border-t border-border bg-cream/30 backdrop-blur-sm sm:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          className="mx-auto flex max-w-[1400px] flex-col items-center gap-2 px-8 py-5"
        >
          <span className="h-8 w-px bg-accent/50" />
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-accent">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
