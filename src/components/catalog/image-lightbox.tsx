"use client";

import Image from "next/image";
import { useEffect } from "react";

export function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/85 p-4 backdrop-blur-md sm:p-8"
      role="dialog"
      aria-modal
      aria-label={`Preview ${alt}`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full border border-cream/30 bg-background/90 px-4 py-2 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-dark"
      >
        Close
      </button>
      <div
        className="relative h-[min(85vh,900px)] w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" priority />
      </div>
    </div>
  );
}
