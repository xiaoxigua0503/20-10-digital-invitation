import { ReactNode, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    threshold: 0.18,
    rootMargin: "0px 0px -10% 0px",
  });
  const reduced = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[transform,opacity] duration-700 ease-out will-change-transform",
        reduced
          ? "opacity-100 translate-y-0"
          : inView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4",
        className
      )}
      style={!reduced ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
