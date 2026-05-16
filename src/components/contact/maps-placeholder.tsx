import { locations } from "@/lib/site";

export function MapsPlaceholder() {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-cream/40 shadow-soft">
      <div className="border-b border-border bg-background/60 px-6 py-4 sm:px-8">
        <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.28em] text-accent">
          Find Us
        </p>
        <h3 className="mt-2 font-display text-xl text-dark sm:text-2xl">
          Showroom locations across Bardoli
        </h3>
      </div>
      <div className="grid gap-0 lg:grid-cols-2">
        {locations.map((location) => {
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapsQuery)}`;
          return (
            <a
              key={location.id}
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-[220px] flex-col justify-end border-border p-6 transition-colors hover:bg-beige/30 lg:min-h-[280px] lg:border-r lg:last:border-r-0"
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#EFE8DD_0%,#D8C8B8_50%,#F8F5F0_100%)] opacity-90" />
              <div
                className="absolute inset-0 opacity-[0.12] bg-[url('/images/bg-editorial-2.png')] bg-cover bg-center"
                aria-hidden
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-accent">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-accent" fill="none" strokeWidth="1.5" aria-hidden>
                    <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  Open in Google Maps
                </span>
                <p className="mt-3 font-display text-lg text-dark">{location.name}</p>
                <p className="mt-1 font-sans text-sm text-dark/65">
                  {location.lines[0]} · Bardoli
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
