import Link from "next/link";
import type { ReactNode } from "react";
import { IconAlertTriangle, IconBulb, IconInfoCircle } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/mdx/copy-button";
import { LangTabs } from "@/components/mdx/lang-tabs";

const TONES = {
  note: { icon: IconInfoCircle, cls: "border-sky-200 bg-sky-50/70", ic: "text-sky-600" },
  tip: { icon: IconBulb, cls: "border-emerald-200 bg-emerald-50/70", ic: "text-emerald-600" },
  warning: { icon: IconAlertTriangle, cls: "border-amber-200 bg-amber-50/70", ic: "text-amber-600" },
} as const;

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof TONES;
  title?: string;
  children: ReactNode;
}) {
  const t = TONES[type];
  const Icon = t.icon;
  return (
    <div className={cn("my-5 flex gap-3 rounded-xl border p-4", t.cls)}>
      <Icon size={17} className={cn("mt-0.5 shrink-0", t.ic)} />
      <div className="min-w-0 text-[14px] leading-relaxed text-neutral-700 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {title && <div className="mb-1 font-semibold text-neutral-900">{title}</div>}
        {children}
      </div>
    </div>
  );
}

/** Card grid for hub pages. */
export function Cards({ children }: { children: ReactNode }) {
  return <div className="my-6 grid gap-3 sm:grid-cols-2">{children}</div>;
}

export function Card({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-neutral-200 p-4 no-underline transition-all hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_10px_24px_-14px_rgba(0,0,0,0.25)]"
    >
      <div className="text-[14.5px] font-semibold text-neutral-900">{title}</div>
      {children && <div className="mt-1 text-[13px] leading-relaxed text-neutral-500">{children}</div>}
    </Link>
  );
}

/** Ordered walkthrough with a connecting rail. */
export function Steps({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 ml-3 border-l border-neutral-200 pl-6 [counter-reset:step] [&>h3]:mt-7 [&>h3:first-child]:mt-0 [&>h3]:relative [&>h3]:[counter-increment:step] before:hidden">
      {children}
    </div>
  );
}

/** HTTP verb + path, for reference pages. */
export function Endpoint({ method, path }: { method: string; path: string }) {
  const tone =
    method === "GET"
      ? "bg-sky-100 text-sky-700"
      : method === "DELETE"
        ? "bg-rose-100 text-rose-700"
        : "bg-emerald-100 text-emerald-700";
  return (
    <div className="my-4 flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5">
      <span className={cn("rounded-md px-2 py-0.5 font-mono text-[11px] font-bold", tone)}>
        {method}
      </span>
      <code className="font-mono text-[13px] text-neutral-800">{path}</code>
    </div>
  );
}

export const mdxComponents = {
  Callout,
  Cards,
  Card,
  Steps,
  Endpoint,
  LangTabs,
  a: ({ href = "", ...props }: React.ComponentProps<"a">) =>
    href.startsWith("/") ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" {...props} />
    ),
  pre: ({ children, ...props }: React.ComponentProps<"pre">) => (
    <div className="group relative">
      <pre {...props}>{children}</pre>
      <CopyButton />
    </div>
  ),
};
