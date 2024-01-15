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
    minLng: Number(searchParams?.minLng ?? DEFAULT_POSITION.bounds.minLng),
    maxLng: Number(searchParams?.maxLng ?? DEFAULT_POSITION.bounds.maxLng),
    minLat: Number(searchParams?.minLat ?? DEFAULT_POSITION.bounds.minLat),
    maxLat: Number(searchParams?.maxLat ?? DEFAULT_POSITION.bounds.maxLat),
  };
  const level = Number(searchParams?.level ?? DEFAULT_POSITION.level);

  return (
    <div>
      <StationsMap bounds={bounds} position={position} level={level} />
    </div>
  );
}
