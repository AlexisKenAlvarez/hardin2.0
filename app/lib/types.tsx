import { Session, SupabaseClient } from "@supabase/supabase-js";

export interface ProductInfo {
  product_name: string;
  category: string;
  sub_category?: string;
  best_seller: boolean;
  file_name: string;
}

export interface PageOptions {
  pageSize: number | null;
  page: number | null;
  pages: number | null;
  total: number | null;
}

export interface IDropdownOptions {
  value: string;
  label: string;
}

export interface ENV_TYPE {
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  BASE_URL?: string;
}

export type OutletContext = {
  supabase: SupabaseClient;
  session: Session;
  env: ENV_TYPE;
};
