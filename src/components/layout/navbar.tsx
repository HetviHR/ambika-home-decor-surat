import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Collection" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/admin/dashboard", label: "Admin" },
];

export function Navbar() {
  return (
    <header className="border-b border-border/80 bg-background/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl tracking-wide text-foreground">
          Ambika Home Decor
        </Link>
        <ul className="flex flex-wrap gap-2 text-sm text-foreground/80 sm:justify-end">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex rounded-full px-3 py-1.5 transition hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
