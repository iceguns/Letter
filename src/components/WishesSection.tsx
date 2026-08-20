import RevealLines from "./RevealLines";
import { useReveal } from "../hooks/useReveal";

const WISHES = [
  {
    num: "壹",
    title: "与你，三餐四季，不慌不忙。",
    desc: "柴米油盐里有你，粗茶淡饭也生香。把日子过慢，把喜欢过深。",
  },
  {
    num: "贰",
    title: "与你，踏遍山河，仍觉人间值得。",
    desc: "看过的风景都会旧，身边的人永远新。去哪不重要，同路才重要。",
  },
  {
    num: "叁",
    title: "与你，霜雪满头，仍如初见心动。",
    desc: "若白头也算一种浪漫，那我想和你，慢慢地、慢慢地走到头。",
  },
];

function WishRow({ w, i }: { w: (typeof WISHES)[number]; i: number }) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal-x group grid grid-cols-[64px_1fr] items-start gap-6 border-t border-mist/10 py-10 transition-colors duration-500 hover:border-brass-400/40 sm:grid-cols-[110px_1fr] sm:gap-10 sm:py-14 ${
        inView ? "is-in" : ""
      }`}
      style={{ transitionDelay: `${i * 90}ms` }}
    >
      <span
        className="v-rl pt-1 text-4xl font-black text-rouge-500 transition-colors duration-500 group-hover:text-rouge-400 sm:text-6xl"
        aria-hidden="true"
      >
        {w.num}
        <span className="mt-2 text-lg font-semibold text-rouge-400/90 sm:text-2xl">愿</span>
      </span>
      <div>
        <RevealLines
          lines={[w.title]}
          step={120}
          className="text-2xl font-semibold leading-snug text-mist transition-colors duration-500 group-hover:text-brass-200 sm:text-3xl sm:leading-snug"
        />
        <p className="mt-4 max-w-xl text-sm leading-8 text-fog/90 sm:text-base">{w.desc}</p>
        <span className="line-grow mt-6 block h-px w-24 bg-gradient-to-r from-brass-400/80 to-transparent sm:w-36" />
      </div>
    </div>
  );
}

/** 叁 · 三愿：古人有三愿，我亦有三愿 */
export default function WishesSection() {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-24 sm:py-36">
      <div ref={ref} className={`mb-14 flex items-end justify-between sm:mb-20 ${inView ? "is-in" : ""}`}>
        <div className="relative">
          <span
            className="pointer-events-none absolute -left-4 -top-10 select-none text-[9rem] font-black leading-none text-ink-700/60 sm:text-[12rem]"
            aria-hidden="true"
          >
            叁
          </span>
          <div className="relative flex items-start gap-5">
            <span className="v-rl text-4xl font-black leading-snug text-mist sm:text-5xl">三愿</span>
            <span className="v-rl mt-1 h-14 w-px bg-gradient-to-b from-rouge-500/80 to-transparent" />
          </div>
        </div>
        <RevealLines
          className="pb-2 text-right"
          lines={["古人有三愿，", "我亦有三愿——"]}
          step={180}
          lineClassName="block text-base leading-8 text-fog sm:text-lg"
        />
      </div>
      <div className="border-b border-mist/10">
        {WISHES.map((w, i) => (
          <WishRow key={w.num} w={w} i={i} />
        ))}
      </div>
    </section>
  );
}
