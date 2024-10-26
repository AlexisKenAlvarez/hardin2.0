import {
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/DataTable";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { cn } from "~/lib/utils";
import { action, loader } from "~/routes/_authenticated.admin.menu";
import { CategoryFilter } from "../types";
import { toast } from "sonner";

const Menu = () => {
  const { pageOptions, user, productsData, categoryData, categoryId } =
    useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  type UnwrapArray<T> = T extends (infer U)[] ? U : T;
  type productsDataType = UnwrapArray<typeof productsData>;

  const submit = useSubmit();
  const [searchParams, setSearchParams] = useSearchParams();
  const [toUpdate, setToUpdate] = useState<productsDataType>();
  const [
    ,
    // search
    setSearch,
  ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>({
    name: false,
    price: false,
    image: false,
    isActive: false,
    isBestSeller: false,
    isFeatured: false,
  });

  const categoryOptions = [
    {
      value: "name",
      label: "Name",
    },
    {
      value: "price",
      label: "Price",
    },
    {
      value: "image",
      label: "Image",
    },
    {
      value: "isActive",
      label: "Active",
    },
    {
      value: "isBestSeller",
      label: "Best Seller",
    },
    {
      value: "isFeatured",
      label: "Featured",
    },
  ];

  const columns: ColumnDef<productsDataType>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.original?.category;

        return (
          <div className="">
            <p className="">{category?.label}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "isBestSeller",
      header: "Best Seller",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="">
            <Switch
              disabled={state === "loading"}
              defaultChecked={product?.isBestSeller}
              onCheckedChange={(checked) => {
                if (product) {
                  setToUpdate({
                    ...product,
                    isBestSeller: checked,
                  });
                }
              }}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="">
            <Switch
              disabled={state === "loading"}
              defaultChecked={product?.isActive}
              onCheckedChange={(checked) => {
                if (product) {
                  setToUpdate({
                    ...product,
                    isActive: checked,
                  });
                }
              }}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (actionData?.action === "updateProduct" && actionData.success) {
      toast.success("Product updated successfully");
    }
  }, [actionData]);

  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <h1 className="  text-primary-brown text-2xl font-bold">
          List of products
        </h1>

        <Link to="/admin/add">
          <Button>
            <PlusCircle size={20} className="mr-2" />
            Add new product
          </Button>
        </Link>
      </div>

      <ul className="border-b flex gap-12  ">
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
                params.set("page", "1");
                setSearchParams(params);
              }}
            >
              <p className="">{items.label}</p>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between  ">
        <div className="flex gap-2">
          <Input
            type="text"
            name="search"
            className="rounded-xl max-w-sm"
            placeholder="Search a product"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button>Search</Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter By</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56  ">
            <DropdownMenuLabel>Filter column</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryOptions.map((item) => (
              <DropdownMenuCheckboxItem
                key={item.value}
                checked={
                  categoryFilter[item.value as keyof CategoryFilter] === true
                }
                onCheckedChange={(e) => {
                  const value = e;

                  setCategoryFilter((prevState) => ({
                    ...prevState,
                    [item.value]: value,
                  }));
                }}
              >
                {item.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="">
        <DataTable
          columns={columns}
          data={productsData as productsDataType[]}
          pageOptions={pageOptions}
        />
      </div>

      <Dialog
        open={!!toUpdate}
        onOpenChange={(e) => {
          if (!e) {
            setToUpdate(undefined);
          }
        }}
      >
        <DialogContent
          className=" "
          onInteractOutside={() => setToUpdate(undefined)}
        >
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to update this product?
            </DialogTitle>
            <DialogDescription>
              Please confirm if you want to proceed with updating the product
              details. This action will overwrite the existing product
              information.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                onClick={() => {
                  const formData = new FormData();
                  formData.append("id", toUpdate?.id.toString() ?? "");
                  formData.append("name", toUpdate?.name.toString() ?? "");
                  formData.append("price", toUpdate?.price.toString() ?? "");
                  formData.append(
                    "category",
                    toUpdate?.category.id.toString() ?? ""
                  );
                  formData.append(
                    "isBestSeller",
                    toUpdate?.isBestSeller.toString() ?? ""
                  );
                  formData.append(
                    "isActive",
                    toUpdate?.isActive.toString() ?? ""
                  );
                  formData.append("updated_by", user?.user.email ?? "");
                  formData.append("_action", "updateProduct");
                  submit(formData, { method: "post" });
                  setToUpdate(undefined);
                }}
              >
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Menu;
