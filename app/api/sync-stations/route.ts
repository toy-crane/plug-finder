import { districtCodes, getDistrictDescription } from "@/constants/districts";
import { Database } from "@/types/generated";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import Bottleneck from "bottleneck";
import { add } from "date-fns";
import { getRegionDescription } from "@/constants/regions";

export const dynamic = "force-dynamic";

function correctZCode(zcode: string): string {
  if (zcode === "42") {
    return "51";
  }
  return zcode;
}

function correctZsCode(zcode: string, zscode: string): string {
  const trimedZscode = zscode.trim();
  if (trimedZscode.length === 3) {
    return zcode.toString() + trimedZscode;
  }
  if (trimedZscode.startsWith("42")) {
    return "51" + trimedZscode.slice(2);
  }
  return trimedZscode;
}

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
  statUpdDt: string | null;
  lastTsdt: string | null;
  lastTedt: string | null;
  nowTsdt: string | null;
  output: string;
  method: string | null;
  zcode: string;
  zscode: string;
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

interface Charger {
  chgerId: string;
  statId: string;
  output: string | null;
  method: string | null;
  chgerType: string;
}

type AddChargerStation = OfficialStation & {
  chargers: Charger[];
};

type AddDiplayNameStation = AddChargerStation & {
  displayStatNm: string;
};

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Set your API key here
const serviceKey = process.env.NEXT_PUBLIC_EV_API_KEY;

// API endpoint for getting charger information
const url = "http://apis.data.go.kr/B552584/EvCharger/getChargerInfo";

const getOfficialStations = async ({ zsCode }: { zsCode: string }) => {
  const params = {
    numOfRows: "9999",
    pageNo: "1",
    zscode: zsCode,
  };

  // Create a URLSearchParams object from the params object
  const searchParams = new URLSearchParams(params);

  // Append serviceKey without encoding
  const queryString = `${searchParams.toString()}&serviceKey=${serviceKey}&dataType=JSON`;
  const requestUrl = `${url}?${queryString}`;
  console.log(requestUrl);

  let stations: OfficialStation[] = []; // stations를 여기서 선언 및 초기화
  try {
    const response = await fetch(requestUrl);
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

const addChargers = (stations: OfficialStation[]) => {
  const transformedData: Record<string, AddChargerStation> = {};
  stations.forEach((station) => {
    const statId = station.statId;
    const chargers = transformedData[statId]?.chargers || [];
    chargers.push(station);
    transformedData[statId] = {
      ...station,
      chargers,
    };
  });
  return Object.values(transformedData);
};

function addDisplayStatNm(stations: AddChargerStation[]) {
  const statNmToStatIds: Record<string, string[]> = {};

  // 각 statNm별로 statId 수집
  stations.forEach((station) => {
    if (!statNmToStatIds[station.statNm]) {
      statNmToStatIds[station.statNm] = [];
    }
    statNmToStatIds[station.statNm].push(station.statId);
  });

  // 각 statNm별로 statId 정렬
  for (const statNm in statNmToStatIds) {
    statNmToStatIds[statNm].sort();
  }

  // 새로운 객체 배열을 생성하여 반환
  return stations.map((station) => {
    const sortedStatIds = statNmToStatIds[station.statNm];
    const index = sortedStatIds.indexOf(station.statId);
    const isSingle = sortedStatIds.length === 1;
    const displayStatNm = isSingle
      ? `${getRegionDescription(station.zcode)} ${getDistrictDescription(
          station.zscode
        )} ${station.statNm}`
      : `${getRegionDescription(station.zcode)} ${getDistrictDescription(
          station.zscode
        )}  ${station.statNm} ${index + 1}`;
    return {
      ...station,
      displayStatNm: displayStatNm,
    };
  });
}

const upsertStations = async (stations: AddDiplayNameStation[]) => {
  const insertData = stations.map((station) => ({
    slug: `${station.statNm.replace(/\s/g, "_")}_${station.statId}`,
    address: station.addr,
    available: station.limitYn === "N",
    available_detail:
      station.limitDetail === "" ? undefined : station.limitDetail,
    detail_location: station.location === "null" ? undefined : station.location,
    external_station_id: station.statId,
    is_deleted: station.delYn === "Y",
    is_deleted_detail: station.delDetail === "" ? undefined : station.delDetail,
    lat: station.lat,
    lng: station.lng,
    note: station.note,
    org_contact: station.busiCall === "" ? undefined : station.busiCall,
    org_id: station.busiId,
    org_name: station.bnm,
    parking_free: station.parkingFree === "Y",
    station_name: station.statNm,
    usable_time: station.useTime,
    z_code: correctZCode(station.zcode),
    zs_code: correctZsCode(station.zcode, station.zscode),
    display_station_name: station.displayStatNm,
    charger_type: station.chgerType,
    output: station.output,
    chargers: station.chargers.map((charger) => ({
      external_charger_id: charger.chgerId,
      method: charger.method,
      output: charger.output,
      external_station_id: charger.statId,
      charger_type: charger.chgerType,
    })),
  }));

  const response = await supabase.rpc(
    "insert_or_update_stations_and_chargers",
    { data: { stations: insertData } }
  );

  if (response.error) {
    throw response.error;
  }
  return response.data;
};

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const limiter = new Bottleneck({
    maxConcurrent: 1, // 동시에 5개의 작업만 실행
  });

  const promises = districtCodes.map((zsCode) =>
    limiter.schedule(async () => {
      if (!zsCode.startsWith("11")) return [];
      const stations = await getOfficialStations({ zsCode });
      const addChargerStations = addChargers(stations);
      const addDisplayNameStations = addDisplayStatNm(addChargerStations);
      await upsertStations(addDisplayNameStations);
      return stations;
    })
  );

  const result = await Promise.all(promises);
  const flatResult = result.flat();

  return Response.json({ stations: flatResult, count: flatResult.length });
}
