import createSupabaseBrowerClient from "@/supabase/client";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const supabase = createSupabaseBrowerClient();
  const response = await supabase.from("stations").select("slug");
  if (response.error) throw response.error;
  return response.data;
}

const Page = async ({ params }: Props) => {
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
  return <div>{stations.station_name}</div>;
};
export default Page;
