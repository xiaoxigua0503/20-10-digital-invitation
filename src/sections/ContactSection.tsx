import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

function ContactCard({
  role,
  name,
  phone,
  email,
}: {
  role: string;
  name: string;
  phone: string;
  email: string;
}) {
  return (
    <div className="card-bg-3 rounded-[32px] border border-white/45 p-7 shadow-[0_22px_80px_rgba(58,31,27,0.10)] backdrop-blur-md sm:p-9">
      <p className="font-sans text-xs tracking-[0.28em] uppercase text-ink-muted">
        {role}
      </p>
      <h3 className="mt-3 font-serif text-2xl text-ink">{name}</h3>
      <p className="mt-4 font-sans text-sm leading-7 text-ink-muted">
        {phone}
      </p>
      <p className="mt-4 font-sans text-sm leading-7 text-ink-muted">
        {email}
      </p>
    </div>
  );
}

export function ContactSection() {
  return (
    <Section id="contact" title="Contact" eyebrow="Reach us">
      <div className="grid gap-6 sm:grid-cols-2">
        <Reveal>
          <ContactCard role="Bride" name="Christine Faner" phone="0956-845-3840" email="christinepc12@gmail.com" />
        </Reveal>
        <Reveal delayMs={120}>
          <ContactCard role="Groom" name="Angelo Pablo" phone="0927-072-9496" email="elopablo0421@gmail.com" />
        </Reveal>
      </div>
    </Section>
  );
}
