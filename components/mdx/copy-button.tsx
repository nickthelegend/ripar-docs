"use client";

import { useRef, useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";

/** Copies the sibling <pre>'s text. Lives outside it so it never lands in the copy. */
export function CopyButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [done, setDone] = useState(false);

  async function copy() {
    const pre = ref.current?.parentElement?.querySelector("pre");
    if (!pre) return;
    try {
      await navigator.clipboard.writeText(pre.innerText.replace(/\n$/, ""));
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch {
      /* clipboard blocked — the snippet is on screen to select */
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={copy}
      aria-label="Copy code"
      className="absolute right-2.5 top-2.5 rounded-lg border border-neutral-200 bg-white/90 p-1.5 text-neutral-500 opacity-0 backdrop-blur transition-all hover:text-neutral-900 focus-visible:opacity-100 group-hover:opacity-100"
    >
      {done ? <IconCheck size={14} className="text-emerald-600" /> : <IconCopy size={14} />}
    </button>
  );
}
