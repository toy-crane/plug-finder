import { createClient } from "@supabase/supabase-js";

type OfficialStation = {
  resultCode: string;
  resultMsg: string;
  totalCount: number;
  pageNo: number;
  numOfRows: number;
  statNm: string;
  statId: string;
  chgerId: string;
  chgerType: string;
  addr: string;
  location: string;
  lat: number;
  lng: number;
  useTime: string;
  busiId: string;
  bnm: string;
  busiNm: string;
  busiCall: string;
  stat: string;
  statUpdDt: Date;
  lastTsdt: Date | null;
  lastTedt: Date | null;
  nowTsdt: Date | null;
  output: number | null;
  method: string | null;
  zcode: string;
  zscode: string | null;
  kind: string | null;
  kindDetail: string | null;
  parkingFree: string | null;
  note: string | null;
  limitYn: string;
  limitDetail: string | null;
  delYn: string;
  delDetail: string | null;
  trafficYn: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

const getOfficialStations = async () => {
  let stations: OfficialStation[] = []; // stations를 여기서 선언 및 초기화
  try {
    const response = await fetch(`${url}?${queryString}`);
    const responseBody = await response.text(); // Get the response body as text

    if (response.status !== 200) {
      return [];
    }
    const data = JSON.parse(responseBody); // Parse the response body
    stations = data.items.item as OfficialStation[];
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
  return stations;
};

export async function GET() {
  const stations = await getOfficialStations();
  return Response.json({ stations: stations.splice(0, 10) });
}
