import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

import Image from "next/image";

function Line({ label, value, imageSrc }: { label: string; value: string; imageSrc?: string }) {
  return (
    <div className="card-bg-3 flex flex-col items-center justify-center rounded-[28px] border border-white/45 p-6 text-center">
      <p className="font-sans text-xs tracking-[0.22em] uppercase text-ink-muted">
        {label}
      </p>
      {imageSrc && (
        <div className="mt-4 mb-1">
          <Image
            src={imageSrc}
            alt={`${label} QR Code`}
            width={200}
            height={200}
            className="rounded-2xl border border-white/20 shadow-md"
          />
        </div>
      )}
      <p className="mt-3 font-sans text-sm font-medium tracking-wide text-ink-muted">{value}</p>
    </div>
  );
}

export function GiftRegistrySection() {
  return (
    <Section id="gifts" title="Gift Registry" eyebrow="With gratitude">
      <Reveal>
        <div className="card-bg-1 rounded-[34px] border border-white/45 p-7 shadow-[0_30px_110px_rgba(58,31,27,0.14)] backdrop-blur-md sm:p-10">
          <p className="font-sans text-sm leading-7 text-ink-muted">
            As love is what this day is all about, your presence is the greatest
            gift. Should you still believe a gift is worth giving, a small
            envelope for our future would be a wonderful blessing.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Line 
              label="GCash Angelo" 
              value="0927-072-9496" 
              imageSrc="/gallery/gcashgelo.jpg" 
              />
            <Line 
              label="GCash Christine" 
              value="0956-845-3840" 
              imageSrc="/gallery/gcashtin.jpg" 
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
