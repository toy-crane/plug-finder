import { Regions, getRegionDescription } from "@/constants/regions";
import Link from "next/link";

const Page = () => {
  const regionCodes = Object.keys(Regions).filter(
    (_) => typeof Regions[_ as any] !== "number"
  );

  return (
    <div>
      {regionCodes.map((code) => (
        <div key={code}>
          <Link href={`/stations/${code}`}>{getRegionDescription(code)}</Link>
        </div>
      ))}
    </div>
  );
};

export default Page;
