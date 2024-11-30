import { LoaderFunctionArgs, redirect } from "@remix-run/node";

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
    .rpc(
      "filter_products",
      {
        active: null as unknown as boolean,
        bestseller: null as unknown as boolean,
        name_filter: "",
        price_filter: "",
        order: "",
        category_filter: "",
        sub_category_filter: "",
        id_filter: id,
      },
      {
        count: "exact",
      }
    )
    .select("*")
    .single();
    
    const product = {
      ...productData,
      image: productData?.image_url
      ? `${process.env.SUPABASE_URL}/storage/v1/object/public/hardin/products/${productData.image_url}`
      : "",
    };
    console.log("🚀 ~ loader ~ productData:", productData)

  return {
    categoryData,
    product,
  };
}

const EditProduct = () => {
  return <EditProductForm />;
};

export default EditProduct;
