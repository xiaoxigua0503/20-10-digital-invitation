import { wedding } from "@/lib/wedding";

export function FooterSection() {
  return (
    <footer className="px-5 pb-10 pt-20 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="card-bg-1 rounded-[36px] border border-white/45 px-8 py-12 shadow-[0_30px_110px_rgba(58,31,27,0.12)] backdrop-blur-md sm:px-12">
          <p className="font-serif text-2xl text-ink">20/10</p>
          <p className="mt-3 font-sans text-sm leading-7 text-ink-muted">
            {wedding.date.display} · {wedding.date.location}
          </p>

          <div className="mt-8 h-px w-full bg-gradient-to-r from-burgundy/35 via-terracotta/18 to-transparent" />

          <div className="mt-8">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/50">
              Một ngày rồi sẽ qua,
nhưng những điều đẹp đẽ chúng ta trao nhau sẽ còn ở lại.
            </p>
            <p className="mt-4 font-sans text-sm leading-7 text-ink-muted">
              Made with love by Vietnamese Student Association in Chongqing University.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
