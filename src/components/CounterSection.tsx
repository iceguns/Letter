import { useEffect, useState } from "react";
import RevealLines from "./RevealLines";
import { useReveal } from "../hooks/useReveal";

const ORIGIN = new Date("2024-05-20T20:20:00");

function useSince() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, now - ORIGIN.getTime());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    mins: Math.floor(diff / 60000) % 60,
    secs: Math.floor(diff / 1000) % 60,
  };
}

function Cell({ value, unit, wide }: { value: number; unit: string; wide?: boolean }) {
  return (
    <div className="flex flex-col items-center px-4 sm:px-10">
      <span
        className={`tnum text-5xl italic text-brass-300 sm:text-7xl ${wide ? "min-w-[2.4ch] text-right" : ""}`}
        style={{ fontFamily: "var(--font-west)" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-3 text-xs tracking-[0.45em] text-fog/80 sm:text-sm">{unit}</span>
    </div>
  );
}

/** 贰 · 想念的刻度：自相遇起，每一秒都算数 */
export default function CounterSection() {
  const t = useSince();
  const { ref, inView } = useReveal<HTMLDivElement>();

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-24 sm:py-36">
      <div ref={ref} className={`${inView ? "is-in" : ""} relative`}>
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <span
              className="pointer-events-none absolute -left-4 -top-10 select-none text-[9rem] font-black leading-none text-ink-700/60 sm:text-[12rem]"
              aria-hidden="true"
            >
              贰
            </span>
            <div className="relative flex items-start gap-5">
              <span className="v-rl text-4xl font-black leading-snug text-mist sm:text-5xl">想念的刻度</span>
              <span className="v-rl mt-1 h-14 w-px bg-gradient-to-b from-rouge-500/80 to-transparent" />
            </div>
          </div>
          <RevealLines
            className="md:pb-2 md:text-right"
            lines={["自遇见你那一刻起，", "时间开始有了刻度。"]}
            step={180}
            lineClassName="block text-base leading-8 text-fog sm:text-lg"
          />
        </div>

        <div className="mt-16 flex items-center justify-center divide-x divide-mist/10 border-y border-mist/10 py-10 sm:mt-20 sm:py-14">
          <Cell value={t.days} unit="天" wide />
          <Cell value={t.hours} unit="时" />
          <Cell value={t.mins} unit="分" />
          <Cell value={t.secs} unit="秒" />
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <RevealLines
            lines={["每一秒，都算数。"]}
            step={120}
            lineClassName="block text-xl text-mist sm:text-2xl"
          />
          <p className="text-[11px] tracking-[0.35em] text-dim">
            起点 · 五月二十日 二十时二十分
          </p>
        </div>
      </div>
    </section>
  );
}
