import { kv } from "@vercel/kv";

// zCode별 충전소 조회수 증가 함수에 만료 시간 설정 추가
async function incrementStationViewsByZCode(stationId: string, zCode: string) {
  try {
    const zCodeKey = `page:popluar:z_code:${zCode}`;
    await kv.zincrby(zCodeKey, 1, stationId);
  } catch (error) {
    console.error(
      "Error incrementing station views with expiry for zCode:",
      error
    );
  }
}

// zsCode별 충전소 조회수 증가 함수에 만료 시간 설정 추가
async function incrementStationViewsByZsCode(
  stationId: string,
  zsCode: string
) {
  try {
    const zsCodeKey = `page:popluar:zs_code:${zsCode}`;
    await kv.zincrby(zsCodeKey, 1, stationId);
  } catch (error) {
    console.error(
      "Error incrementing station views with expiry for zsCode:",
      error
    );
  }
}

async function increasePageViews(stationId: string) {
  try {
    const pageViewKey = `page:station-detail:views`;
    return await kv.zincrby(pageViewKey, 1, stationId);
  } catch (error) {
    console.error("Error incrementing page views:", error);
    return undefined;
  }
}

export default async function PageView({
  stationId,
  zCode,
  zsCode,
}: {
  stationId: string;
  zCode: string;
  zsCode: string;
}) {
  const totalViews = await increasePageViews(stationId);
  await incrementStationViewsByZCode(stationId, zCode);
  await incrementStationViewsByZsCode(stationId, zsCode);

  return (
    <>
      {totalViews && (
        <span className="text-sm text-gray-500">
          조회 {totalViews.toLocaleString()}
        </span>
      )}
    </>
  );
}
