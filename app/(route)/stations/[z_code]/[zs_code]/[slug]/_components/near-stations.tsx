import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import { Tables } from "@/types/generated";

type Props = {
  station: Tables<"stations">;
};

const NearStations = async ({ station }: Props) => {
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase.rpc("nearby_stations", {
    lat: station.lat,
    lng: station.lng,
    max_results: 10,
  });
  if (response.error) throw response.error;
  const nearStations = response.data;

  return (
    <div>
      <div>주변 가까운 충전소</div>
      {nearStations.map((st) => (
        <div key={st.id}>
          <div>{st.station_name}</div>
        </div>
      ))}
    </div>
  );
};

export default NearStations;
