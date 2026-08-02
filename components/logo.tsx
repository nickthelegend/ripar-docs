import Link from "next/link";

/** The Ripar mark — a geometric R cut out of a gradient squircle. */
export function Mark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <defs>
        <linearGradient id="rd-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8a4d" />
          <stop offset="100%" stopColor="#f0530c" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#rd-g)" />
      <path
        d="M17 36V14h9.5a6.5 6.5 0 1 1 0 13H21l9 9"
        fill="none"
        stroke="#fff"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Mark />
      <span className="text-[15px] font-semibold tracking-tight text-neutral-900">Ripar</span>
      <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-[10.5px] font-medium text-neutral-500">
        docs
      </span>
    </Link>
  );
}
