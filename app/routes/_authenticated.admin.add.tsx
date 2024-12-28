import { ActionFunctionArgs } from "@remix-run/node";
import { createAdminSupabaseClient } from "~/adminsupabase.server";

import { ProductInfo } from "~/lib/types";
import { CreateProduct, UploadProductImage } from "~/modules/admin/api";
import { ProductValue } from "~/modules/admin/types";
import AddProductForm from "~/modules/admin/views/AddProductForm";

export async function loader() {
  const { supabase } = createAdminSupabaseClient();

  const { data: categoryData } = await supabase
    .from("products_category")
    .select("id, label")
    .eq("is_active", true);

  const { data: subCategories } = await supabase
    .from("sub_category")
    .select("id, label, category")
    .eq("is_active", true);

  return {
    categoryData,
    subCategories,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const action = formData.get("action");

    const { category, product_name, sub_category, bestSeller } = JSON.parse(
      formData.get("product_values") as string
    ) as ProductValue;

    const price = JSON.parse(formData.get("price") as string);

    if (action === "add_product") {
      const productInfo: ProductInfo = {
        product_name,
        category: category.id.toString(),
        sub_category: sub_category?.id.toString(),
        best_seller: bestSeller,
        file_name: formData.get("file_name") as string,
      };

      const file = formData.get("file") as string;

      const new_product_id = await CreateProduct({
        request,
        productInfo,
        price,
      });

      if (new_product_id) {
        await UploadProductImage({
          new_product: true,
          id: new_product_id,
          request,
          file_name: productInfo.file_name,
          cropped_file: file,
        });
      }
    }
    return {
      success: true,
      message: `Product ${
        formData.get("product_name") as string
      } added successfully`,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Failed to add product",
    };
  }
}

const AddProduct = () => {
  return <AddProductForm />;
};

export default AddProduct;
