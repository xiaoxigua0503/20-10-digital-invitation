import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  title,
  eyebrow,
  children,
  className,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 px-5 sm:px-8", className)}>
      <div className="mx-auto w-full max-w-6xl py-18 sm:py-22">
        <div className="flex flex-col items-start gap-4">
          {eyebrow ? (
            <p className="font-sans text-xs tracking-[0.28em] uppercase text-ink-muted/80">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-serif text-3xl leading-[1.05] text-ink sm:text-4xl">
            {title}
          </h2>
          <div className="h-px w-28 bg-gradient-to-r from-burgundy/40 to-transparent" />
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

