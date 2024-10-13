import { zodResolver } from "@hookform/resolvers/zod";
import { Form as RemixForm, useSubmit } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  console.log("🚀 ~ action ~ actionType:", actionType)

  return {};
}

const Signin = () => {
  const submit = useSubmit();
  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });
  type FormType = z.infer<typeof formSchema>;
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "alexisken1432@gmail.com",
      password: "",
    },
  });

  return (
    <>

      <div className="relative flex h-screen w-full flex-col items-center justify-center">
        <div className="mt-16 flex flex-col items-center space-y-4 sm:mt-0">
          <img
            src="/logo.webp"
            alt="Logo"
            width={800}
            height={800}
            className="w-16"
          />

          <div className="text-center font-primary text-6xl text-primary sm:text-7xl">
            <h1 className="">HARDIN</h1>
            <h1 className="">CAFE</h1>
          </div>
        </div>

        <div className="mt-10 h-full w-full rounded-md p-5 pb-10 backdrop-blur-md sm:h-auto sm:max-w-sm space-y-4">
          <div className="">
            <h2 className="text-center font-secondary text-xl font-bold">
              Login as Admin
            </h2>
            <p className="text-center text-sm text-gray-600 font-secondary">
              Exclusive access for Hardin Cafe administrators and owners
            </p>
          </div>

          <div>
            <Form {...form} >
              <RemixForm
                method="post"
                onSubmit={form.handleSubmit(async (data: FormType) => {
                  const form = new FormData();
                  form.append("email", data.email);
                  form.append("password", data.password);
                  form.append("actionType", "signin");

                  submit(form, {
                    method: "post"
                  })
                })}
                className="space-y-2 font-secondary"
              >
                <input type="hidden" name="actionType" value="signin" />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Email"></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Password"
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mx-auto block w-full" type="submit">Login</Button>
              </RemixForm>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};


export default Signin;
