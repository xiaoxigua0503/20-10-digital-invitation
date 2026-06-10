import { Section } from "@/components/Section";
import { entourage } from "@/lib/wedding";
import { Reveal } from "@/components/Reveal";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-bg-2 rounded-[32px] border border-white/45 p-7 shadow-[0_22px_80px_rgba(58,31,27,0.11)] backdrop-blur-md sm:p-9">
      <h3 className="font-serif text-2xl text-ink">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function NameList({ names }: { names: readonly string[] }) {
  return (
    <ul className="space-y-2 font-sans text-sm leading-7 text-ink-muted">
      {names.map((n) => (
        <li key={n}>{n}</li>
      ))}
    </ul>
  );
}

export function EntourageSection() {
  return (
    <Section id="entourage" title="Entourage" eyebrow="With love and support">
      <div className="grid gap-6">
        <Reveal>
          <Card title="Principal Sponsors">
            <div className="grid gap-6 sm:grid-cols-2">
              <NameList names={entourage.principalSponsors.left} />
              <NameList names={entourage.principalSponsors.right} />
            </div>
          </Card>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal delayMs={60}>
            <Card title="Best Man">
              <p className="font-sans text-sm leading-7 text-ink-muted">
                {entourage.bestMan}
              </p>
            </Card>
          </Reveal>
          <Reveal delayMs={120}>
            <Card title="Maid of Honor">
              <p className="font-sans text-sm leading-7 text-ink-muted">
                {entourage.maidOfHonor}
              </p>
            </Card>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal delayMs={60}>
            <Card title="Groomsmen">
              <NameList names={entourage.groomsmen} />
            </Card>
          </Reveal>
          <Reveal delayMs={120}>
            <Card title="Bridesmaids">
              <NameList names={entourage.bridesmaids} />
            </Card>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal delayMs={60}>
            <Card title="Ring Bearer">
              <p className="font-sans text-sm leading-7 text-ink-muted">
                {entourage.ringBearer}
              </p>
            </Card>
          </Reveal>
          <Reveal delayMs={120}>
            <Card title="Flower Girls">
              <NameList names={entourage.flowerGirls} />
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
