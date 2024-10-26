import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";

import { ProductInfo } from "~/lib/types";
import { CreateProduct, UploadProductImage } from "~/modules/admin/api";
import Add from "~/modules/admin/views/Add";
import { createSupabaseServerClient } from "~/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);

  const { data: categoryData } = await supabaseClient
    .from("products_category")
    .select("id, label")
    .eq("isActive", true);

  return {
    categoryData,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const action = formData.get("action");

    if (action === "add_product") {
      const productInfo: ProductInfo = {
        product_name: formData.get("product_name") as string,
        price: formData.get("price") as string,
        category: formData.get("category") as string,
        featured: formData.get("featured") as string,
        best_seller: formData.get("best_seller") as string,
        file_name: formData.get("file_name") as string,
      };

      const file = formData.get("file") as string;
      const base64 = file.split("base64,")[1];

      await UploadProductImage({
        request,
        file_name: productInfo.file_name,
        base64,
      });
      await CreateProduct({ request, productInfo });
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
}

const AddProduct = () => {
  return <Add />;
};

export default AddProduct;
