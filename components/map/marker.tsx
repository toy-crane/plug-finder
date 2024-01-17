import { CustomOverlayMap } from "react-kakao-maps-sdk";

import { Button } from "../ui/button";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Marker = ({
  position,
  text,
  selected = false,
  isCluster,
  onClick,
}: {
  position: { lat: number; lng: number };
  selected?: boolean;
  text?: string;
  isCluster?: boolean;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const zIndex = selected || isHovered ? 20 : 10;
  return (
    <>
      <CustomOverlayMap position={position} zIndex={zIndex}>
        <div
          className={cn("flex flex-col items-center group relative")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isCluster ? (
            <button
              className={cn(
                "w-8 h-8 rounded-full text-xs font-bold flex justify-center items-center text-white group-hover:scale-125",
                "group-hover:bg-[#e06bff] cursor-pointer group-hover:font-extrabold",
                selected ? "bg-[#e06bff] scale-125" : "bg-[#791ca4]"
              )}
              onClick={onClick}
            >
              {text}
            </button>
          ) : (
            <>
              <Button
                variant="ghost"
                className="rounded-full p-0 hover:bg-transparent"
                onClick={onClick}
              >
                <Icons.EvCharger
                  className={cn(
                    "w-9 h-9  transition-transform duration-150 group-hover:scale-125 group-hover:fill-[#e06bff]",
                    selected ? "fill-[#e06bff] scale-125" : "fill-[#791ca4]"
                  )}
                />
              </Button>
              <span
                className={cn(
                  "text-xs text-slate-700 bg-slate-50 p-1 select-none block",
                  "top-[50%] left-[50%] translate-x-[-50%] absolute mt-5",
                  "group-hover:font-extrabold",
                  selected && "font-bold text-sm block"
                )}
              >
                {text}
              </span>
            </>
          )}
        </div>
      </CustomOverlayMap>
    </>
  );
};

export default Marker;
