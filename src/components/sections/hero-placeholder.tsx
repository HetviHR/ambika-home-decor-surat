import Link from "next/link";

export function HeroPlaceholder() {
  return (
    <section className="rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-12">
      <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
        Curated Luxury Home Decor
      </p>
      <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
        Crafting spaces that feel timeless.
      </h1>
      <p className="mt-6 max-w-2xl text-base text-foreground/75 sm:text-lg">
        Hero visual placeholder for premium decor highlights, artisan stories,
        and seasonal showcases.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/collection"
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
        >
          Explore Collection
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          Book Consultation
        </Link>
      </div>
    </section>
  );
}
