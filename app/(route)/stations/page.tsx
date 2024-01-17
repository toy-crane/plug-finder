import BreadcrumbNavigation from "@/components/nav/breadcrumb-nav";
import { Regions, getRegionDescription } from "@/constants/regions";
import Link from "next/link";
import ShareButton from "./[z_code]/[zs_code]/_component/share-button";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";

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
