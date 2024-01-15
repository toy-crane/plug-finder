"use client";
import Marker from "@/components/map/marker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
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
  const mapRef = useRef<kakao.maps.Map>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleMove = (map: kakao.maps.Map) => {
    const bound = map.getBounds();
    const level = map.getLevel();
    const params = new URLSearchParams(searchParams);
    params.set("lng", String(map.getCenter().getLng()));
    params.set("lat", String(map.getCenter().getLat()));
    params.set("minLng", String(bound.getSouthWest().getLng()));
    params.set("minLat", String(bound.getSouthWest().getLat()));
    params.set("maxLng", String(bound.getNorthEast().getLng()));
    params.set("maxLat", String(bound.getNorthEast().getLat()));
    params.set("level", String(level));
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <KakaoMap
      className="mb-2 round-md"
      onDragEnd={handleMove}
      onZoomChanged={handleMove}
      center={center}
      ref={mapRef}
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
          key={marker.to}
          text={marker.text}
          onClick={() => router.push(marker.to)}
        />
      ))}
    </KakaoMap>
  );
};

export default Map;
