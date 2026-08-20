import { useState } from "react";
import RevealLines from "./RevealLines";
import { usePrefersReducedMotion } from "../hooks/useReveal";

interface Props {
  accepted: boolean;
  onAccept: () => void;
}

const TEASES = ["让我想想", "月亮说不急", "它等得起"];

const CN = "〇一二三四五六七八九";

function chineseDate(d: Date) {
  const y = String(d.getFullYear())
    .split("")
    .map((c) => CN[Number(c)])
    .join("");
  const m = d.getMonth() + 1;
  const mo = m === 10 ? "十" : m > 10 ? `十${CN[m - 10]}` : CN[m];
  const day = d.getDate();
  const dd =
    day < 10
      ? `初${CN[day]}`
      : day === 10
        ? "初十"
        : day < 20
          ? `十${CN[day - 10]}`
          : day === 20
            ? "二十"
            : day < 30
              ? `廿${CN[day - 20]}`
              : "三十";
  return `${y}年${mo}月${dd}`;
}

/** 终章：一问，一答，落印为凭 */
export default function AskSection({ accepted, onAccept }: Props) {
  const reduced = usePrefersReducedMotion();
  const [tease, setTease] = useState(0);
  const [exhausted, setExhausted] = useState(false);

  const nudge = () => {
    if (tease < TEASES.length - 1) setTease(tease + 1);
    else setExhausted(true);
  };

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-28 sm:py-40">
      <RevealLines
        lines={[
          "那么——",
          "愿不愿意和我一起，",
          "把这轮月亮，看上很多年？",
        ]}
        step={260}
        className="max-w-3xl text-[clamp(1.9rem,4.6vw,3.4rem)] font-bold leading-snug text-mist"
      />

      {!accepted ? (
        <div className="fade-in mt-16 flex flex-wrap items-baseline gap-x-14 gap-y-8 sm:mt-20" style={{ animationDelay: "0.9s" }}>
          <button
            onClick={onAccept}
            className="group border-b-2 border-cinnabar-500/70 pb-2 text-3xl font-bold tracking-[0.2em] text-cinnabar-300 transition-all duration-500 hover:-translate-y-1 hover:border-moon-300 hover:text-moon-200 sm:text-4xl"
            style={{ fontFamily: "var(--font-song)" }}
          >
            愿意。
          </button>
          {!exhausted ? (
            <button
              onClick={nudge}
              className="border-b border-transparent pb-2 text-sm tracking-[0.35em] text-dim transition-all duration-500 hover:border-fog/40 hover:text-fog"
            >
              {TEASES[tease]}
            </button>
          ) : (
            <p className="fade-in text-sm leading-7 tracking-[0.15em] text-fog/85">
              它托我说：我会一直在。
              <span className="mt-1 block text-xs tracking-[0.3em] text-dim">—— 你看，答案只剩一个了。</span>
            </p>
          )}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-start gap-10 sm:mt-20 md:flex-row md:items-center md:gap-14">
          {/* 朱印 */}
          <div className="seal-stamp seal-face relative flex h-36 w-36 shrink-0 items-center justify-center sm:h-40 sm:w-40" role="img" aria-label="立约为凭">
            <div className="grain absolute inset-0 opacity-25" aria-hidden="true" />
            <div className="relative grid grid-cols-2 gap-x-3 gap-y-1">
              {["立", "约", "为", "凭"].map((c) => (
                <span key={c} className="text-center text-3xl font-black leading-tight text-[#f3e7c4] sm:text-4xl" style={{ fontFamily: "var(--font-song)" }}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <RevealLines
              lines={["说定了。"]}
              className="text-5xl font-black text-mist sm:text-6xl"
              as="h2"
            />
            <RevealLines
              className="mt-5 text-lg leading-9 text-fog sm:text-xl"
              step={300}
              lines={["今晚的月亮，替我们记着。", "往后的每一个月夜，都有人陪你看。"]}
            />
            <p className="fade-in mt-7 flex items-center gap-3 text-xs tracking-[0.35em] text-moon-300/90" style={{ animationDelay: "1.4s" }}>
              <span className="inline-block h-px w-8 bg-moon-400/50" />
              {chineseDate(new Date())} · 月满为证
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
              className="fade-in mt-9 text-[11px] tracking-[0.4em] text-dim underline decoration-mist/15 underline-offset-8 transition-colors duration-500 hover:text-moon-300"
              style={{ animationDelay: "1.8s" }}
            >
              把这封信，再读一遍 ↑
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
