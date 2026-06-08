import { Section } from "@/components/Section";
import { useCountdown } from "@/hooks/useCountdown";
import { wedding } from "@/lib/wedding";
import { Reveal } from "@/components/Reveal";

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[26px] border border-white/45 bg-white/40 px-5 py-6 text-center shadow-[0_18px_60px_rgba(58,31,27,0.10)] backdrop-blur-md">
      <div className="font-serif text-4xl leading-none text-burgundy sm:text-5xl">
        {value}
      </div>
      <div className="mt-3 font-sans text-xs tracking-[0.28em] uppercase text-ink-muted">
        {label}
      </div>
    </div>
  );
}

export function CountdownSection() {
  const cd = useCountdown(wedding.date.iso);
  const fmt = (n: number) => String(n).padStart(2, "0");
  const dash = "—";

  return (
    <Section id="countdown" title="Countdown" eyebrow="Until we say I do">
      <Reveal>
        <div className="rounded-[34px] border border-white/45 bg-white/34 p-7 shadow-[0_30px_110px_rgba(58,31,27,0.14)] backdrop-blur-md sm:p-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            <Tile label="Days" value={cd.ready ? fmt(cd.days) : dash} />
            <Tile label="Hours" value={cd.ready ? fmt(cd.hours) : dash} />
            <Tile label="Minutes" value={cd.ready ? fmt(cd.minutes) : dash} />
            <Tile label="Seconds" value={cd.ready ? fmt(cd.seconds) : dash} />
          </div>
          <p className="mt-8 font-sans text-sm leading-7 text-ink-muted">
            {cd.done
              ? "Today is the day."
              : "Counting down the moments until we celebrate together."}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
