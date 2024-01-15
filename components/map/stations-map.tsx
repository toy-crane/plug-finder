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
    min_long: bounds.minLng,
    min_lat: bounds.minLat,
    max_long: bounds.maxLng,
    max_lat: bounds.maxLat,
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
