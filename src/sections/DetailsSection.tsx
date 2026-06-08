import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";

function DetailCard({
  title,
  venue,
  lines,
}: {
  title: string;
  venue: string;
  lines: readonly string[];
}) {
  return (
    <div className="rounded-[34px] border border-white/45 bg-white/34 p-7 shadow-[0_30px_110px_rgba(58,31,27,0.14)] backdrop-blur-md sm:p-10">
      <p className="font-sans text-xs tracking-[0.28em] uppercase text-ink-muted">
        {title}
      </p>
      <h3 className="mt-3 font-serif text-2xl text-ink">{venue}</h3>
      <p className="mt-4 font-sans text-sm leading-7 text-ink-muted">
        {lines.join(" · ")}
      </p>
      <div className="mt-7 h-px w-full bg-gradient-to-r from-burgundy/35 via-terracotta/18 to-transparent" />
      <p className="mt-7 font-sans text-sm leading-7 text-ink-muted">
        {wedding.date.display}
      </p>
    </div>
  );
}

export function DetailsSection() {
  return (
    <Section id="details" title="Ceremony & Reception Details" eyebrow="The day">
      <div className="grid gap-6 sm:grid-cols-2">
        <Reveal>
          <DetailCard
            title="Ceremony"
            venue={wedding.ceremony.venue}
            lines={wedding.ceremony.lines}
          />
        </Reveal>
        <Reveal delayMs={120}>
          <DetailCard
            title="Reception"
            venue={wedding.reception.venue}
            lines={wedding.reception.lines}
          />
        </Reveal>
      </div>
    </Section>
  );
}

