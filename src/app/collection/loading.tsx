export default function Loading() {
  return (
    <div className="space-y-8 pb-12">
      <div className="h-32 animate-pulse rounded-2xl bg-cream" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-cream" />
        ))}
      </div>
    </div>
  );
}
