import Link from "next/link";
import { locations } from "@/lib/site";
import { LocationCard } from "@/components/contact/location-card";
import { SectionHeader } from "@/components/ui/section-header";

export function ContactSection() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[url('/images/bg-editorial-1.png')] bg-contain bg-center bg-no-repeat"
        aria-hidden
      />
      <SectionHeader
        eyebrow="Visit & Connect"
        title="Two destinations for elevated living"
        description="Visit our Bardoli showrooms for rexine, furnishings, and bespoke interior guidance — or message us for a private consultation."
        align="center"
      />
      <div className="relative mt-14 grid gap-6 lg:grid-cols-2">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} compact />
        ))}
      </div>
      <div className="relative mt-10 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-dark bg-dark px-8 py-3.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-background transition-all duration-500 hover:border-accent hover:bg-accent"
        >
          Full Contact & Directions
        </Link>
      </div>
    </section>
  );
}
