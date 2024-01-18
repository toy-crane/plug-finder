import { siteConfig } from "@/config/site";
import { districtCodes } from "@/constants/districts";
import { regionCodes } from "@/constants/regions";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import { MetadataRoute } from "next";

const addPathToBaseURL = (path: string) => `${siteConfig.url}${path}`;

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const start = id * 40000;
  const end = start + 40000;
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase
    .from("stations")
    .select("slug, z_code, zs_code")
    .range(start, end);
  if (response.error) {
    throw Error("stations fetch에 실패하였습니다.");
  }

  const allStations = response.data;

  const stationDetailUrls = allStations.map((st) => ({
    url: addPathToBaseURL(
      `/stations/${st.z_code}/${st.zs_code}/${encodeURIComponent(st.slug)}`
    ),
    lastModified: new Date(),
    priority: 0.5,
    changeFrequency: "daily" as const,
  }));

  if (id === 0) {
    const homeUrls = {
      url: siteConfig.url,
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: "daily" as const,
    };

    const regionUrls = regionCodes.map((code) => ({
      url: addPathToBaseURL(`/stations/${code}`),
      lastModified: new Date().toISOString(),
      priority: 0.3,
      changeFrequency: "monthly" as const,
    }));

    const districtUrls = districtCodes.map((code) => ({
      url: addPathToBaseURL(`/stations/${code.substring(0, 2)}/${code}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: "monthly" as const,
    }));
    return [homeUrls, ...regionUrls, ...districtUrls, ...stationDetailUrls];
  }

  return stationDetailUrls;
}
