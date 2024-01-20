import { kv } from "@vercel/kv";

// zCode별 충전소 조회수 증가 함수에 만료 시간 설정 추가
async function incrementStationViewsByZCode(stationId: string, zCode: string) {
  try {
    const zCodeKey = `popular:z_code:${zCode}`;
    await kv.zincrby(zCodeKey, 1, stationId);
    // 24시간 후 만료되도록 설정 (48시간 * 60분 * 60초)
    await kv.expire(zCodeKey, 24 * 60 * 60);
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
    const zsCodeKey = `popular:zs_code:${zsCode}`;
    await kv.zincrby(zsCodeKey, 1, stationId);
    await kv.expire(zsCodeKey, 24 * 60 * 60);
  } catch (error) {
    console.error(
      "Error incrementing station views with expiry for zsCode:",
      error
    );
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
  const totalViews = await kv.incr(`page:views:total:${stationId}`);
  await incrementStationViewsByZCode(stationId, zCode);
  await incrementStationViewsByZsCode(stationId, zsCode);

  return (
    <span className="text-sm text-gray-500">
      조회 {totalViews.toLocaleString()}
    </span>
  );
}
