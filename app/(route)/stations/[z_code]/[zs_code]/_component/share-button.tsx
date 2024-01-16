"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Share } from "lucide-react";

const ShareButton = () => {
  const { toast } = useToast();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={async () => {
        await navigator.clipboard.writeText(`${window.location.href}`);
        toast({
          title: "주소가 복사되었습니다",
          description: "원하는 곳에 붙여넣기(Ctrl+V)해주세요.",
          duration: 1000,
        });
      }}
    >
      <Share />
    </Button>
  );
};

export default ShareButton;
