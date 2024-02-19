import { siteConfig } from "@/config/site";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import { Tables } from "@/types/generated";
import { MetadataRoute } from "next";

const addPathToBaseURL = (path: string) => `${siteConfig.url}${path}`;

type Car = Tables<"cars">;

const createSitemapUrls = (cars: Car[]): MetadataRoute.Sitemap => {
  return cars.reduce<MetadataRoute.Sitemap>((sitemapEntries, primaryCar, i) => {
    cars.slice(i + 1).forEach((secondaryCar) => {
      const url = `/cars/compare?primary=${encodeURIComponent(
        primaryCar.slug
      )}&amp;secondary=${encodeURIComponent(secondaryCar.slug)}`;
      const entry = {
        url: addPathToBaseURL(url), // addPathToBaseURL 함수가 URL에 기본 경로를 추가한다고 가정합니다.
        lastModified: new Date().toISOString(), // 현재 날짜와 시간을 사용합니다.
        priority: 0.8, // 고정된 우선 순위 값입니다.
        changeFrequency: "daily" as const, // 고정된 변경 빈도입니다.
      };
      sitemapEntries.push(entry);
    });
    return sitemapEntries;
  }, []);
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase.from("cars").select("*");
  if (response.error) {
    throw Error("stations fetch에 실패하였습니다.");
  }

  const allCars = response.data;
  const sitemapUrls = createSitemapUrls(allCars);
  return sitemapUrls;
}
