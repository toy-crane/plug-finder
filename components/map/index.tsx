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
};

const Map = ({ markers, center, level, className }: Props) => {
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
        width: "100%",
        height: "400px",
      }}
      level={level ?? 5} // 지도의 확대 레벨
    >
      <MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={5} // 클러스터 할 최소 지도 레벨
        styles={[
          {
            // calculator 각 사이 값 마다 적용될 스타일을 지정한다
            width: "30px",
            height: "30px",
            background: "#9b45c3",
            borderRadius: "15px",
            color: "#ffffff",
            textAlign: "center",
            fontWeight: "bold",
            lineHeight: "31px",
          },
        ]}
      >
        {markers.map((marker) => (
          <Marker
            onClick={() => router.push(marker.to)}
            {...marker}
            key={marker.to}
          />
        ))}
      </MarkerClusterer>
    </KakaoMap>
  );
};

export default Map;
