"use client";

import { Button } from "../ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
type Props = {
  zoomIn: () => void;
  zoomOut: () => void;
};

const ZoomControl = ({ zoomIn, zoomOut }: Props) => {
  return (
    <div className="flex flex-col">
      <Button
        onClick={() => zoomIn()}
        variant={"secondary"}
        size={"icon"}
        className="rounded-b-none border-b border"
      >
        <PlusIcon />
      </Button>
      <Button
        onClick={() => zoomOut()}
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
