import { useEffect, useRef, useState } from "react";
import SectionHead from "./SectionHead";
import { useReveal } from "../hooks/useReveal";
import { HeartFill } from "./Icons";

const LETTER = `亲爱的你：

展信安。当你读到这里的时候，我已经把攒了很久很久的勇气，全都用光啦。

不知道从哪一天开始，你的名字成了我手机里最亮的提醒；走过每一条街，都会想：如果你在，该多好。

我原来看晚霞、看星空、看这世间一切温柔的事物，都只是喜欢。直到遇见你我才明白——原来所有美好的东西，都是你的影子。

如果此刻的你，也有一点点心动，请往下读。这封信的每一页，都写着同一个答案。

此后山海远阔，人间烟火，我都想与你共。`;

interface Props {
  active: boolean;
  reduced: boolean;
}

/** 第一章：一封逐字写出的情书 */
export default function LetterSection({ active, reduced }: Props) {
  const [count, setCount] = useState(0);
  const done = count >= LETTER.length;
  const { ref, inView } = useReveal<HTMLDivElement>();
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setCount(LETTER.length);
      return;
    }
    timer.current = window.setInterval(() => {
      setCount((c) => {
        if (c >= LETTER.length) {
          if (timer.current) window.clearInterval(timer.current);
          return c;
        }
        return c + 1;
      });
    }, 52);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [active, reduced]);

  return (
    <section id="letter" className="relative px-6 py-24 sm:py-32">
      <SectionHead
        en="Chapter I · The Letter"
        title="一封情书"
        sub="字是我一个个敲下的，心动是真真切切的。"
      />

      <div ref={ref} className={`reveal ${inView ? "is-in" : ""} mx-auto max-w-2xl`}>
        <div className="relative rotate-[-0.8deg] transition-transform duration-500 hover:rotate-0">
          {/* 胶带 */}
          <span className="absolute -top-3 left-8 z-20 h-6 w-24 -rotate-6 rounded-sm bg-gold-300/40 shadow-sm backdrop-blur-[1px]" />
          <span className="absolute -top-3 right-10 z-20 h-6 w-20 rotate-3 rounded-sm bg-rose-400/35 shadow-sm backdrop-blur-[1px]" />

          {/* 邮票与邮戳 */}
          <div className="paper relative overflow-hidden rounded-sm px-7 py-10 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.65)] sm:px-12 sm:py-14">
            <div className="absolute right-6 top-6 flex items-start gap-3 sm:right-9 sm:top-8">
              <div className="rounded-sm border-2 border-dashed border-rose-500/50 p-2 text-center">
                <HeartFill className="mx-auto h-5 w-5 text-rose-600" />
                <p className="mt-1 text-[10px] tracking-[0.2em] text-rose-700/80" style={{ fontFamily: "var(--font-hand)" }}>
                  予你亲启
                </p>
              </div>
              <div className="hidden h-14 w-14 rotate-12 items-center justify-center rounded-full border border-ink/30 text-[9px] leading-tight text-ink/50 sm:flex">
                <span className="text-center">
                  心动
                  <br />
                  邮政
                </span>
              </div>
            </div>

            <div
              className="min-h-[380px] cursor-pointer whitespace-pre-line pt-2 text-lg leading-[36px] text-ink sm:text-xl sm:leading-[36px]"
              style={{ fontFamily: "var(--font-hand)" }}
              onClick={() => setCount(LETTER.length)}
              title="点一下，让心意快一点抵达"
            >
              {LETTER.slice(0, count)}
              {!done && <span className="type-caret ml-0.5 inline-block h-5 w-[2px] translate-y-[3px] bg-rose-600" />}
            </div>

            {/* 落款 */}
            <div className={`mt-8 text-right transition-all duration-1000 ${done ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
              <p className="text-xl text-ink" style={{ fontFamily: "var(--font-hand)" }}>
                —— 一个喜欢你很久的人
              </p>
              <p className="mt-2 text-[11px] tracking-[0.35em] text-ink/50" style={{ fontFamily: "var(--font-west)" }}>
                P.S. 读到最后的你，要对我负责哦
              </p>
            </div>
          </div>
        </div>

        {!done && (
          <p className="mt-6 text-center text-xs tracking-[0.3em] text-rose-200/50">信正在一笔一画地写 · 轻点信纸可加速</p>
        )}
      </div>
    </section>
  );
}
