"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type H = { id: string; text: string; level: number };

/**
 * Headings are produced by MDX at render time, so the table of contents is
 * read back off the DOM rather than parsed from source — one implementation
 * that stays correct for every page without a build step.
 */
export function Toc() {
  const [heads, setHeads] = useState<H[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(".prose h2[id], .prose h3[id]")
    );
    setHeads(nodes.map((n) => ({ id: n.id, text: n.textContent ?? "", level: +n.tagName[1] })));

    if (!nodes.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Bias the band toward the top of the viewport so the highlighted
      // entry is the heading you are actually reading under.
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  if (heads.length < 2) return null;

  return (
    <div className="text-[13px]">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
        On this page
      </div>
      <ul className="space-y-1.5 border-l border-neutral-200">
        {heads.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l-2 py-0.5 transition-colors",
                h.level === 3 ? "pl-6" : "pl-3.5",
                active === h.id
                  ? "border-[#ff6b2b] font-medium text-[#c9450a]"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
