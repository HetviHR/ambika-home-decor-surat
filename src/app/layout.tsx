import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/navbar";
import { DecorativeBackground } from "@/components/ui/decorative-background";

export const metadata: Metadata = {
  metadataBase: new URL("https://ambikahomedecor.in"),
  title: {
    default: "Ambica Home Decor Surat",
    template: "%s | Ambica Home Decor Surat",
  },
  description:
    "Luxury home decor showcase with curated collections, gallery inspiration, and bespoke interior styling in Bardoli, Surat.",
  keywords: [
    "luxury home decor",
    "interior styling",
    "home decor surat",
    "ambica rexine bardoli",
    "premium furnishings",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Ambica Home Decor Surat",
    description:
      "Discover premium decor collections, gallery inspiration, and handcrafted detailing for elevated interiors.",
    url: "/",
    siteName: "Ambica Home Decor Surat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ambica Home Decor Surat",
    description:
      "Luxury home decor showcase for elegant living spaces and timeless interiors.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <DecorativeBackground />
        <Navbar />
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-12 sm:px-6 sm:py-14 lg:px-8 has-[.hero-fullscreen]:max-w-none has-[.hero-fullscreen]:p-0 has-[.hero-fullscreen]:py-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
