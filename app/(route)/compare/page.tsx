import { createSupabaseServerClient } from "@/supabase/server";

interface Props {
  searchParams: { primary?: string; secondary?: string };
}

const Page = async ({
  searchParams: {
    primary = "tesla-model-y-rwd",
    secondary = "tesla-model-y-performance",
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
    <div>
      <div>자동차 비교하기</div>
      <div className="flex">
        <div className="flex-1 items-center justify-center">
          <div>
            {primaryCar?.model} {primaryCar?.slug}
          </div>
        </div>
        <div className="flex-1">
          <div>
            {secondaryCar?.model} {secondaryCar?.slug}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
