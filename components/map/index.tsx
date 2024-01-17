"use client";
import Marker from "@/components/map/marker";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Map as KakaoMap, MarkerClusterer } from "react-kakao-maps-sdk";

type Props = {
  markers: {
    position: { lat: number; lng: number };
    text: string;
    to: string;
    selected?: boolean;
  }[];
  center: { lat: number; lng: number };
  level?: number;
  className?: string;
  size?: {
    width: string;
    height: string;
  };
};

const Map = ({ markers, center, level, className, size }: Props) => {
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
      className={cn("mb-2 round-md", className)}
      onDragEnd={handleMove}
      onZoomChanged={handleMove}
      center={center}
      ref={mapRef}
      style={{
        // 지도의 크기
        width: size?.width ?? "100%",
        height: size?.height ?? "400px",
      }}
      level={level ?? 5} // 지도의 확대 레벨
    >
      {markers.map((marker) => (
        <Marker
          onClick={() => router.push(marker.to)}
          {...marker}
          key={marker.to}
        />
      ))}
    </KakaoMap>
  );
};

export default Map;
