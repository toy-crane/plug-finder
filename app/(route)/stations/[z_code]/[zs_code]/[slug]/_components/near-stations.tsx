import { getChargerTypeDescription } from "@/constants/chager-type";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import { Tables } from "@/types/generated";
import Link from "next/link";

type Props = {
  station: Tables<"stations">;
};

const NearStations = async ({ station }: Props) => {
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase.rpc("nearby_stations", {
    lat: station.lat,
    lng: station.lng,
    max_results: 11,
  });
  if (response.error) throw response.error;
  const nearStations = response.data.filter((st) => st.id !== station.id);

  return (
    <div>
      <div>주변 가까운 충전소</div>
      {nearStations.map((st) => (
        <div key={st.id}>
          <Link href={`/stations/${st.z_code}/${st.zs_code}/${st.slug}`}>
            {st.station_name} ({getChargerTypeDescription(st.charger_type)})
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NearStations;
