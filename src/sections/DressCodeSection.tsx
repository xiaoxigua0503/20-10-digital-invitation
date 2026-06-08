import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

const palette = [
  { name: "Soft Creamy Peach", hex: "#FBCBA4", key: "peach" },
  { name: "Dusty Rose", hex: "#D7A795", key: "dusty-rose" },
  { name: "Deep Burgundy", hex: "#6C1613", key: "burgundy" },
  { name: "Terracotta", hex: "#F49C76", key: "terracotta" },
  { name: "Muted Dusty Blue", hex: "#9CBCCF", key: "dusty-blue" },
] as const;

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="rounded-[22px] border border-white/45 bg-white/42 p-4 shadow-[0_18px_55px_rgba(58,31,27,0.10)] backdrop-blur-md">
      <div
        className="h-12 w-full rounded-2xl border border-white/40"
        style={{ background: hex }}
      />
      <p className="mt-3 font-sans text-xs tracking-wide text-ink-muted">
        {name}
      </p>
      <p className="mt-1 font-sans text-[11px] tracking-[0.22em] uppercase text-ink-muted/70">
        {hex}
      </p>
    </div>
  );
}

export function DressCodeSection() {
  return (
    <Section id="dress-code" title="Dress Code" eyebrow="Finer details">
      <Reveal>
        <div className="rounded-[34px] border border-white/45 bg-white/34 p-7 shadow-[0_30px_110px_rgba(58,31,27,0.14)] backdrop-blur-md sm:p-10">
          <h3 className="font-serif text-2xl text-ink">Attire</h3>
          <p className="mt-3 font-sans text-sm leading-7 text-ink-muted">
            Strictly formal / semi-formal.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[28px] border border-white/45 bg-white/44 p-6">
              <p className="font-sans text-xs tracking-[0.22em] uppercase text-ink-muted">
                Principal Sponsors
              </p>
              <p className="mt-3 font-sans text-sm leading-7 text-ink-muted">
                Coordinated tones (warm neutrals, burgundy, dusty rose).
              </p>
            </div>
            <div className="rounded-[28px] border border-white/45 bg-white/44 p-6">
              <p className="font-sans text-xs tracking-[0.22em] uppercase text-ink-muted">
                Family
              </p>
              <p className="mt-3 font-sans text-sm leading-7 text-ink-muted">
                Earthy romantic palette with soft textures.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/45 bg-white/44 p-6">
              <p className="font-sans text-xs tracking-[0.22em] uppercase text-ink-muted">
                Guests
              </p>
              <p className="mt-3 font-sans text-sm leading-7 text-ink-muted">
                Wear any shade below if you can—your comfort comes first.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-5">
            {palette.map((p, idx) => (
              <Reveal key={p.key} delayMs={idx * 60}>
                <Swatch name={p.name} hex={p.hex} />
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

