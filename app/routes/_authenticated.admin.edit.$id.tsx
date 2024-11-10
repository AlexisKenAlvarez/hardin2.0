import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";

import { ProductInfo } from "~/lib/types";
import { CreateProduct, UploadProductImage } from "~/modules/admin/api";
import EditProductForm from "~/modules/admin/views/EditProductForm";
import { createSupabaseServerClient } from "~/supabase.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);
  const { id } = params;

  const { data: categoryData } = await supabaseClient
    .from("products_category")
    .select("id, label")
    .eq("is_active", true);

  if (!id) {
    return redirect("/admin/dashboard");
  }

  const { data: productData } = await supabaseClient
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  const product = {
    ...productData,
    image: productData?.image_url
      ? `${process.env.SUPABASE_URL}/storage/v1/object/public/hardin/products/${productData.image_url}`
      : "",
  };

  return {
    categoryData,
    product,
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

const EditProduct = () => {
  return <EditProductForm />;
};

export default EditProduct;
