import { IDropdownOptions } from "~/lib/types";

export interface CategoryFilterOptions {
  name: IDropdownOptions;
  price: IDropdownOptions;
  isActive: IDropdownOptions;
  isBestSeller: IDropdownOptions;
  isFeatured: IDropdownOptions;
  date: IDropdownOptions;
}

export interface CategoryFilterValues {
  name: string;
  price: string;
  isActive: string;
  isBestSeller: string;
  isFeatured: string;
  order: string;
}

export interface CroppedPixels {
  y: number;
  x: number;
  height: number;
  width: number;
}

export interface categoryType {
  id: number;
  label: string;
}


export interface ProductUpdate {
  id: string;
  name: string;
  price: string;
  category: string;
  isBestSeller: string;
  isActive: string;
  updated_by: string;
  _action: string;
}

export interface FilterOptions {
  nameOpts: IDropdownOptions[];
  priceOpts: IDropdownOptions[];
}

export interface Price {
  description: string,
  price: number | null
}

export interface ProductValue {
  product_name: string;
  category: CategoryType;
  sub_category?: CategoryType;
  featured: string;
  bestSeller: string;
}

export interface CategoryType {
  id: number;
  label: string;
}

export interface ProductData {
  id: number
  name: string

  image_url: string
  is_best_seller: boolean
  is_active: boolean
  category: number
  label: string
  sub_category: string
  sub_category_id: number
  prices: Price[]
}

export interface SearchParameters {
  name: string | null;
  price: number | null;
  isBestSeller: boolean | null;
  isActive: boolean | null;
  order: string | null;
  sub_category: string | null;
}


// product_name: z
// .string()
// .min(2, { message: "Product name must have at least 2 characters" })
// .max(70, { message: "Product name must not exceed 70 characters" }),
// category: categorySchema,
// sub_category: categorySchema.nullish(),
// featured: z.boolean().optional(),
// bestSeller: z.boolean().optional(),