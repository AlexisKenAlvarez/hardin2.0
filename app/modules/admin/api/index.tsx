import { decode } from "base64-arraybuffer";
import { ProductInfo } from "~/lib/types";
import { createSupabaseServerClient } from "~/supabase.server";
import { ProductUpdate } from "../types";

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
    console.log(storageError);
    throw new Error("Failed to upload image");
  }

  return;
};

export const CreateProduct = async ({
  request,
  productInfo,
}: {
  request: Request;
  productInfo: ProductInfo;
}) => {
  const { supabaseClient } = createSupabaseServerClient(request);
  const { product_name, price, category, featured, best_seller, file_name } =
    productInfo;

  const { data: productData, error: insertError } = await supabaseClient
    .from("products")
    .insert({
      category: parseInt(category),
      image_url: file_name,
      price: parseInt(price),
      isBestSeller: best_seller === "true",
      name: product_name,
    })
    .select()
    .single();

  if (insertError) {
    throw new Error("Failed to create product");
  }

  if (featured === "true") {
    const { error: featuredError } = await supabaseClient
      .from("featured")
      .insert({
        product: productData.id,
      });

    if (featuredError) {
      throw new Error("Failed to create featured product");
    }
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

  const { id, name, price, category, isBestSeller, updated_by, isActive } =
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

  if (product.price !== parseInt(price)) {
    const { error: updateError } = await supabaseClient
      .from("products")
      .update({
        price: parseInt(price),
        updated_at: new Date().toISOString(),
        updated_by,
      })
      .eq("id", id);

    if (updateError) {
      throw new Error("Failed to update product price");
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

  if (product.isBestSeller !== (isBestSeller === "true")) {
    const { error: updateError } = await supabaseClient
      .from("products")
      .update({
        isBestSeller: isBestSeller === "true",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      throw new Error("Failed to update product best seller status");
    }
  }

  if (product.isActive !== (isActive === "true")) {
    const { error: updateError } = await supabaseClient
      .from("products")
      .update({ isActive: isActive === "true", updated_by })
      .eq("id", id);

    if (updateError) {
      throw new Error("Failed to update product active status");
    }
  }
};
