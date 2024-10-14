import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { createSupabaseServerClient } from "~/supabase.server";

export async function loader({request}: LoaderFunctionArgs) {
  const {supabaseClient} = createSupabaseServerClient(request);
  const session = await supabaseClient.auth.getSession();
  console.log("🚀 ~ loader ~ session:", session)
  return {
    session
  }
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const {session} = useLoaderData<typeof loader>();
  console.log(session.data);
  return (
    <div className="text-center min-h-screen flex items-center flex-col justify-center">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">
        Welcome to Our Awesome Raffle App!
      </h1>
      <p className="text-xl text-gray-600">
        Create, join, and win exciting raffles with ease!
      </p>

      <div className="flex gap-2 mt-4 mx-auto w-fit">
        <Link to="/admin/signin">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
}
