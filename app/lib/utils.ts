import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Price } from "~/modules/admin/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const objectToFormData = (obj: Record<string, unknown>) => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value?.toString() ?? "");
  });
  return formData;
};

export type UnwrapArray<T> = T extends (infer U)[] ? U : T;

export const hasDuplicate = (prices: Price[]) => {
  let isDuplicate = false;
  for (let x = 0; x < prices.length; x++) {
    const hasDuplicate = prices.some(
      (y, sIndex) => y.price === prices[x].price && x !== sIndex
    );

    if (hasDuplicate) {
      isDuplicate = hasDuplicate;
      break;
    }
  }

  return isDuplicate;
};
