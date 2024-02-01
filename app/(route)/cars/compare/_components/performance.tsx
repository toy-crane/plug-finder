import { createSupabaseServerClient } from "@/supabase/server";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tables } from "@/types/generated";

type Props = {
  primaryId: string;
  secondaryId: string;
};

type CarPerformance = Tables<"car_performances">;
// 구동 방식 및 모터 개수 변환을 위한 맵핑 객체
const driveTypeMappings = {
  AWD: "사륜 구동",
  RWD: "후륜 구동",
  FWD: "전륜 구동",
};

const motorTypeMappings = {
  "single-motor": "싱글 모터",
  "dual-motor": "듀얼 모터",
  "tri-motor": "트라이 모터",
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
  key: keyof CarPerformance;
  unit?: string;
  transform?: (value: string | number | null) => string;
}[] = [
  {
    label: "구동 방식",
    key: "drive_type",
    transform: (value) => transformValue(value, driveTypeMappings),
  },
  {
    label: "모터 개수",
    key: "motor_type",
    transform: (value) => transformValue(value, motorTypeMappings),
  },
  { label: "제로백", key: "zero_to_hundred", unit: "초" },
  { label: "최고 속도", key: "top_speed", unit: "km/h" },
  { label: "최대 파워", key: "max_power", unit: "PS" },
  { label: "최대 토크", key: "max_torque", unit: "kgf.m" },
  { label: "주행 거리", key: "max_range", unit: "km" },
  { label: "전비", key: "efficiency", unit: "km/kWh" },
  { label: "공기저항 계수", key: "drag_coefficient", unit: "Cd" },
  // 추가적으로 비교하고 싶은 데이터 항목을 여기에 추가할 수 있습니다.
];

const Performance = async ({ primaryId, secondaryId }: Props) => {
  const supabase = await createSupabaseServerClient();
  const primaryResponse = await supabase
    .from("car_performances")
    .select("*")
    .eq("id", primaryId)
    .single();
  if (primaryResponse.error) throw primaryResponse.error;
  const secondaryResponse = await supabase
    .from("car_performances")
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

export default Performance;
