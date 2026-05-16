export function Footer() {
  return (
    <footer className="border-t border-border/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-foreground/70 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Ambika Home Decor Surat</p>
        <p>Luxury interiors, timeless craftsmanship.</p>
      </div>
    </footer>
  );
}
