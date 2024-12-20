import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

import { ProductInfo } from "~/lib/types";
import { CreateProduct, UploadProductImage } from "~/modules/admin/api";
import { ProductValue } from "~/modules/admin/types";
import AddProductForm from "~/modules/admin/views/AddProductForm";
import { createSupabaseServerClient } from "~/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);

  const { data: categoryData } = await supabaseClient
    .from("products_category")
    .select("id, label")
    .eq("is_active", true);

  const { data: subCategories } = await supabaseClient
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

    const { category, product_name, sub_category, bestSeller } =
      JSON.parse(formData.get("product_values") as string) as ProductValue;

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
      const base64 = file.split("base64,")[1];

      await UploadProductImage({
        request,
        file_name: productInfo.file_name,
        base64,
      });

      await CreateProduct({ request, productInfo, price });
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
