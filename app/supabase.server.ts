import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'
import { Database } from 'supabase/types'
export const createSupabaseServerClient = (request: Request) => {
  const headers = new Headers()
  const supabaseClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '')
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append('Set-Cookie', serializeCookieHeader(name, value, options))
          )
        },
      },
    },
  )
  return { supabaseClient, headers }
}