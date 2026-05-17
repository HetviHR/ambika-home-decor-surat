import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductForm } from "@/components/admin-product-form";
import { ProductList } from "@/components/admin-product-list";
import { InquiryList } from "@/components/admin-inquiry-list";
import { getAdminProducts, getAdminInquiries } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage products, images, and inquiries",
};


function ProductsLoading() {
  return <div className="rounded-lg border border-border bg-cream/40 p-8 text-center text-sm text-dark/60">Loading products...</div>;
}

function InquiriesLoading() {
  return <div className="rounded-lg border border-border bg-cream/40 p-8 text-center text-sm text-dark/60">Loading inquiries...</div>;
}

async function ProductsSection() {
  const products = await getAdminProducts();
  return <ProductList products={products} />;
}

async function InquiriesSection() {
  const inquiries = await getAdminInquiries();
  return <InquiryList inquiries={inquiries} />;
}

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-8 sm:px-6">
      <header>
        <h1 className="text-3xl font-bold text-dark">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-dark/60">Manage products and inquiries</p>
      </header>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-bold text-dark">Add Product</h2>
        </div>
        <div className="rounded-lg border border-border bg-background p-6">
          <ProductForm />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-dark">Products</h2>
        <Suspense fallback={<ProductsLoading />}>
          <ProductsSection />
        </Suspense>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-dark">Inquiries</h2>
        <Suspense fallback={<InquiriesLoading />}>
          <InquiriesSection />
        </Suspense>
      </section>
    </div>
  );
}
