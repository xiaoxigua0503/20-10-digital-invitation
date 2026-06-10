import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Phase = "idle" | "seal" | "open" | "lift" | "reveal" | "complete";

const paperNoise = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.05' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.32'/%3E%3C/svg%3E\")",
};

const paperTexture = {
  backgroundImage: `
    radial-gradient(circle at 18% 14%, rgba(255,255,255,0.30), transparent 22%),
    radial-gradient(circle at 84% 22%, rgba(255,255,255,0.16), transparent 18%),
    radial-gradient(circle at 82% 82%, rgba(145,104,75,0.20), transparent 30%),
    radial-gradient(circle at 22% 78%, rgba(120,84,58,0.12), transparent 26%),
    repeating-linear-gradient(118deg, rgba(120,84,58,0.06) 0px, rgba(120,84,58,0.06) 2px, transparent 2px, transparent 10px),
    repeating-linear-gradient(26deg, rgba(120,84,58,0.03) 0px, rgba(120,84,58,0.03) 1px, transparent 1px, transparent 8px),
    linear-gradient(180deg, #e7c39d 0%, #d2a67b 100%)
  `,
};

const frontFlapTexture = {
  backgroundImage: `
    linear-gradient(180deg, rgba(255,255,255,0.16), rgba(120,77,47,0.08)),
    repeating-linear-gradient(125deg, rgba(122,84,58,0.055) 0px, rgba(122,84,58,0.055) 2px, transparent 2px, transparent 9px),
    repeating-linear-gradient(22deg, rgba(122,84,58,0.03) 0px, rgba(122,84,58,0.03) 1px, transparent 1px, transparent 7px),
    linear-gradient(180deg, #ddb58a 0%, #c69668 100%)
  `,
};

const innerFlapTexture = {
  backgroundImage: `
    radial-gradient(circle at 18% 18%, rgba(255,255,255,0.26), transparent 48%),
    radial-gradient(circle at 80% 70%, rgba(120,77,47,0.14), transparent 54%),
    repeating-linear-gradient(122deg, rgba(122,84,58,0.04) 0px, rgba(122,84,58,0.04) 2px, transparent 2px, transparent 10px),
    linear-gradient(180deg, #d5a97e 0%, #be8b5f 100%)
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
    linear-gradient(45deg, transparent 49.74%, rgba(118,84,58,0.34) 50%, transparent 50.26%),
    linear-gradient(-45deg, transparent 49.74%, rgba(118,84,58,0.34) 50%, transparent 50.26%),
    linear-gradient(135deg, transparent 49.76%, rgba(118,84,58,0.16) 50%, transparent 50.24%),
    linear-gradient(-135deg, transparent 49.76%, rgba(118,84,58,0.16) 50%, transparent 50.24%)
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
  const [sealImgOk, setSealImgOk] = useState(true);
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
    ? "translate(-50%, -100%) scale(1.1) rotate(-0.6deg)"
    : isLifted
      ? "translate(-50%, -60%) scale(1.06) rotate(-0.35deg)"
      : isOpen
        ? "translate(-50%, 6%) scale(1.02)"
        : "translate(-50%, 30%) scale(0.98)";

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
            "relative w-full max-w-[380px] transition-[transform,opacity,filter] duration-[900ms] ease-[cubic-bezier(.2,.88,.2,1)] sm:max-w-[760px]",
            isReveal ? "scale-[1.16] opacity-0 blur-[6px]" : "scale-100 opacity-100 blur-0"
          )}
        >
          <div className="pointer-events-none mb-7 text-center sm:mb-7">
            <p className="font-serif text-[2rem] text-[#6f5648] sm:text-[2.55rem]">
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
            <div className="absolute inset-x-[12%] bottom-[11%] h-[14%] rounded-full bg-[radial-gradient(closest-side,rgba(123,86,60,0.28),transparent)] blur-2xl sm:inset-x-[20%] sm:bottom-[12%]" />
            <div className="absolute inset-x-[4%] top-[10%] h-[78%] rounded-[52px] bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.42),transparent_58%)] blur-3xl sm:inset-x-[10%] sm:top-[14%] sm:h-[66%]" />

            <div className="absolute inset-[2%] [perspective:1800px] sm:inset-[4%]">
              <div
                className={cn(
                  "absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(.22,.9,.22,1)]",
                  phase === "idle" ? "animate-[envelopeFloat_5.8s_ease-in-out_infinite]" : "animate-none"
                )}
              >
                <div className="absolute left-1/2 top-1/2 h-[84%] w-[78%] -translate-x-1/2 -translate-y-1/2 sm:h-[74%] sm:w-[84%]">
                  <div className="absolute inset-0 overflow-visible">
                    <div
                      className="absolute inset-0 rounded-[26px] border border-[#f4e4d7]/90 shadow-[0_22px_70px_rgba(100,70,47,0.18)] sm:rounded-[34px]"
                    >
                      <div
                        className="absolute inset-0 overflow-hidden rounded-[26px] sm:rounded-[34px]"
                        style={paperTexture}
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.28),transparent_55%)]" />
                        <div className="absolute inset-0 opacity-52 mix-blend-multiply" style={paperNoise} />
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_42%,rgba(101,70,45,0.07)_100%)]" />

                        <div className="absolute inset-x-0 top-[46%] z-10 h-[34%] bg-[linear-gradient(180deg,rgba(40,24,14,0.22),transparent_62%)] opacity-60" />
                        <div className="absolute inset-0 opacity-28" style={seamTexture} />
                      </div>
                    </div>

                      <div
                      className={cn(
                        "absolute left-1/2 top-[5%] transition-[transform,opacity,filter] duration-[1150ms] ease-[cubic-bezier(.18,.9,.18,1)]",
                        isLifted ? "z-50" : "z-20"
                      )}
                      style={{
                        width: "68%",
                        height: "70%",
                        transform: letterTransform,
                        opacity: isReveal ? 0 : 1,
                        filter: isReveal ? "blur(3px)" : "blur(0px)",
                      }}
                    >
                      <div
                        className="h-full w-full rounded-[16px] border border-[#eadbcc] bg-[#f9f3ec] shadow-[0_18px_40px_rgba(100,70,47,0.16)] sm:rounded-[20px]"
                        style={letterTexture}
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
                          </div>
                           <div className="pb-2 text-center">
                          </div>
                          <div className="pb-2 text-center">
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden rounded-[26px] sm:rounded-[34px]">
                      <div
                        className="absolute inset-y-0 left-0 z-20 w-[57%]"
                        style={{
                          ...frontFlapTexture,
                          clipPath: "polygon(0 -2%, 103% 50%, 0 102%)",
                        }}
                      />

                      <div
                        className="absolute inset-y-0 right-0 z-20 w-[57%]"
                        style={{
                          ...frontFlapTexture,
                          clipPath: "polygon(100% -2%, -3% 50%, 100% 102%)",
                        }}
                      />

                      <div
                        className="absolute inset-x-0 bottom-0 z-20 h-[54%]"
                        style={{
                          ...frontFlapTexture,
                          clipPath: "polygon(-2% 102%, 50% 2%, 102% 102%)",
                        }}
                      />

                      <div className="absolute inset-0 z-20 opacity-38" style={seamTexture} />

                      <div
                        className="absolute inset-x-0 top-[44%] z-30 h-[12%]"
                        style={{
                          backgroundImage:
                            "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(70,45,28,0.22))",
                          clipPath: "polygon(2% 0, 50% 70%, 98% 0, 100% 100%, 0 100%)",
                        }}
                      />
                    </div>

                    <div
                      className="absolute inset-x-0 top-0 origin-top transition-transform duration-[1250ms] ease-[cubic-bezier(.25,.9,.18,1)]"
                      style={{
                        height: "58%",
                        transformStyle: "preserve-3d",
                        transform: isOpen ? "translateY(-1.5%) rotateX(172deg)" : "rotateX(0deg)",
                        zIndex: isOpen ? 18 : 48,
                      }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          ...frontFlapTexture,
                          clipPath: "polygon(-2% 0, 50% 102%, 102% 0)",
                          backfaceVisibility: "hidden",
                          boxShadow: isOpen ? "0 -22px 52px rgba(0,0,0,0.20)" : "0 10px 22px rgba(0,0,0,0.10)",
                        }}
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.32),transparent_45%,rgba(94,63,41,0.14))]" />
                        <div className="absolute inset-0 opacity-42 mix-blend-multiply" style={paperNoise} />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(255,255,255,0.18),transparent_52%)]" />
                      </div>

                      <div
                        className="absolute inset-0"
                        style={{
                          ...innerFlapTexture,
                          clipPath: "polygon(-2% 0, 50% 102%, 102% 0)",
                          transform: "rotateY(180deg)",
                          backfaceVisibility: "hidden",
                        }}
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10),transparent_40%,rgba(255,255,255,0.10))]" />
                        <div className="absolute inset-0 opacity-38 mix-blend-multiply" style={paperNoise} />
                      </div>
                    </div>

                    <div
                      className="absolute left-1/2 top-[52%] transition-[transform,opacity,filter] duration-[650ms] ease-out"
                      style={{
                        transform: sealTransform,
                        opacity: isOpen ? 0 : 1,
                        filter: isOpen ? "blur(2px)" : "blur(0px)",
                        zIndex: 60,
                      }}
                    >
                      <div className="relative grid h-40 w-40 place-items-center sm:h-56 sm:w-56">
                        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_52%_60%,rgba(0,0,0,0.34),transparent_62%)] blur-[2px]" />
                        <div className="absolute inset-[3%] rounded-full bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,0.22),transparent_55%)]" />
                        <div className="absolute inset-[6%] rounded-full shadow-[0_18px_44px_rgba(0,0,0,0.38)]" />
                        {sealImgOk ? (
                          <Image
                            src="/intro/seal.png"
                            alt="Wax seal"
                            width={320}
                            height={320}
                            onError={() => setSealImgOk(false)}
                            className="h-full w-full rounded-full object-contain drop-shadow-[0_20px_34px_rgba(0,0,0,0.30)]"
                          />
                        ) : (
                          <>
                            <span className="font-serif text-[2.35rem] leading-none tracking-tight text-[#e8edf7] sm:text-[2.7rem]">
                              {monogram}
                            </span>
                            <div className="absolute bottom-[18%] h-2.5 w-2.5 rounded-full bg-[#f2cd7b]" />
                          </>
                        )}
                        <div className="pointer-events-none absolute inset-[10%] rounded-full shadow-[inset_0_3px_12px_rgba(255,255,255,0.18),inset_0_-12px_26px_rgba(0,0,0,0.22)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-[2%] text-center sm:bottom-[3%]">
              <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-[#8d7264] sm:text-[11px]">
                {phase === "idle" ? "Tap the envelope to open" : "Opening invitation"}
              </p>
              <p className="mt-2 font-sans text-[11px] text-[#9b8376] sm:text-[11px]">
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
