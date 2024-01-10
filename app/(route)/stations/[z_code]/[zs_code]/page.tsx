import BreadcrumbNavigation from "@/components/nav/breadcrumb-nav";
import { getDistrictDescription } from "@/constants/districts";
import { getRegionDescription } from "@/constants/regions";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import Link from "next/link";

interface Props {
  params: { z_code: string; zs_code: string };
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
