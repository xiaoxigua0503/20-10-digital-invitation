import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { weddingTimeline } from "@/lib/wedding";

export function TimelineSection() {
  return (
    <Section id="timeline" title="Wedding Timeline" eyebrow="A gentle flow">
      <div className="grid gap-5">
        {weddingTimeline.map((item, idx) => (
          <Reveal key={item.title} delayMs={idx * 70}>
            <div className="rounded-[32px] border border-white/45 bg-white/34 p-7 shadow-[0_22px_80px_rgba(58,31,27,0.11)] backdrop-blur-md sm:p-9">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-sans text-xs tracking-[0.28em] uppercase text-ink-muted">
                    {item.time}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight text-ink">
                    {item.title}
                  </h3>
                </div>
                <p className="font-sans text-sm leading-7 text-ink-muted sm:max-w-md sm:text-right">
                  {item.note}
                </p>
              </div>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-burgundy/35 via-terracotta/18 to-transparent" />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

