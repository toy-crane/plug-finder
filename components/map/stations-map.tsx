import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import Map from "./index";
import { getDistrictPosition } from "@/constants/districts";
import { headers } from "next/headers";
import CurrentPositionButton from "./current-position-button";
import ZoomControl from "./zoom-control";

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

type Marker = {
  position: {
    lat: number;
    lng: number;
  };
  text: string;
  to: string;
  selected?: boolean | undefined;
  isCluster?: boolean;
};

const StationsMap = async ({ bounds, position, level }: Props) => {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const queryParams = headersList.get("x-query-params") || "";

  const supabase = await createSupabaseServerClientReadOnly();
  let markers: Marker[];
  if (level < 5) {
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
    markers = stations.map((station) => ({
      position: {
        lat: station.lat,
        lng: station.lng,
      },
      text: station.station_name,
      isCluster: false,
      to: `/stations/${station.z_code}/${station.zs_code}/${station.slug}`,
    }));
  } else {
    const response = await supabase
      .from("grouped_station_by_zscode")
      .select("*");
    if (response.error) {
      throw Error(response.error.message);
    }
    const stations = response.data;
    markers = stations.map((station) => {
      const params = new URLSearchParams(queryParams);
      const position = getDistrictPosition(station.zs_code!);
      params.set("level", String(4));
      params.set("lng", String(position.lng));
      params.set("lat", String(position.lat));
      params.delete("minLng");
      params.delete("minLat");
      params.delete("maxLng");
      params.delete("maxLat");
      return {
        position,
        text: String(station.count),
        isCluster: true,
        to: `${pathname}?${params.toString()}`,
      };
    });
  }

  return (
    <div>
      <div className="content-grid relative">
        <div className="absolute top-4 right-0 z-header">
          <div className="flex flex-col gap-4">
            <CurrentPositionButton />
            <ZoomControl />
          </div>
        </div>
      </div>
      <Map
        markers={markers}
        center={position}
        level={level}
        size={{ width: "100%", height: "100vh" }}
      />
    </div>
  );
};

export default StationsMap;
