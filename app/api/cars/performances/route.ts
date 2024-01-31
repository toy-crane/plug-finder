import { Database, Tables } from "@/types/generated";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type request = Omit<Tables<"car_performances">, "created_at">;

export async function POST(request: NextRequest) {
  const requestParams = (await request.json()) as request;
  const response = await supabase.from("car_performances").insert({
    ...requestParams,
  });
  if (response.error) {
    throw response.error;
  }
  return Response.json({ result: "success" });
}
