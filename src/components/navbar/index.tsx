"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Collection" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "rgba(239, 232, 221, 0.88)"
            : "rgba(239, 232, 221, 0.45)",
          borderBottomColor: scrolled
            ? "rgba(216, 200, 184, 0.65)"
            : "rgba(216, 200, 184, 0.2)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="border-b"
      >
        <nav
          className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-12"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="group relative flex shrink-0 items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <span className="relative block h-11 w-11 overflow-hidden rounded-sm bg-[#1F1F1F] shadow-[0_8px_24px_rgba(31,31,31,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] sm:h-12 sm:w-12">
              <Image
                src="/images/ambika-logo.png"
                alt="Ambica Home Decor"
                fill
                className="object-contain p-1.5"
                sizes="48px"
                priority
              />
            </span>
            <span className="hidden font-sans text-[0.65rem] font-medium uppercase tracking-[0.28em] text-[#1F1F1F] sm:block">
              Ambica Home Decor
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-[#D8C8B8]/80 bg-[#F8F5F0]/60 lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block h-px w-4 bg-[#1F1F1F]"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-4 bg-[#1F1F1F]"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="block h-px w-4 bg-[#1F1F1F]"
            />
          </button>
        </nav>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#1F1F1F]/20 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-4 top-[5.25rem] rounded-2xl border border-border bg-cream/95 p-6 shadow-luxury backdrop-blur-xl sm:inset-x-6"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 font-sans text-sm uppercase tracking-[0.2em] text-[#1F1F1F] transition-colors hover:text-[#5B6D6D]"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative px-4 py-2 font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[#1F1F1F]"
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-[#5B6D6D]">
        {label}
      </span>
      <span className="absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 bg-[#5B6D6D] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
    </Link>
  );
}
