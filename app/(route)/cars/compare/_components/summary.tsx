import { createSupabaseServerClient } from "@/supabase/server";
import _ from "lodash";

import { Tables } from "@/types/generated";
import { AudioWaveform, BatteryMedium, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { Icons } from "@/components/icons";

type Props = {
  primaryId: string;
  secondaryId: string;
};

type Cars = {
  max_range: number;
  zero_to_hundred: number;
  efficiency: number;
  price?: number;
};

const COLUMNS: {
  label: string;
  key: keyof Cars;
  unit: string;
  icon?: React.ReactNode;
}[] = [
  {
    label: "가격",
    key: "price",
    unit: "원",
    icon: <Icons.money className="w-7 h-7" />,
  },
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

const determineValue = (key: keyof Cars, unit: string, value?: number) => {
  if (key === "price") {
    return value
      ? `${value.toLocaleString()}${unit ? ` ${unit}` : ""}`
      : "미정";
  }
  if (value === undefined) return "정보 없음";

  return `${value}${unit ? ` ${unit}` : ""}`;
};

// 클래스 결정 로직을 관리하는 함수
const determineClasses = (
  key: keyof Cars,
  primaryValue: number | string,
  secondaryValue: number | string
) => {
  const classes = [];
  if (key === "zero_to_hundred") {
    classes.push(
      primaryValue < secondaryValue
        ? "underline underline-offset-4 decoration-[#C454FA] decoration-4"
        : ""
    );
  } else if (key === "efficiency" || key === "max_range") {
    classes.push(
      primaryValue > secondaryValue
        ? "underline underline-offset-4 decoration-[#C454FA] decoration-4"
        : ""
    );
  }

  return classes;
};

const Summary = async ({ primaryId, secondaryId }: Props) => {
  const supabase = await createSupabaseServerClient();
  const primaryResponse = await supabase
    .from("cars")
    .select(
      "*, car_performances(max_range, zero_to_hundred, efficiency), car_prices(*)"
    )
    .eq("id", primaryId)
    .single();
  if (primaryResponse.error) throw primaryResponse.error;
  const secondaryResponse = await supabase
    .from("cars")
    .select(
      "*, car_performances(max_range, zero_to_hundred, efficiency), car_prices(*)"
    )
    .eq("id", secondaryId)
    .single();
  if (secondaryResponse.error) throw secondaryResponse.error;
  const primary = _.assign(
    _.omit(primaryResponse.data, "car_performances", "car_prices"),
    primaryResponse.data.car_performances,
    primaryResponse.data.car_prices[0]
  );
  const secondary = _.assign(
    _.omit(secondaryResponse.data, "car_performances", "car_prices"),
    secondaryResponse.data.car_performances,
    secondaryResponse.data.car_prices[0]
  );

  const dataRows = COLUMNS.map(({ label, key, unit, icon }) => {
    const primaryValue = determineValue(key, unit, primary[key]);
    const secondaryValue = determineValue(key, unit, secondary[key]);
    const primaryClasses = determineClasses(key, primaryValue, secondaryValue);
    const secondaryClasses = determineClasses(
      key,
      secondaryValue,
      primaryValue
    );

    return {
      label,
      primaryValue: primaryValue,
      primaryClass: primaryClasses,
      secondaryValue: secondaryValue,
      secondaryClass: secondaryClasses,
      icon,
    };
  });

  return (
    <div className="grid grid-cols-spec-summary grid-row-3 gap-y-6">
      {dataRows.map((row, _) => (
        <Fragment key={row.label}>
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
        </Fragment>
      ))}
    </div>
  );
};

export default Summary;
