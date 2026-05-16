import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ambica Home Decor blends timeless silhouettes, artisanal finishes, and modern sensibilities in Bardoli, Surat.",
};

const values = [
  {
    title: "Curated Quality",
    text: "Every textile, wallpaper, and furnishing is selected for durability, comfort, and editorial presence.",
  },
  {
    title: "Bespoke Guidance",
    text: "Our team helps you compose rooms with proportion, palette, and texture — from concept to installation.",
  },
  {
    title: "Local Heritage",
    text: "Rooted in Bardoli with two trusted destinations serving Surat and surrounding communities.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-8">
      <SectionHeader
        eyebrow="Our Story"
        title="Transforming homes into havens of quiet luxury"
        description="Ambica Home Decor and Ambica Rexine bring together premium furnishings, wall treatments, and soft goods — guided by a philosophy of calm, craft, and timeless living."
      />
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-luxury">
          <Image
            src="/images/hero-interior.png"
            alt="Ambica Home Decor interior styling"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-dark/30 to-transparent" />
        </div>
        <div className="space-y-6 font-sans text-base leading-relaxed text-dark/75">
          <p>
            For years, Ambica has been a trusted name for rexine, curtains, mattresses,
            wallpapers, and complete home styling across Bardoli. Our showrooms invite you
            to touch fabrics, compare finishes, and envision your spaces with expert support.
          </p>
          <p>
            Whether you are refreshing a single room or composing an entire residence, we
            pair editorial sensibility with practical craftsmanship — so every detail feels
            intentional and enduring.
          </p>
          <Link
            href="/collection"
            className="inline-flex rounded-full border border-dark bg-dark px-8 py-3.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-background transition-all duration-500 hover:border-accent hover:bg-accent"
          >
            Explore Collection
          </Link>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {values.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-border bg-cream/50 p-8 shadow-soft"
          >
            <h3 className="font-display text-xl text-dark">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-dark/70">{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
