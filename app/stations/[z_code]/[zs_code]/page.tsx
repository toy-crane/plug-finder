import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import Link from "next/link";

interface Props {
  params: { z_code: string; zs_code: string };
}

const Page = async ({ params }: Props) => {
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase
    .from("stations")
    .select("*")
    .eq("zs_code", params.zs_code);
  if (response.error) throw response.error;
  // 404 페이지 에러 추가
  const stations = response.data;
  return (
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
  );
};

export default Page;
