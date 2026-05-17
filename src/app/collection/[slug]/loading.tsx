export default function Loading() {
  return (
    <article className="space-y-16 pb-16">
      <div className="h-4 w-40 animate-pulse rounded-full bg-cream" />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <div className="aspect-[4/3] animate-pulse rounded-2xl bg-cream sm:aspect-[5/4]" />
          <div className="flex gap-3">
            <div className="h-20 w-20 animate-pulse rounded-lg bg-cream" />
            <div className="h-20 w-20 animate-pulse rounded-lg bg-cream" />
            <div className="h-20 w-20 animate-pulse rounded-lg bg-cream" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-4 w-32 animate-pulse rounded-full bg-cream" />
          <div className="h-12 w-3/4 animate-pulse rounded-2xl bg-cream" />
          <div className="h-24 animate-pulse rounded-2xl bg-cream" />
          <div className="grid gap-4 border-y border-border py-8 sm:grid-cols-2">
            <div className="h-16 animate-pulse rounded-2xl bg-cream" />
            <div className="h-16 animate-pulse rounded-2xl bg-cream" />
            <div className="h-16 animate-pulse rounded-2xl bg-cream" />
            <div className="h-16 animate-pulse rounded-2xl bg-cream" />
          </div>
        </div>
      </div>
      <div className="h-80 animate-pulse rounded-2xl bg-cream" />
    </article>
  );
}
