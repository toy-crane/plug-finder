import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getChargerTypeDescription } from "@/constants/chager-type";
import { cn } from "@/lib/utils";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import { Tables } from "@/types/generated";
import Link from "next/link";

type CardProps = React.ComponentProps<typeof Card> & {
  station: Tables<"stations"> & {
    chargers: Tables<"chargers">[];
  };
};

const NearStations = async ({ station, className, ...props }: CardProps) => {
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase.rpc("nearby_stations", {
    latitude: station.lat,
    longitude: station.lng,
    max_results: 11,
  });
  if (response.error) throw response.error;
  const nearStations = response.data.filter((st) => st.id !== station.id);

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>주변 가까운 충전소</CardTitle>
      </CardHeader>
      <CardContent>
        {nearStations.map((st) => (
          <div key={st.id}>
            <Link href={`/stations/${st.z_code}/${st.zs_code}/${st.slug}`}>
              {st.station_name} ({getChargerTypeDescription(st.charger_type)}){" "}
              {st.dist_meters.toFixed(0)}m
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NearStations;
