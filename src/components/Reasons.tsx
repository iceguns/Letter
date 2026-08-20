import type { ComponentType } from "react";
import SectionHead from "./SectionHead";
import { useReveal } from "../hooks/useReveal";
import { Spark, Moon, Star, HeartLine, HandsHeart, InfinityLoop } from "./Icons";

type Item = {
  Icon: ComponentType<{ className?: string }>;
  title: string;
  sub: string;
};

const ITEMS: Item[] = [
  { Icon: Star, title: "眼睛里有星星", sub: "你望过来的那一眼，我整个人间都亮了。" },
  { Icon: Spark, title: "笑起来会弯眼睛", sub: "你一笑，我攒了一天的疲惫就自动清零。" },
  { Icon: HeartLine, title: "认真的小模样", sub: "你皱着眉计较小事的样子，可爱得要命。" },
  { Icon: Moon, title: "沉默也很温柔", sub: "哪怕不说话，和你待着的那阵风都是甜的。" },
  { Icon: HandsHeart, title: "把无聊变有趣", sub: "和你在一起，连排队买奶茶都像一场旅行。" },
  { Icon: InfinityLoop, title: "让我想变成更好", sub: "所有的心动都有名字，而它们全都叫你。" },
];

const ROTATIONS = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];
const OFFSETS = ["lg:translate-y-0", "lg:translate-y-8", "lg:-translate-y-3", "lg:translate-y-5", "lg:-translate-y-2", "lg:translate-y-10"];

/** 第二章：喜欢你的 N 件小事（散落明信片） */
export default function Reasons() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.08);

  return (
    <section className="relative px-6 py-20 sm:py-28">
      <SectionHead en="Chapter II · Little Things" title="喜欢你的小事" sub="如果非要给心动列一份清单，大概写到天黑也写不完，先挑六件给你。" />

      <div ref={ref} className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {ITEMS.map(({ Icon, title, sub }, i) => (
          <article
            key={title}
            className={`reveal group relative ${inView ? "is-in" : ""} ${ROTATIONS[i]} ${OFFSETS[i]} transition-[transform,box-shadow,opacity] duration-500 hover:rotate-0 hover:shadow-[0_24px_50px_-16px_rgba(192,63,104,0.55)]`}
            style={{ transitionDelay: inView ? `${i * 90}ms` : "0ms" }}
          >
            {/* 胶带 */}
            <span className="absolute -top-3 left-1/2 z-10 h-5 w-16 -translate-x-1/2 rotate-[-4deg] rounded-sm bg-gold-300/40 shadow-sm" />

            <div className="paper relative overflow-hidden rounded-sm p-7 pt-8 shadow-[0_16px_38px_-14px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:-translate-y-2">
              {/* 幽灵编号 */}
              <span
                className="pointer-events-none absolute -right-2 -top-5 text-[92px] italic leading-none text-rose-600/10"
                style={{ fontFamily: "var(--font-west)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <Icon className="h-7 w-7 text-rose-600 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
              <h3 className="mt-4 text-2xl text-ink" style={{ fontFamily: "var(--font-hand)" }}>
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">{sub}</p>

              <span className="mt-4 block h-px w-10 bg-rose-500/40 transition-all duration-500 group-hover:w-full group-hover:bg-rose-500/70" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
