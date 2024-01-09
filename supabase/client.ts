import type { Database } from "@/types/generated";
import { createBrowserClient } from "@supabase/ssr";

export default function createSupabaseBrowerClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
