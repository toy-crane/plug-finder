import { createSupabaseServerClient } from "@/supabase/server";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tables } from "@/types/generated";

type Props = {
  primaryId: string;
  secondaryId: string;
};

type CarDimension = Tables<"car_dimensions">;
// 구동 방식 및 모터 개수 변환을 위한 맵핑 객체

const COLUMNS: {
  label: string;
  key: keyof CarDimension;
  unit?: string;
  transform?: (value: string | number | null | number[]) => string;
}[] = [
  {
    label: "중량",
    key: "weight",
    unit: "kg",
  },
  {
    label: "적재 중량",
    key: "cargo",
    unit: "L",
  },
  {
    label: "좌석 수",
    key: "seating",
    unit: "명",
  },
  {
    label: "휠",
    key: "wheels",
    unit: "인치",
  },
  {
    label: "전폭",
    key: "overall_width",
    unit: "mm",
  },
  {
    label: "전고",
    key: "overall_height",
    unit: "mm",
  },
  {
    label: "전장",
    key: "overall_length",
    unit: "mm",
  },
  {
    label: "휠베이스",
    key: "wheel_base",
    unit: "mm",
  },
  {
    label: "디스플레이",
    key: "display",
  },
  // 추가적으로 비교하고 싶은 데이터 항목을 여기에 추가할 수 있습니다.
];

const Dimension = async ({ primaryId, secondaryId }: Props) => {
  const supabase = await createSupabaseServerClient();
  const primaryResponse = await supabase
    .from("car_dimensions")
    .select("*")
    .eq("id", primaryId)
    .single();
  if (primaryResponse.error) throw primaryResponse.error;
  const secondaryResponse = await supabase
    .from("car_dimensions")
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
            <TableRow key={index}>
              <TableCell className="text-center">{row.primaryValue}</TableCell>
              <TableCell className="text-center font-bold w-24">
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

export default Dimension;
