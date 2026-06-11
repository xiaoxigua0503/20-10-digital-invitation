import { useEffect, useRef, useState } from "react";
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
  const navRef = useRef<HTMLElement>(null);

  // Reliable scroll-based active section detection
  useEffect(() => {
    const getActiveId = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      // Pick the section whose top is closest to 30% down the viewport
      const triggerY = scrollY + viewportHeight * 0.3;

      let bestId = items[0]?.id ?? "";
      let bestTop = -Infinity;

      for (const { id } of items) {
        const el = document.getElementById(id);
        if (!el) continue;
        const elTop = el.getBoundingClientRect().top + scrollY;
        if (elTop <= triggerY && elTop > bestTop) {
          bestTop = elTop;
          bestId = id;
        }
      }

      setActiveId(bestId);
    };

    // Run on mount and on every scroll
    getActiveId();
    window.addEventListener("scroll", getActiveId, { passive: true });
    return () => window.removeEventListener("scroll", getActiveId);
  }, [items]);

  // Auto-center the active nav button within the nav bar
  useEffect(() => {
    if (!activeId || !navRef.current) return;
    const nav = navRef.current;
    const btn = nav.querySelector<HTMLElement>(`[data-nav-id="${activeId}"]`);
    if (!btn) return;
    const navCenter = nav.offsetWidth / 2;
    const btnCenter = btn.offsetLeft + btn.offsetWidth / 2;
    nav.scrollTo({ left: btnCenter - navCenter, behavior: "smooth" });
  }, [activeId]);

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
          <nav
            ref={navRef}
            className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((it) => {
              const active = it.id === activeId;
              return (
                <button
                  key={it.id}
                  data-nav-id={it.id}
                  type="button"
                  onClick={() => scrollToId(it.id)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-2 text-xs tracking-wide transition-colors duration-200",
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
