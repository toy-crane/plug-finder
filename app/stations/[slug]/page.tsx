import createSupabaseBrowerClient from "@/supabase/client";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";

interface Props {
  params: { slug: string };
}

// Set your API key here
const serviceKey =
  "KZ2gsvilf6x8JPRU61b%2Frh%2BzkLv5YiCpEF%2Fm%2F0bTRJttrEnFaps5QmeWFQi9qb%2BIIKtLGpCmC57B%2Fw4Jpio9PA%3D%3D";

// API endpoint for getting charger information
const url = "http://apis.data.go.kr/B552584/EvCharger/getChargerInfo";
const params = {
  numOfRows: "9999",
  pageNo: "1",
  zscode: "46110",
};

// Create a URLSearchParams object from the params object
const searchParams = new URLSearchParams(params);

// Append serviceKey without encoding
const queryString = `${searchParams.toString()}&serviceKey=${serviceKey}&dataType=JSON`;

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
