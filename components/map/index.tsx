"use client";
import Marker from "@/components/map/marker";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Map as KakaoMap } from "react-kakao-maps-sdk";
import CurrentPositionButton from "./current-position-button";
import ZoomControl from "./zoom-control";

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
  showCurrentPosition?: boolean;
};

const Map = ({
  markers,
  center,
  level,
  className,
  size,
  showCurrentPosition,
}: Props) => {
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

  const zoomIn = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(map.getLevel() - 1);
  };

  const zoomOut = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(map.getLevel() + 1);
  };

  return (
    <>
      <div className="content-grid relative">
        <div className="absolute top-4 right-0 z-header">
          <div className="flex flex-col gap-4">
            {showCurrentPosition && <CurrentPositionButton />}
            <ZoomControl zoomIn={zoomIn} zoomOut={zoomOut} />
          </div>
        </div>
      </div>
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
    </>
  );
};

export default Map;
