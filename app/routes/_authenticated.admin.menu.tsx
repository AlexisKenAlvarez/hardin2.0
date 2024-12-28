import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useRevalidator } from "@remix-run/react";

import { createAdminSupabaseClient } from "~/adminsupabase.server";
import { PageOptions } from "~/lib/types";
import { GetAdminFilterOptions, UpdateProduct } from "~/modules/admin/api";
import {
  ProductData,
  ProductUpdate,
  SearchParameters,
} from "~/modules/admin/types";
import Menu from "~/modules/admin/views/Menu";
import useTabFocus from "~/utils/useTabFocus";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase } = createAdminSupabaseClient();
  const url = new URL(request.url);

  const { searchParams } = url;

  const categoryId = url.searchParams.get("category");

  const { data: user } = await supabase.auth.getSession();

  const pageSize = searchParams.get("pageSize") || "10";
  const page = searchParams.get("page") || "1";

  const {
    name,
    isActive,
    price,
    isBestSeller: bestSeller,
  } = JSON.parse(searchParams.get("searchValues") ?? "{}") as SearchParameters;

  const searchFilters = {
    name: name ?? null,
    price: price ? price.toString() : null,
    isBestSeller: bestSeller ?? null,
    isActive: isActive ?? null,
    order: searchParams.get("order") ?? null,
    sub_category: searchParams.get("sub_category") ?? null,
  };

  if (!categoryId) {
    searchParams.set("category", "1");
    return redirect(url.toString());
  }

  const { data: categoryData } = await supabase
    .from("products_category")
    .select("id, label")
    .eq("is_active", true);

  const { data: productsData, count } = await supabase
    .rpc(
      "filter_products",
      {
        active: searchFilters.isActive as boolean,
        bestseller: searchFilters.isBestSeller as boolean,
        name_filter: searchFilters.name!,
        price_filter: searchFilters.price!,
        order: searchFilters.order!,
        category_filter: categoryId ?? "",
        sub_category_filter: searchFilters.sub_category!,
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
        productInfo: values,
      });

      return {
        success: true,
        action: formData.get("_action"),
        message: "Product updated successfully",
      };
    } else if (formData.get("_action") === "deleteProduct") {
      const id = formData.get("id") ?? 0;

      const { supabase } = createAdminSupabaseClient();
      await supabase.from("products_prices").delete().eq("product", id);
      await supabase.from("products").delete().eq("id", id);

      return {
        success: true,
        action: formData.get("_action"),
        message: "Product deleted successfully",
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
  const revalidator = useRevalidator();

  useTabFocus(() => {
    revalidator.revalidate();
  });

  return (
    <>
      <Menu />
    </>
  );
};

export default MenuIndex;
