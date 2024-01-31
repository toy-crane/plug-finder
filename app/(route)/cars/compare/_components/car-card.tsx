"use client";

import SupabaseImage from "@/supabase/image";
import { Tables } from "@/types/generated";
import { CarComboBox } from "./car-combobox";

const CarCard = ({ car }: { car: Tables<"cars"> }) => {
  return (
    <div className="flex-1 items-center justify-center">
      <div className="flex flex-col">
        <CarComboBox model={car?.model} />
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
