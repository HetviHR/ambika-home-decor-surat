"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteAdminProduct, saveAdminProduct } from "@/lib/admin";

function refreshAdminRoutes(slug?: string) {
  revalidatePath("/admin/dashboard");
  revalidatePath("/");
  revalidatePath("/collection");
  revalidatePath("/gallery");
  revalidatePath("/sitemap.xml");

  if (slug) {
    revalidatePath(`/collection/${slug}`);
  }
}

export async function saveProductAction(_state: string | null, formData: FormData) {
  try {
    const result = await saveAdminProduct(formData);
    refreshAdminRoutes(result.slug);
    redirect("/admin/dashboard");
  } catch (error) {
    throw error;
  }
}

export async function deleteProductAction(_state: string | null, formData: FormData) {
  try {
    const id = String(formData.get("id") ?? "").trim();
    if (!id) {
      throw new Error("Product id is required.");
    }

    const slug = await deleteAdminProduct(id);
    refreshAdminRoutes(slug);
    redirect("/admin/dashboard");
  } catch (error) {
    throw error;
  }
}

