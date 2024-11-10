import { zodResolver } from "@hookform/resolvers/zod";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { ArrowBigLeft, Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useEffect, useState } from "react";
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

import getCroppedImg from "~/utils/getCroppedImage";
import { action, loader } from "~/routes/_authenticated.admin.add";
import { CroppedPixels } from "../types";

const AddProductForm = () => {
  const data = useActionData<typeof action>();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [key, setKey] = useState(+new Date());
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imgName, setImgName] = useState("");
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedPixels>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [cropping, setCropping] = useState(false);
  const { categoryData } = useLoaderData<typeof loader>();
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
    price: z.string().min(1, { message: "Price must not be empty" }),
    category: categorySchema,
    featured: z.boolean().optional(),
    bestSeller: z.boolean().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      price: "0",
      category: {
        label: "--",
        id: -1,
      },
      featured: false,
      bestSeller: false,
    },
  });

  const onCropComplete = (_: unknown, croppedAreaPixels: CroppedPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (form.getValues("category.id") === -1) {
        form.setError("category", {
          type: "manual",
          message: "Please select a category",
        });
        return;
      }
      const formData = new FormData();
      formData.append("action", "add_product");
      formData.append("file_name", imgName);
      formData.append("file", croppedImage as string);
      formData.append("product_name", values.product_name);
      formData.append("price", values.price);
      formData.append("category", values.category.id.toString());
      formData.append("featured", (values.featured ?? "").toString());
      formData.append("best_seller", (values.bestSeller ?? "").toString());

      submit(formData, { method: "post" });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (data?.success) {
      form.reset();
      setKey(+new Date());
      setUploadedImage(null);
      setCroppedImage(null);
    }
  }, [data?.success, form]);

  return (
    <div className="max-w-md">
      <Dialog open={cropping}>
        <DialogContent onInteractOutside={() => setCropping(false)}>
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

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" ">Price</FormLabel>
                <FormControl>
                  <div className="relative">
                    <p className="absolute left-4 -mt-[2px] translate-y-1/2  text-primary/60">
                      ₱
                    </p>
                    <Input
                      autoComplete="off"
                      type="number"
                      placeholder="150.00"
                      min="0"
                      className="border-primary/20 pl-8 !mt-1 placeholder-primary/60 outline-0   rounded-xl py-5"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className=" " />
              </FormItem>
            )}
          />

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
                        (item) => item.id.toString() === e
                      );
                      field.onChange(value);
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

          <div className="relative">
            <div className="flex gap-2 items-center relative w-fit">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                  if (e.target.files) {
                    const image_file = e.target.files[0];
                    const dateNow = new Date().toJSON();
                    setImgName(`${dateNow}${image_file.name}`);

                    const reader = new FileReader();
                    reader.readAsDataURL(image_file);

                    reader.onload = (e) => {
                      const image_url = e.target?.result;
                      setUploadedImage(image_url as string);
                      setCropping(true);
                    };
                  }
                }}
                className="absolute cursor-pointer z-10 bg-black w-full h-full opacity-0"
              />
              <div className="p-3 rounded-lg bg-black/5">
                <Image className="" size={20} strokeWidth={1.5} />
              </div>

              <div className="  text-xs flex flex-col items-start justify-center">
                <h1 className="font-bold">Choose File</h1>
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
            name="featured"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="  flex items-center gap-2">
                    <Checkbox
                      id="featured"
                      defaultChecked={field.value}
                      onCheckedChange={(v) => field.onChange(v)}
                      checked={field.value}
                    />
                    <label
                      htmlFor="featured"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-1"
                    >
                      Feature this product in homepage section
                    </label>
                  </div>
                </FormControl>
                <FormMessage className=" " />
              </FormItem>
            )}
          />

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

export default AddProductForm;
