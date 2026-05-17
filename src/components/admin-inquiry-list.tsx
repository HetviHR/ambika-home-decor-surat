import type { Database } from "@/types/database";

type InquiryRow = Database["public"]["Tables"]["inquiries"]["Row"];

interface InquiryListProps {
  inquiries: InquiryRow[];
}

export function InquiryList({ inquiries }: InquiryListProps) {
  if (inquiries.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-cream/40 p-8 text-center">
        <p className="text-sm text-dark/60">No inquiries yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-widest text-dark/60">
            <th className="p-3">Name</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Product</th>
            <th className="p-3">Message</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id} className="border-b border-border hover:bg-cream/30">
              <td className="p-3">
                <div>
                  <p className="font-medium text-dark">{inquiry.name}</p>
                  {inquiry.email && <p className="text-xs text-dark/60">{inquiry.email}</p>}
                </div>
              </td>
              <td className="p-3">
                <a
                  href={`https://wa.me/${inquiry.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  {inquiry.phone}
                </a>
              </td>
              <td className="p-3 text-dark/70">{inquiry.product_slug || "—"}</td>
              <td className="max-w-xs truncate p-3 text-dark/70">{inquiry.message}</td>
              <td className="p-3 text-xs text-dark/60">
                {new Date(inquiry.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
