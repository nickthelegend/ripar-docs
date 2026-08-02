import { SidebarNav } from "@/components/sidebar";
import { Toc } from "@/components/toc";
import { Pager } from "@/components/pager";

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[1400px] px-4 sm:px-6">
      {/* sidebar — sticky under the 56px header */}
      <aside className="thin-scroll sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[var(--sidebar-w)] shrink-0 overflow-y-auto py-8 pr-4 lg:block">
        <SidebarNav />
      </aside>

      <main className="min-w-0 flex-1 py-10 lg:px-10">
        <article className="prose mx-auto max-w-[46rem]">{children}</article>
        <div className="mx-auto max-w-[46rem]">
          <Pager />
        </div>
      </main>

      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[var(--toc-w)] shrink-0 overflow-y-auto py-10 xl:block">
        <Toc />
      </aside>
    </div>
  );
}
