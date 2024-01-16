"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getChargerTypeDescription } from "@/constants/chager-type";
import { cn } from "@/lib/utils";
import { Tables } from "@/types/generated";
import ShareDrawer from "./share-drawer";

type Props = {
  station: Tables<"stations">;
};

type CardProps = React.ComponentProps<typeof Card> & {
  station: Tables<"stations"> & {
    chargers: Tables<"chargers">[];
  };
};

const groupByCharger = (
  chargers: { charger_type: string }[]
): Record<string, number> => {
  return chargers.reduce((acc, charger) => {
    acc[charger.charger_type] = (acc[charger.charger_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

const StationDetail = ({ station, className, ...props }: CardProps) => {
  const chargerGroup = groupByCharger(station.chargers);
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader className="flex justify-between flex-row items-center space-y-0">
        <CardTitle>{station.station_name}</CardTitle>
        <ShareDrawer station={station} />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col gap-4">
          <div>
            <div>{station.station_name}</div>
            <div>
              사용 가능 여부: {station.available ? "사용 가능" : "사용 불가"}
            </div>
            <div>
              사용 제한 사유:{" "}
              {station.available_detail ?? "사용 제한 사유 없음"}
            </div>
            <div>운영 회사: {station.org_name}</div>
            <div>고객센터: {station.org_contact}</div>
            <div>사용 가능 시간: {station.usable_time}</div>
            <div>
              주차비: {station.parking_free ? "주차비 없음" : "주차비 있음"}
            </div>
            <div className="flex gap-2">
              {Object.entries(chargerGroup).map(([chargerType, count]) => (
                <div key={chargerType}>
                  {getChargerTypeDescription(chargerType)}: {count}대
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default StationDetail;
