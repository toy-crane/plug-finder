import BreadcrumbNavigation from "@/components/nav/breadcrumb-nav";
import { getDistrictDescription } from "@/constants/districts";
import { getRegionDescription } from "@/constants/regions";
import createSupabaseBrowerClient from "@/supabase/client";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";

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

const Page = async ({ params }: Props) => {
  const { z_code, zs_code } = params;
  const slug = decodeURIComponent(params.slug);
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase
    .from("stations")
    .select("*")
    .eq("slug", slug)
    .single();
  if (response.error) throw response.error;
  // 404 페이지 에러 추가
  const stations = response.data;
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
            title: stations.station_name,
            link: `/stations/${z_code}/${zs_code}/${slug}`,
          },
        ]}
      />
      {stations.station_name}
    </div>
  );
};
export default Page;
