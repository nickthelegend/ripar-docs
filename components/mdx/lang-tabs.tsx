"use client";

import { Children, isValidElement, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_LABELS = ["TypeScript", "Python", "cURL"];

/**
 * One idea, three languages, one vertical space.
 *
 * Children are the fenced code blocks in source order — MDX renders them on the
 * server and hands them here already highlighted, so switching tabs costs no
 * JavaScript beyond a class change. Inactive panels stay in the DOM rather than
 * unmounting: a crawler and a ⌘F both still find the Python snippet.
 */
export function LangTabs({ labels, children }: { labels?: string[]; children: ReactNode }) {
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // MDX puts whitespace text nodes between blocks; only the elements are panels.
  const panels = Children.toArray(children).filter(isValidElement);
  const names = (labels ?? DEFAULT_LABELS).slice(0, panels.length);

  function onKeyDown(e: React.KeyboardEvent) {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + panels.length) % panels.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="my-5">
      <div
        role="tablist"
        aria-label="Language"
        onKeyDown={onKeyDown}
        className="flex flex-wrap items-center gap-1 rounded-t-xl border border-b-0 border-[#ececee] bg-[#f6f6f7] px-2 py-1.5"
      >
        {names.map((name, i) => (
          <button
            key={name}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${uid}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-lg px-2.5 py-1 text-[12.5px] font-medium transition-colors",
              i === active
                ? "bg-white text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                : "text-neutral-500 hover:text-neutral-900"
            )}
          >
            {name}
          </button>
        ))}
      </div>

      {panels.map((panel, i) => (
        <div
          key={names[i] ?? i}
          role="tabpanel"
          id={`${uid}-panel-${i}`}
          aria-labelledby={`${uid}-tab-${i}`}
          hidden={i !== active}
          // The block below owns its own border and radius; squaring the top
          // edge is what joins it to the tab strip instead of stacking two cards.
          className={cn(
            "lang-panel",
            i === active ? "block" : "hidden"
          )}
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
