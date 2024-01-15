"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tables } from "@/types/generated";
import Link from "next/link";

type Props = {
  station: Tables<"stations">;
};

const ShareButtons = ({ station }: Props) => {
  const { toast } = useToast();
  return (
    <div className="flex gap-1">
      <Button asChild>
        <Link
          href={`tmap://route?goalname=${station.address}&rGoX=${station.lng}&rGoY=${station.lat}`}
        >
          TMAP으로 경로 전송
        </Link>
      </Button>
      <Button
        onClick={async () => {
          await navigator.clipboard.writeText(`${window.location.href}`);
          toast({
            title: "주소가 복사되었습니다",
            description: "원하는 곳에 붙여넣기(Ctrl+V)해주세요.",
            duration: 1000,
          });
        }}
      >
        경로 복사하기
      </Button>
    </div>
  );
};

export default ShareButtons;
