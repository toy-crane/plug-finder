import { CustomOverlayMap } from "react-kakao-maps-sdk";

import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { Icons } from "../icons";

const Marker = ({
  position,
  text,
  onClick,
}: {
  position: { lat: number; lng: number };
  text?: string;
  onClick: () => void;
}) => {
  return (
    <>
      <CustomOverlayMap position={position} zIndex={10}>
        <div className="flex flex-col items-center gap-1 group relative">
          <Button
            variant="ghost"
            className="rounded-full p-0 hover:bg-transparent"
            onClick={onClick}
          >
            <Icons.EvCharger className="w-8 h-8 fill-[#9b45c3] transition-transform duration-150 group-hover:scale-125" />
          </Button>
          <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-slate-700 font-semibold bg-slate-50 p-1 select-none group-hover:z-20">
            {text}
          </span>
        </div>
      </CustomOverlayMap>
    </>
  );
};

export default Marker;
