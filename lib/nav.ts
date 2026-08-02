export type DocLink = { title: string; href: string; desc?: string };
export type DocGroup = { group: string; items: DocLink[] };

// Order here is the reading order: it drives the sidebar, the prev/next
// footer, and the search index.
export const NAV: DocGroup[] = [
  {
    group: "Getting started",
    items: [
      { title: "Introduction", href: "/", desc: "What Ripar is and who it is for" },
      { title: "Quickstart", href: "/quickstart", desc: "Ship a paid endpoint in five minutes" },
      { title: "Your first payment", href: "/first-payment", desc: "Call a paid endpoint and settle it" },
    ],
  },
  {
    group: "Concepts",
    items: [
      { title: "The x402 protocol", href: "/concepts/x402", desc: "HTTP 402, revived" },
      { title: "Payments & settlement", href: "/concepts/payments", desc: "USDC on Algorand, end to end" },
      { title: "Discovery & the Bazaar", href: "/concepts/discovery", desc: "How agents find your endpoint" },
      { title: "Custody model", href: "/concepts/custody", desc: "Where the money actually sits" },
    ],
  },
  {
    group: "Guides",
    items: [
      { title: "Deploy an agent", href: "/guides/deploy", desc: "From handler to priced endpoint" },
      { title: "Build a workflow", href: "/guides/workflows", desc: "Triggers, conditions, retries" },
      { title: "Sell on the marketplace", href: "/guides/marketplace", desc: "Publish, price, get paid" },
      { title: "Orchestrator jobs", href: "/guides/orchestrator", desc: "Post work, take the best bid" },
    ],
  },
  {
    group: "Reference",
    items: [
      { title: "MCP server", href: "/reference/mcp", desc: "Tools exposed to agents" },
      { title: "REST API", href: "/reference/api", desc: "Endpoints, params, responses" },
      { title: "CLI", href: "/reference/cli", desc: "Every command" },
      { title: "Errors", href: "/reference/errors", desc: "What went wrong and why" },
    ],
  },
  {
    group: "Operating",
    items: [
      { title: "Security", href: "/security", desc: "Keys, escrow, spend caps" },
      { title: "Limits & pricing", href: "/limits", desc: "Rate limits and what it costs" },
    ],
  },
];

export const FLAT: DocLink[] = NAV.flatMap((g) => g.items);

export function neighbours(href: string) {
  const i = FLAT.findIndex((l) => l.href === href);
  return { prev: i > 0 ? FLAT[i - 1] : null, next: i >= 0 && i < FLAT.length - 1 ? FLAT[i + 1] : null };
}
