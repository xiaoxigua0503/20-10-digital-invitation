import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export function Accordion({
  items,
}: {
  items: Array<{ title: string; content: string }>;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const base = useId();

  return (
    <div className="grid gap-3">
      {items.map((it, idx) => {
        const id = `${base}-${idx}`;
        const expanded = open === id;

        return (
          <div
            key={id}
            className="card-bg-4 rounded-[28px] border border-white/45 shadow-[0_22px_80px_rgba(58,31,27,0.10)] backdrop-blur-md"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              aria-expanded={expanded}
              aria-controls={`${id}-panel`}
              id={`${id}-button`}
              onClick={() => setOpen((s) => (s === id ? null : id))}
            >
              <span className="font-serif text-xl text-ink">{it.title}</span>
              <span
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full border border-white/40 bg-white/30 text-ink-muted transition-transform duration-300",
                  expanded ? "rotate-45" : "rotate-0"
                )}
              >
                +
              </span>
            </button>
            <div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-button`}
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="min-h-0 px-6 pb-6">
                <p className="font-sans text-sm leading-7 text-ink-muted">
                  {it.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
