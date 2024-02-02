import { siteConfig } from "@/config/site";

const addPathToBaseURL = (path: string) => `${siteConfig.url}${path}`;

export async function GET() {
  const sitemaps = [
    { url: "/stations/sitemap/0.xml" },
    { url: "/stations/sitemap/1.xml" },
    { url: "/stations/sitemap/2.xml" },
    { url: "/cars/compare/sitemap.xml" },
  ];

  const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemaps
        .map(
          (sm) => `<sitemap>
          <loc>${addPathToBaseURL(sm.url)}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          </sitemap>`
        )
        .join("")}
    </sitemapindex>`;

  return new Response(xmlStr, {
    headers: {
      "content-type": "application/xml;charset=UTF-8",
    },
  });
}
