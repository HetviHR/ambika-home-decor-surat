"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 text-center text-dark">
      <div className="max-w-xl rounded-2xl border border-border bg-cream/40 p-8">
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.22em] text-accent">
          Something went wrong
        </p>
        <h1 className="mt-3 font-display text-3xl">The site couldn&apos;t finish loading.</h1>
        <p className="mt-3 text-sm text-dark/70">{error.message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-dark bg-dark px-6 py-3 font-sans text-[0.7rem] uppercase tracking-[0.2em] text-background"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-border px-6 py-3 font-sans text-[0.7rem] uppercase tracking-[0.2em] text-dark"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
