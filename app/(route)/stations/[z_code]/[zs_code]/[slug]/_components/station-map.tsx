"use client";
import { Tables } from "@/types/generated";
import { StaticMap } from "react-kakao-maps-sdk";

type Props = {
  station: Tables<"stations">;
};

const StationMap = ({ station }: Props) => {
  return (
    <StaticMap // 지도를 표시할 Container
      className="mb-2 round-md"
      marker={[
        {
          position: {
            lat: Number(station.lat),
            lng: Number(station.lng),
          },
          text: station.station_name,
        },
      ]}
      center={{
        // 지도의 중심좌표
        lat: Number(station.lat),
        lng: Number(station.lng),
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "280px",
      }}
      level={6} // 지도의 확대 레벨
    />
  );
};

export default StationMap;
