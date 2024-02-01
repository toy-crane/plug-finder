import { createSupabaseServerClient } from "@/supabase/server";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tables } from "@/types/generated";

type Props = {
  primaryId: string;
  secondaryId: string;
};

type CarWarranty = Tables<"car_warranties">;

const COLUMNS: {
  label: string;
  key: keyof CarWarranty;
}[] = [
  {
    label: "차량 보증",
    key: "vehicle",
  },
  {
    label: "배터리 보증",
    key: "battery",
  },
  {
    label: "구동 장치 보증",
    key: "powertrain",
  },
];

const Warranty = async ({ primaryId, secondaryId }: Props) => {
  const supabase = await createSupabaseServerClient();
  const primaryResponse = await supabase
    .from("car_warranties")
    .select("*")
    .eq("id", primaryId)
    .single();
  if (primaryResponse.error) throw primaryResponse.error;
  const secondaryResponse = await supabase
    .from("car_warranties")
    .select("*")
    .eq("id", secondaryId)
    .single();
  if (secondaryResponse.error) throw secondaryResponse.error;
  const secondary = secondaryResponse.data;
  const primary = primaryResponse.data;

  const dataRows = COLUMNS.map(({ label, key }) => {
    const primaryValue = primary[key];
    const secondaryValue = secondary[key];
    return {
      label,
      primaryValue: primaryValue,
      secondaryValue: secondaryValue,
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

export default Warranty;
