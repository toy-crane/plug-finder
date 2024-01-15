"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/hooks";
import { useToast } from "@/components/ui/use-toast";
import { Tables } from "@/types/generated";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

type Props = {
  station: Tables<"stations">;
};

const ShareButtons = ({ station }: Props) => {
  const { toast } = useToast();
  return (
    <div className="flex gap-2 flex-col">
      <Button
        variant="ghost"
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
      <Button asChild variant="ghost">
        <Link
          href={`tmap://route?goalname=${station.address}&rGoX=${station.lng}&rGoY=${station.lat}`}
        >
          <Icons.TMap className="mr-1.5 w-6 h-6" />
          TMAP으로 경로 전송
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link
          href={`nmap://navigation?dname=${station.address}&dlng=${station.lng}&dlat=${station.lat}&appname=${siteConfig.url}`}
        >
          <Icons.Naver className="mr-1.5 w-6 h-6" />
          Naver Map으로 경로 전송
        </Link>
      </Button>
    </div>
  );
};

export function ShareDrawer({ station }: Props) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">공유하기</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>공유하기</DialogTitle>
            <ShareButtons station={station} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">공유하기</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>공유하기</DrawerTitle>
        </DrawerHeader>
        <ShareButtons station={station} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">닫기</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ShareDrawer;
