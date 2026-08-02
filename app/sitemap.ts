import type { MetadataRoute } from "next";
import { FLAT } from "@/lib/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  return FLAT.map((l) => ({
    url: `https://docs.ripar.io${l.href === "/" ? "" : l.href}`,
    changeFrequency: "weekly" as const,
    priority: l.href === "/" ? 1 : 0.7,
  }));
}
