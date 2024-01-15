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

  const handlePosition = (map: kakao.maps.Map) => {
    const lng = map.getCenter().getLng();
    const lat = map.getCenter().getLat();
    const params = new URLSearchParams(searchParams);
    params.set("lng", String(lng));
    params.set("lat", String(lat));
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleZoom = (map: kakao.maps.Map) => {
    const level = map.getLevel();
    const params = new URLSearchParams(searchParams);
    params.set("level", String(level));
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();
      const minLng = bounds.getSouthWest().getLng();
      const minLat = bounds.getSouthWest().getLat();
      const maxLng = bounds.getNorthEast().getLng();
      const maxLat = bounds.getNorthEast().getLat();
      const params = new URLSearchParams(searchParams);
      params.set("minLng", String(minLng));
      params.set("minLat", String(minLat));
      params.set("maxLng", String(maxLng));
      params.set("maxLat", String(maxLat));
      router.replace(`${pathname}?${params.toString()}`);
    }
  });

  return (
    <KakaoMap
      className="mb-2 round-md"
      onDragEnd={handlePosition}
      onZoomChanged={handleZoom}
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
