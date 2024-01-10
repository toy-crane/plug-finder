import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import Link from "next/link";
import { getRegionDescription } from "@/constants/regions";
import { Tables } from "@/types/generated";
import { getDistrictDescription } from "@/constants/districts";
import BreadcrumbNavigation from "@/components/nav/breadcrumb-nav";

interface Props {
  params: { z_code: string };
}

type station = Tables<"stations">;

const Page = async ({ params }: Props) => {
  const z_code = params.z_code;
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase
    .from("stations")
    .select("*")
    .eq("z_code", params.z_code)
    .order("zs_code");
  if (response.error) throw response.error;
  // 404 페이지 에러 추가
  const stations = response.data;

  // 섹션을 zs_code로 그룹화
  const groupedStations = stations.reduce(
    (groups: Record<string, station[]>, station) => {
      const { zs_code } = station;
      if (!groups[zs_code]) {
        groups[zs_code] = [];
      }
      groups[zs_code].push(station);
      return groups;
    },
    {}
  );

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
      <div className="flex flex-wrap">
        {Object.entries(groupedStations).map(([zs_code, stations]) => (
          <div key={zs_code}>
            <h2 className="text-[36px]">
              <Link href={`/stations/${z_code}/${zs_code}`}>
                {getDistrictDescription(zs_code)}
              </Link>
            </h2>
            <div className="flex flex-col">
              {stations.map((station) => (
                <Link
                  key={station.id}
                  href={`/stations/${station.z_code}/${station.zs_code}/${station.slug}`}
                >
                  {station.station_name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
