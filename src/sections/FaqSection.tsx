import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { faq } from "@/lib/wedding";

export function FaqSection() {
  return (
    <Section id="faq" title="FAQ" eyebrow="Helpful notes">
      <Reveal>
        <Accordion items={faq.map((f) => ({ title: f.q, content: f.a }))} />
      </Reveal>
    </Section>
  );
}

