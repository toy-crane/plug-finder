import { createSupabaseServerClient } from "@/supabase/server";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tables } from "@/types/generated";

type Props = {
  primaryId: string;
  secondaryId: string;
};

type CarBattery = Tables<"car_batteries">;
// 구동 방식 및 모터 개수 변환을 위한 맵핑 객체
const chargingTypeMappings = {
  NACS: "테슬라 전용 충전 방식",
  DC_COMBO: "DC 콤보",
};

const batteryTypeMappings = {
  NCM: "리튬 이온 배터리",
  LFP: "인산철 배터리",
};

// 데이터 변환 함수
const transformValue = (
  value: string | number | null,
  mappings: { [key: string]: string }
): string => {
  return value ? mappings[value.toString()] ?? value.toString() : "";
};

const COLUMNS: {
  label: string;
  key: keyof CarBattery;
  unit?: string;
  transform?: (value: string | number | null) => string;
}[] = [
  {
    label: "충전 방식",
    key: "charging_type",
    transform: (value) => transformValue(value, chargingTypeMappings),
  },
  {
    label: "배터리 종류",
    key: "battery_type",
    transform: (value) => transformValue(value, batteryTypeMappings),
  },
  { label: "배터리 용량", key: "capacity", unit: "kWh" },
];

const Battery = async ({ primaryId, secondaryId }: Props) => {
  const supabase = await createSupabaseServerClient();
  const primaryResponse = await supabase
    .from("car_batteries")
    .select("*")
    .eq("id", primaryId)
    .single();
  if (primaryResponse.error) throw primaryResponse.error;
  const secondaryResponse = await supabase
    .from("car_batteries")
    .select("*")
    .eq("id", secondaryId)
    .single();
  if (secondaryResponse.error) throw secondaryResponse.error;
  const secondary = secondaryResponse.data;
  const primary = primaryResponse.data;

  const dataRows = COLUMNS.map(({ label, key, unit, transform }) => {
    const primaryValue = transform ? transform(primary[key]) : primary[key];
    const secondaryValue = transform
      ? transform(secondary[key])
      : secondary[key];
    return {
      label,
      primaryValue: primaryValue + (unit ? ` ${unit}` : ""),
      secondaryValue: secondaryValue + (unit ? ` ${unit}` : ""),
    };
  });

  return (
    <>
      <Table>
        <TableBody>
          {dataRows.map((row, index) => (
            <TableRow key={index} className="grid grid-cols-3">
              <TableCell className="text-center">{row.primaryValue}</TableCell>
              <TableCell className="text-center font-bold">
                {row.label}
              </TableCell>
              <TableCell className="text-center">
                {row.secondaryValue}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Battery;
