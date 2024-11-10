import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "~/components/ui/button";
import { createSupabaseServerClient } from "~/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);
  const { data } = await supabaseClient.auth.getSession();

  return {
    session: data.session,
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL!,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
    },
  };


}

export const meta: MetaFunction = () => {
  return [
    { title: "Hardin Cafe" },
    { name: "description", content: "Welcome to Hardin!" },
  ];
};

export default function Index() {
  const { session, env } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const supabase = createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
  return (
    <div className="text-center min-h-screen flex items-center flex-col justify-center">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">
        Welcome to Our Awesome Raffle App!
      </h1>
      <p className="text-xl text-gray-600">
        Create, join, and win exciting raffles with ease!
      </p>

      <div className="flex gap-2 mt-4 mx-auto w-fit">
        {session ? (
          <Button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate('.', { replace: true })
            }}
          >
            Sign out
          </Button>
        ) : (
          <Link to="/admin/signin">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
