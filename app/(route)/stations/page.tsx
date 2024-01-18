import BreadcrumbNavigation from "@/components/nav/breadcrumb-nav";
import { Regions, getRegionDescription } from "@/constants/regions";
import Link from "next/link";
import ShareButton from "./[z_code]/[zs_code]/_component/share-button";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  _: {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase
    .from("stations")
    .select("*", { count: "exact" });
  if (response.error) throw response.error;
  const count = response.count;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  if (count) {
    const title = `대한민국의 모든 전기차 주차장 충전소 리스트`;
    const description = `
      대한민국에는 전기차 충전소가 ${count.toLocaleString()}개의 충전소(급속, 완속)가 있습니다.
      보다 자세한 정보가 궁금하다면? 플러그 파인더 홈페이지에서 확인하세요.
      주차 가능 여부, 외부인 개방, 영업시간, 충전기 타입, 충전기 출력 등의 모든 정보를 확인 하실 수 있습니다.
    `;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [...previousImages],
      },
      twitter: {
        title,
        description,
        images: [...previousImages],
      },
      alternates: {
        canonical: `/stations`,
      },
    };
  } else {
    return {};
  }
}

const Page = async () => {
  const regionCodes = Object.keys(Regions).filter(
    (_) => typeof Regions[_ as any] !== "number"
  );
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase
    .from("stations")
    .select("*", { count: "exact" });
  if (response.error) throw response.error;
  const count = response.count;

  const responseView = await supabase
    .from("grouped_station_by_zcode")
    .select("*");
  if (responseView.error) throw responseView.error;
  const groupedStationByZcode = responseView.data;

  return (
    <div className="mb-24">
      <BreadcrumbNavigation trail={[{ title: "전국", link: "/stations" }]} />
      <div className="flex justify-between items-center my-6">
        <div>
          <h1 className="text-3xl font-semibold md:text-5xl mb-1">
            전국 전기차 충전소
          </h1>
          <p className="text-lg text-muted-foreground">
            {count?.toLocaleString()}개 충전소
          </p>
        </div>
        <ShareButton />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        {regionCodes.map((regionCode) => (
          <Link
            href={`/stations/${regionCode}`}
            className="flex justify-between space-x-4 cursor-pointer p-4 rounded-md hover:bg-stone-50 items-center"
            key={regionCode}
          >
            <h2 className="text-2xl">{getRegionDescription(regionCode)}</h2>
            <div className="self-center text-xl">
              {groupedStationByZcode
                ?.find((stations) => stations.z_code === regionCode)
                ?.count?.toLocaleString()}
              개
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Page;
