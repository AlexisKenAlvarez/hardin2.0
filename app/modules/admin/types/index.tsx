export interface CategoryFilter {
  name: boolean;
  price: boolean;
  image: boolean;
  isActive: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
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
  price: string,
  category: string,
  isBestSeller: string,
  isActive: string,
  updated_by: string,
  _action: string,
}