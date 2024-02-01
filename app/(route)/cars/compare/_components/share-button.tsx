"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Share2Icon } from "lucide-react";
import { track } from "@vercel/analytics";
import { useMediaQuery } from "@/lib/hooks";

const ShareButton = () => {
  const { toast } = useToast();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <Button
      onClick={async () => {
        await navigator.clipboard.writeText(`${window.location.href}`);
        toast({
          title: "주소가 복사되었습니다",
          description: "원하는 곳에 붙여넣기(Ctrl+V)해주세요.",
          duration: 1000,
        });
        track("car-compare-shared");
      }}
      size={isDesktop ? "default" : "icon"}
    >
      <span className="hidden md:block">공유하기</span>
      <Share2Icon className="md:ml-2 h-4 w-4" />
    </Button>
  );
};

export default ShareButton;
