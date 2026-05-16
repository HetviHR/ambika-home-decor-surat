"use client";

import type { Product } from "@/types/product";
import { buildWhatsAppUrl } from "@/lib/catalog";
import { inquiryEmail } from "@/lib/site";
import { FormEvent, useState } from "react";

export function ProductInquiryForm({ product }: { product: Product }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const phone = String(data.get("phone") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Inquiry: ${product.name}`);
    const body = encodeURIComponent(
      `Product: ${product.name}\nCategory: ${product.category}\nMaterial: ${product.material}\n\nName: ${name}\nPhone: ${phone}\n\n${message}`,
    );
    window.location.href = `mailto:${inquiryEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const whatsapp = buildWhatsAppUrl(
    product,
    `Hello, I am interested in ${product.name} (${product.category}). Please share availability and pricing.`,
  );

  return (
    <section id="inquiry" className="scroll-mt-28 rounded-2xl border border-border bg-cream/50 p-6 sm:p-8">
      <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.28em] text-accent">
        Private Inquiry
      </p>
      <h2 className="mt-2 font-display text-2xl text-dark">Request details</h2>
      <p className="mt-2 font-sans text-sm text-dark/70">
        Pricing is shared in-showroom. Send an inquiry and our team will respond promptly.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-6 py-3 font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-dark transition-colors hover:bg-[#25D366]/20"
        >
          WhatsApp inquiry
        </a>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-1">
          <span className="mb-2 block font-sans text-[0.65rem] uppercase tracking-[0.2em] text-dark/60">
            Name
          </span>
          <input
            required
            name="name"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </label>
        <label className="sm:col-span-1">
          <span className="mb-2 block font-sans text-[0.65rem] uppercase tracking-[0.2em] text-dark/60">
            Phone
          </span>
          <input
            required
            name="phone"
            type="tel"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-2 block font-sans text-[0.65rem] uppercase tracking-[0.2em] text-dark/60">
            Message
          </span>
          <textarea
            required
            name="message"
            rows={4}
            defaultValue={`I would like to know more about ${product.name}.`}
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </label>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="rounded-full border border-dark bg-dark px-8 py-3.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-background transition-colors hover:border-accent hover:bg-accent"
          >
            Send email inquiry
          </button>
          {sent ? (
            <p className="mt-3 text-sm text-accent">Opening your email client…</p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
