import { districtCodes } from "@/constants/districts";
import { regionCodes } from "@/constants/regions";
import { createSupabaseServerClientReadOnly } from "@/supabase/server";
import type { MetadataRoute } from "next";

const addPathToBaseURL = (path: string) => `https://www.plugfinder.app${path}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createSupabaseServerClientReadOnly();
  const response = await supabase
    .from("stations")
    .select("slug, z_code, zs_code");
  if (response.error) {
    throw Error("stations fetch에 실패하였습니다.");
  }
  const allStations = response.data;

  const stationDetailUrls = allStations.map((st) => ({
    url: addPathToBaseURL(
      `/stations/${st.z_code}/${st.zs_code}/${encodeURIComponent(st.slug)}`
    ),
    lastModified: new Date(),
    priority: 0.8,
    changeFrequency: "daily" as const,
  }));

  const regionUrls = regionCodes.map((code) => ({
    url: addPathToBaseURL(`/stations/${code}`),
    lastModified: new Date("2024-01-10"),
    priority: 0.3,
    changeFrequency: "monthly" as const,
  }));

  const districtUrls = districtCodes.map((code) => ({
    url: addPathToBaseURL(`/stations/${code.substring(0, 2)}/${code}`),
    lastModified: new Date("2024-01-10"),
    priority: 0.5,
    changeFrequency: "monthly" as const,
  }));

  return [
    {
      url: addPathToBaseURL("/"),
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "daily",
    },
    ...stationDetailUrls,
    ...regionUrls,
    ...districtUrls,
  ];
}
