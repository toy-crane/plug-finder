"use client";

import SupabaseImage from "@/supabase/image";
import { Tables } from "@/types/generated";
import { CarComboBox } from "./car-combobox";

const CarCard = () => {
  return (
    <div className="flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <CarComboBox model={"model-y"} />
        <div>
          <SupabaseImage
            src={"cars/tesla/model-3.avif"}
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
