import { useEffect, useMemo, useState } from "react";
import { wedding } from "@/lib/wedding";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function HeroSection({ onRsvp }: { onRsvp: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [y, setY] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY || 0));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const ornamentShift = useMemo(() => {
    if (reduced) return 0;
    return Math.min(22, y * 0.06);
  }, [reduced, y]);

  return (
    <header className="relative overflow-hidden px-5 pt-28 sm:px-8 sm:pt-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-28 top-10 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--peach)_55%,transparent),transparent_62%)] blur-2xl" />
        <div className="absolute -right-24 top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_40%_35%,color-mix(in_oklab,var(--dusty-blue)_48%,transparent),transparent_62%)] blur-2xl" />
      </div>

      <Container>
        <div className="relative">
          <div
            className="pointer-events-none absolute -left-10 -top-12 h-44 w-44 rounded-full border border-white/40 bg-white/20 backdrop-blur-sm"
            style={
              reduced
                ? undefined
                : { transform: `translate3d(0, ${ornamentShift}px, 0)` }
            }
          />
          <div
            className="pointer-events-none absolute -right-10 top-14 h-56 w-56 rounded-[48px] border border-white/40 bg-white/20 backdrop-blur-sm"
            style={
              reduced
                ? undefined
                : { transform: `translate3d(0, ${ornamentShift * 0.7}px, 0)` }
            }
          />

          <div className="relative rounded-[36px] border border-white/45 bg-white/38 px-6 py-14 shadow-[0_30px_110px_rgba(58,31,27,0.16)] backdrop-blur-md sm:px-14 sm:py-18">
            <p className="font-sans text-xs tracking-[0.34em] uppercase text-ink-muted/85">
              Together with our loved ones
            </p>
            <div className="mt-10 flex flex-col gap-3">
              <h1 className="font-serif text-5xl leading-[0.95] text-ink sm:text-7xl">
                <span className="block">{wedding.couple.bride}</span>
                <span
                  className={cn(
                    "mt-3 block text-3xl text-ink/55 sm:text-4xl"
                  )}
                >
                  &amp;
                </span>
                <span className="mt-3 block">{wedding.couple.groom}</span>
              </h1>
              <div className="mt-6 h-px w-28 bg-gradient-to-r from-burgundy/55 to-transparent" />
              <p className="mt-6 max-w-xl font-sans text-base leading-8 text-ink-muted sm:text-lg">
                You are warmly invited to celebrate our wedding day.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Button type="button" onClick={onRsvp} className="w-full sm:w-auto">
                RSVP
              </Button>
              <p className="font-sans text-sm tracking-wide text-ink-muted">
                {wedding.date.display}
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => {
                document.getElementById("countdown")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="rounded-full border border-white/40 bg-white/40 px-5 py-3 text-xs tracking-[0.26em] uppercase text-ink-muted backdrop-blur-md transition-colors hover:bg-white/60"
            >
              Scroll
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}

