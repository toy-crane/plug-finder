import { createSupabaseServerClient } from "@/supabase/server";
import _ from "lodash";

import { Tables } from "@/types/generated";

type Props = {
  primaryId: string;
  secondaryId: string;
};

type Cars = Tables<"cars"> & {
  max_range: number;
  zero_to_hundred: number;
  efficiency: number;
};

const COLUMNS: {
  label: string;
  key: keyof Cars;
  unit?: string;
  transform?: (value: string | number | null | number[]) => string;
}[] = [
  { label: "제로백", key: "zero_to_hundred", unit: "초" },
  { label: "주행 거리", key: "max_range", unit: "km" },
  { label: "전비", key: "efficiency", unit: "km/kWh" },
];

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

  const dataRows = COLUMNS.map(({ label, key, unit }) => {
    const primaryValue = primary[key];
    const secondaryValue = secondary[key];
    return {
      label,
      primaryValue: primaryValue + (unit ? ` ${unit}` : ""),
      secondaryValue: secondaryValue + (unit ? ` ${unit}` : ""),
    };
  });

  return (
    <div className="grid grid-cols-2 grid-row-3 gap-y-6">
      {dataRows.map((row, _) => (
        <>
          <div className="flex justify-center flex-col items-center">
            <div className="text-lg">{row.label}</div>
            <div className="text-xl font-semibold">{row.primaryValue}</div>
          </div>
          <div className="flex justify-center flex-col items-center">
            <div className="text-lg">{row.label}</div>
            <div className="text-xl font-semibold">{row.secondaryValue}</div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Summary;
