import Image from "next/image";
import Link from "next/link";
import { footerLogos, locations } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Collection" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border bg-cream/50">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[url('/images/bg-editorial-1.png')] bg-cover bg-center"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-10 border-b border-border pb-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative block h-12 w-12 overflow-hidden rounded-sm bg-dark">
                <Image
                  src="/images/ambika-logo.png"
                  alt="Ambica Home Decor"
                  fill
                  className="object-contain p-1.5"
                  sizes="48px"
                />
              </span>
              <span className="font-display text-lg text-dark">Ambica Home Decor</span>
            </Link>
            <p className="mt-4 font-sans text-sm italic leading-relaxed text-dark/70">
              We Transforming Home Into Heaven
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-dark/65">
              Premium home decor, rexine, wallpapers, furnishings and bespoke interiors
              across Bardoli & Surat.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.28em] text-accent">
              Explore
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-dark/75 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {locations.map((location) => (
            <div key={location.id} className="rounded-2xl border border-border/80 bg-background/60 p-6">
              <h3 className="font-display text-xl text-dark">{location.name}</h3>
              <address className="mt-3 space-y-0.5 not-italic font-sans text-sm leading-relaxed text-dark/70">
                {location.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={location.phoneHref}
                  className="font-sans text-sm text-dark transition-colors hover:text-accent"
                >
                  {location.phone}
                </a>
                <span className="text-border">·</span>
                <a
                  href={location.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[#25D366] hover:underline"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-border pt-10">
          <p className="text-center font-sans text-[0.65rem] font-medium uppercase tracking-[0.28em] text-accent">
            Our Collaborators
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-10">
            {footerLogos.map((src, index) => (
              <li key={src}>
                <div className="relative h-12 w-24 opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 sm:h-14 sm:w-28">
                  <Image
                    src={src}
                    alt={`Collaborator logo ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="112px"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-center sm:flex-row sm:text-left">
          <p className="font-sans text-xs text-dark/60">
            © {new Date().getFullYear()} Ambica Home Decor & Ambica Rexine · Bardoli, Surat
          </p>
          <p className="font-sans text-xs italic text-dark/50">
            One-stop destination for exquisite home decor solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
