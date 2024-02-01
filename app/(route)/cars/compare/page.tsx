import { createSupabaseServerClient } from "@/supabase/server";
import { Share2Icon } from "lucide-react";
import CarCard from "./_components/car-card";
import { Button } from "@/components/ui/button";
import Spec from "./_components/spec";
import ShareButton from "./_components/share-button";
import { CarComboBox } from "./_components/car-combobox";

interface Props {
  searchParams: { primary?: string; secondary?: string };
}

const Page = async ({
  searchParams: {
    primary = "tesla-modely-performance-2023",
    secondary = "tesla-models-awd-2023",
  },
}: Props) => {
  const supabase = await createSupabaseServerClient();
  const response = await supabase.from("cars").select("*");
  if (response.error) throw response.error;
  const cars = response.data;
  const primaryCar = cars.find((car) => car.slug === primary);
  const secondaryCar = cars.find((car) => car.slug === secondary);
  if (primaryCar === undefined || secondaryCar === undefined) {
    throw Error("Invalid car slug");
  }

  return (
    <>
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-semibold md:text-6xl">전기차 비교하기</h1>
        <ShareButton />
      </div>
      <div className="flex flex-col">
        <div className="sticky top-0 z-10 flex mb-4 gap-4 mt-4 pt-1">
          <CarComboBox slug={primaryCar.slug} cars={cars} order={"primary"} />
          <CarComboBox
            slug={secondaryCar.slug}
            cars={cars}
            order={"secondary"}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <CarCard imageUrl={primaryCar.image_url} />
          <CarCard imageUrl={secondaryCar.image_url} />
        </div>
        <Spec primaryCarId={primaryCar.id} secondaryCarId={secondaryCar.id} />
      </div>
    </>
  );
};

export default Page;
