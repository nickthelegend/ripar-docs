export type DocLink = { title: string; href: string; desc?: string };
export type DocGroup = { group: string; items: DocLink[] };

// Order here is the reading order: it drives the sidebar, the prev/next
// footer, and the search index.
export const NAV: DocGroup[] = [
  {
    group: "Getting started",
    items: [
      { title: "Introduction", href: "/", desc: "What Ripar is and who it is for" },
      { title: "Quickstart", href: "/quickstart", desc: "Run a paid endpoint locally" },
      { title: "Your first payment", href: "/first-payment", desc: "Call a paid endpoint and settle it" },
    ],
  },
  {
    group: "Concepts",
    items: [
      { title: "The x402 protocol", href: "/concepts/x402", desc: "HTTP 402, revived" },
      { title: "Payments & settlement", href: "/concepts/payments", desc: "USDC on Algorand, end to end" },
      { title: "Discovery", href: "/concepts/discovery", desc: "Manifests, agent cards and the Bazaar" },
      { title: "Custody model", href: "/concepts/custody", desc: "Where the money actually sits" },
    ],
  },
  {
    group: "Guides",
    items: [
      { title: "Build an agent", href: "/guides/deploy", desc: "From handler to priced endpoint" },
      { title: "Deploy anywhere", href: "/guides/deploy-anywhere", desc: "Railway, Render, Fly.io, Heroku, Docker" },
      { title: "Jobs & validation", href: "/guides/jobs", desc: "The on-chain job registry" },
    ],
  },
  {
    group: "Reference",
    items: [
      // First in the group: it is the surface most people touch before any other.
      { title: "SDK", href: "/reference/sdk", desc: "defineEndpoint, defineAgent, serve, RiparClient" },
      { title: "CLI", href: "/reference/cli", desc: "Every command" },
      { title: "MCP server", href: "/reference/mcp", desc: "Tools exposed to agents" },
      { title: "Agent HTTP API", href: "/reference/api", desc: "What a running agent serves" },
      { title: "Errors", href: "/reference/errors", desc: "What went wrong and why" },
    ],
  },
  {
    group: "Operating",
    items: [
      { title: "Security", href: "/security", desc: "Keys, spend caps, what is not covered" },
      { title: "Limits & costs", href: "/limits", desc: "Real limits and what a call costs" },
    ],
  },
];

export const FLAT: DocLink[] = NAV.flatMap((g) => g.items);

export function neighbours(href: string) {
  const i = FLAT.findIndex((l) => l.href === href);
  return { prev: i > 0 ? FLAT[i - 1] : null, next: i >= 0 && i < FLAT.length - 1 ? FLAT[i + 1] : null };
}
