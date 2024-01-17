import { getChargerTypeDescription } from "@/constants/chager-type";
import { getStatusDescription } from "@/constants/charger-status";
import { getDate } from "@/lib/date";
import { Tables } from "@/types/generated";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Charger = Tables<"chargers">;
type ChargerStatus = {
  busiId: string;
  statId: string;
  chgerId: string;
  stat: string;
  statUpdDt: string;
  lastTsdt?: string;
  lastTedt?: string;
  nowTsdt?: string;
};

type Props = {
  chargers: Charger[];
  stationId: string;
  className?: string;
};

type ChargerStatusRequestParams = {
  stationId: string;
};

type ChargerStatusResponse = {
  resultCode: string;
  resultMsg: string;
  pageNo: number;
  numOfRows: number;
  totalCount: number;
  items: {
    item: Array<ChargerStatus>;
  };
};

const requestURL = `${process.env
  .NEXT_PUBLIC_EV_API_URL!}/getChargerInfo?serviceKey=${process.env
  .NEXT_PUBLIC_EV_API_KEY!}`;

async function fetchChargersStatus(params: ChargerStatusRequestParams) {
  const queryParams = new URLSearchParams({
    dataType: "JSON",
    statId: params.stationId,
    numOfRows: "100",
    pageNo: "1",
  }).toString();
  try {
    const response = await fetch(`${requestURL}&${queryParams}`, {
      next: { revalidate: 360 },
    });
    const responseBody = await response.text(); // Get the response body as text

    const data: ChargerStatusResponse = JSON.parse(responseBody); // Parse the response body
    return data.items.item;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

const ChargersDetail = async ({ chargers, stationId, className }: Props) => {
  const chargersStatus = await fetchChargersStatus({
    stationId,
  });

  return (
    <section className={cn(className)}>
      <h2 className="text-3xl font-semibold md:text-3xl mb-5">충전기 정보</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-2">타입</TableHead>
            <TableHead className="px-2">속도</TableHead>
            <TableHead className="px-2">상태</TableHead>
            <TableHead className="text-center px-2">마지막 충전시간</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chargers?.map((ch) => {
            const chargerStatus = chargersStatus?.find(
              (cs) => cs.chgerId === ch.external_charger_id
            );
            const lastChargedDate = chargerStatus?.lastTsdt
              ? getDate(chargerStatus.lastTsdt)
              : undefined;
            return (
              <TableRow key={ch.id}>
                <TableCell className="px-2">
                  {getChargerTypeDescription(ch.charger_type)}
                </TableCell>
                <TableCell className="px-2">{ch.output}kW</TableCell>
                <TableCell className="px-2">
                  {chargerStatus
                    ? getStatusDescription(chargerStatus.stat)
                    : "알 수 없음"}
                </TableCell>
                <TableCell className="text-center px-2">
                  {lastChargedDate
                    ? formatDistanceToNow(lastChargedDate, {
                        addSuffix: true,
                        locale: ko,
                      })
                    : "정보 없음"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
};

export default ChargersDetail;
