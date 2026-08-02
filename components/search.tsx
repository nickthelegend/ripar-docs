"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";
import { FLAT } from "@/lib/nav";
import { cn } from "@/lib/utils";

type Entry = { title: string; href: string; desc?: string; section?: string };

export function Search() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [index, setIndex] = useState<Entry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // ⌘K / Ctrl-K anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // The heading-level index is generated at build time; fall back to the
  // page list alone if it has not been fetched yet.
  useEffect(() => {
    if (!open || index.length) return;
    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((d: Entry[]) => setIndex(d))
      .catch(() => setIndex([]));
  }, [open, index.length]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 20);
    else {
      setQ("");
      setSel(0);
    }
  }, [open]);

  const pool: Entry[] = index.length ? index : FLAT;
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return pool.slice(0, 8);
    return pool
      .filter((e) =>
        [e.title, e.desc, e.section].filter(Boolean).join(" ").toLowerCase().includes(term)
      )
      .slice(0, 10);
  }, [q, pool]);

  function go(e: Entry) {
    setOpen(false);
    router.push(e.href);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-[13px] text-neutral-400 transition-colors hover:border-neutral-300 md:w-[210px]"
      >
        <IconSearch size={14} />
        Search docs
        <kbd className="ml-auto rounded border border-neutral-200 bg-neutral-50 px-1.5 text-[10px] font-medium text-neutral-400">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-neutral-900/25 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 border-b border-neutral-100 px-4">
              <IconSearch size={16} className="text-neutral-400" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSel((s) => Math.min(s + 1, results.length - 1));
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSel((s) => Math.max(s - 1, 0));
                  }
                  if (e.key === "Enter" && results[sel]) go(results[sel]);
                }}
                placeholder="Search the docs…"
                className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-neutral-400"
              />
            </div>
            <ul className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-neutral-400">No matches</li>
              )}
              {results.map((r, i) => (
                <li key={`${r.href}-${r.title}-${i}`}>
                  <button
                    type="button"
                    onMouseEnter={() => setSel(i)}
                    onClick={() => go(r)}
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left transition-colors",
                      i === sel ? "bg-orange-50" : "hover:bg-neutral-50"
                    )}
                  >
                    <div className="text-[13.5px] font-medium text-neutral-900">{r.title}</div>
                    {(r.desc || r.section) && (
                      <div className="mt-0.5 truncate text-xs text-neutral-500">
                        {r.section ?? r.desc}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
