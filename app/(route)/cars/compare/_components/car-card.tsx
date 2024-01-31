import SupabaseImage from "@/supabase/image";
import { CarComboBox } from "./car-combobox";

const CarCard = ({ slug }: { slug: string }) => {
  return (
    <div className="flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <CarComboBox slug={slug} />
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
