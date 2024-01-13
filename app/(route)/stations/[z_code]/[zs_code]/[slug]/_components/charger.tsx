import { getChargerTypeDescription } from "@/constants/chager-type";
import { getStatusDescription } from "@/constants/charger-status";
import { getDate } from "@/lib/date";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { unstable_noStore } from "next/cache";

type Props = {
  stationId: string;
  chargerId: string;
  chargerType: string;
  method: string;
  output: string;
};

type ChargerStatusRequestParams = {
  stationId: string;
  chargerId: string;
};

type ChargerStatusResponse = {
  resultCode: string;
  resultMsg: string;
  pageNo: number;
  numOfRows: number;
  totalCount: number;
  items: {
    item: Array<{
      busiId: string;
      statId: string;
      chgerId: string;
      stat: string;
      statUpdDt: string;
      lastTsdt?: string;
      lastTedt?: string;
      nowTsdt?: string;
    }>;
  };
};

const requestURL = `${process.env
  .NEXT_PUBLIC_EV_API_URL!}/getChargerInfo?serviceKey=${process.env
  .NEXT_PUBLIC_EV_API_KEY!}`;

async function fetchChargerStatus(params: ChargerStatusRequestParams) {
  const queryParams = new URLSearchParams({
    dataType: "JSON",
    statId: params.stationId,
    chgerId: params.chargerId,
    numOfRows: "9999",
    pageNo: "1",
  }).toString();
  try {
    const response = await fetch(`${requestURL}&${queryParams}`);
    const responseBody = await response.text(); // Get the response body as text

    const data: ChargerStatusResponse = JSON.parse(responseBody); // Parse the response body
    return data.items.item[0];
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

const Charger = async ({
  chargerId,
  stationId,
  chargerType,
  method,
  output,
}: Props) => {
  unstable_noStore();
  const charger = await fetchChargerStatus({
    chargerId,
    stationId,
  });

  const lastChargedDate = charger?.lastTsdt
    ? getDate(charger.lastTsdt)
    : undefined;

  return (
    <div className="flex gap-2">
      <div>충전 타입: {getChargerTypeDescription(chargerType)}</div>
      <div>충전 방식: {method}</div>
      <div>충전 속도: {output}kW</div>
      <div>
        충전기 상태:{" "}
        {charger ? getStatusDescription(charger.stat) : "알 수 없음"}
      </div>
      {lastChargedDate && (
        <div>
          마지막 충전 시간:
          {formatDistanceToNow(lastChargedDate, {
            addSuffix: true,
            locale: ko,
          })}
        </div>
      )}
    </div>
  );
};

export default Charger;
