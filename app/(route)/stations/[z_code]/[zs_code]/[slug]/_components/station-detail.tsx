import { getChargerTypeDescription } from "@/constants/chager-type";
import { Tables } from "@/types/generated";
import Label from "./label";
import { Separator } from "@/components/ui/separator";
import ShareDrawer from "./share-drawer";
import { cn } from "@/lib/utils";
import PageView from "./page-view";

type CardProps = {
  station: Tables<"stations"> & {
    chargers: Tables<"chargers">[];
  };
  className?: string;
};

const StationDetail = ({ station, className, ...props }: CardProps) => {
  return (
    <>
      <section className={cn("flex flex-col gap-4", className)}>
        <div className="flex justify-between items-center my-2">
          <div>
            <h1 className="text-3xl font-semibold md:text-5xl mb-1">
              {station.station_name}
            </h1>
            <div>
              <p className="text-muted-foreground text-lg text-wrap">
                {station.address}
              </p>
              <PageView
                stationId={station.id}
                zCode={station.z_code}
                zsCode={station.zs_code}
              />
            </div>
          </div>
          <ShareDrawer station={station} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label
              title="충전기 타입"
              content={`${getChargerTypeDescription(station.charger_type)}`}
            />
            <Label title="충전기 출력" content={`${station.output}KW`} />
            <Label title="충전기 수" content={`${station.chargers.length}대`} />
            <Label title="운영 회사" content={station.org_name} />
            {station.org_contact && (
              <Label title="고객센터" content={station.org_contact} />
            )}
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <Label
              title="주차비"
              content={station.parking_free ? "무료" : "유료"}
            />
            <Label
              title="사용 가능 여부"
              content={station.available ? "사용 가능" : "사용 불가"}
            />
            <Label title="사용 가능 시간" content={station.usable_time} />
            {station.available_detail && (
              <Label
                title="사용 제한 사유"
                content={station.available_detail}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default StationDetail;
