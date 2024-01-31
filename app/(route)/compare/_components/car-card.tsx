"use client";

import SupabaseImage from "@/supabase/image";
import { Tables } from "@/types/generated";

const CarCard = ({ car }: { car: Tables<"cars"> }) => {
  return (
    <div className="flex-1 items-center justify-center">
      <div className="flex flex-col">
        <div>{car?.model}</div>
        <div>
          <SupabaseImage
            src={car.image_url}
            alt="car Image"
            width={400}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default CarCard;
