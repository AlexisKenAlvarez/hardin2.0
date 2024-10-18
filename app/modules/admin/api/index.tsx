import { json } from "@remix-run/node";
import { decode } from "base64-arraybuffer";
import { createSupabaseServerClient } from "~/supabase.server";

export const CreateProduct = async (request: Request) => {
  try {
    const { supabaseClient } = createSupabaseServerClient(request);
    const formData = await request.formData();
    const action = formData.get("action");

    const category = formData.get("category") as string;
    const product_name = formData.get("product_name") as string;
    const price = formData.get("price") as string;
    const featured = formData.get("featured") as string;
    const best_seller = formData.get("best_seller") as string;

    const file_name = formData.get("file_name") as string;
    const file = formData.get("file") as string;
    const base64 = file.split("base64,")[1];

    if (action === "add_product") {
      const { error: storageError } = await supabaseClient.storage
        .from("hardin")
        .upload(`products/${file_name}`, decode(base64), {
          contentType: "image/jpeg",
        });

      if (storageError) {
        return json({
          success: false,
          message: storageError?.message,
        });
      }

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
        return json({
          success: false,
          message: insertError?.message,
        });
      }

      if (featured) {
        const { error: featuredError } = await supabaseClient
          .from("featured")
          .insert({
            product: productData.id,
          });

        if (featuredError) {
          return json({
            success: false,
            message: featuredError?.message,
          });
        }
      }
    }

    return json({
      success: true,
      message: null,
    });
  } catch (error) {
    console.log(error);

    return json({
      success: false,
      message: "Failed to add product",
    });
  }
};
