import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with Ambika Home Decor for personalized interior consultations.",
};

export default function ContactPage() {
  return (
    <section className="space-y-8">
      <SectionHeader
        title="Contact"
        description="Contact structure for consultation requests, showroom details, and design inquiries."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-display text-2xl">Showroom</h3>
          <p className="mt-2 text-foreground/75">Surat, Gujarat · By appointment</p>
        </article>
        <article className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-display text-2xl">Inquiries</h3>
          <p className="mt-2 text-foreground/75">hello@ambikahomedecor.in</p>
        </article>
      </div>
    </section>
  );
}
