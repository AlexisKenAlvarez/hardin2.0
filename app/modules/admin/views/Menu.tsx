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
import { DataTable } from "~/components/DataTable";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { cn, UnwrapArray } from "~/lib/utils";
import { action, loader } from "~/routes/_authenticated.admin.menu";
import { CategoryFilter } from "../types";
import { toast } from "sonner";
import { Separator } from "~/components/ui/separator";

const Menu = () => {
  const { pageOptions, user, productsData, categoryData, categoryId } =
    useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();

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
