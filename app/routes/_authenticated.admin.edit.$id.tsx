import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { createAdminSupabaseClient } from "~/adminsupabase.server";
import {
  EditProductValues,
  ProductData
} from "~/modules/admin/types";

import EditProductForm from "~/modules/admin/views/EditProductForm";
import { createSupabaseServerClient } from "~/supabase.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);
  const { id } = params;
  console.log("🚀 ~ loader ~ id:", id);

  const { data: categoryData } = await supabaseClient
    .from("products_category")
    .select("id, label")
    .eq("is_active", true);

  const { data: subCategories } = await supabaseClient
    .from("sub_category")
    .select("id, label, category")
    .eq("is_active", true);

  if (!id) {
    return redirect("/admin/dashboard");
  }

  const { data: productData } = await supabaseClient
    .rpc("filter_products", {
      active: true,
      bestseller: null as unknown as boolean,
      name_filter: "",
      price_filter: "",
      order: "",
      category_filter: "",
      sub_category_filter: "",
    })
    .eq("id", id)
    .select("*")
    .single();

  if (productData === null) {
    console.log("🚀 ~ loader ~ productData:", productData);
    return redirect("/admin/dashboard");
  }

  const product = {
    ...productData!,
    image: productData?.image_url
      ? `${process.env.SUPABASE_URL}/storage/v1/object/public/hardin/products/${productData.image_url}`
      : "",
  };

  const typedProductData = product as unknown as ProductData;

  return {
    categoryData,
    product: typedProductData,
    subCategories,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { supabase } = createAdminSupabaseClient();

  const action = formData.get("action");

  if (action === "edit_product") {
    const editData = JSON.parse(
      formData.get("EditProductValues") as string
    ) as EditProductValues;

    const { error } = await supabase
      .from("products")
      .update({
        category: editData.values.category.id,
        name: editData.values.product_name,
        sub_category: editData.values.sub_category?.id,
        is_best_seller: editData.values.bestSeller,
      })
      .eq("id", editData.id!);

    editData.price.forEach(async (p) => {
      if (p.id === null) {
        const { error: price_error } = await supabase
          .from("products_prices")
          .insert({
            product: +editData.id!,
            description: p.description,
            price: p.price!,
          });

        if (price_error) {
          return {
            success: false,
            message: "Failed to update product",
          };
        }
      }
    });

    editData.toDeletePrice.forEach(async (id) => {
      const { error: price_error } = await supabase
        .from("products_prices")
        .delete()
        .eq("id", id);

      if (price_error) {
        return {
          success: false,
          message: "Failed to update product",
        };
      }
    });

    if (error) {
      return {
        success: false,
        message: "Failed to update product",
      };
    }

    return {
      success: true,
      message: `Product ${editData.values.product_name} updated successfully`,
    };
  }

  return {
    success: false,
    message: "",
  };
}

const EditProduct = () => {
  return <EditProductForm />;
};

export default EditProduct;
