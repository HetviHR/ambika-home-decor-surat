export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          slug: string;
          name: string;
          category: string;
          category_slug: string;
          description: string;
          material: string;
          dimensions: string;
          featured: boolean;
          images: string[];
          folder: string;
          style: string;
          price: number | null;
          tags: string[];
          whatsapp_number: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          slug: string;
          name: string;
          category: string;
          category_slug: string;
          description: string;
          material: string;
          dimensions: string;
          featured: boolean;
          images: string[];
          folder: string;
          style: string;
          price?: number | null;
          tags: string[];
          whatsapp_number: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      inquiries: {
        Row: {
          id: string;
          product_id: string | null;
          product_slug: string | null;
          name: string;
          phone: string;
          email: string | null;
          message: string;
          status: string;
          source: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          product_slug?: string | null;
          name: string;
          phone: string;
          email?: string | null;
          message: string;
          status?: string;
          source?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["inquiries"]["Insert"]>;
      };
    };
  };
};
