import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import Image from "next/image";

const story = [
  {
    title: "Hiraya Sound Track",
    subtitle: "1st photo",
    src: "/gallery/HirayaVinyl.png",
    alt: "Hiraya soundtrack artwork",
    captionTitle: "(Lyrics to be launched on June 19, 2026)",
    body: [
      `“Hiraya” is an OPM song made for duet that emphasizes building strong foundation in relationship. From the chorus part “ikaw pa rin sa'n dako man makarating, pangako ko ikaw ay aking dadalhin, sa hilaga, kanluran, o timog, silangan”, the line describes the commitment of both that they will always choose and carry each other in every corner of the world.`,
      `From the second chorus “sayong tingin, mundo'y nagniningning, mga bituin saksi sa ating damdamin, tibok ng puso, di magbabago” signifies infinite admiration to his/her partner where the day and night witnessed their story, while their love and affection will never fade as their hearts continuously beat that forever tie their relationship.`,
    ],
  },
  {
    title: "Engagement and Promise Ring",
    subtitle: "2nd photo",
    src: "/gallery/PromiseRing.jpg",
    alt: "Engagement and promise rings",
    captionTitle: "Stories and Promises Above Pebbles",
    body: [
      "Let the carve and curves tell the long story they carry, let the shine from the stone project the colors from the rainbow as the sun lightens each dimension. Let the color of its circumference define brilliance and unfading legacy.",
      "These gold rings are meant as promises in opening a sacred chapter of life blessed by God. It captures a long story and a final curtain that unveils a big upcoming.",
      "-Gelo",
    ],
  },
  {
    title: "Wedding Rings",
    subtitle: "3rd photo",
    src: "/gallery/WeddingRing.jpeg",
    alt: "Wedding rings",
    captionTitle: "Bands that Bind to Eternal Episodes",
    body: [
      "These golden halos will be blessed on our wedding day as we utter our vows that shall mark the day one of our countless days of companionship with comfort, care and faith in each other. The rings were engraved and prepared on May 19, 2026.",
      "Drawn together by shared passions and bound together by God’s grace, our story began as a simple friendship that grew into something far greater than we ever imagined. A short season, yet a strong reason; swift in pace, yet rich in grace. What blossomed from friendship became a love rooted in faith, strengthened by trust, and guided by God’s hand. As we look forward to June 19, 2026, our hearts overflow with gratitude for a love so beautifully written and a future we are blessed to share together.",
    ],
  },
] as const;

export function StorySection() {
  return (
    <Section id="story" title="Our Story" eyebrow="From then to now">
      <div className="grid gap-6 sm:gap-8">
        {story.map((s, idx) => (
          <Reveal key={s.title} delayMs={idx * 80}>
            <article className="overflow-hidden rounded-[32px] border border-white/45 bg-white/30 shadow-[0_22px_80px_rgba(58,31,27,0.12)]">
              <div className="bg-white/10">
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={1600}
                  height={1000}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="bg-white/38 p-7 backdrop-blur-md sm:p-9">
                <p className="font-sans text-xs tracking-[0.28em] uppercase text-ink-muted/80">
                  {s.subtitle}
                </p>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-ink sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-7 text-ink-muted">
                  {s.captionTitle}
                </p>
                <div className="mt-6 grid gap-4">
                  {s.body.map((p, bodyIdx) => (
                    <p
                      key={`${s.title}-${bodyIdx}`}
                      className={
                        p === "-Gelo"
                          ? "font-sans text-sm leading-7 text-ink-muted text-right"
                          : "font-sans text-sm leading-7 text-ink-muted"
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
