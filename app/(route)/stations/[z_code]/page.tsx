import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import Link from "next/link";
import { getRegionDescription, regionCodes } from "@/constants/regions";
import { Tables } from "@/types/generated";
import {
  districtCodes,
  getDistrictCodesInRegion,
  getDistrictDescription,
} from "@/constants/districts";
import BreadcrumbNavigation from "@/components/nav/breadcrumb-nav";
import { Metadata, ResolvingMetadata } from "next";
import ShareButton from "./[zs_code]/_component/share-button";
import { siteConfig } from "@/config/site";

interface Props {
  params: { z_code: string };
}

type station = Tables<"stations">;

export async function generateMetadata(
  { params: { z_code } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase
    .from("stations")
    .select("*", { count: "exact" })
    .eq("z_code", z_code);
  if (response.error) {
    throw Error(response.error.message);
  }
  const stationCount = response.count;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  if (stationCount) {
    const title = `${getRegionDescription(
      z_code
    )}의 모든 전기차 주차장 충전소 리스트`;
    const description = `
      ${getRegionDescription(
        z_code
      )}에는 전기차 충전소가 ${stationCount.toLocaleString()}개의 충전소(급속, 완속)가 있습니다.
      보다 자세한 정보가 궁금하다면? 플러그 파인더 홈페이지에서 확인하세요.
      주차 가능 여부, 외부인 개방, 영업시간, 충전기 타입, 충전기 출력 등의 모든 정보를 확인 하실 수 있습니다.
    `;
    const url = `${siteConfig.url}/stations/${z_code}`;
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

const Page = async ({ params }: Props) => {
  const z_code = params.z_code;
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase
    .from("stations")
    .select("*", { count: "exact" })
    .eq("z_code", params.z_code)
    .order("zs_code");
  if (response.error) throw response.error;

  const responseView = await supabase
    .from("grouped_station_by_zscode")
    .select("*");
  if (responseView.error) throw responseView.error;
  const groupedStationByZscode = responseView.data;

  const count = response.count;

  // 섹션 출력
  return (
    <div className="flex flex-col mb-24">
      <BreadcrumbNavigation
        trail={[
          { title: "전국", link: "/stations" },
          { title: getRegionDescription(z_code), link: `/stations/${z_code}` },
        ]}
      />
      <div className="flex justify-between items-center my-6">
        <div>
          <h1 className="text-3xl font-semibold md:text-5xl mb-1">
            {getRegionDescription(params.z_code)} 전기차 충전소
          </h1>
          <p className="text-lg text-muted-foreground">
            {count?.toLocaleString()}개 충전소
          </p>
        </div>
        <ShareButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        {getDistrictCodesInRegion(z_code).map((districtCode) => (
          <>
            <Link
              href={`/stations/${z_code}/${districtCode}`}
              className="flex justify-between space-x-4 cursor-pointer p-4 rounded-md hover:bg-stone-50 items-center"
              key={districtCode}
            >
              <h2 className="text-2xl">
                {getDistrictDescription(districtCode)}
              </h2>
              <div className="self-center text-xl">
                {groupedStationByZscode
                  ?.find((stations) => stations.zs_code === districtCode)
                  ?.count?.toLocaleString()}
                개
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
};

export default Page;
