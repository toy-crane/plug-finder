import SupabaseImage from "@/supabase/image";
import { CarComboBox } from "./car-combobox";
import { createSupabaseServerClient } from "@/supabase/server";

const CarCard = async ({
  slug,
  order,
}: {
  slug: string;
  order: "primary" | "secondary";
}) => {
  const supabase = await createSupabaseServerClient();
  const response = await supabase.from("cars").select("*");
  if (response.error) throw response.error;
  const cars = response.data;
  const car = cars.find((car) => car.slug === slug);
  if (car === undefined) throw new Error("Car not found");
  return (
    <div className="items-center justify-center bg-white rounded-2xl py-6 shadow-sm px-1">
      <div className="flex flex-col items-center justify-center">
        <CarComboBox slug={slug} cars={cars} order={order} />
        <div className="w-full relative h-36 md:h-56">
          <SupabaseImage
            src={`cars/${car?.image_url}`}
            alt="car Image"
            fill
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CarCard;
