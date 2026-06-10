import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { gallery } from "@/lib/wedding";
import Image from "next/image";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const MAX_INITIAL_PHOTOS = 6;

export function GallerySection() {
  const [open, setOpen] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const active = useMemo(() => gallery.find((g) => g.src === open) ?? null, [open]);
  const portalTarget = typeof document === "undefined" ? null : document.body;

  return (
    <Section id="gallery" title="Photo Gallery" eyebrow="A few frames">
      <Reveal>
        <div className="columns-2 gap-4 [column-fill:_balance] sm:columns-3">
          {(showAll ? gallery : gallery.slice(0, MAX_INITIAL_PHOTOS)).map((g, idx) => {
            const isLast = !showAll && gallery.length > MAX_INITIAL_PHOTOS && idx === MAX_INITIAL_PHOTOS - 1;
            return (
            <button
              key={g.src}
              type="button"
              onClick={() => isLast ? setShowAll(true) : setOpen(g.src)}
              className={cn(
                "relative mb-4 block w-full overflow-hidden rounded-[22px] border border-white/45 bg-white/28 shadow-[0_18px_60px_rgba(58,31,27,0.10)]",
                "transition-transform duration-300 hover:-translate-y-1"
              )}
              style={{ breakInside: "avoid" }}
            >
              <Image
                src={g.src}
                alt={g.alt}
                width={900}
                height={1200}
                priority={idx < 2}
                className="h-auto w-full object-cover"
              />
              {isLast && (
                <div className="absolute inset-0 grid place-items-center bg-black/50 backdrop-blur-[2px]">
                  <span className="font-sans text-xl font-medium tracking-wide text-white">
                    +{gallery.length - MAX_INITIAL_PHOTOS + 1} More
                  </span>
                </div>
              )}
            </button>
            );
          })}
        </div>
      </Reveal>

      {open && active && portalTarget
        ? createPortal(
            <div
              className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-6"
              onClick={() => setOpen(null)}
              role="dialog"
              aria-modal="true"
            >
              <div
                className="relative max-h-[86vh] w-full max-w-[980px] overflow-hidden rounded-[28px] border border-white/20 bg-black/20 shadow-[0_40px_120px_rgba(0,0,0,0.40)] backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={active.src}
                  alt={active.alt}
                  width={1400}
                  height={1800}
                  className="h-auto max-h-[86vh] w-full object-contain"
                  priority
                />
                <button
                  type="button"
                  className="absolute right-4 top-4 rounded-full bg-white/15 px-4 py-2 text-xs tracking-wide text-white backdrop-blur-md transition-colors hover:bg-white/25"
                  onClick={() => setOpen(null)}
                >
                  Close
                </button>
              </div>
            </div>,
            portalTarget
          )
        : null}
    </Section>
  );
}
