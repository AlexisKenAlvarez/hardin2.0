import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  redirect,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { createSupabaseServerClient } from "~/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);
  const url = new URL(request.url);
  const categoryId = url.searchParams.get("category");

  if (!categoryId) {
    url.searchParams.set("category", "1");
    return redirect(url.toString());
  }

  const { data: categoryData } = await supabaseClient
    .from("products_category")
    .select("id, label")
    .eq("isActive", true);

  return {
    categoryData,
    categoryId,
  };
}

const Menu = () => {
  const { categoryData, categoryId } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [Search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState({
    name: true,
    price: true,
    image: true,
    isActive: true,
    isBestSeller: true,
    isFeatured: true
  })

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-secondary text-primary-brown text-2xl font-bold">
          List of products
        </h1>

        <Link to="/admin/add">
          <Button>
            <PlusCircle size={20} className="mr-2" />
            Add new product
          </Button>
        </Link>
      </div>

      <ul className="border-b flex gap-12 font-secondary mt-5">
        {categoryData?.map((items) => (
          <li key={items.id}>
            <button
              className={cn(" pb-2", {
                "border-b-4 border-primary text-primary":
                  categoryId === items.id.toString(),
              })}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set("category", items.id.toString());
                setSearchParams(params);
              }}
            >
              <p className="">{items.label}</p>
            </button>
          </li>
        ))}
      </ul>

      <div className="">
        <Input type="text" name="search" className="rounded-xl" placeholder="Search a product" />
      </div>
    </div>
  );
};

export default Menu;
