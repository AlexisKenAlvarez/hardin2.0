import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { createSupabaseServerClient } from "~/supabase.server";

import { PageOptions } from "~/lib/types";
import { GetAdminFilterOptions, UpdateProduct } from "~/modules/admin/api";
import { ProductData, ProductUpdate } from "~/modules/admin/types";
import Menu from "~/modules/admin/views/Menu";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);
  const url = new URL(request.url);

  const { searchParams } = url;

  const categoryId = url.searchParams.get("category");

  const { data: user } = await supabaseClient.auth.getSession();

  const pageSize = searchParams.get("pageSize") || "10";
  const page = searchParams.get("page") || "1";

  const bestSeller = searchParams.get("isBestSeller");
  const isActive = searchParams.get("isActive");

  const searchFilters = {
    name: searchParams.get("name"),
    price: searchParams.get("price"),
    isBestSeller:
      bestSeller === "" || bestSeller === null ? null : bestSeller === "true",
    isActive: isActive === "" || isActive === null ? null : isActive === "true",
    order: searchParams.get("order"),
    sub_category: searchParams.get("sub_category"),
  };

  if (!categoryId) {
    searchParams.set("category", "1");
    return redirect(url.toString());
  }

  const { data: categoryData } = await supabaseClient
    .from("products_category")
    .select("id, label")
    .eq("is_active", true);

  const { data: productsData, count } = await supabaseClient
    .rpc(
      "filter_products",
      {
        active: searchFilters.isActive as boolean,
        bestseller: searchFilters.isBestSeller as boolean,
        name_filter: searchFilters.name ?? "",
        price_filter: searchFilters.price ?? "",
        order: searchFilters.order ?? "",
        category_filter: categoryId ?? "",
        sub_category_filter: searchFilters.sub_category ?? "",
        id_filter: '',
      },
      {
        count: "exact",
      }
    )
    .select("*")
    .range((Number(page) - 1) * +pageSize, +pageSize * +page - 1);

  const pageOptions: PageOptions = {
    pageSize: Number(pageSize),
    page: Number(page),
    pages: Math.ceil((count ?? 0) / Number(pageSize)),
    total: count,
  };

  const filterOptions = await GetAdminFilterOptions({
    request,
    category: categoryId,
  });

  const typedProductsData = productsData as unknown as ProductData[];

  const productsWithImage = typedProductsData?.flatMap(
    (product: ProductData) => {
      return {
        ...product,
        prices: product.prices.sort((a, b) => a.price! - b.price!),
        image_url: product.image_url
          ? `${process.env.SUPABASE_URL}/storage/v1/object/public/hardin/products/${product.image_url}`
          : "",
      };
    }
  );

  return {
    filterOptions: filterOptions ?? [],
    pageOptions,
    productsData: productsWithImage ?? [],
    categoryData: categoryData ?? [],
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

      return {
        success: true,
        action: formData.get("_action"),
        message: "Product updated successfully",
      };
    }

    return {
      success: true,
      action: formData.get("_action"),
      message: "Product action success",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      action: null,
      message: "Failed to update product",
    };
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
