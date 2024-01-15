"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { siteConfig } from "@/config/site";
import { Tables } from "@/types/generated";
import Link from "next/link";

type Props = {
  station: Tables<"stations">;
};

const ShareButtons = ({ station }: Props) => {
  const { toast } = useToast();
  return (
    <div className="flex gap-1 flex-col">
      <Button asChild>
        <Link
          href={`tmap://route?goalname=${station.address}&rGoX=${station.lng}&rGoY=${station.lat}`}
        >
          TMAP으로 경로 전송
        </Link>
      </Button>
      <Button asChild>
        <Link
          href={`nmap://navigation?dname=${station.address}&dlng=${station.lng}&dlat=${station.lat}&appname=${siteConfig.url}`}
        >
          Naver Map으로 경로 전송
        </Link>
      </Button>
      <Button asChild>
        <Link href={`kakaomap://route?ep=${station.lat},${station.lng}&by=CAR`}>
          카카오 맵으로 경로 전송
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
