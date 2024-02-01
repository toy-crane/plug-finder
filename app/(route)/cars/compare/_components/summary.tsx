import { createSupabaseServerClient } from "@/supabase/server";
import _ from "lodash";

import { Tables } from "@/types/generated";
import { AudioWaveform, BatteryMedium, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  primaryId: string;
  secondaryId: string;
};

type Cars = {
  max_range: number;
  zero_to_hundred: number;
  efficiency: number;
};

const COLUMNS: {
  label: string;
  key: keyof Cars;
  icon?: React.ReactNode;
  unit?: string;
}[] = [
  {
    label: "제로백",
    key: "zero_to_hundred",
    unit: "초",
    icon: <Gauge size={28} />,
  },
  {
    label: "주행 거리",
    key: "max_range",
    unit: "km",
    icon: <AudioWaveform size={28} />,
  },
  {
    label: "전비",
    key: "efficiency",
    unit: "km/kWh",
    icon: <BatteryMedium size={28} />,
  },
];

// 클래스 결정 로직을 관리하는 함수
const determineClasses = (
  key: keyof Cars,
  primaryValue: number,
  secondaryValue: number
) => {
  const classes = [];
  if (key === "zero_to_hundred") {
    classes.push(
      primaryValue < secondaryValue
        ? "underline underline-offset-4 decoration-[#C454FA]"
        : ""
    );
  } else if (key === "efficiency" || key === "max_range") {
    classes.push(
      primaryValue > secondaryValue
        ? "underline underline-offset-4 decoration-[#C454FA]"
        : ""
    );
  }

  return classes;
};

const Summary = async ({ primaryId, secondaryId }: Props) => {
  const supabase = await createSupabaseServerClient();
  const primaryResponse = await supabase
    .from("cars")
    .select("*, car_performances(max_range, zero_to_hundred, efficiency)")
    .eq("id", primaryId)
    .single();
  if (primaryResponse.error) throw primaryResponse.error;
  const secondaryResponse = await supabase
    .from("cars")
    .select("*, car_performances(max_range, zero_to_hundred, efficiency)")
    .eq("id", secondaryId)
    .single();
  if (secondaryResponse.error) throw secondaryResponse.error;
  const primary = _.assign(
    _.omit(primaryResponse.data, "car_performances"),
    primaryResponse.data.car_performances
  );
  const secondary = _.assign(
    _.omit(secondaryResponse.data, "car_performances"),
    secondaryResponse.data.car_performances
  );

  const dataRows = COLUMNS.map(({ label, key, unit, icon }) => {
    const primaryValue = primary[key];
    const secondaryValue = secondary[key];
    const primaryClasses = determineClasses(key, primaryValue, secondaryValue);
    const secondaryClasses = determineClasses(
      key,
      secondaryValue,
      primaryValue
    );

    return {
      label,
      primaryValue: primaryValue + (unit ? ` ${unit}` : ""),
      primaryClass: primaryClasses,
      secondaryValue: secondaryValue + (unit ? ` ${unit}` : ""),
      secondaryClass: secondaryClasses,
      icon,
    };
  });

  return (
    <div className="grid grid-cols-spec-summary grid-row-3 gap-y-6">
      {dataRows.map((row, _) => (
        <>
          <div className="flex justify-center flex-col items-center">
            <div className="text-lg">{row.label}</div>
            <div className={cn("text-xl font-semibold", row.primaryClass)}>
              {row.primaryValue}
            </div>
          </div>
          <div className="justify-self-center self-center">{row.icon}</div>
          <div className="flex justify-center flex-col items-center">
            <div className="text-lg">{row.label}</div>
            <div className={cn("text-xl font-semibold", row.secondaryClass)}>
              {row.secondaryValue}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Summary;
