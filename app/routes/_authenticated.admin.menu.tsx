import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/react";
import { createSupabaseServerClient } from "~/supabase.server";

import { UpdateProduct } from "~/modules/admin/api";
import { ProductUpdate } from "~/modules/admin/types";
import Menu from "~/modules/admin/views/Menu";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);
  const url = new URL(request.url);
  const categoryId = url.searchParams.get("category");
  const { searchParams } = url;

  const { data: user } = await supabaseClient.auth.getSession();

  const pageSize = searchParams.get("pageSize") || "10";
  const page = searchParams.get("page") || "1";

  if (!categoryId) {
    searchParams.set("category", "1");
    return redirect(url.toString());
  }

  const { data: categoryData } = await supabaseClient
    .from("products_category")
    .select("id, label")
    .eq("isActive", true);

  const { data: productsData } = await supabaseClient
    .from("products")
    .select("*,category:products_category(id, label)")
    .eq("category", categoryId)
    .order("id", { ascending: false })
    .range((Number(page) - 1) * +pageSize, (+pageSize * +page) - 1);

  const { count } = await supabaseClient
    .from("products")
    .select("id", {
      count: "exact",
    })
    .eq("category", categoryId);

  const pageOptions = {
    pageSize: Number(pageSize),
    page: Number(page),
    pages: Math.ceil((count ?? 0) / Number(pageSize)),
    total: count,
  };

  return {
    pageOptions,
    productsData,
    categoryData,
    categoryId,
    user: user.session,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    if (formData.get("_action") === "updateProduct") {
      const { ...values } = Object.fromEntries(
        formData
      ) as unknown as ProductUpdate;

      await UpdateProduct({
        request,
        productInfo: values,
      });

      return json({
        success: true,
        action: formData.get("_action"),
        message: "Product updated successfully",
      });
    }

    return json({
      success: true,
      action: formData.get("_action"),
      message: "Product action success",
    });
  } catch (error) {
    console.log(error);
    return json({
      success: false,
      action: null,
      message: "Failed to update product",
    });
  }
}

const MenuIndex = () => {
  return (
    <>
      <Menu />
    </>
  );
};

export default MenuIndex;
