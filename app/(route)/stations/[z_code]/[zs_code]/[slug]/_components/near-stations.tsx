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
    <>
      <h2 className="text-3xl font-semibold md:text-3xl mb-5">
        주변 가까운 충전소
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {nearStations.map((st) => (
          <Link
            href={`/stations/${st.z_code}/${st.zs_code}/${st.slug}`}
            className="flex justify-between space-x-4 cursor-pointer p-2 rounded-md hover:bg-stone-50"
            key={st.id}
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl">{st.station_name}</h3>
              <div>
                <p className="text-sm font-medium leading-none">{st.address}</p>
                <p className="text-sm text-muted-foreground">
                  {getChargerTypeDescription(st.charger_type)}({st.output} kW) /{" "}
                  {st.charger_count}대
                </p>
              </div>
            </div>
            <div className="self-center text-xl">
              {st.dist_meters > 1000
                ? `${(st.dist_meters / 1000).toFixed(1)}KM 근처`
                : `${st.dist_meters.toFixed(0)}M 근처`}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default NearStations;
