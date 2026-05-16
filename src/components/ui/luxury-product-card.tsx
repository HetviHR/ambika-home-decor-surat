import Image from "next/image";
import Link from "next/link";

export function LuxuryProductCard({
  title,
  category,
  image,
  description,
  href = "/collection",
}: {
  title: string;
  category: string;
  image: string;
  description?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-cream shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-luxury"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-background">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-dark/15 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.28em] text-cream/80">
            {category}
          </p>
          <h3 className="mt-2 font-display text-xl text-cream sm:text-2xl">{title}</h3>
          {description ? (
            <p className="mt-2 line-clamp-2 text-sm text-cream/75 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

