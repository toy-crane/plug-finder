"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

const ZoomControl = () => {
  const queryParams = useSearchParams();
  const router = useRouter();

  const handleZoom = (zoom: number) => {
    const params = new URLSearchParams(queryParams);
    const zoomLevel = Number(params.get("level"));
    if ((zoomLevel <= 1 && zoom < 0) || (zoomLevel >= 15 && zoom > 0)) {
      return;
    }
    params.set("level", String(Number(params.get("level")) + zoom));
    router.push("/?" + params.toString());
  };

  return (
    <div className="flex flex-col">
      <Button
        onClick={() => handleZoom(1)}
        variant={"secondary"}
        size={"icon"}
        className="rounded-b-none border-b border"
      >
        <PlusIcon />
      </Button>
      <Button
        onClick={() => handleZoom(-1)}
        variant={"secondary"}
        size={"icon"}
        className="rounded-t-none border"
      >
        <MinusIcon />
      </Button>
    </div>
  );
};

export default ZoomControl;
