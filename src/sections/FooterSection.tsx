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
          <div className="mt-6 flex flex-col space-y-2 font-sans text-xs tracking-wide text-ink-muted/80">
            <p className="font-semibold uppercase tracking-widest text-ink/70">
              Crafted with love by friends
            </p>
            <p>
              Digital RSVP & Website Development by{" "}
              <a
                href="mailto:nikoalfonsop@gmail.com"
                className="transition-colors hover:text-ink"
              >
                Nico Alfonso Pangilinan
              </a>
            </p>
            <p>
              Physical Invitations & Souvenir Design by{" "}
              <a
                href="mailto:princesscatherinemendoza03@gmail.com"
                className="transition-colors hover:text-ink"
              >
                Princess Catherine Mendoza
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
