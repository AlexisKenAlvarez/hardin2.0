import { createServerClient } from "@supabase/ssr";
import { Database } from "supabase/types";


export const createAdminSupabaseClient = () => {
  const headers = new Headers();

  const supabase = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
      },
    }
  );
  return { supabase, headers };
};
