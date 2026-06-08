import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[28px] border border-white/45 bg-white/44 p-6">
      <p className="font-sans text-xs tracking-[0.22em] uppercase text-ink-muted">
        {label}
      </p>
      <p className="mt-3 font-sans text-sm leading-7 text-ink-muted">{value}</p>
    </div>
  );
}

export function GiftRegistrySection() {
  return (
    <Section id="gifts" title="Gift Registry" eyebrow="With gratitude">
      <Reveal>
        <div className="rounded-[34px] border border-white/45 bg-white/34 p-7 shadow-[0_30px_110px_rgba(58,31,27,0.14)] backdrop-blur-md sm:p-10">
          <p className="font-sans text-sm leading-7 text-ink-muted">
            As love is what this day is all about, your presence is the greatest
            gift. Should you still believe a gift is worth giving, a small
            envelope for our future would be a wonderful blessing.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Line label="GCash" value="(Add your GCash number here)" />
            <Line label="Bank" value="(Add your bank details here)" />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

