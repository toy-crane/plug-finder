import { getChargerTypeDescription } from "@/constants/chager-type";
import { getDistrictDescription } from "@/constants/districts";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import { kv } from "@vercel/kv";
import Link from "next/link";

type Props = {
  zCode: string;
};

function transformToObjects(
  arr: (string | number)[]
): { id: string; count: number }[] {
  let result: { id: string; count: number }[] = [];

  for (let i = 0; i < arr.length; i += 2) {
    result.push({
      id: arr[i] as string,
      count: arr[i + 1] as number,
    });
  }

  return result;
}

// z_code별 인기 충전소 조회 함수
async function getPopularStationsByZCode(zCode: string, limit: number) {
  try {
    // 'popular:z_code:[zCode]'에서 상위 limit개의 충전소 ID와 점수를 조회
    const popularStations: string[] = await kv.zrange(
      `popular:z_code:${zCode}`,
      0,
      limit - 1,
      { rev: true, withScores: true }
    );
    const transformedStations = transformToObjects(popularStations);
    return transformedStations;
  } catch (error) {
    console.error("Error fetching popular stations:", error);
    return [];
  }
}

const RegionPopularStations = async ({ zCode }: Props) => {
  const supabase = await createSupabaseServerClientReadOnly();
  const poplurStations = await getPopularStationsByZCode(zCode, 5);
  const response = await supabase
    .from("stations")
    .select("*, chargers(*)")
    .eq("z_code", zCode)
    .in(
      "id",
      poplurStations.map((st) => st.id)
    )
    .limit(5);
  if (response.error) throw response.error;
  // 404 페이지 에러 추가
  const stations = response.data;

  if (poplurStations.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold md:text-3xl mb-2">
        많이 찾는 충전소 🔥
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-4">
        {poplurStations.map((station) => {
          const st = stations.find((s) => s.id === station.id);
          if (!st) return null;
          return (
            <Link
              href={`/stations/${st.z_code}/${st.zs_code}/${st.slug}`}
              className="flex justify-between space-x-4 cursor-pointer p-2 rounded-md hover:bg-stone-50"
              key={st.id}
            >
              <div className="flex flex-col gap-1">
                <h2 className="text-xl md:text-2xl">{st.station_name}</h2>
                <span className="text-sm text-gray-500">
                  조회 {poplurStations.find((s) => s.id === st.id)?.count || 0}
                </span>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {st.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {getChargerTypeDescription(st.charger_type)} / {st.output}{" "}
                    kW
                  </p>
                </div>
              </div>
              <div className="self-center text-xl">{st.chargers.length}대</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RegionPopularStations;
