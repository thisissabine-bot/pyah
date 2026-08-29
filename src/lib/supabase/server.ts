import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false },
    global: {
      // Voorkomt dat Netlify's Durable-cachelaag deze fetch-calls cachet — bleek in de
      // praktijk niet betrouwbaar af te gaan op alleen `export const dynamic = "force-dynamic"`
      // op de aanroepende route (zie CLAUDE.md, cache-bug rond het Toetsingsdocument).
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}
