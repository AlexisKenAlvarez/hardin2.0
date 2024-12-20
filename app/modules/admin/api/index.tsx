import { decode } from "base64-arraybuffer";
import { ProductInfo } from "~/lib/types";
import { createSupabaseServerClient } from "~/supabase.server";
import { Price, ProductUpdate } from "../types";

export const UploadProductImage = async ({
  request,
  file_name,
  base64,
}: {
  request: Request;
  file_name: string;
  base64: string;
}) => {
  const { supabaseClient } = createSupabaseServerClient(request);
  const { error: storageError } = await supabaseClient.storage
    .from("hardin")
    .upload(`products/${file_name}`, decode(base64), {
      contentType: "image/jpeg",
    });

  if (storageError) {
    console.log("Storage Error", storageError);
    throw new Error("Failed to upload image");
  }

  return;
};

export const CreateProduct = async ({
  request,
  productInfo,
  price,
}: {
  request: Request;
  productInfo: ProductInfo;
  price: Price[];
}) => {
  const { supabaseClient } = createSupabaseServerClient(request);
  const { product_name, category, best_seller, file_name, sub_category } =
    productInfo;

  const { data: productData, error: insertError } = await supabaseClient
    .from("products")
    .insert({
      category: parseInt(category),
      image_url: file_name,
      is_best_seller: best_seller === "true",
      name: product_name,
      sub_category: sub_category ? parseInt(sub_category) : null,
    })
    .select("id")
    .single();

  if (productData) {
    const { error: priceError } = await supabaseClient
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
  }

  if (insertError) {
    throw new Error("Failed to create product");
  }

  return;
};

export const UpdateProduct = async ({
  request,
  productInfo,
}: {
  request: Request;
  productInfo: ProductUpdate;
}) => {
  const { supabaseClient } = createSupabaseServerClient(request);

  const { id, name, category, isBestSeller, updated_by, isActive } =
    productInfo;

  const { data: product, error: productError } = await supabaseClient
    .from("products")
    .select()
    .eq("id", id)
    .single();

  if (productError) {
    throw new Error("Failed to update product");
  }

  if (product.name !== name) {
    const { error: updateError } = await supabaseClient
      .from("products")
      .update({ name, updated_at: new Date().toISOString(), updated_by })
      .eq("id", id);

    if (updateError) {
      throw new Error("Failed to update product name");
    }
  }

  if (product.category !== parseInt(category)) {
    const { error: updateError } = await supabaseClient
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
    const { error: updateError } = await supabaseClient
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
    const { error: updateError } = await supabaseClient
      .from("products")
      .update({ is_active: isActive === "true", updated_by })
      .eq("id", id);

    if (updateError) {
      throw new Error("Failed to update product active status");
    }
  }
};

export const GetAdminFilterOptions = async ({
  request,
  category,
}: {
  request: Request;
  category: string;
}) => {
  const { supabaseClient } = createSupabaseServerClient(request);

  const { data: nameOpts, error: nameOptsError } = await supabaseClient
    .rpc("get_name_opts", { category_filter: category })
    .select("*");

  if (nameOptsError) {
    throw new Error("Failed to fetch name options");
  }

  const { data: priceOpts, error: priceOptsError } = await supabaseClient
    .rpc("get_price_opts", { category_filter: category })
    .select("*");

  if (priceOptsError) {
    throw new Error("Failed to fetch price options");
  }

  return { nameOpts, priceOpts };
};
