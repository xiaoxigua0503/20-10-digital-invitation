import { wedding } from "@/lib/wedding";

export function FooterSection() {
  return (
    <footer className="px-5 pb-10 pt-20 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="card-bg-1 rounded-[36px] border border-white/45 px-8 py-12 shadow-[0_30px_110px_rgba(58,31,27,0.12)] backdrop-blur-md sm:px-12">
          <p className="font-serif text-2xl text-ink">
            Christine <span className="text-ink/50">&amp;</span> Angelo
          </p>
          <p className="mt-3 font-sans text-sm leading-7 text-ink-muted">
            {wedding.date.display} · {wedding.ceremony.venue} ·{" "}
            {wedding.reception.venue}
          </p>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-burgundy/35 via-terracotta/18 to-transparent" />
          <p className="mt-6 font-sans text-xs tracking-wide text-ink-muted/80">
            Kindly RSVP as soon as possible.
          </p>
        </div>
      </div>
    </footer>
  );
}
