import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

const meaningPoints = [
  {
    title: "Một chút tự hào",
    text: "Vì mỗi người phụ nữ đều mang trong mình một câu chuyện riêng - những dịu dàng, mạnh mẽ và cả những điều chưa từng kể.",
  },
  {
    title: "Một chút niềm tin",
    text: "Mong rằng trên mỗi hành trình phía trước,bạn luôn đủ tin vào chính mình để bước tiếp về phía những điều mình mong muốn.",
  },
  {
    title: "Một chút thương nhau",
    text: "Ở nơi đất khách, chúng ta tìm thấy nhau giữa những ngày xa nhà — cùng cười, cùng sẻ chia, và cùng giữ lại những ký ức thật đẹp của tuổi trẻ.",
  },
] as const;

export function StorySection() {
  return (
    <Section id="story" title="Có những ngày để nhớ, có những người để thương" eyebrow="Một ngày dành cho phụ nữ Việt Nam">
      <Reveal>
        <div className="card-bg-1 rounded-[34px] border border-white/45 p-7 shadow-[0_30px_110px_rgba(58,31,27,0.14)] backdrop-blur-md sm:p-10">
          <p className="font-sans text-sm leading-7 text-ink-muted sm:text-base">
            Tháng Mười về, mang theo một ngày rất dịu dàng —
ngày để những người phụ nữ Việt Nam được gọi tên bằng yêu thương,
được nhìn thấy những hy sinh thầm lặng,
và được nhắc rằng: họ luôn xứng đáng với những điều đẹp đẽ nhất.
          </p>
          <p className="mt-4 font-sans text-sm leading-7 text-ink-muted sm:text-base">
            Giữa một thành phố xa quê, chúng ta gặp nhau không chỉ để đón một ngày 20/10,
mà để cùng viết nên một khoảng trời nhỏ của người Việt —
nơi có tiếng cười, có những lời thương chưa kịp nói,
và có những ước mơ vẫn đang lớn lên từng ngày.
          </p>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {meaningPoints.map((point, index) => (
          <Reveal key={point.title} delayMs={index * 80}>
            <article className="card-bg-2 rounded-[32px] border border-white/45 p-7 shadow-[0_22px_80px_rgba(58,31,27,0.11)] backdrop-blur-md sm:p-9">
              <span className="font-serif text-3xl text-burgundy">0{index + 1}</span>
              <h3 className="mt-4 font-serif text-2xl text-ink">{point.title}</h3>
              <p className="mt-3 font-sans text-sm leading-7 text-ink-muted">{point.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
