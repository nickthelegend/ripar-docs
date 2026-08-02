"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePathname();
  return (
    <nav className="space-y-7 pb-16">
      {NAV.map((g) => (
        <div key={g.group}>
          <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
            {g.group}
          </div>
          <ul className="space-y-0.5">
            {g.items.map((it) => {
              const active = path === it.href;
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-lg px-3 py-1.5 text-[13.5px] transition-colors",
                      active
                        ? "bg-orange-50 font-medium text-[#c9450a]"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    )}
                  >
                    {active && (
                      <span className="absolute inset-y-1 left-0 w-[2.5px] rounded-full bg-[#ff6b2b]" />
                    )}
                    {it.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
