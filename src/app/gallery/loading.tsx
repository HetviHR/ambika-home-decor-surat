export default function Loading() {
  return (
    <div className="space-y-14 pb-8">
      <div className="h-24 animate-pulse rounded-2xl bg-cream" />
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>div]:mb-5 [&>div]:break-inside-avoid">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-cream" />
        ))}
      </div>
    </div>
  );
}
