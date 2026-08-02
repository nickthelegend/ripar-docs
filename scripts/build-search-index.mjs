// Extracts page titles and headings from the MDX tree into a flat index the
// ⌘K palette fetches at runtime. Runs before `next build`.
import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const ROOT = join(process.cwd(), "app", "(content)");
const OUT = join(process.cwd(), "public", "search-index.json");

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name === "page.mdx") out.push(p);
  }
  return out;
}

function hrefFor(file) {
  const rel = relative(ROOT, file).split(sep).slice(0, -1).join("/");
  return "/" + rel;
}

const files = await walk(ROOT);
const entries = [];

for (const file of files) {
  const src = await readFile(file, "utf8");
  const href = hrefFor(file).replace(/\/$/, "") || "/";

  const title = src.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? href;
  const desc = src.match(/description:\s*\n?\s*"([^"]+)"/)?.[1]?.replace(/\s+/g, " ").trim();
  entries.push({ title, href, desc });

  // h2/h3 become their own deep-linked results
  for (const m of src.matchAll(/^(#{2,3})\s+(.+)$/gm)) {
    const text = m[2].replace(/[`*_]/g, "").trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    entries.push({ title: text, href: `${href}#${slug}`, section: title });
  }
}

await mkdir(join(process.cwd(), "public"), { recursive: true });
await writeFile(OUT, JSON.stringify(entries));
console.log(`search index: ${entries.length} entries from ${files.length} pages`);
