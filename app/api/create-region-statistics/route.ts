import { districtCodes, getDistrictDescription } from "@/constants/districts";
import { Database } from "@/types/generated";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import Bottleneck from "bottleneck";
import { add } from "date-fns";
import { getRegionDescription } from "@/constants/regions";

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
    .from("grouped_station_by_zcode")
    .select("*");
  if (responseView.error) throw responseView.error;
  const groupedStationByZcode = responseView.data as {
    count: number;
    z_code: string;
  }[];

  const mutate = await supabase
    .from("region_station_statistics")
    .upsert(groupedStationByZcode, {
      onConflict: "z_code",
    });
  if (mutate.error) throw mutate.error;

  return Response.json({ result: "success" });
}
