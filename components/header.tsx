"use client";

import { useState } from "react";
import Link from "next/link";
import { IconBrandGithub, IconMenu2, IconX } from "@tabler/icons-react";
import { Logo } from "@/components/logo";
import { Search } from "@/components/search";
import { SidebarNav } from "@/components/sidebar";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="-ml-1 flex h-8 w-8 items-center justify-center rounded-md text-neutral-600 lg:hidden"
        >
          {open ? <IconX size={19} /> : <IconMenu2 size={19} />}
        </button>

        <Logo />

        <div className="ml-auto flex items-center gap-2.5">
          <div className="hidden sm:block">
            <Search />
          </div>
          <Link
            href="https://ripar.io"
            className="hidden rounded-lg px-2.5 py-1.5 text-[13.5px] text-neutral-600 transition-colors hover:text-neutral-900 md:block"
          >
            Website
          </Link>
          <Link
            href="https://github.com/nickthelegend"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            aria-label="GitHub"
          >
            <IconBrandGithub size={17} />
          </Link>
          <Link
            href="https://app.ripar.io"
            className="rounded-lg bg-neutral-900 px-3 py-1.5 text-[13.5px] font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {open && (
        <div className="max-h-[70vh] overflow-y-auto border-t border-neutral-200 bg-white px-4 py-4 lg:hidden">
          <div className="mb-4 sm:hidden">
            <Search />
          </div>
          <SidebarNav onNavigate={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
}
