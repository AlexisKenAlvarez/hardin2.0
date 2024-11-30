export interface ProductInfo {
  product_name: string;
  category: string;
  sub_category?: string;
  featured: string;
  best_seller: string;
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
