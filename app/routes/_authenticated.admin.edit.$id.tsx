import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { createAdminSupabaseClient } from "~/adminsupabase.server";
import { DeleteProductImage, UploadProductImage } from "~/modules/admin/api";
import { EditProductValues, ProductData } from "~/modules/admin/types";

import EditProductForm from "~/modules/admin/views/EditProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
  const { supabase } = createAdminSupabaseClient();
  const { id } = params;

  const { data: categoryData } = await supabase
    .from("products_category")
    .select("id, label")
    .eq("is_active", true);

  const { data: subCategories } = await supabase
    .from("sub_category")
    .select("id, label, category")
    .eq("is_active", true);

  if (!id) {
    return redirect("/admin/dashboard");
  }

  const { data: productData } = await supabase
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
        category: editData.formValues.category.id,
        name: editData.formValues.product_name,
        sub_category: editData.formValues.sub_category?.id,
        is_best_seller: editData.formValues.bestSeller,
      })
      .eq("id", editData.id!);

    editData.price.forEach(async (p) => {
      if (!p.id) {
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

    editData.toDeletePriceIds?.forEach(async (id) => {
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

    if (editData.image_changed) {
      await DeleteProductImage({
        file_name: editData.old_img_name,
      });

      await UploadProductImage({
        new_product: false,
        id: editData.id,
        request,
        file_name: editData.img_name,
        cropped_file: editData.file,
      });
    }

    if (error) {
      return {
        success: false,
        message: "Failed to update product",
      };
    }

    return {
      success: true,
      message: `Product ${editData.formValues.product_name} updated successfully`,
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
