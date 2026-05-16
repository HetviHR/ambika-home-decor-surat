import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://ambikahomedecor.in"),
  title: {
    default: "Ambika Home Decor Surat",
    template: "%s | Ambika Home Decor Surat",
  },
  description:
    "Luxury home decor showcase with curated collections, gallery inspiration, and bespoke interior styling guidance.",
  keywords: [
    "luxury home decor",
    "interior styling",
    "home decor surat",
    "premium furnishings",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Ambika Home Decor Surat",
    description:
      "Discover premium decor collections, gallery inspiration, and handcrafted detailing for elevated interiors.",
    url: "/",
    siteName: "Ambika Home Decor Surat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ambika Home Decor Surat",
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
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
