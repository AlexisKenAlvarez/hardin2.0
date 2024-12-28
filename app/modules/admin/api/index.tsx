import { decode } from "base64-arraybuffer";
import { createAdminSupabaseClient } from "~/adminsupabase.server";
import { ProductInfo } from "~/lib/types";
import { Price, ProductUpdate } from "../types";

export const UploadProductImage = async ({
  id,
  file_name,
  cropped_file,
  new_product,
}: {
  id: number;
  request: Request;
  file_name: string;
  cropped_file: string;
  new_product: boolean;
}) => {
  const { supabase } = createAdminSupabaseClient();
  const base64 = cropped_file.split("base64,")[1];
  const { error: storageError } = await supabase.storage
    .from("hardin")
    .upload(`products/${file_name}`, decode(base64), {
      contentType: "image/jpeg",
    });

  if (!new_product) {
    const { error: change_name_error } = await supabase
      .from("products")
      .update({ image_url: file_name })
      .eq("id", id);

    if (change_name_error) {
      console.log("Change Name Error", change_name_error);
      throw new Error("Failed to update product image name");
    }
  }

  if (storageError) {
    console.log("Storage Error", storageError);
    throw new Error("Failed to upload image");
  }

  return;
};

export const DeleteProductImage = async ({
  file_name,
}: {
  file_name: string;
}) => {
  const { supabase } = createAdminSupabaseClient();

  const { error: image_error } = await supabase.storage
    .from("hardin")
    .remove([`products/${file_name}`]);

  if (image_error) {
    return {
      success: false,
      message: "Failed to update product",
    };
  }
};

export const CreateProduct = async ({
  productInfo,
  price,
}: {
  request: Request;
  productInfo: ProductInfo;
  price: Price[];
}) => {
  const { supabase } = createAdminSupabaseClient();
  const { product_name, category, best_seller, file_name, sub_category } =
    productInfo;

  const { data: productData, error: insertError } = await supabase
    .from("products")
    .insert({
      category: parseInt(category),
      image_url: file_name,
      is_best_seller: best_seller,
      name: product_name,
      sub_category: sub_category ? parseInt(sub_category) : null,
    })
    .select("id")
    .single();

  if (productData) {
    const { error: priceError } = await supabase
      .from("products_prices")
      .insert([
        ...price.map((p) => ({
          product: productData?.id,
          description: p.description ?? "",
          price: p.price ?? 0,
        })),
      ]);

    if (priceError) {
      throw new Error("Failed to insert price");
    }

    return productData.id;
  }

  if (insertError) {
    throw new Error("Failed to create product");
  }

  return;
};

export const UpdateProduct = async ({
  productInfo,
}: {
  productInfo: ProductUpdate;
}) => {
  const { supabase } = createAdminSupabaseClient();

  const { id, name, category, isBestSeller, updated_by, isActive } =
    productInfo;

  const { data: product, error: productError } = await supabase
    .from("products")
    .select()
    .eq("id", id)
    .single();

  if (productError) {
    throw new Error("Failed to update product");
  }

  if (product.name !== name) {
    const { error: updateError } = await supabase
      .from("products")
      .update({ name, updated_at: new Date().toISOString(), updated_by })
      .eq("id", id);

    if (updateError) {
      throw new Error("Failed to update product name");
    }
  }

  if (product.category !== parseInt(category)) {
    const { error: updateError } = await supabase
      .from("products")
      .update({
        category: parseInt(category),
        updated_at: new Date().toISOString(),
        updated_by,
      })
      .eq("id", id);

    if (updateError) {
      throw new Error("Failed to update product category");
    }
  }

  if (product.is_best_seller !== (isBestSeller === "true")) {
    const { error: updateError } = await supabase
      .from("products")
      .update({
        is_best_seller: isBestSeller === "true",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      throw new Error("Failed to update product best seller status");
    }
  }

  if (product.is_active !== (isActive === "true")) {
    const { error: updateError } = await supabase
      .from("products")
      .update({ is_active: isActive === "true", updated_by })
      .eq("id", id);

    if (updateError) {
      throw new Error("Failed to update product active status");
    }
  }
};

export const GetAdminFilterOptions = async ({
  category,
}: {
  request: Request;
  category: string;
}) => {
  const { supabase } = createAdminSupabaseClient();

  const { data: nameOpts, error: nameOptsError } = await supabase
    .rpc("get_name_opts", { category_filter: category })
    .select("*");

  if (nameOptsError) {
    throw new Error("Failed to fetch name options");
  }

  const { data: priceOpts, error: priceOptsError } = await supabase
    .rpc("get_price_opts", { category_filter: category })
    .select("*");

  if (priceOptsError) {
    throw new Error("Failed to fetch price options");
  }

  return { nameOpts, priceOpts };
};
