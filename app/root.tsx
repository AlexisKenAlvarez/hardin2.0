import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import { Toaster } from "sonner";
import "./tailwind.css";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { createSupabaseServerClient } from "./supabase.server";
import { LoaderFunctionArgs } from "@remix-run/node";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-primary text-black2">
        {children}
        <ScrollRestoration />

        <Scripts />
      </body>
    </html>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);
  const { data } = await supabaseClient.auth.getSession();
  return {
    session: data.session,
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      BASE_URL: process.env.BASE_URL,
    },
  };
}

export default function App() {
  const { revalidate } = useRevalidator();

  const { env, session } = useLoaderData<typeof loader>();
  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!)
  );

  const serverAccessToken = session?.access_token;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        revalidate();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, serverAccessToken, revalidate]);
  return (
    <>
      <Toaster />
      <Outlet
        context={{
          supabase,
          session,
          env,
        }}
      />
    </>
  );
}
