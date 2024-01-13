"use client";
import Marker from "@/components/map/marker";
import { useRouter } from "next/navigation";
import { Map as KakaoMap } from "react-kakao-maps-sdk";

type Props = {
  markers: {
    position: { lat: number; lng: number };
    text: string;
    to: string;
  }[];
  center: { lat: number; lng: number };
};

const Map = ({ markers, center }: Props) => {
  const router = useRouter();
  return (
    <KakaoMap
      className="mb-2 round-md"
      center={center}
      style={{
        // 지도의 크기
        width: "100%",
        height: "400px",
      }}
      level={5} // 지도의 확대 레벨
    >
      {markers.map((marker) => (
        <Marker
          position={marker.position}
          key={marker.text}
          text={marker.text}
          onClick={() => router.push(marker.to)}
        />
      ))}
    </KakaoMap>
  );
};

export default Map;