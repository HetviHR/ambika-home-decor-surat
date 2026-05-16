"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageLightbox } from "@/components/catalog/image-lightbox";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-cream shadow-soft sm:aspect-[5/4]"
        >
          <Image
            src={images[active]}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority
          />
        </button>
        {images.length > 1 ? (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                  active === i ? "border-accent" : "border-border"
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
      {lightbox ? (
        <ImageLightbox src={images[active]} alt={name} onClose={() => setLightbox(false)} />
      ) : null}
    </>
  );
}
