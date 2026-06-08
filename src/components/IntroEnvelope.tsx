import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Phase =
  | "idle"
  | "opening"
  | "flap"
  | "slide"
  | "unfold"
  | "complete";

export function IntroEnvelope({
  onComplete,
  onUserGesture,
}: {
  onComplete: () => void;
  onUserGesture: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [pressedAt, setPressedAt] = useState<number | null>(null);
  const timeouts = useRef<number[]>([]);

  const canSkip = reduced || phase === "opening" || phase === "flap" || phase === "slide" || phase === "unfold";

  const monogram = useMemo(() => "CA", []);

  useEffect(() => {
    return () => {
      timeouts.current.forEach((id) => window.clearTimeout(id));
      timeouts.current = [];
    };
  }, []);

  function schedule(ms: number, fn: () => void) {
    const id = window.setTimeout(fn, ms);
    timeouts.current.push(id);
  }

  function start() {
    if (phase !== "idle") return;
    const now = Date.now();
    setPressedAt(now);
    onUserGesture();

    if (reduced) {
      setPhase("complete");
      onComplete();
      return;
    }

    setPhase("opening");
    schedule(450, () => setPhase("flap"));
    schedule(1300, () => setPhase("slide"));
    schedule(2700, () => setPhase("unfold"));
    schedule(4650, () => {
      setPhase("complete");
      onComplete();
    });
  }

  function skip() {
    if (!canSkip) return;
    timeouts.current.forEach((id) => window.clearTimeout(id));
    timeouts.current = [];
    setPhase("complete");
    onComplete();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_20%_5%,color-mix(in_oklab,var(--peach)_35%,transparent),transparent_60%),radial-gradient(900px_700px_at_110%_40%,color-mix(in_oklab,var(--dusty-blue)_32%,transparent),transparent_60%),linear-gradient(180deg,var(--paper),var(--paper2))]" />
      <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(60%_55%_at_50%_35%,black,transparent)]">
        <div className="absolute left-1/2 top-1/2 h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_210deg,color-mix(in_oklab,var(--dusty-rose)_55%,transparent),transparent,transparent,color-mix(in_oklab,var(--terracotta)_55%,transparent))] blur-3xl" />
      </div>

      <div className="relative w-full max-w-[420px]">
        <div className="pointer-events-none absolute -top-10 left-1/2 w-[420px] -translate-x-1/2 text-center">
          <p className="font-serif text-2xl text-ink/85 sm:text-3xl">
            Christine <span className="text-ink/45">&amp;</span> Angelo
          </p>
          <p className="mt-2 font-sans text-xs tracking-[0.28em] uppercase text-ink-muted/85">
            June 19, 2026
          </p>
        </div>

        <div
          role="button"
          tabIndex={0}
          aria-label="Open invitation"
          onClick={start}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") start();
          }}
          className={cn(
            "group relative mx-auto aspect-[4/3] w-full select-none",
            phase === "complete" ? "pointer-events-none opacity-0 transition-opacity duration-500" : ""
          )}
        >
          <div className="absolute -inset-8 rounded-[60px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(244,156,118,0.18),transparent_60%)] blur-2xl" />

          <div className="relative h-full w-full [perspective:1200px]">
            <div
              className={cn(
                "absolute inset-0 rounded-[36px] border border-white/45 bg-white/35 shadow-[0_24px_90px_rgba(58,31,27,0.18)] backdrop-blur-sm",
                "transition-transform duration-700 ease-out",
                phase === "idle" ? "animate-[float_5.2s_ease-in-out_infinite]" : "animate-none"
              )}
            />

            <div className="absolute inset-0 rounded-[36px] bg-[linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.18))]" />

            <div className="absolute inset-x-8 bottom-8 top-16 rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.16))] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]" />

            <div
              className={cn(
                "absolute inset-x-8 top-16 h-[54%] origin-top rounded-t-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.10))] shadow-[0_10px_40px_rgba(58,31,27,0.10)]",
                "transition-transform duration-[900ms] ease-[cubic-bezier(.2,.9,.2,1)]",
                phase === "flap" || phase === "slide" || phase === "unfold" || phase === "opening"
                  ? "rotateX-[128deg]"
                  : "rotateX-[0deg]"
              )}
            />

            <div
              className={cn(
                "absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full",
                "bg-[radial-gradient(circle_at_35%_35%,#284a84,rgba(40,74,132,0.55))] shadow-[0_24px_70px_rgba(0,0,0,0.18)]",
                "transition-transform duration-700 ease-out",
                phase === "opening" ? "scale-95" : "",
                phase === "flap" || phase === "slide" || phase === "unfold" ? "scale-90 opacity-0" : ""
              )}
            >
              <div className="grid h-20 w-20 place-items-center rounded-full border border-white/25 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]">
                <span className="font-serif text-4xl tracking-tight text-white/90">
                  {monogram}
                </span>
              </div>
              <div className="absolute bottom-3 h-2 w-2 rounded-full bg-[#f6d6a7]" />
            </div>

            <div
              className={cn(
                "absolute left-1/2 top-[28%] w-[76%] -translate-x-1/2 rounded-[26px] border border-white/55 bg-white/70 shadow-[0_16px_60px_rgba(108,22,19,0.10)]",
                "transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(.18,.9,.18,1)]",
                phase === "idle" || phase === "opening" ? "translate-y-10 opacity-0" : "",
                phase === "slide" ? "-translate-y-6 opacity-100" : "",
                phase === "unfold" ? "-translate-y-16 opacity-100" : "",
                phase === "complete" ? "-translate-y-24 opacity-0" : ""
              )}
              style={{ height: "58%" }}
            >
              <div
                className={cn(
                  "absolute inset-0 rounded-[26px] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.60))]",
                  "transition-transform duration-[950ms] ease-[cubic-bezier(.2,.85,.2,1)] origin-top",
                  phase === "unfold" ? "scale-y-[1.12]" : "scale-y-100"
                )}
              />
              <div className="relative h-full w-full p-6">
                <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-ink-muted">
                  Together with our loved ones
                </p>
                <p className="mt-2 font-serif text-3xl leading-none text-burgundy">
                  You are warmly invited
                </p>
                <p className="mt-3 font-sans text-sm leading-6 text-ink-muted">
                  Tap to open our invitation
                </p>
                <div className="mt-6 h-px w-20 bg-gradient-to-r from-burgundy/40 to-transparent" />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-16 left-1/2 w-full -translate-x-1/2 text-center">
            <p className="font-sans text-xs tracking-[0.26em] uppercase text-ink-muted/80">
              {phase === "idle" ? "Tap the envelope to open" : "Opening…"}
            </p>
            <p className="mt-2 font-sans text-[11px] text-ink-muted/70">
              {pressedAt ? "" : "Audio will begin after opening"}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2">
          <div className="h-12 w-[420px] rounded-[999px] bg-[radial-gradient(closest-side,rgba(108,22,19,0.25),transparent)] blur-2xl" />
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={skip}
            className={cn(
              "rounded-full border border-white/45 bg-white/45 px-4 py-2 text-xs tracking-wide text-ink-muted backdrop-blur-md transition-colors",
              canSkip ? "hover:bg-white/65" : "pointer-events-none opacity-0"
            )}
          >
            Skip animation
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}

