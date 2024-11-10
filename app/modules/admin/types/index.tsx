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
