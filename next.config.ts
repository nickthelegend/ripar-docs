import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

// Turbopack serialises the loader config, so plugins are named as strings
// rather than imported — passing the functions themselves fails the build
// with "does not have serializable options".
const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [
      ["rehype-slug", {}],
      // Headings become their own anchors — deep-linking a paragraph of a
      // reference page is the most-used affordance in any docs site.
      ["rehype-autolink-headings", { behavior: "wrap", properties: { className: "heading-anchor" } }],
      [
        "rehype-pretty-code",
        { theme: { light: "github-light", dark: "github-dark" }, keepBackground: false },
      ],
    ],
  },
});

export default withMDX(nextConfig);
