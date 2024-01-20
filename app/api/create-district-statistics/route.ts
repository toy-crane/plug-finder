import { Database } from "@/types/generated";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const responseView = await supabase
    .from("grouped_station_by_zscode")
    .select("*");
  if (responseView.error) throw responseView.error;
  const groupedStationByZscode = responseView.data as {
    count: number;
    zs_code: string;
  }[];

  const mutate = await supabase
    .from("district_station_statistics")
    .upsert(groupedStationByZscode, {
      onConflict: "zs_code",
    });
  if (mutate.error) throw mutate.error;

  return Response.json({ result: "success" });
}
