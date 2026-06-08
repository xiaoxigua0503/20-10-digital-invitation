import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

const story = [
  {
    year: "2021",
    title: "A quiet beginning",
    text: "Some love stories begin loudly. Ours began softly—through familiar places, shared friends, and the kind of conversations that linger.",
  },
  {
    year: "2023",
    title: "Choosing each other",
    text: "In ordinary days we found something extraordinary: patience, laughter, and the comfort of being fully known.",
  },
  {
    year: "2025",
    title: "The promise",
    text: "A simple question, a steady yes, and a future that suddenly felt beautifully real.",
  },
  {
    year: "2026",
    title: "Forever, with you",
    text: "Now we celebrate—surrounded by the people who shaped us—ready for the next chapter as one.",
  },
] as const;

export function StorySection() {
  return (
    <Section id="story" title="Our Story" eyebrow="From then to now">
      <div className="grid gap-6">
        {story.map((s, idx) => (
          <Reveal key={s.year} delayMs={idx * 80}>
            <div className="rounded-[32px] border border-white/45 bg-white/38 p-7 shadow-[0_22px_80px_rgba(58,31,27,0.12)] backdrop-blur-md sm:p-9">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
                <div className="shrink-0">
                  <div className="inline-flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-burgundy/90" />
                    <p className="font-sans text-xs tracking-[0.28em] uppercase text-ink-muted">
                      {s.year}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-2xl leading-tight text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-7 text-ink-muted">
                    {s.text}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

