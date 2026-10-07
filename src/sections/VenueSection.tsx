import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { wedding } from "@/lib/wedding";
import { MapEmbed } from "@/components/MapEmbed";

export function VenueSection() {
  const query = wedding.venue.mapQuery;
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <Section id="venues" title="Địa điểm sự kiện" eyebrow="Chúng mình hẹn nhau tại đây nha~">
      <Reveal>
        <div className="card-bg-3 rounded-[34px] border border-white/45 p-7 shadow-[0_30px_110px_rgba(58,31,27,0.14)] backdrop-blur-md sm:p-10">
          <p className="font-sans text-xs tracking-[0.28em] uppercase text-ink-muted">
            Thời gian
          </p>
          <h3 className="mt-3 font-serif text-2xl text-ink">{wedding.date.display}</h3>
          <p className="mt-4 font-sans text-sm leading-7 text-ink-muted">
            {wedding.venue.name} · {wedding.venue.lines.join(" · ")}
          </p>
          <div className="mt-6">
            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-burgundy px-5 py-3 text-sm tracking-wide text-white transition-colors hover:bg-burgundy/90"
            >
              Mở bản đồ
            </a>
          </div>
          <MapEmbed query={query} title={wedding.venue.name} className="mt-8" />
        </div>
      </Reveal>
    </Section>
  );
}
