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
    const title = `${getRegionDescription(z_code)}의 모든 전기차 충전소`;
    const description = `
      ${getRegionDescription(
        z_code
      )}에는 전기차 충전소가 ${stationCount}개의 충전소가 있습니다. 
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
        canonical: `/stations/${z_code}`,
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
    .select("*")
    .eq("z_code", params.z_code)
    .order("zs_code");
  if (response.error) throw response.error;

  // 섹션 출력
  return (
    <div className="flex flex-col">
      <BreadcrumbNavigation
        trail={[
          { title: "전국", link: "/stations" },
          { title: getRegionDescription(z_code), link: `/stations/${z_code}` },
        ]}
      />
      <h1 className="text-[48px]">{getRegionDescription(z_code)}</h1>
      <div className="flex flex-wrap gap-4">
        {getDistrictCodesInRegion(z_code).map((districtCode) => (
          <Link
            key={districtCode}
            href={`/stations/${z_code}/${districtCode}`}
            className="text-[36px]"
          >
            {getDistrictDescription(districtCode)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
