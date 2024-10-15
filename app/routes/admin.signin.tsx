import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";

import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { createBrowserClient } from "@supabase/ssr";
import { AlertCircle, Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import HardinLogo from "~/components/logo";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

// import { createSupabaseServerClient } from "~/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get("error");
  const existing = searchParams.get("existing");

  return {
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL!,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
    },
    error,
    existing,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const actionType = formData.get("action");

  console.log(actionType);

  return {};
}

const Signin = () => {
  const { env, error, existing } = useLoaderData<typeof loader>();
  const supabase = createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  return (
    <>
      <div className="relative flex h-screen w-full flex-col items-center justify-center">
        <div className="mt-16 flex flex-col items-center space-y-4 sm:mt-0">
          <HardinLogo link="/" />
          <div className="text-center font-primary text-4xl sm:text-6xl text-primary md:text-7xl">
            <h1 className="">HARDIN</h1>
            <h1 className="">CAFE</h1>
          </div>
        </div>

        <div className="sm:mt-10 mt-4 h-full w-full rounded-md p-5 pb-10 backdrop-blur-md sm:h-auto sm:max-w-sm space-y-4">
          <div className="">
            <h2 className="text-center font-secondary text-xl font-bold">
              Login as Admin
            </h2>
            <p className="text-center text-sm text-gray-600 font-secondary">
              Exclusive access for Hardin Cafe administrators and owners
            </p>
          </div>

          <div className="w-full space-y-4">
            {existing && error && error === "oauth conflict" && (
              <Alert variant="destructive" className="font-secondary">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  A <span className="capitalize font-bold">{existing}</span> account
                  is already associated with this email.
                </AlertDescription>
              </Alert>
            )}

            <Button
              className="w-full gap-x-2"
              variant={"secondary"}
              onClick={async () => {
                try {
                  await supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                      redirectTo: `${window.location.origin}/auth/callback`,
                    },
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <FcGoogle size={17} />
              <p>Sign in with Google</p>
            </Button>

            <Button
              className="w-full gap-x-2"
              variant={"secondary"}
              onClick={async () => {
                try {
                  await supabase.auth.signInWithOAuth({
                    provider: "github",
                    options: {
                      redirectTo: `${window.location.origin}/auth/callback`,
                    },
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <Github size={17} />
              <p>Sign in with Github</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
