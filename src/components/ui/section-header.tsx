export function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="space-y-2">
      <h2 className="font-display text-3xl text-foreground sm:text-4xl">{title}</h2>
      <p className="max-w-3xl text-foreground/75">{description}</p>
    </header>
  );
}
