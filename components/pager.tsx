"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { neighbours } from "@/lib/nav";

export function Pager() {
  const path = usePathname();
  const { prev, next } = neighbours(path);
  if (!prev && !next) return null;

  return (
    <nav className="mt-16 grid gap-3 border-t border-neutral-100 pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group rounded-xl border border-neutral-200 p-4 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
        >
          <span className="flex items-center gap-1.5 text-xs text-neutral-400">
            <IconArrowLeft size={13} /> Previous
          </span>
          <span className="mt-1 block text-sm font-medium text-neutral-900">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={next.href}
          className="group rounded-xl border border-neutral-200 p-4 text-right transition-colors hover:border-neutral-300 hover:bg-neutral-50 sm:col-start-2"
        >
          <span className="flex items-center justify-end gap-1.5 text-xs text-neutral-400">
            Next <IconArrowRight size={13} />
          </span>
          <span className="mt-1 block text-sm font-medium text-neutral-900">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
