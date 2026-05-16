import type { Metadata } from "next";
import { EmailInquiry } from "@/components/contact/email-inquiry";
import { LocationCard } from "@/components/contact/location-card";
import { MapsPlaceholder } from "@/components/contact/maps-placeholder";
import { SectionHeader } from "@/components/ui/section-header";
import { locations } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit Ambica Rexine and Ambica Home Decor in Bardoli. Call, WhatsApp, or email for design consultations.",
};

export default function ContactPage() {
  return (
    <div className="space-y-16 pb-8">
      <SectionHeader
        eyebrow="Get in Touch"
        title="We welcome you to our Bardoli showrooms"
        description="Two destinations for rexine, furnishings, and bespoke interiors — reach us by phone, WhatsApp, or email for personalized guidance."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
      <MapsPlaceholder />
      <EmailInquiry />
    </div>
  );
}
