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
import { getChargerTypeDescription } from "@/constants/chager-type";
import ShareButton from "./_component/share-button";
import Pagination from "./_component/pagination";
import { siteConfig } from "@/config/site";

interface Props {
  params: { z_code: string; zs_code: string };
  searchParams: {
    pageNo?: string;
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
    )}의 모든 전기차 주차장 충전소 리스트`;
    const description = `
      ${getRegionDescription(z_code)} ${getDistrictDescription(
      zs_code
    )}에는 ${stationCount.toLocaleString()}개의 충전소(급속, 완속)가 있습니다.
      보다 자세한 정보가 궁금하다면? 플러그 파인더 홈페이지에서 확인하세요.
      주차 가능 여부, 외부인 개방, 영업시간, 충전기 타입, 충전기 출력 등의 모든 정보를 확인 하실 수 있습니다.
    `;
    const url = `${siteConfig.url}/stations/${z_code}/${zs_code}`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: [...previousImages],
      },
      twitter: {
        title,
        description,
        images: [...previousImages],
      },
      alternates: {
        canonical: url,
      },
    };
  } else {
    return {};
  }
}

const PER_PAGE = 20;

const Page = async ({ params, searchParams }: Props) => {
  const { z_code, zs_code } = params;
  const { pageNo = "1" } = searchParams;
  const supabase = await createSupabaseServerClientReadOnly();

  const totalCountResponse = await supabase
    .from("stations")
    .select("*", {
      count: "exact",
    })
    .eq("zs_code", zs_code);
  if (totalCountResponse.error) throw totalCountResponse.error;
  const totalCount = totalCountResponse.count;
  if (!totalCount) throw new Error("Not Found");

  const currentPage = parseInt(pageNo);
  const startIndex = (currentPage - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE - 1;

  const response = await supabase
    .from("stations")
    .select("*, chargers(*)")
    .eq("zs_code", params.zs_code)
    .range(startIndex, endIndex);
  if (response.error) throw response.error;
  // 404 페이지 에러 추가
  const stations = response.data;

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
      <section className="mb-6">
        <div className="flex justify-between items-center my-6">
          <div>
            <h1 className="text-3xl font-semibold md:text-5xl mb-1">
              {getDistrictDescription(params.zs_code)} 전기차 충전소
            </h1>
            <p className="text-lg text-muted-foreground">
              {totalCount}개 충전소
            </p>
          </div>

          <ShareButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {stations.map((st) => (
            <Link
              href={`/stations/${st.z_code}/${st.zs_code}/${st.slug}`}
              className="flex justify-between space-x-4 cursor-pointer p-2 rounded-md hover:bg-stone-50"
              key={st.id}
            >
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl">{st.station_name}</h2>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {st.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {getChargerTypeDescription(st.charger_type)} / {st.output}{" "}
                    kW
                  </p>
                </div>
              </div>
              <div className="self-center text-xl">{st.chargers.length}대</div>
            </Link>
          ))}
        </div>
      </section>
      <section className="mb-14">
        <Pagination
          currentPage={currentPage}
          zCode={z_code}
          zsCode={zs_code}
          totalCount={totalCount}
        />
      </section>
    </>
  );
};

export default Page;
