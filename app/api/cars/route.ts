import { Database, Tables } from "@/types/generated";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type request = Omit<Tables<"cars">, "created_at" | "slug">;

export async function POST(request: NextRequest) {
  const { model, brand, trim, year, image_url } =
    (await request.json()) as request;
  const response = await supabase.from("cars").insert({
    model,
    brand,
    trim,
    year,
    image_url,
    slug: `${brand}-${model}-${trim}-${year}`,
  });
  if (response.error) {
    throw response.error;
  }
  return Response.json({ result: "success" });
}
