import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Administrative route structure for managing content modules.",
};

const dashboardSections = [
  "Hero content",
  "Collection highlights",
  "Gallery uploads",
  "Contact leads",
];

export default function AdminDashboardPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">Admin</p>
        <h1 className="font-display text-4xl">Dashboard</h1>
        <p className="text-foreground/75">
          Reserved route structure for content operations and internal workflows.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {dashboardSections.map((section) => (
          <article key={section} className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold">{section}</h2>
            <p className="mt-1 text-sm text-foreground/70">Module placeholder</p>
          </article>
        ))}
      </div>
    </section>
  );
}
