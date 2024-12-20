import { zodResolver } from "@hookform/resolvers/zod";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { ArrowBigLeft, Image, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { toast } from "sonner";
import { cn } from "~/lib/utils";

import getCroppedImg from "~/utils/getCroppedImage";
import { CroppedPixels, Price } from "../types";
import { loader, action } from "~/routes/_authenticated.admin.edit.$id";

const EditProductForm = () => {
  const data = useActionData<typeof action>();
  const { categoryData, product, subCategories } =
    useLoaderData<typeof loader>();
  console.log("🚀 ~ EditProductForm ~ product:", product);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [isImageMissing, setIsImageMissing] = useState(false);
  const [key, setKey] = useState(+new Date());
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    product.image
  );
  const [imgName, setImgName] = useState(product.image_url.split("_")[1]);
  const [croppedImage, setCroppedImage] = useState<string | null>(
    product.image
  );
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedPixels>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [cropping, setCropping] = useState(false);
  const [prices, setPrices] = useState<Price[]>([...product.prices]);

  const imageUploadRef = useRef<HTMLInputElement>(null);
  const submit = useSubmit();

  const categorySchema = z.object({
    label: z.string(),
    id: z.number(),
  });

  const formSchema = z.object({
    product_name: z
      .string()
      .min(2, { message: "Product name must have at least 2 characters" })
      .max(70, { message: "Product name must not exceed 70 characters" }),
    category: categorySchema,
    sub_category: categorySchema.nullish(),
    bestSeller: z.boolean().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: product.name,
      category: {
        label: product.label,
        id: product.category,
      },
      bestSeller: product.is_best_seller,
      sub_category: {
        label: product.sub_category,
        id: product.sub_category_id,
      },
    },
  });

  const onCropComplete = (_: unknown, croppedAreaPixels: CroppedPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(prices);
    if (!uploadedImage) {
      setIsImageMissing(true);
      return;
    }

    if (prices[0].price === null || prices[0].price === 0) {
      return;
    }

    try {
      if (form.getValues("category.id") === -1) {
        form.setError("category", {
          type: "manual",
          message: "Please select a category",
        });

        if (values.sub_category?.id === 1 && !values.sub_category.id) {
          form.setError("sub_category", {
            type: "manual",
            message: "Please select a drink category",
          });
        }
        return;
      }
      const formData = new FormData();
      formData.append("action", "add_product");
      formData.append("file_name", imgName);
      formData.append("file", croppedImage as string);
      formData.append(
        "price",
        JSON.stringify(prices.filter((x) => x.price !== null))
      );
      formData.append("product_values", JSON.stringify(values));

      submit(formData, { method: "post" });
    } catch (error) {
      console.log(error);
    }
  }

  const drinks_sub_categories = subCategories?.filter((x) => x.category === 1);

  useEffect(() => {
    if (data?.success) {
      form.reset();
      clearInputImageData();
      setKey(+new Date());
      setUploadedImage(null);
      setCroppedImage(null);
      setPrices([{ description: "", price: null }]);
    }
  }, [data, form]);

  const clearInputImageData = () => {
    if (imageUploadRef.current) {
      imageUploadRef.current.value = "";
    }
  };

  return (
    <div className="max-w-md">
      <Dialog open={cropping}>
        <DialogContent
          onInteractOutside={() => {
            setCropping(false);
            clearInputImageData();
          }}
        >
          <DialogHeader>
            <DialogTitle>Crop the product image</DialogTitle>
            <DialogDescription>
              Resize and reposition the product.
            </DialogDescription>
          </DialogHeader>

          <div className="h-96 mt-4 relative">
            {uploadedImage && (
              <Cropper
                image={uploadedImage}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>

          <Button
            onClick={async () => {
              const croppedImage = await getCroppedImg(
                uploadedImage as string,
                croppedAreaPixels
              );

              setCroppedImage(croppedImage as string);
              setCropping(false);
            }}
          >
            <span>Save</span>
          </Button>
        </DialogContent>
      </Dialog>

      <div className="items-center space-y-2">
        <Button
          className="flex items-center gap-1 rounded-xl"
          variant="outline"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBigLeft fill="black" size={18} />
          <p className="text-xs">Go back</p>
        </Button>

        <h1 className="text-2xl font-bold  ">Add New Product</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
          <FormField
            control={form.control}
            name="product_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" ">Product Name</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="e.g Spicy Salmon"
                    className="border-primary/20 !mt-1 placeholder-primary/60 outline-0   rounded-xl py-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" " />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="">
              <div className="flex w-full">
                <FormLabel className="w-full">Price</FormLabel>
                <FormLabel className="w-full mr-7">
                  Description - <span className="text-xs italic">Optional</span>
                </FormLabel>
              </div>
              <div className="space-y-3 mt-2">
                {prices.map((price, i) => (
                  <div className="relative flex gap-2 mt-1" key={i}>
                    <div className="relative w-full">
                      <p className="absolute left-4 -mt-[2px] translate-y-1/2  text-primary/60">
                        ₱
                      </p>
                      <Input
                        autoComplete="off"
                        type="number"
                        placeholder="150.00"
                        min="0"
                        className="border-primary/20 pl-8 placeholder-primary/60 outline-0   rounded-xl py-5"
                        value={price.price ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          console.log(e.target.value);
                          setPrices((current) => {
                            const newPrice = [...current];
                            newPrice[i].price = parseInt(e.target.value);

                            return newPrice;
                          });
                        }}
                      />
                    </div>

                    <Input
                      autoComplete="off"
                      type="text"
                      placeholder="Description"
                      className="border-primary/20 placeholder-primary/60 outline-0   rounded-xl py-5"
                      value={price.description ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPrices((current) => {
                          const newPrice = [...current];
                          newPrice[i].description = e.target.value;

                          return newPrice;
                        });
                      }}
                    />

                    <button
                      onClick={(e) => {
                        e.preventDefault();

                        setPrices((current) => {
                          const newPrice = [...current];
                          newPrice.splice(i, 1);

                          return newPrice;
                        });
                      }}
                      disabled={i === 0}
                      className={cn("text-red-500", {
                        "opacity-20": i === 0,
                      })}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {form.formState.isSubmitted && prices[0].price === null && (
              <p className="text-red-500 text-sm font-medium">
                Please enter valid price. {prices[0].price}
              </p>
            )}
            <Button
              variant={"secondary"}
              className="w-full flex items-center gap-2 justify-center"
              onClick={(e) => {
                e.preventDefault();

                if (prices.length >= 5) {
                  toast.error("You can only add up to 5 prices");
                  return;
                }
                setPrices((current) => [
                  ...current,
                  { description: "", price: null },
                ]);
              }}
            >
              <Plus size={15} />
              <p className="mt-[2px]">Add more price</p>
            </Button>
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" ">Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(e) => {
                      const value = categoryData?.find(
                        (item) => item?.id.toString() === e
                      );
                      field.onChange(value);

                      if (e !== "1") {
                        form.setValue("sub_category", null);
                      }
                    }}
                    key={key}
                  >
                    <SelectTrigger className="border-primary/20 rounded-xl">
                      {field.value ? (
                        <p className=" ">{field.value.label}</p>
                      ) : (
                        <p className="  text-primary/60">Category</p>
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className=" " value={"--"} key={"default"}>
                        --
                      </SelectItem>
                      {categoryData?.map((item) => (
                        <SelectItem
                          className=" "
                          value={item.id.toString()}
                          key={item.id}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className=" " />
              </FormItem>
            )}
          />

          {form.watch("category")?.id === 1 && (
            <FormField
              control={form.control}
              name="sub_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" ">Drink Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(e) => {
                        const value = drinks_sub_categories?.find(
                          (item) => item?.id.toString() === e
                        );
                        field.onChange(value);
                      }}
                      key={key}
                    >
                      <SelectTrigger className="border-primary/20 rounded-xl">
                        {field.value ? (
                          <p className=" ">{field.value.label}</p>
                        ) : (
                          <p className="  text-primary/60">--</p>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className=" " value={"--"} key={"default"}>
                          --
                        </SelectItem>
                        {drinks_sub_categories?.map((item) => (
                          <SelectItem
                            className=" "
                            value={item.id.toString()}
                            key={item.id}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className=" " />
                </FormItem>
              )}
            />
          )}

          <div className="relative">
            <div className="flex gap-2 items-center relative w-fit">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                ref={imageUploadRef}
                onChange={(e) => {
                  try {
                    if (e.target.files) {
                      const image_file = e.target.files[0];
                      const dateNow = new Date().toJSON();
                      setImgName(`${dateNow}_${image_file.name}`);

                      console.log("1");

                      const reader = new FileReader();
                      reader.readAsDataURL(image_file);
                      console.log("2");

                      reader.onload = (e) => {
                        const image_url = e.target?.result;
                        setUploadedImage(image_url as string);
                        setCropping(true);
                      };

                      console.log("3");
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="absolute cursor-pointer z-10 bg-black w-full h-full opacity-0"
              />
              <div className="p-3 rounded-lg bg-black/5">
                <Image className="" size={20} strokeWidth={1.5} />
              </div>

              <div className="  text-xs flex flex-col items-start justify-center">
                <div className="flex gap-1">
                  <h1
                    className={cn("font-bold", {
                      "text-red-500": isImageMissing,
                    })}
                  >
                    Choose File
                  </h1>
                  {isImageMissing && (
                    <p className="text-xs text-red-500">
                      &#40;Image is required&#41;
                    </p>
                  )}
                </div>
                <p className="text-primary/70">
                  Upload an image for this product
                </p>
              </div>
            </div>

            {croppedImage && (
              <img src={croppedImage} alt="Uploaded product" className="mt-3" />
            )}
          </div>

          <FormField
            control={form.control}
            name="bestSeller"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="  flex items-center gap-2">
                    <Checkbox
                      id="bestSeller"
                      defaultChecked={field.value}
                      onCheckedChange={(v) => field.onChange(v)}
                      checked={field.value}
                    />
                    <label
                      htmlFor="bestSeller"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-1"
                    >
                      Mark this product as best seller
                    </label>
                  </div>
                </FormControl>
                <FormMessage className=" " />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full rounded-xl"
            disabled={navigation.state !== "idle"}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProductForm;
