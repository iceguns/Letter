import SectionHead from "./SectionHead";
import { useReveal } from "../hooks/useReveal";
import { HeartFill } from "./Icons";

const MOMENTS = [
  {
    tag: "初见",
    en: "First Sight",
    title: "人群里多看了你一眼",
    desc: "那天风很普通，阳光也很普通，只有你不普通——我好像，一眼就记到了现在。",
  },
  {
    tag: "试探",
    en: "Heart Beat",
    title: "聊天框亮了又暗",
    desc: "打了又删、删了又打的一句话，最后只发出一句「在吗」。你回「在」的那一秒，我心跳漏了一拍。",
  },
  {
    tag: "沉溺",
    en: "Falling",
    title: "所有偶遇都是蓄谋",
    desc: "后来我才承认：那些恰好路过的路口、刚好想听的歌、顺路的晚风，全是我故意的。",
  },
  {
    tag: "此刻",
    en: "Tonight",
    title: "把整颗心捧到你面前",
    desc: "于是我把喜欢写成信、折成页、点亮成这片星空，只等你一个回答。",
  },
];

function Moment({ m, i }: { m: (typeof MOMENTS)[number]; i: number }) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const left = i % 2 === 0;
  return (
    <div
      ref={ref}
      className={`reveal relative md:w-1/2 ${inView ? "is-in" : ""} ${left ? "md:pr-14 md:text-right" : "md:ml-auto md:pl-14"} pl-10 md:pl-0 ${
        left ? "md:[&_.dot]:left-auto md:[&_.dot]:-right-[9px]" : "md:[&_.dot]:left-[-9px]"
      }`}
      data-dir={left ? "left" : "right"}
      style={{ transitionDelay: `${(i % 2) * 120}ms` }}
    >
      {/* 心跳节点 */}
      <span className="dot absolute left-[3px] top-1.5 md:left-auto">
        <span className="relative flex h-4 w-4 items-center justify-center">
          <span className="seal-ring absolute inset-0 rounded-full bg-rose-500/40" style={{ ["--ring-delay" as string]: `${i * 0.4}s` }} />
          <HeartFill className="relative h-4 w-4 text-rose-400 drop-shadow-[0_0_8px_rgba(215,92,131,0.8)]" />
        </span>
      </span>

      <div className="group rounded-md border border-rose-800/50 bg-night-800/55 p-6 backdrop-blur-[2px] transition-all duration-500 hover:-translate-y-1.5 hover:border-rose-600/60 hover:bg-night-800/80 hover:shadow-[0_18px_40px_-16px_rgba(192,63,104,0.5)] sm:p-7">
        <div className={`flex items-baseline gap-3 ${left ? "md:flex-row-reverse" : ""}`}>
          <span className="text-3xl text-gold-300" style={{ fontFamily: "var(--font-hand)" }}>
            {m.tag}
          </span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-rose-300/60" style={{ fontFamily: "var(--font-west)" }}>
            {m.en}
          </span>
        </div>
        <h3 className="mt-3 text-xl font-semibold text-rose-100 sm:text-2xl">{m.title}</h3>
        <p className="mt-3 text-sm leading-7 text-rose-200/75">{m.desc}</p>
      </div>
    </div>
  );
}

/** 第三章：心动时间线 */
export default function Timeline() {
  return (
    <section className="relative px-6 py-20 sm:py-28">
      <SectionHead en="Chapter III · The Moments" title="心动轨迹" sub="喜欢这件事，从来都不是突然发生的。" />

      <div className="relative mx-auto max-w-4xl">
        {/* 中轴线 */}
        <div className="absolute bottom-2 left-[10px] top-2 w-px bg-gradient-to-b from-transparent via-rose-600/60 to-transparent md:left-1/2 md:-translate-x-1/2" />
        <div className="flex flex-col gap-10 md:gap-14">
          {MOMENTS.map((m, i) => (
            <Moment key={m.tag} m={m} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
