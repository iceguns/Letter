import type { ComponentType } from "react";
import SectionHead from "./SectionHead";
import { useReveal } from "../hooks/useReveal";
import { HandsHeart, InfinityLoop, Ring } from "./Icons";

type Vow = {
  Icon: ComponentType<{ className?: string }>;
  no: string;
  title: string;
  desc: string;
};

const VOWS: Vow[] = [
  {
    Icon: HandsHeart,
    no: "01",
    title: "我永远站在你这边",
    desc: "世界偶尔吵闹，日子偶尔糟糕，没关系——转过身，我永远在你看得见的地方，先偏向你，再讲道理。",
  },
  {
    Icon: InfinityLoop,
    no: "02",
    title: "耐心与温柔都归你",
    desc: "你的小脾气我照单全收，你的碎碎念我当情话听。别人拥有的浪漫，我都会慢慢补给你，一件不落。",
  },
  {
    Icon: Ring,
    no: "03",
    title: "把喜欢过成余生",
    desc: "从心动到古稀，从青丝到白发。等我们都老了，我还是要像今天这样，牵着你的手，慢慢走。",
  },
];

function VowRow({ v, i }: { v: Vow; i: number }) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const flip = i % 2 === 1;
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} group flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10 ${
        flip ? "sm:flex-row-reverse sm:text-right sm:ml-auto" : ""
      } max-w-3xl`}
      data-dir={flip ? "right" : "left"}
    >
      <span
        className="shrink-0 text-7xl italic leading-none text-gold-300/60 transition-colors duration-500 group-hover:text-gold-300 sm:text-8xl"
        style={{ fontFamily: "var(--font-west)" }}
      >
        {v.no}
      </span>
      <div className="flex-1">
        <div className={`flex items-center gap-3 ${flip ? "sm:flex-row-reverse" : ""}`}>
          <v.Icon className="h-7 w-7 text-rose-400 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
          <h3 className="text-3xl text-rose-100" style={{ fontFamily: "var(--font-hand)" }}>
            {v.title}
          </h3>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-8 text-rose-200/75 sm:text-[15px]">{v.desc}</p>
        <span
          className={`mt-4 block h-px w-12 bg-gradient-to-r from-gold-400/70 to-transparent transition-all duration-700 group-hover:w-28 ${
            flip ? "sm:ml-auto sm:bg-gradient-to-l" : ""
          }`}
        />
      </div>
    </div>
  );
}

/** 第四章：三个约定 */
export default function Vows() {
  return (
    <section className="relative px-6 py-20 sm:py-28">
      <SectionHead en="Chapter IV · The Vows" title="三个约定" sub="不许笑，我可是 very serious 的。" />
      <div className="mx-auto flex max-w-5xl flex-col gap-16 sm:gap-20">
        {VOWS.map((v, i) => (
          <VowRow key={v.no} v={v} i={i} />
        ))}
      </div>
    </section>
  );
}
