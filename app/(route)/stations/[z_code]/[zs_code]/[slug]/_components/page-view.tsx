import { kv } from "@vercel/kv";

export default async function PageView({ stationId }: { stationId: string }) {
  const totalViews = await kv.incr(`page:views:total:${stationId}`);

  return (
    <span className="text-sm text-gray-500">
      조회 {totalViews.toLocaleString()}
    </span>
  );
}
