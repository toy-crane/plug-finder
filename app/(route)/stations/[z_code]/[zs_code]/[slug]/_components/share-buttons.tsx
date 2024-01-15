"use client";

import { Button } from "@/components/ui/button";
import { Tables } from "@/types/generated";
import Link from "next/link";

type Props = {
  station: Tables<"stations">;
};

const ShareButtons = ({ station }: Props) => {
  return (
    <div>
      <Button asChild>
        <Link
          href={`tmap://route?goalname=${station.address}&rGoX=${station.lng}&rGoY=${station.lat}`}
        >
          TMAP으로 경로 전송
        </Link>
      </Button>
    </div>
  );
};

export default ShareButtons;
