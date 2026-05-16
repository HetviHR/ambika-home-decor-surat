export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <header
      className={`space-y-3 ${align === "center" ? "mx-auto max-w-2xl text-center" : ""}`}
    >
      {eyebrow ? (
        <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.32em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl leading-tight text-dark sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-relaxed text-dark/70">{description}</p>
    </header>
  );
}
