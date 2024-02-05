import { kv } from "@vercel/kv";

async function increasePageViews(pageUniqueKey: string) {
  try {
    const pageViewKey = `page:cars-compare:views`;
    return await kv.zincrby(pageViewKey, 1, pageUniqueKey);
  } catch (error) {
    console.error("Error incrementing page views:", error);
    return undefined;
  }
}

export default async function PageView({
  pageUniqueKey,
}: {
  pageUniqueKey: string;
}) {
  const totalViews = await increasePageViews(pageUniqueKey);

  return (
    <>
      {totalViews && (
        <span className="text-sm text-gray-500">
          조회수 {totalViews.toLocaleString()}
        </span>
      )}
    </>
  );
}
