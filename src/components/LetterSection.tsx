import RevealLines from "./RevealLines";
import { useReveal } from "../hooks/useReveal";

const PARAGRAPHS: { lines: string[]; lead?: boolean }[] = [
  { lines: ["这封信，", "我在灯下写了很久。"], lead: true },
  {
    lines: [
      "开头删了又写，写了又删。",
      "总觉得「喜欢」太轻，「爱」又太重——",
      "想来想去，人间恰好的词，",
      "原来只有你的名字。",
    ],
  },
  {
    lines: [
      "我见过清晨的雾、深夜的星、",
      "长途尽头亮起的灯。",
      "后来才懂：",
      "山河湖海皆是铺垫，你才是那句正文。",
    ],
  },
  {
    lines: [
      "若有人问我，余生想如何度过——",
      "我想，不过是把每一个寻常日子，",
      "过成与你有关的注脚。",
    ],
  },
];

/** 壹 · 信：左栏吸附竖排题头，右栏逐段揭幕 */
export default function LetterSection() {
  const { ref, inView } = useReveal<HTMLDivElement>();

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 sm:py-36">
      <div className="grid gap-14 md:grid-cols-[220px_1fr] md:gap-20">
        {/* 吸附题头 */}
        <div className="md:sticky md:top-28 md:self-start">
          <div ref={ref} className={`relative ${inView ? "is-in" : ""}`}>
            <span
              className="pointer-events-none absolute -left-6 -top-10 select-none text-[10rem] font-black leading-none text-ink-700/60 sm:text-[13rem]"
              aria-hidden="true"
            >
              壹
            </span>
            <div className="relative flex items-start gap-5">
              <span className="v-rl text-6xl font-black text-mist sm:text-7xl">信</span>
              <span className="v-rl mt-2 h-20 w-px bg-gradient-to-b from-rouge-500/80 to-transparent" />
              <span className="v-rl mt-1 text-xs tracking-[0.5em] text-fog/80">见字如面</span>
            </div>
          </div>
        </div>

        {/* 正文 */}
        <div className="flex flex-col gap-12 sm:gap-14">
          {PARAGRAPHS.map((p, i) => (
            <RevealLines
              key={i}
              lines={p.lines}
              step={150}
              className={
                p.lead
                  ? "text-3xl font-semibold leading-snug text-mist sm:text-4xl sm:leading-snug"
                  : "text-lg leading-loose text-fog sm:text-xl sm:leading-[2.4rem]"
              }
            />
          ))}

          <RevealLines
            className="mt-2 text-right"
            lines={[
              <span key="s" className="inline-block text-2xl text-brass-300" style={{ fontFamily: "var(--font-kai)" }}>
                —— 灯下，一个想你的人
              </span>,
            ]}
          />
        </div>
      </div>
    </section>
  );
}
