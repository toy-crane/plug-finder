import BreadcrumbNavigation from "@/components/nav/breadcrumb-nav";
import { getChargerTypeDescription } from "@/constants/chager-type";
import { getDistrictDescription } from "@/constants/districts";
import { getRegionDescription } from "@/constants/regions";
import createSupabaseBrowerClient from "@/supabase/client";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import { get } from "http";
import type { Metadata, ResolvingMetadata } from "next";

// static 페이지 revalidation을 판단함
export const revalidate = 60;

interface Props {
  params: { slug: string; z_code: string; zs_code: string };
}

export async function generateStaticParams() {
  const supabase = createSupabaseBrowerClient();
  const response = await supabase
    .from("stations")
    .select("slug, z_code, zs_code");
  if (response.error) throw response.error;
  return response.data;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = await createSupabaseServerClientReadOnly();
  const slug = decodeURIComponent(params.slug);
  const query = supabase.from("stations").select(`*`).eq("slug", slug).single();
  const result = await query;
  if (result.error) {
    throw Error(result.error.message);
  }
  const station = result.data;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  if (station) {
    const title = `${getRegionDescription(
      station.z_code
    )} ${getDistrictDescription(station.zs_code)} ${
      station.station_name
    } 전기차 충전소`;
    const description = `
    충전 방식 - ${getChargerTypeDescription(station.charger_type)} \n
    충전기 이용방식 - ${station.method} 사용 \n
    주소 - ${station.address} \n 
    사용 가능시간 - ${station.usable_time} \n 
    운영 기관 - ${station.org_name} \n
    운영 기관 연락처 - ${station.org_contact} \n
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
        canonical: `/stations/${station.z_code}/${station.zs_code}/${station.slug}`,
      },
    };
  } else {
    return {};
  }
}

const Page = async ({ params }: Props) => {
  const { z_code, zs_code } = params;
  const slug = decodeURIComponent(params.slug);
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase
    .from("stations")
    .select("*, chargers(*)")
    .eq("slug", slug)
    .single();
  if (response.error) throw response.error;
  // 404 페이지 에러 추가
  const station = response.data;
  const chargers = station.chargers;
  return (
    <div>
      <BreadcrumbNavigation
        trail={[
          { title: "전국", link: "/stations" },
          { title: getRegionDescription(z_code), link: `/stations/${z_code}` },
          {
            title: getDistrictDescription(zs_code),
            link: `/stations/${z_code}/${zs_code}`,
          },
          {
            title: station.station_name,
            link: `/stations/${z_code}/${zs_code}/${slug}`,
          },
        ]}
      />
      <div className="flex flex-col gap-4">
        <div>
          <div>{station.station_name}</div>
          <div>
            사용 가능 여부: {station.available ? "사용 가능" : "사용 불가"}
          </div>
          <div>
            사용 제한 사유: {station.available_detail ?? "사용 제한 사유 없음"}
          </div>
          <div>운영 회사: {station.org_name}</div>
          <div>고객센터: {station.org_contact}</div>
          <div>사용 가능 시간: {station.usable_time}</div>
          <div>
            주차비: {station.parking_free ? "주차비 없음" : "주차비 있음"}
          </div>
        </div>
        <div>
          {chargers.map((charger) => (
            <div key={charger.id} className="flex gap-2">
              <div>
                충전 타입: {getChargerTypeDescription(charger.charger_type)}
              </div>
              <div>충전 방식: {charger.method}</div>
              <div>충전 속도: {charger.output}kW</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Page;
