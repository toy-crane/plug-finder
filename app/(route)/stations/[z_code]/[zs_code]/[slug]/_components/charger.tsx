"use client;";

import { getChargerTypeDescription } from "@/constants/chager-type";
import { Tables } from "@/types/generated";

type Props = {
  charger: Tables<"chargers">;
};

const Charger = ({ charger }: Props) => {
  return (
    <div key={charger.id} className="flex gap-2">
      <div>충전 타입: {getChargerTypeDescription(charger.charger_type)}</div>
      <div>충전 방식: {charger.method}</div>
      <div>충전 속도: {charger.output}kW</div>
    </div>
  );
};

export default Charger;
