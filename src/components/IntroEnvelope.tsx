import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Phase = "idle" | "seal" | "open" | "lift" | "reveal" | "complete";

const paperTexture = {
  backgroundImage: `
    radial-gradient(circle at 18% 14%, rgba(255,255,255,0.32), transparent 22%),
    radial-gradient(circle at 82% 82%, rgba(145,104,75,0.16), transparent 28%),
    linear-gradient(135deg, rgba(255,255,255,0.16), transparent 38%),
    repeating-linear-gradient(118deg, rgba(120,84,58,0.045) 0px, rgba(120,84,58,0.045) 2px, transparent 2px, transparent 11px),
    linear-gradient(180deg, #e8c8a4 0%, #d8b089 100%)
  `,
};

const frontFlapTexture = {
  backgroundImage: `
    linear-gradient(180deg, rgba(255,255,255,0.14), rgba(120,77,47,0.06)),
    repeating-linear-gradient(125deg, rgba(122,84,58,0.04) 0px, rgba(122,84,58,0.04) 2px, transparent 2px, transparent 10px),
    linear-gradient(180deg, #e1bc93 0%, #cca177 100%)
  `,
};

const letterTexture = {
  backgroundImage: `
    radial-gradient(circle at 20% 12%, rgba(255,255,255,0.8), transparent 28%),
    linear-gradient(180deg, rgba(255,255,255,0.95), rgba(247,238,229,0.98))
  `,
};

const seamTexture = {
  backgroundImage: `
    linear-gradient(45deg, transparent 49.4%, rgba(118,84,58,0.34) 50%, transparent 50.6%),
    linear-gradient(-45deg, transparent 49.4%, rgba(118,84,58,0.34) 50%, transparent 50.6%),
    linear-gradient(135deg, transparent 49.4%, rgba(118,84,58,0.18) 50%, transparent 50.6%),
    linear-gradient(-135deg, transparent 49.4%, rgba(118,84,58,0.18) 50%, transparent 50.6%)
  `,
};

export function IntroEnvelope({
  onComplete,
  onUserGesture,
}: {
  onComplete: () => void;
  onUserGesture: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [hasStarted, setHasStarted] = useState(false);
  const timeouts = useRef<number[]>([]);
  const monogram = useMemo(() => "CA", []);

  const canSkip = reduced || phase !== "idle";
  const isOpen = phase === "open" || phase === "lift" || phase === "reveal";
  const isLifted = phase === "lift" || phase === "reveal";
  const isReveal = phase === "reveal";

  useEffect(() => {
    return () => {
      timeouts.current.forEach((id) => window.clearTimeout(id));
      timeouts.current = [];
    };
  }, []);

  function clearScheduled() {
    timeouts.current.forEach((id) => window.clearTimeout(id));
    timeouts.current = [];
  }

  function schedule(ms: number, fn: () => void) {
    const id = window.setTimeout(fn, ms);
    timeouts.current.push(id);
  }

  function start() {
    if (phase !== "idle") return;

    setHasStarted(true);
    onUserGesture();

    if (reduced) {
      setPhase("complete");
      onComplete();
      return;
    }

    setPhase("seal");
    schedule(260, () => setPhase("open"));
    schedule(1425, () => setPhase("lift"));
    schedule(2625, () => setPhase("reveal"));
    schedule(3525, () => {
      setPhase("complete");
      onComplete();
    });
  }

  function skip() {
    if (!canSkip) return;
    clearScheduled();
    setPhase("complete");
    onComplete();
  }

  const letterTransform = isReveal
    ? "translate(-50%, -58%) scale(1.08)"
    : isLifted
      ? "translate(-50%, -42%) scale(1.03)"
      : isOpen
        ? "translate(-50%, -26%) scale(1)"
        : "translate(-50%, 10%) scale(0.98)";

  const sealTransform = phase === "seal" ? "translate(-50%, -50%) scale(0.94)" : "translate(-50%, -50%) scale(1)";

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 overflow-hidden",
        isReveal ? "pointer-events-none" : ""
      )}
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-[900ms] ease-out",
          isReveal ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(1200px_900px_at_12%_6%,rgba(244,192,148,0.26),transparent_60%),radial-gradient(1000px_760px_at_100%_20%,rgba(158,179,198,0.18),transparent_62%),linear-gradient(180deg,#f8efe6,#f3e5d7)]" />
        <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.5),transparent_22%),radial-gradient(circle_at_75%_18%,rgba(255,255,255,0.22),transparent_18%),radial-gradient(circle_at_35%_78%,rgba(169,118,86,0.08),transparent_22%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_35%,rgba(115,83,57,0.06)_100%)]" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 sm:py-12">
        <div
          className={cn(
            "relative w-full max-w-[380px] transition-[transform,opacity,filter] duration-[900ms] ease-[cubic-bezier(.2,.88,.2,1)] sm:max-w-[900px]",
            isReveal ? "scale-[1.16] opacity-0 blur-[6px]" : "scale-100 opacity-100 blur-0"
          )}
        >
          <div className="pointer-events-none mb-8 text-center sm:mb-10">
            <p className="font-serif text-[2rem] text-[#6f5648] sm:text-[2.7rem]">
              Christine <span className="text-[#a08676]">&amp;</span> Angelo
            </p>
            <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.34em] text-[#8d7264] sm:text-xs">
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
              "group relative mx-auto block w-full cursor-pointer select-none outline-none",
              "aspect-[3/4] sm:aspect-[4/3]",
              "focus-visible:ring-2 focus-visible:ring-[#8d7264]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f3e5d7]"
            )}
          >
            <div className="absolute inset-x-[12%] bottom-[10%] h-[14%] rounded-full bg-[radial-gradient(closest-side,rgba(123,86,60,0.28),transparent)] blur-2xl sm:inset-x-[18%] sm:bottom-[9%]" />
            <div className="absolute inset-x-[4%] top-[10%] h-[78%] rounded-[52px] bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.42),transparent_58%)] blur-3xl sm:inset-x-[7%] sm:top-[16%] sm:h-[62%]" />

            <div className="absolute inset-[2%] [perspective:1800px] sm:inset-[4%]">
              <div
                className={cn(
                  "absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(.22,.9,.22,1)]",
                  phase === "idle" ? "animate-[envelopeFloat_5.8s_ease-in-out_infinite]" : "animate-none"
                )}
              >
                <div className="absolute left-1/2 top-1/2 h-[84%] w-[78%] -translate-x-1/2 -translate-y-1/2 sm:h-[74%] sm:w-[84%]">
                  <div
                    className="absolute inset-0 overflow-hidden rounded-[26px] border border-[#f4e4d7]/90 shadow-[0_22px_70px_rgba(100,70,47,0.18)] sm:rounded-[34px]"
                    style={paperTexture}
                  >
                    <div className="absolute inset-0 opacity-70" style={seamTexture} />

                    <div
                      className="absolute left-1/2 top-[23%] z-10 h-[54%] w-[70%] rounded-[16px] border border-[#eadbcc] bg-[#f9f3ec] shadow-[0_12px_30px_rgba(100,70,47,0.12)] transition-[transform,opacity,filter] duration-[1150ms] ease-[cubic-bezier(.18,.9,.18,1)] sm:top-[21%] sm:h-[58%] sm:w-[54%] sm:rounded-[20px]"
                      style={{
                        ...letterTexture,
                        transform: letterTransform,
                        opacity: isReveal ? 0 : 1,
                        filter: isReveal ? "blur(3px)" : "blur(0px)",
                      }}
                    >
                      <div className="flex h-full flex-col justify-between p-4 sm:p-6">
                        <div>
                          <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#8f7668] sm:text-[11px]">
                            You are invited
                          </p>
                          <div className="mt-3 h-px w-14 bg-gradient-to-r from-[#b3907a] to-transparent sm:w-20" />
                        </div>
                        <div className="pb-2 text-center">
                          <p className="font-serif text-3xl text-[#725646] sm:text-5xl">{monogram}</p>
                          <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.22em] text-[#8f7668] sm:text-[11px]">
                            Tap To Open
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="absolute inset-x-0 top-0 z-30 h-[55%] origin-top transition-transform duration-[1200ms] ease-[cubic-bezier(.25,.9,.18,1)] [backface-visibility:hidden]"
                      style={{
                        ...frontFlapTexture,
                        clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                        transform: isOpen ? "rotateX(-178deg)" : "rotateX(0deg)",
                      }}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),transparent_45%,rgba(94,63,41,0.08))]" />
                    </div>

                    <div
                      className="absolute inset-y-0 left-0 z-20 w-[54%]"
                      style={{
                        ...frontFlapTexture,
                        clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                      }}
                    />

                    <div
                      className="absolute inset-y-0 right-0 z-20 w-[54%]"
                      style={{
                        ...frontFlapTexture,
                        clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                      }}
                    />

                    <div
                      className="absolute inset-x-0 bottom-0 z-20 h-[52%]"
                      style={{
                        ...frontFlapTexture,
                        clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                      }}
                    />

                    <div className="absolute inset-0 z-20 opacity-75" style={seamTexture} />

                    <div
                      className="absolute left-1/2 top-[52%] z-40 transition-[transform,opacity,filter] duration-[650ms] ease-out"
                      style={{
                        transform: sealTransform,
                        opacity: isOpen ? 0 : 1,
                        filter: isOpen ? "blur(2px)" : "blur(0px)",
                      }}
                    >
                      <div className="relative grid h-24 w-24 place-items-center rounded-full bg-[radial-gradient(circle_at_28%_24%,#24477f,#0d2b57)] shadow-[0_12px_28px_rgba(12,32,66,0.35)] sm:h-28 sm:w-28">
                        <div className="absolute inset-[10%] rounded-full border border-white/18" />
                        <div className="absolute inset-[18%] rounded-full border border-[#3f6297]/70" />
                        <span className="font-serif text-[2.35rem] leading-none tracking-tight text-[#e8edf7] sm:text-[2.7rem]">
                          {monogram}
                        </span>
                        <div className="absolute bottom-[18%] h-2.5 w-2.5 rounded-full bg-[#f2cd7b]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 text-center">
              <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-[#8d7264] sm:text-xs">
                {phase === "idle" ? "Tap the envelope to open" : "Opening invitation"}
              </p>
              <p className="mt-2 font-sans text-[11px] text-[#9b8376]">
                {hasStarted ? "Preparing your invitation experience" : "Audio will begin after opening"}
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center sm:mt-10">
            <button
              type="button"
              onClick={skip}
              className={cn(
                "rounded-full border border-white/55 bg-white/45 px-4 py-2 text-xs tracking-[0.2em] uppercase text-[#8b7265] backdrop-blur-md transition-colors",
                canSkip ? "hover:bg-white/65" : "pointer-events-none opacity-0"
              )}
            >
              Skip animation
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes envelopeFloat {
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
