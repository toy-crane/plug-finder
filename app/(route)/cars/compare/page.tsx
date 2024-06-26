import {
  createSupabaseServerClient,
  createSupabaseServerClientReadOnly,
} from "@/supabase/server";
import CarCard from "./_components/car-card";
import Spec from "./_components/spec";
import ShareButton from "./_components/share-button";
import { CarComboBox } from "./_components/car-combobox";
import { siteConfig } from "@/config/site";
import { Metadata, ResolvingMetadata } from "next/types";
import { notFound } from "next/navigation";
import CarMakerMappings from "@/constants/brand";
import { Button } from "@/components/ui/button";
import PageView from "./_components/page-view";

const PRIMARY_DEFAULT = "tesla-modely-performance-2023";
const SECONDARY_DEFAULT = "tesla-models-awd-2023";

interface Props {
  searchParams: { primary: string; secondary: string };
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = await createSupabaseServerClientReadOnly();
  const primary = decodeURIComponent(searchParams.primary ?? PRIMARY_DEFAULT);
  const secondary = decodeURIComponent(
    searchParams.secondary ?? SECONDARY_DEFAULT
  );
  const response = await supabase
    .from("cars")
    .select("*")
    .in("slug", [primary, secondary]);

  if (response.error) {
    if (response.error.code === "PGRST116") {
      notFound();
    } else {
      throw Error(response.error.message);
    }
  }

  const cars = response.data;
  const primaryCar = cars.find((car) => car.slug === primary);
  const secondaryCar = cars.find((car) => car.slug === secondary);

  if (primaryCar === undefined || secondaryCar === undefined) {
    return {};
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];
  const title = `${CarMakerMappings[primaryCar.brand]} ${
    primaryCar?.display_model
  } ${primaryCar?.display_trim} VS ${CarMakerMappings[secondaryCar?.brand]} ${
    secondaryCar?.display_model
  } ${secondaryCar?.display_trim}`;

  const description = `model X, model 3, model S, model Y 등 한국에서 판매되는 모든 tesla 전기차의 성능, 가격, 특징을 깊이있게 비교해 보세요.
  현대, 기아, BMW, 벤츠, 아우디, 포르쉐, 폴스타 등 다양한 브랜드 전기차도 곧 추가됩니다.`;
  const url = `${siteConfig.url}/cars/compare?primary=${primary}&secondary=${secondary}`;

  const image = {
    url: `${siteConfig.url}/api/og?primary=${primaryCar.display_model}&secondary=${secondaryCar.display_model}&primary_trim=${primaryCar.display_trim}&secondary_trim=${secondaryCar.display_trim}`,
    width: 1200,
    height: 630,
    alt: `${primaryCar.display_model} vs ${secondaryCar.display_model} 전기차 비교하기`,
  };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [image, ...previousImages],
    },
    twitter: {
      title,
      description,
      images: [image, ...previousImages],
    },
    alternates: {
      canonical: url,
    },
  };
}

const Page = async ({
  searchParams: { primary = PRIMARY_DEFAULT, secondary = SECONDARY_DEFAULT },
}: Props) => {
  const supabase = await createSupabaseServerClient();
  const response = await supabase.from("cars").select("*");
  if (response.error) throw response.error;
  const cars = response.data;
  const primaryCar = cars.find((car) => car.slug === primary);
  const secondaryCar = cars.find((car) => car.slug === secondary);
  if (
    primaryCar === undefined ||
    secondaryCar === undefined ||
    primary === secondary
  ) {
    notFound();
  }

  return (
    <>
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-semibold md:text-6xl">전기차 비교하기</h1>
        <ShareButton />
      </div>
      <div className="flex flex-col">
        <section className="flex justify-end">
          <PageView pageUniqueKey={`${primaryCar.slug}-${secondaryCar.slug}`} />
        </section>
        <section className="sticky top-0 z-10 flex mb-4 gap-4 mt-4 pt-1 bg-[#FAFAFA]">
          <CarComboBox
            slug={primaryCar.slug}
            cars={cars.filter((car) => car.slug !== secondary)}
            order={"primary"}
          />
          <CarComboBox
            slug={secondaryCar.slug}
            cars={cars.filter((car) => car.slug !== primary)}
            order={"secondary"}
          />
        </section>
        <section className="grid grid-cols-2 gap-4 mb-8">
          <CarCard imageUrl={primaryCar.image_url} />
          <CarCard imageUrl={secondaryCar.image_url} />
        </section>
        <section className="pb-24 flex flex-col">
          <Button
            asChild
            variant="link"
            className="self-end text-neutral-500 pr-0"
          >
            <a
              href={"https://forms.gle/b9MdhUGPUKBqyw8X9"}
              target="_blank"
              rel="noopener noreferrer"
            >
              제작자에게 피드백 남기기
            </a>
          </Button>
          <Spec primaryCarId={primaryCar.id} secondaryCarId={secondaryCar.id} />
        </section>
      </div>
    </>
  );
};

export default Page;
