import Link from "next/link";

// The Ripar mark — three slabs in isometric: the execution layer, stated
// literally. Single source for the navbar, the footer and app/icon.svg.
//
// Geometry is generated rather than hand-drawn so the stack stays centred in
// the 48 box and inside the circle that social avatars get cropped to.
const HW = 16; // half-width of a slab's top face
const HH = 7.5; // half-height of it
const D = 4.5; // slab depth
const CYS = [12, 22, 32] as const; // slab centres, top to bottom

/** One slab: the lit top face plus its two visible sides. */
function Slab({ cy, top, left, right }: { cy: number; top: string; left: string; right: string }) {
  return (
    <>
      <path d={`M24 ${cy - HH} L${24 + HW} ${cy} L24 ${cy + HH} L${24 - HW} ${cy} Z`} fill={top} />
      <path
        d={`M${24 - HW} ${cy} L${24 - HW} ${cy + D} L24 ${cy + HH + D} L24 ${cy + HH} Z`}
        fill={left}
      />
      <path
        d={`M${24 + HW} ${cy} L${24 + HW} ${cy + D} L24 ${cy + HH + D} L24 ${cy + HH} Z`}
        fill={right}
      />
    </>
  );
}

const STOPS: [string, string, string][] = [
  ["hi", "#ffd9a3", "#ff8f42"],
  ["lt", "#ff9d4f", "#ff6620"],
  ["md", "#f4541b", "#c93400"],
  ["dk", "#b62c00", "#8a2000"],
  ["dk2", "#8f2200", "#5e1400"],
];

export function Mark({ size = 26, className }: { size?: number; className?: string }) {
  const p = "ripar-mono";
  const g = (k: string) => `url(#${p}-${k})`;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        {STOPS.map(([k, a, b]) => (
          <linearGradient key={k} id={`${p}-${k}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </linearGradient>
        ))}
      </defs>
      {/* painted bottom-up so the upper slabs overlap the ones beneath */}
      <Slab cy={CYS[2]} top={g("md")} left={g("dk")} right={g("dk2")} />
      <Slab cy={CYS[1]} top={g("lt")} left={g("md")} right={g("dk")} />
      <Slab cy={CYS[0]} top={g("hi")} left={g("lt")} right={g("md")} />
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
