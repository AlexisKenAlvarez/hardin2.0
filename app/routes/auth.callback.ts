import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createSupabaseServerClient } from "~/supabase.server";
export const loader = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (code) {
    const { supabase, headers } = createSupabaseServerClient(request);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    const session = await supabase.auth.getSession();
    const providerId = session.data.session?.user.user_metadata.provider_id;

    const identities = session?.data?.session?.user.identities;

    try {
      if (identities && identities.length > 1) {
        const toUnlink = identities?.find(
          (identity) => identity.id === providerId
        );

        const existingOauth = identities?.find(
          (identity) => identity.id !== providerId
        )?.provider;

        await supabase.auth.unlinkIdentity(toUnlink!);

        await supabase.auth.signOut();
        return redirect(
          `/admin/signin?error=oauth%20conflict&existing=${existingOauth}`
        );
      }

      if (error) {
        return redirect("/admin/signin");
      }
      return redirect("/", {
        headers,
      });
    } catch (error) {
      console.log(error);
      return new Response("Authentication failed", {
        status: 400,
      });
    }
  }
  return new Response("Authentication failed", {
    status: 400,
  });
};
