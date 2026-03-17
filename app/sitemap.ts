import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://edgecloud.co.ke";
  const routes = [
    { url: base, priority: 1.0 },
    { url: `${base}/products`, priority: 0.9 },
    { url: `${base}/products/eza-cloud`, priority: 0.9 },
    { url: `${base}/products/zurimail`, priority: 0.9 },
    { url: `${base}/services`, priority: 0.85 },
    { url: `${base}/solutions`, priority: 0.8 },
    { url: `${base}/solutions/smes-ecommerce`, priority: 0.75 },
    { url: `${base}/solutions/fintech-saccos`, priority: 0.75 },
    { url: `${base}/solutions/health-ngos`, priority: 0.75 },
    { url: `${base}/solutions/agencies-developers`, priority: 0.75 },
    { url: `${base}/company`, priority: 0.7 },
    { url: `${base}/resources`, priority: 0.8 },
    { url: `${base}/contact`, priority: 0.85 },
    { url: `${base}/privacy-policy`, priority: 0.4 },
    { url: `${base}/cookie-policy`, priority: 0.4 },
    { url: `${base}/data-processing-agreement`, priority: 0.5 },
  ];
  return routes.map(({ url, priority }) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority,
  }));
}
