import BreadcrumbNavigation from "@/components/nav/breadcrumb-nav";
import { getDistrictDescription } from "@/constants/districts";
import { getRegionDescription } from "@/constants/regions";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

interface Props {
  params: { z_code: string; zs_code: string };
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
    .eq("z_code", z_code);
  if (response.error) {
    throw Error(response.error.message);
  }

  const stationCount = response.count;
  console.log(stationCount, z_code, zs_code);

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

const Page = async ({ params }: Props) => {
  const { z_code, zs_code } = params;
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase
    .from("stations")
    .select("*")
    .eq("zs_code", params.zs_code);
  if (response.error) throw response.error;
  // 404 페이지 에러 추가
  const stations = response.data;
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
      <h1 className="text-[48px]">{getDistrictDescription(params.zs_code)}</h1>
      <div className="flex flex-col">
        {stations.map((st) => (
          <Link
            key={st.id}
            href={`/stations/${st.z_code}/${st.zs_code}/${st.slug}`}
          >
            {st.station_name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Page;
