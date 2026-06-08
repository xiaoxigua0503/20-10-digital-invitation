import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string };

export function StickyNav({
  visible,
  items,
}: {
  visible: boolean;
  items: Item[];
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  const ids = useMemo(() => items.map((i) => i.id), [items]);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (vis?.target?.id) setActiveId(vis.target.id);
      },
      { threshold: [0.25, 0.4, 0.55], rootMargin: "-15% 0px -70% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-40 px-4 pt-4 transition-opacity duration-500",
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-[999px] border border-white/30 bg-white/55 px-3 py-2 shadow-[0_20px_60px_rgba(108,22,19,0.10)] backdrop-blur-md">
          <nav className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((it) => {
              const active = it.id === activeId;
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => scrollToId(it.id)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-2 text-xs tracking-wide transition-colors",
                    active
                      ? "bg-burgundy text-white"
                      : "text-ink-muted hover:bg-peach/35 hover:text-ink"
                  )}
                >
                  {it.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

