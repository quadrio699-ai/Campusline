import { createClient } from "@supabase/supabase-js";

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!envUrl || !envAnonKey) {
  // Surfaces a clear message in the browser console during local dev instead
  // of a cryptic network error, and keeps builds from crashing before
  // .env.local has been set up. Form submissions just won't work until it is.
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars are missing. Copy .env.example to .env.local and fill in your project's URL and publishable/anon key."
  );
}

export const supabase = createClient(
  envUrl || "https://placeholder.supabase.co",
  envAnonKey || "placeholder-anon-key"
);
