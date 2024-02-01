import { createSupabaseServerClient } from "@/supabase/server";
import { Share2Icon } from "lucide-react";
import CarCard from "./_components/car-card";
import { Button } from "@/components/ui/button";
import Spec from "./_components/spec";

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
  const response = await supabase
    .from("cars")
    .select("*")
    .in("slug", [primary, secondary]);
  if (response.error) throw response.error;
  const cars = response.data;
  const primaryCar = cars.find((car) => car.slug === primary);
  const secondaryCar = cars.find((car) => car.slug === secondary);
  if (primaryCar === undefined || secondaryCar === undefined) {
    throw Error("Invalid car slug");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-semibold md:text-6xl">전기차 비교하기</h1>
        <Button>
          <span className="hidden md:block">공유하기</span>
          <Share2Icon className="md:ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-4">
        <CarCard slug={primary} order="primary" />
        <CarCard slug={secondary} order="secondary" />
      </div>
      <div>
        <Spec primaryCarId={primaryCar.id} secondaryCarId={secondaryCar.id} />
      </div>
    </div>
  );
};

export default Page;
