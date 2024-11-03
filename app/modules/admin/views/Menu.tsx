import {
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { Filter, Pencil, PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { DataTable } from "~/components/DataTable";
import { InputWithOptions } from "~/components/ui/input-with-options";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import { cn, UnwrapArray } from "~/lib/utils";
import { action, loader } from "~/routes/_authenticated.admin.menu";
import { CategoryFilterValues } from "../types";
import { Label } from "~/components/ui/label";

const Menu = () => {
  const {
    filterOptions,
    pageOptions,
    user,
    productsData,
    categoryData,
    categoryId,
  } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();

  type productsDataType = UnwrapArray<typeof productsData>;

  const submit = useSubmit();
  const [searchParams, setSearchParams] = useSearchParams();
  const [toUpdate, setToUpdate] = useState<productsDataType>();
  const [categoryFilter, setCategoryFilter] =
    useState<Partial<CategoryFilterValues>>();
  console.log("🚀 ~ Menu ~ categoryFilter:", categoryFilter);

  const columns: ColumnDef<productsDataType>[] = [
    {
      accessorKey: "image_url",
      header: "Image",
      cell: ({ row }) => {
        const productImage = row.original?.image_url;

        return (
          <Dialog>
            <DialogTrigger>
              <img
                src={productImage}
                alt={row.original?.name}
                className="w-14 h-14 rounded-md"
              />
            </DialogTrigger>
            <DialogContent>
              <img src={productImage} alt={row.original?.name} />
            </DialogContent>
          </Dialog>
        );
      },
    },
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
    {
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <Button size="sm" className="flex items-center gap-1">
            <Pencil size={10} className="-mt-[2px]" />
            <span>Edit</span>
          </Button>
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
      <div className="">
        <div className="flex justify-between sm:flex-row flex-col gap-2">
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

        <ul className=" gap-12  lg:flex hidden mt-10">
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

        <Select
          onValueChange={(val) => {
            const params = new URLSearchParams(searchParams);
            params.set("category", val);
            params.set("page", "1");
            setSearchParams(params);
          }}
        >
          <SelectTrigger
            className="w-[180px]  mb-4  mt-3 lg:hidden flex"
            defaultValue={
              categoryData?.find((x) => x.id === +categoryId)?.label
            }
          >
            <SelectValue
              placeholder={
                categoryData?.find((x) => x.id === +categoryId)?.label
              }
            />
          </SelectTrigger>
          <SelectContent>
            {categoryData?.map((items) => (
              <SelectItem
                key={items.id}
                value={items.id.toString()}
                className={cn(" pb-2", {
                  " !text-primary": categoryId === items.id.toString(),
                })}
              >
                <p className="">{items.label}</p>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Separator />
      </div>

      <div className="flex justify-between sm:flex-row flex-col gap-3 ">
        <Button variant="outline" className="gap-1">
          <Filter size={14} />
          <span>Filter By</span>
        </Button>
      </div>

      <div className="w-full p-3 px-4 bg-gray-50">
        <div className="flex gap-2 items-end">
          <InputWithOptions
            opts={filterOptions.nameOpts}
            label="Name"
            placeholder="Filter by name"
            value={{
              value: categoryFilter?.name ?? "",
              label: categoryFilter?.name ?? "",
            }}
            onChange={(e) => {
              setCategoryFilter({
                ...categoryFilter,
                name: e.value,
              });
            }}
          />

          <InputWithOptions
            opts={filterOptions.priceOpts}
            label="Price"
            placeholder="Filter by price"
            value={{
              value: categoryFilter?.price ?? "",
              label: categoryFilter?.price ?? "",
            }}
            onChange={(e) => {
              setCategoryFilter({
                ...categoryFilter,
                price: e.value,
              });
            }}
          />

          <div className="space-y-1">
            <p className="text-xs font-medium">Best Seller</p>
            <Select
              onValueChange={(value) => {
                setCategoryFilter({
                  ...categoryFilter,
                  isBestSeller: value,
                });
              }}
            >
              <SelectTrigger className="w-[180px]">
                {categoryFilter?.isBestSeller ? (
                  <SelectValue />
                ) : (
                  <p className="opacity-60">Filter by best seller</p>
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium">Active</p>
            <Select
              onValueChange={(value) => {
                setCategoryFilter({
                  ...categoryFilter,
                  isActive: value,
                });
              }}
            >
              <SelectTrigger className="w-[180px]">
                {categoryFilter?.isActive ? (
                  <SelectValue />
                ) : (
                  <p className="opacity-60">Filter by active</p>
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium">Date</p>
            <Select
              onValueChange={(value) => {
                setCategoryFilter({
                  ...categoryFilter,
                  date: value,
                });
              }}
            >
              <SelectTrigger className="w-[180px]">
                {categoryFilter?.date ? (
                  <SelectValue />
                ) : (
                  <p className="opacity-60">Filter by date</p>
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="gap-1 mb-1" size={"sm"} onClick={() => {
            
          }}>
            <Search size={14} className="-mt-1" />
            Search
          </Button>
        </div>
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
