import { wedding } from "@/lib/wedding";

const credits = [
  {
    role: "Digital RSVP & Website Development",
    name: "Nico Alfonso Pangilinan",
    email: "nikoalfonsop@gmail.com",
  },
  {
    role: "Physical Invitations & Souvenir Design",
    name: "Princess Catherine Mendoza",
    email: "princesscatherinemendoza03@gmail.com",
  },
];

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

          <div className="mt-8">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/50">
              Crafted with love by friends
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {credits.map((c) => (
                <div
                  key={c.email}
                  className="group rounded-[20px] border border-white/40 bg-white/30 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-burgundy/20 hover:bg-white/50 hover:shadow-[0_8px_30px_rgba(108,43,41,0.08)]"
                >
                  <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.24em] text-ink/40">
                    {c.role}
                  </p>
                  <p className="mt-2 font-serif text-lg text-ink transition-colors duration-200 group-hover:text-burgundy">
                    {c.name}
                  </p>
                  <a
                    href={`mailto:${c.email}`}
                    className="mt-1 inline-flex items-center gap-1.5 font-sans text-[11px] tracking-wide text-ink-muted/60 transition-colors duration-200 hover:text-burgundy"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 opacity-70"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    {c.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
