export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'customer' | 'admin';
export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'refunded';
export type ImageKind = 'gallery' | 'hover' | 'spin' | 'editorial';
export type DiscountKind = 'percent' | 'flat';
export type FitFeedback = 'runs_small' | 'true_to_size' | 'runs_large';
export type ReturnStatus =
  | 'requested'
  | 'approved'
  | 'pickup_scheduled'
  | 'inspected'
  | 'refunded'
  | 'rejected';

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          id: string;
          slug: string;
          name: string;
          tagline: string | null;
          description: string | null;
          hero_image: string | null;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          tagline?: string | null;
          description?: string | null;
          hero_image?: string | null;
          position?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          tagline?: string | null;
          description?: string | null;
          hero_image?: string | null;
          position?: number;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          slug: string;
          name: string;
          collection_id: string | null;
          subtitle: string | null;
          description: string | null;
          story: string | null;
          price_inr: number;
          compare_at_inr: number | null;
          weight_grams: number | null;
          drop_mm: number | null;
          stack_mm: number | null;
          upper: string | null;
          outsole: string | null;
          is_published: boolean;
          is_featured: boolean;
          rating_avg: number;
          rating_count: number;
          search_vector: unknown | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          collection_id?: string | null;
          subtitle?: string | null;
          description?: string | null;
          story?: string | null;
          price_inr: number;
          compare_at_inr?: number | null;
          weight_grams?: number | null;
          drop_mm?: number | null;
          stack_mm?: number | null;
          upper?: string | null;
          outsole?: string | null;
          is_published?: boolean;
          is_featured?: boolean;
          rating_avg?: number;
          rating_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          collection_id?: string | null;
          subtitle?: string | null;
          description?: string | null;
          story?: string | null;
          price_inr?: number;
          compare_at_inr?: number | null;
          weight_grams?: number | null;
          drop_mm?: number | null;
          stack_mm?: number | null;
          upper?: string | null;
          outsole?: string | null;
          is_published?: boolean;
          is_featured?: boolean;
          rating_avg?: number;
          rating_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          sku: string;
          size: number;
          color: string;
          color_hex: string | null;
          stock: number;
          price_delta_inr: number;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          product_id: string;
          sku: string;
          size: number;
          color: string;
          color_hex?: string | null;
          stock?: number;
          price_delta_inr?: number;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          product_id?: string;
          sku?: string;
          size?: number;
          color?: string;
          color_hex?: string | null;
          stock?: number;
          price_delta_inr?: number;
          is_active?: boolean;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          url: string;
          alt: string;
          kind: ImageKind;
          frame_index: number | null;
          position: number;
        };
        Insert: {
          id?: string;
          product_id: string;
          url: string;
          alt: string;
          kind?: ImageKind;
          frame_index?: number | null;
          position?: number;
        };
        Update: {
          id?: string;
          product_id?: string;
          url?: string;
          alt?: string;
          kind?: ImageKind;
          frame_index?: number | null;
          position?: number;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          role: UserRole;
          preferred_size: number | null;
          marketing_opt_in: boolean;
          deleted_at: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          role?: UserRole;
          preferred_size?: number | null;
          marketing_opt_in?: boolean;
          deleted_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: UserRole;
          preferred_size?: number | null;
          marketing_opt_in?: boolean;
          deleted_at?: string | null;
          created_at?: string;
        };
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          label: string | null;
          full_name: string;
          phone: string;
          line1: string;
          line2: string | null;
          city: string;
          state: string;
          pincode: string;
          country: string;
          is_default: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          label?: string | null;
          full_name: string;
          phone: string;
          line1: string;
          line2?: string | null;
          city: string;
          state: string;
          pincode: string;
          country?: string;
          is_default?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          label?: string | null;
          full_name?: string;
          phone?: string;
          line1?: string;
          line2?: string | null;
          city?: string;
          state?: string;
          pincode?: string;
          country?: string;
          is_default?: boolean;
          created_at?: string;
        };
      };
      carts: {
        Row: {
          id: string;
          user_id: string | null;
          guest_token: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          guest_token?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          guest_token?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          cart_id: string;
          variant_id: string;
          quantity: number;
        };
        Insert: {
          id?: string;
          cart_id: string;
          variant_id: string;
          quantity: number;
        };
        Update: {
          id?: string;
          cart_id?: string;
          variant_id?: string;
          quantity?: number;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          email: string;
          phone: string | null;
          status: OrderStatus;
          subtotal_inr: number;
          discount_inr: number;
          shipping_inr: number;
          tax_inr: number;
          total_inr: number;
          currency: string;
          discount_code: string | null;
          shipping_address: Json;
          shipping_method: string | null;
          cashfree_order_id: string | null;
          cashfree_payment_session_id: string | null;
          cashfree_payment_id: string | null;
          paid_at: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          user_id?: string | null;
          email: string;
          phone?: string | null;
          status?: OrderStatus;
          subtotal_inr: number;
          discount_inr?: number;
          shipping_inr?: number;
          tax_inr?: number;
          total_inr: number;
          currency?: string;
          discount_code?: string | null;
          shipping_address: Json;
          shipping_method?: string | null;
          cashfree_order_id?: string | null;
          cashfree_payment_session_id?: string | null;
          cashfree_payment_id?: string | null;
          paid_at?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          user_id?: string | null;
          email?: string;
          phone?: string | null;
          status?: OrderStatus;
          subtotal_inr?: number;
          discount_inr?: number;
          shipping_inr?: number;
          tax_inr?: number;
          total_inr?: number;
          currency?: string;
          discount_code?: string | null;
          shipping_address?: Json;
          shipping_method?: string | null;
          cashfree_order_id?: string | null;
          cashfree_payment_session_id?: string | null;
          cashfree_payment_id?: string | null;
          paid_at?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          variant_id: string | null;
          product_name: string;
          product_slug: string | null;
          size: number | null;
          color: string | null;
          unit_price_inr: number;
          quantity: number;
          image_url: string | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          variant_id?: string | null;
          product_name: string;
          product_slug?: string | null;
          size?: number | null;
          color?: string | null;
          unit_price_inr: number;
          quantity: number;
          image_url?: string | null;
        };
        Update: {
          id?: string;
          order_id?: string;
          variant_id?: string | null;
          product_name?: string;
          product_slug?: string | null;
          size?: number | null;
          color?: string | null;
          unit_price_inr?: number;
          quantity?: number;
          image_url?: string | null;
        };
      };
      shipments: {
        Row: {
          id: string;
          order_id: string;
          carrier: string | null;
          awb: string;
          tracking_url: string | null;
          status: string | null;
          events: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          carrier?: string | null;
          awb: string;
          tracking_url?: string | null;
          status?: string | null;
          events?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          carrier?: string | null;
          awb?: string;
          tracking_url?: string | null;
          status?: string | null;
          events?: Json | null;
          created_at?: string;
        };
      };
      discount_codes: {
        Row: {
          id: string;
          code: string;
          kind: DiscountKind;
          value: number;
          min_cart_inr: number;
          max_uses: number | null;
          used_count: number;
          starts_at: string | null;
          expires_at: string | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          code: string;
          kind: DiscountKind;
          value: number;
          min_cart_inr?: number;
          max_uses?: number | null;
          used_count?: number;
          starts_at?: string | null;
          expires_at?: string | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          code?: string;
          kind?: DiscountKind;
          value?: number;
          min_cart_inr?: number;
          max_uses?: number | null;
          used_count?: number;
          starts_at?: string | null;
          expires_at?: string | null;
          is_active?: boolean;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string | null;
          order_id: string | null;
          rating: number;
          title: string;
          body: string;
          fit_feedback: FitFeedback | null;
          photo_urls: string[] | null;
          is_approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          user_id?: string | null;
          order_id?: string | null;
          rating: number;
          title: string;
          body: string;
          fit_feedback?: FitFeedback | null;
          photo_urls?: string[] | null;
          is_approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          user_id?: string | null;
          order_id?: string | null;
          rating?: number;
          title?: string;
          body?: string;
          fit_feedback?: FitFeedback | null;
          photo_urls?: string[] | null;
          is_approved?: boolean;
          created_at?: string;
        };
      };
      wishlist_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          created_at?: string;
        };
      };
      returns: {
        Row: {
          id: string;
          order_id: string;
          order_item_id: string;
          reason: string;
          status: ReturnStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          order_item_id: string;
          reason: string;
          status?: ReturnStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          order_item_id?: string;
          reason?: string;
          status?: ReturnStatus;
          created_at?: string;
        };
      };
      webhook_events: {
        Row: {
          id: string;
          source: string;
          event_type: string;
          payload: Json;
          signature_valid: boolean;
          processed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          source?: string;
          event_type: string;
          payload: Json;
          signature_valid: boolean;
          processed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          source?: string;
          event_type?: string;
          payload?: Json;
          signature_valid?: boolean;
          processed?: boolean;
          created_at?: string;
        };
      };
      analytics_events: {
        Row: {
          id: number;
          session_id: string;
          user_id: string | null;
          event_name: string;
          path: string;
          referrer: string | null;
          device: string | null;
          country: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          session_id: string;
          user_id?: string | null;
          event_name: string;
          path: string;
          referrer?: string | null;
          device?: string | null;
          country?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          session_id?: string;
          user_id?: string | null;
          event_name?: string;
          path?: string;
          referrer?: string | null;
          device?: string | null;
          country?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
      };
    };
    Functions: {
      decrement_stock_for_order: {
        Args: {
          p_order_id: string;
          p_cf_payment_id: string;
        };
        Returns: boolean;
      };
      handle_new_user: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
  };
}
