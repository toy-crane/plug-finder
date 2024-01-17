import StationsMap from "@/components/map/stations-map";
import { DEFAULT_POSITION } from "@/config/map";

interface Props {
  searchParams?: {
    minLng: string;
    minLat: string;
    maxLng: string;
    maxLat: string;
    lng: string;
    lat: string;
    level: string;
  };
}

export default function Home({ searchParams }: Props) {
  const position = {
    lat: Number(searchParams?.lat ?? DEFAULT_POSITION.position.lat),
    lng: Number(searchParams?.lng ?? DEFAULT_POSITION.position.lng),
  };
  const bounds = {
    minLng: Number(searchParams?.minLng ?? position.lng - 0.01),
    maxLng: Number(searchParams?.maxLng ?? position.lng + 0.01),
    minLat: Number(searchParams?.minLat ?? position.lat - 0.01),
    maxLat: Number(searchParams?.maxLat ?? position.lat + 0.01),
  };
  const level = Number(searchParams?.level ?? DEFAULT_POSITION.level);

  return (
    <div>
      <StationsMap bounds={bounds} position={position} level={level} />
    </div>
  );
}
