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
    <div className="flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <CarComboBox slug={slug} cars={cars} order={order} />
        <div>
          <SupabaseImage
            src={`cars/${car?.image_url}`}
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
