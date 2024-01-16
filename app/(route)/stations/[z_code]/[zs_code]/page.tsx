import BreadcrumbNavigation from "@/components/nav/breadcrumb-nav";
import {
  getDistrictDescription,
  getDistrictPosition,
} from "@/constants/districts";
import { getRegionDescription } from "@/constants/regions";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import Map from "@/components/map";
import StationsMap from "@/components/map/stations-map";
import { getChargerTypeDescription } from "@/constants/chager-type";

interface Props {
  params: { z_code: string; zs_code: string };
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

export async function generateMetadata(
  { params: { z_code, zs_code } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase
    .from("stations")
    .select("*", { count: "exact" })
    .eq("zs_code", zs_code)
    .eq("z_code", z_code)
    .order("display_station_name", { ascending: true });
  if (response.error) {
    throw Error(response.error.message);
  }

  const stationCount = response.count;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  if (stationCount) {
    const title = `${getRegionDescription(z_code)} ${getDistrictDescription(
      zs_code
    )}의 모든 전기차 충전소`;
    const description = `
      ${getDistrictDescription(
        zs_code
      )}에는 ${stationCount}개의 충전소가 있습니다.
      보다 자세한 정보가 궁금하다면? 플러그 파인더 홈페이지에서 확인하세요.
    `;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [...previousImages],
      },
      twitter: {
        title,
        description,
        images: [...previousImages],
      },
      alternates: {
        canonical: `/stations/${z_code}/${zs_code}`,
      },
    };
  } else {
    return {};
  }
}

const getDefaultBounds = (position: { lat: number; lng: number }) => {
  const { lat, lng } = position;
  const lngLevel = 0.1;
  const latLevel = 0.05;
  return {
    minLng: lng - lngLevel,
    maxLng: lng + lngLevel,
    minLat: lat - latLevel,
    maxLat: lat + latLevel,
  };
};

const Page = async ({ params, searchParams }: Props) => {
  const { z_code, zs_code } = params;
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase
    .from("stations")
    .select("*, chargers(*)")
    .eq("zs_code", params.zs_code);
  if (response.error) throw response.error;
  // 404 페이지 에러 추가
  const stations = response.data;

  const position = {
    lat: searchParams?.lat
      ? Number(searchParams.lat)
      : getDistrictPosition(zs_code).lat,
    lng: searchParams?.lng
      ? Number(searchParams.lng)
      : getDistrictPosition(zs_code).lng,
  };

  const bounds = {
    minLng: searchParams?.minLng
      ? Number(searchParams.minLng)
      : getDefaultBounds(position).minLng,
    maxLng: searchParams?.maxLng
      ? Number(searchParams.maxLng)
      : getDefaultBounds(position).maxLng,
    minLat: searchParams?.minLat
      ? Number(searchParams.minLat)
      : getDefaultBounds(position).minLat,
    maxLat: searchParams?.maxLat
      ? Number(searchParams.maxLat)
      : getDefaultBounds(position).maxLat,
  };

  if (stations.length === 0) {
    return;
  }

  const markers = stations.map((station) => ({
    position: { lat: station.lat, lng: station.lng },
    text: station.station_name,
    to: `/stations/${station.z_code}/${station.zs_code}/${station.slug}`,
    selected: false,
  }));

  return (
    <>
      <BreadcrumbNavigation
        trail={[
          { title: "전국", link: "/stations" },
          { title: getRegionDescription(z_code), link: `/stations/${z_code}` },
          {
            title: getDistrictDescription(zs_code),
            link: `/stations/${z_code}/${zs_code}`,
          },
        ]}
      />
      <Map markers={markers} center={getDistrictPosition(zs_code)} />
      <section className="mb-14">
        <h1 className="text-5xl my-6">
          {getDistrictDescription(params.zs_code)} 전기차 충전소
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {stations.map((st) => (
            <Link
              href={`/stations/${st.z_code}/${st.zs_code}/${st.slug}`}
              className="flex justify-between space-x-4 cursor-pointer p-2 rounded-md hover:bg-stone-50"
              key={st.id}
            >
              <div className="flex flex-col gap-1">
                <h2 className="text-xl">{st.station_name}</h2>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {st.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {getChargerTypeDescription(st.charger_type)} /{" "}
                    {st.chargers.length}대
                  </p>
                </div>
              </div>
              <div className="self-center">3/{st.chargers.length} 이용가능</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Page;
