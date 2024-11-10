import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/react";
import { createSupabaseServerClient } from "~/supabase.server";

import { GetAdminFilterOptions, UpdateProduct } from "~/modules/admin/api";
import { ProductUpdate } from "~/modules/admin/types";
import Menu from "~/modules/admin/views/Menu";
import { UnwrapArray } from "~/lib/utils";
import { PageOptions } from "~/lib/types";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);
  const url = new URL(request.url);
  const categoryId = url.searchParams.get("category");
  const { searchParams } = url;

  const { data: user } = await supabaseClient.auth.getSession();

  const pageSize = searchParams.get("pageSize") || "10";
  const page = searchParams.get("page") || "1";

  const action = searchParams.get("action");

  const bestSeller = searchParams.get("isBestSeller");
  const isActive = searchParams.get("isActive");

  const searchFilters = {
    name: searchParams.get("name"),
    price: searchParams.get("price"),
    isBestSeller: bestSeller === "" ? null : bestSeller === "true",
    isActive: isActive === "" ? null : isActive === "true",
    order: searchParams.get("order"),
  };

  if (!categoryId) {
    searchParams.set("category", "1");
    return redirect(url.toString());
  }

  const { data: categoryData } = await supabaseClient
    .from("products_category")
    .select("id, label")
    .eq("is_active", true);

  let pageOptions: PageOptions = {
    pageSize: 0,
    page: 0,
    pages: 0,
    total: 0,
  };

  const getProducts = async () => {
    if (action === "search") {
      const { data: productsData, count } = await supabaseClient
        .rpc(
          "filter_products",
          {
            active: searchFilters.isActive as boolean,
            bestseller: searchFilters.isBestSeller as boolean,
            name_filter: searchFilters.name ?? "",
            price_filter: searchFilters.price ?? "",
            order: searchFilters.order ?? "",
            category_filter: categoryId ?? ''
          },
          {
            count: "exact",
          }
        )
        .select("*")
        .range((Number(page) - 1) * +pageSize, +pageSize * +page - 1);

      pageOptions = {
        pageSize: Number(pageSize),
        page: Number(page),
        pages: Math.ceil((count ?? 0) / Number(pageSize)),
        total: count,
      };

      return productsData;
    } else {
      const { data: productsData } = await supabaseClient
        .from("products")
        .select(
          "id, name, price, image_url, is_best_seller, is_active, category, ...products_category!inner(label)"
        )
        .eq("category", categoryId)
        .order("id", { ascending: false })
        .range((Number(page) - 1) * +pageSize, +pageSize * +page - 1);

      const { count } = await supabaseClient
        .from("products")
        .select("id", {
          count: "exact",
        })
        .eq("category", categoryId);

      pageOptions = {
        pageSize: Number(pageSize),
        page: Number(page),
        pages: Math.ceil((count ?? 0) / Number(pageSize)),
        total: count,
      };

      return productsData;
    }
  };
  const productsData = await getProducts();
  const filterOptions = await GetAdminFilterOptions({ request, category: categoryId });

  const productsWithImage = productsData?.map(
    (product: UnwrapArray<typeof productsData>) => {
      return {
        ...product,
        image_url: product.image_url
          ? `${process.env.SUPABASE_URL}/storage/v1/object/public/hardin/products/${product.image_url}`
          : "",
      };
    }
  );

  return {
    filterOptions,
    pageOptions,
    productsData: productsWithImage,
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
