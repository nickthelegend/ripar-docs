# ripar-docs

The Ripar documentation site — **[docs.ripar.io](https://docs.ripar.io)**.

Quickstart, first payment, concepts (x402, payments, custody, discovery),
guides (deploy, workflows, marketplace, orchestrator), API/CLI/MCP reference,
errors, limits and security. Content is MDX; the chrome is Next.js.

Next.js 16 (App Router) · React 19 · Tailwind v4 · `@next/mdx` · Shiki.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

`npm run dev` and `npm run build` both regenerate `public/search-index.json`
first, so the ⌘K palette always matches the pages that exist. No environment
variables are needed.

## Writing a page

Add `app/(content)/<path>/page.mdx` and a matching entry in `lib/nav.ts`. The
nav list is also what `app/sitemap.ts` walks, so one edit gets the page into
the sidebar, the sitemap and the search index at once.

## Two traps in this stack

Both are silent — the build passes and the page renders wrong — so they are
worth knowing before you spend an afternoon on either.

1. **MDX plugins must be named as strings.** Turbopack serialises the
   `@next/mdx` loader config, so `remarkPlugins: [["remark-gfm", {}]]` works
   and `remarkPlugins: [remarkGfm]` kills the build with "does not have
   serializable options". See the comment in `next.config.ts`.
2. **Dual-theme Shiki needs a consumer.** `rehype-pretty-code` with a
   light/dark theme pair emits only `--shiki-light` and `--shiki-dark` custom
   properties. Nothing reads them by default, so every token renders in flat
   body colour until `.prose pre code span { color: var(--shiki-light) }`
   exists in `globals.css`.

## Real versus sample

The prose describes the product Ripar is building. Treat it as a specification
of intent, not as a report of deployed capability — some of what is documented
is further along than the rest.

What is concretely true and checkable:

- The x402 mechanics, the USDC asset id `31566704` and the Algorand timings are
  real, external facts.
- Code samples are written against [`../ripar-sdk`](../ripar-sdk), and its test
  suite exercises the same negotiation path the docs describe.
- `RIPAR_WALLET_MNEMONIC` appears only inside an example snippet on the
  first-payment page. Nothing in this repo reads a mnemonic, holds a key or
  touches a wallet.

There are no usage numbers, customer names or uptime figures anywhere in the
docs. Do not add any.

## Deploy

Vercel, on push to `main`. Production is `docs.ripar.io`.

```bash
npx vercel --prod        # from this directory, when you need to force one
```

Read [`../CONTRIBUTING.md`](../CONTRIBUTING.md) first — commits must be
authored as the Vercel account email or the deployment sits at `BLOCKED` with
no build logs.

CI (`.github/workflows/ci.yml`) runs `tsc --noEmit` and `npm run build` on
every push and PR, which includes the search-index generation step.
