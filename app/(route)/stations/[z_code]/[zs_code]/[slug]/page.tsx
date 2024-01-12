import BreadcrumbNavigation from "@/components/nav/breadcrumb-nav";
import { getChargerTypeDescription } from "@/constants/chager-type";
import { getDistrictDescription } from "@/constants/districts";
import { getRegionDescription } from "@/constants/regions";
import createSupabaseBrowerClient from "@/supabase/client";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import type { Metadata, ResolvingMetadata } from "next";
import Charger from "./_components/charger";
import { Suspense } from "react";

interface Props {
  params: { slug: string; z_code: string; zs_code: string };
}

const groupByCharger = (
  chargers: { charger_type: string }[]
): Record<string, number> => {
  return chargers.reduce((acc, charger) => {
    acc[charger.charger_type] = (acc[charger.charger_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

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
  const response = await supabase
    .from("stations")
    .select("*, chargers(charger_type)")
    .order("charger_type", { ascending: false, referencedTable: "chargers" })
    .eq("slug", slug)
    .single();
  if (response.error) {
    throw Error(response.error.message);
  }
  const station = response.data;
  const chargers = station.chargers;
  const chargerGroup = groupByCharger(chargers);
  const chargerDescription = Object.entries(chargerGroup).map(
    ([chargerType, count]) =>
      `${getChargerTypeDescription(chargerType)}: ${count}대`
  );

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  if (station) {
    const title = `${getRegionDescription(
      station.z_code
    )} ${getDistrictDescription(station.zs_code)} ${
      station.station_name
    } 전기차 충전소`;
    const description = `
    주소 - ${station.address} \n 
    충전기 수 - ${chargerDescription} \n
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
    .order("charger_type", { ascending: false, referencedTable: "chargers" })
    .eq("slug", slug)
    .single();

  if (response.error) throw response.error;

  // 404 페이지 에러 추가
  const station = response.data;
  const chargers = station.chargers;
  const chargerGroup = groupByCharger(chargers);

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
            title: station.display_station_name,
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
          <div className="flex gap-2">
            {Object.entries(chargerGroup).map(([chargerType, count]) => (
              <div key={chargerType}>
                {getChargerTypeDescription(chargerType)}: {count}대
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          {chargers.map((charger) => (
            <Suspense key={charger.id} fallback={<div>Loading...</div>}>
              <Charger
                key={charger.id}
                chargerType={charger.charger_type}
                stationId={charger.external_station_id}
                chargerId={charger.external_charger_id}
                method={charger.method}
                output={charger.output}
              />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Page;
