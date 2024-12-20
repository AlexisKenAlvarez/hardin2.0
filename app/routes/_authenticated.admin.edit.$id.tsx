import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { ProductData } from "~/modules/admin/types";

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

export async function action() {
  return {
    success: true,
  };
}

const EditProduct = () => {
  return <EditProductForm />;
};

export default EditProduct;
