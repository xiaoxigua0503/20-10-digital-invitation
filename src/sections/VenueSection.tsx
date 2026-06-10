import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";
import { MapEmbed } from "@/components/MapEmbed";

function VenueCard({
  title,
  venue,
  lines,
}: {
  title: string;
  venue: string;
  lines: readonly string[];
}) {
  const query = [venue, ...lines].join(", ");
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;

  return (
    <div className="card-bg-3 rounded-[34px] border border-white/45 p-7 shadow-[0_30px_110px_rgba(58,31,27,0.14)] backdrop-blur-md sm:p-10">
      <p className="font-sans text-xs tracking-[0.28em] uppercase text-ink-muted">
        {title}
      </p>
      <h3 className="mt-3 font-serif text-2xl text-ink">{venue}</h3>
      <p className="mt-4 font-sans text-sm leading-7 text-ink-muted">
        {lines.join(" · ")}
      </p>
      <div className="mt-6">
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-burgundy px-5 py-3 text-sm tracking-wide text-white transition-colors hover:bg-burgundy/90"
        >
          Directions
        </a>
      </div>
      <MapEmbed query={query} title={title} className="mt-8" />
    </div>
  );
}

export function VenueSection() {
  return (
    <Section id="venues" title="Ceremony & Reception" eyebrow="Where to be">
      <div className="grid gap-6 sm:grid-cols-2">
        <Reveal>
          <VenueCard
            title="Ceremony"
            venue={wedding.ceremony.venue}
            lines={wedding.ceremony.lines}
          />
        </Reveal>
        <Reveal delayMs={120}>
          <VenueCard
            title="Reception"
            venue={wedding.reception.venue}
            lines={wedding.reception.lines}
          />
        </Reveal>
      </div>
    </Section>
  );
}
