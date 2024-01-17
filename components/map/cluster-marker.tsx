import { CustomOverlayMap } from "react-kakao-maps-sdk";

import { useState } from "react";

const ClusterMarker = ({
  position,
  text,
  selected = false,
  onClick,
}: {
  position: { lat: number; lng: number };
  selected?: boolean;
  text?: string;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const zIndex = selected || isHovered ? 20 : 10;
  return (
    <>
      <CustomOverlayMap position={position} zIndex={zIndex}>
        <div className="cursor-pointer w-10 h-10 bg-purple-600 rounded-full text-white font-bold leading-none flex items-center justify-center">
          {text}
        </div>
      </CustomOverlayMap>
    </>
  );
};

export default ClusterMarker;
