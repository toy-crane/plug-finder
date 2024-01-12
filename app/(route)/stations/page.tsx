import BreadcrumbNavigation from "@/components/nav/breadcrumb-nav";
import { Regions, getRegionDescription } from "@/constants/regions";
import Link from "next/link";

const Page = () => {
  const regionCodes = Object.keys(Regions).filter(
    (_) => typeof Regions[_ as any] !== "number"
  );

  return (
    <div>
      <BreadcrumbNavigation trail={[{ title: "전국", link: "/stations" }]} />
      {regionCodes.map((code) => (
        <div key={code}>
          <Link href={`/stations/${code}`}>{getRegionDescription(code)}</Link>
        </div>
      ))}
    </div>
  );
};

export default Page;
