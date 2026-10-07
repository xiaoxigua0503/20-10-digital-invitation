import Image from "next/image";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function DressCodeSection() {
  return (
    <Section id="dress-code" title="Trang phục" eyebrow="Bạn sẽ tự nhiên tỏa sáng">
      <Reveal>
        <div className="card-bg-4 rounded-[34px] border border-white/45 p-7 shadow-[0_30px_110px_rgba(58,31,27,0.14)] backdrop-blur-md sm:p-10">
          <h3 className="font-serif text-2xl text-ink">Mặc điều khiến bạn tự tin</h3>
          <p className="mt-3 font-sans text-sm leading-7 text-ink-muted">
            Không cần một khuôn mẫu để trở nên nổi bật.
Hãy chọn những gì khiến bạn cảm thấy là chính mình — thoải mái, tự tin và sẵn sàng tận hưởng một ngày thật đẹp cùng mọi người.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="card-bg-5 flex min-h-[220px] flex-col items-center justify-center overflow-hidden rounded-[28px] border border-white/45 p-4 sm:min-h-[250px]">
              <Image
                src="/gallery/menAttire.png"
                alt="Hướng dẫn trang phục cho nam"
                width={900}
                height={1200}
                className="h-auto max-h-[150px] w-auto object-contain sm:max-h-[170px]"
              />
              <p className="mt-5 font-sans text-xs tracking-[0.24em] uppercase text-ink-muted">Các chàng</p>
              <p className="mt-2 text-center font-serif text-xl text-ink">Lịch lãm, nhưng vẫn là bạn</p>
              <p className="mt-2 text-center font-sans text-xs leading-5 text-ink-muted">Áo sơ mi, áo khoác, quần tây hoặc outfit bạn thường mặc.</p>
            </div>
            <div className="card-bg-5 flex min-h-[220px] flex-col items-center justify-center overflow-hidden rounded-[28px] border border-white/45 p-4 sm:min-h-[250px]">
              <Image
                src="/gallery/womenAttire.png"
                alt="Hướng dẫn trang phục cho nữ"
                width={900}
                height={1200}
                className="h-auto max-h-[150px] w-auto object-contain sm:max-h-[170px]"
              />
              <p className="mt-5 font-sans text-xs tracking-[0.24em] uppercase text-ink-muted">Các nàng</p>
              <p className="mt-2 text-center font-serif text-xl text-ink">Dịu dàng theo cách của bạn</p>
              <p className="mt-2 text-center font-sans text-xs leading-5 text-ink-muted">Váy, quần dài hoặc outfit nào bạn yêu thích.</p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
