"use client";

import { inquiryEmail } from "@/lib/site";
import { FormEvent, useState } from "react";

export function EmailInquiry() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Design inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${inquiryEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section className="rounded-2xl border border-border bg-background/80 p-6 shadow-soft backdrop-blur-sm sm:p-10">
      <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.28em] text-accent">
        Email Inquiry
      </p>
      <h3 className="mt-3 font-display text-2xl text-dark sm:text-3xl">
        Share your vision with our team
      </h3>
      <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-dark/70">
        Tell us about your space, preferred finishes, and timeline. We respond
        within one business day.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="mb-2 block font-sans text-[0.65rem] uppercase tracking-[0.2em] text-dark/60">
            Name
          </span>
          <input
            required
            name="name"
            type="text"
            className="w-full rounded-xl border border-border bg-cream/50 px-4 py-3 font-sans text-sm text-dark outline-none transition-colors focus:border-accent"
            placeholder="Your name"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-2 block font-sans text-[0.65rem] uppercase tracking-[0.2em] text-dark/60">
            Email
          </span>
          <input
            required
            name="email"
            type="email"
            className="w-full rounded-xl border border-border bg-cream/50 px-4 py-3 font-sans text-sm text-dark outline-none transition-colors focus:border-accent"
            placeholder="you@email.com"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block font-sans text-[0.65rem] uppercase tracking-[0.2em] text-dark/60">
            Message
          </span>
          <textarea
            required
            name="message"
            rows={5}
            className="w-full resize-none rounded-xl border border-border bg-cream/50 px-4 py-3 font-sans text-sm text-dark outline-none transition-colors focus:border-accent"
            placeholder="Describe your project, room dimensions, or product interests..."
          />
        </label>
        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full border border-dark bg-dark px-8 py-3.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-background transition-all duration-500 hover:border-accent hover:bg-accent"
          >
            Send Inquiry
          </button>
          <a
            href={`mailto:${inquiryEmail}`}
            className="font-sans text-sm text-dark/70 transition-colors hover:text-accent"
          >
            {inquiryEmail}
          </a>
        </div>
        {submitted ? (
          <p className="font-sans text-sm text-accent sm:col-span-2">
            Opening your email client…
          </p>
        ) : null}
      </form>
    </section>
  );
}
