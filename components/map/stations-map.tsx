import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import Map from "./index";

type Props = {
  bounds: {
    minLng: number;
    minLat: number;
    maxLng: number;
    maxLat: number;
  };
  position: { lat: number; lng: number };
  level: number;
};

const StationsMap = async ({ bounds, position, level }: Props) => {
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase.rpc("stations_in_view", {
    min_long: 128.41814821920792,
    min_lat: 36.95845224220349,
    max_long: 129.72713763888697,
    max_lat: 37.39679548549105,
  });
  if (response.error) {
    throw Error(response.error.message);
  }
  const stations = response.data;
  const markers = stations.map((station) => ({
    position: {
      lat: station.lat,
      lng: station.lng,
    },
    text: station.station_name,
    to: `/stations/${station.z_code}/${station.zs_code}/${station.slug}`,
  }));

  return <Map markers={markers} center={position} />;
};

export default StationsMap;
