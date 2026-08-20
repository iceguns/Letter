import { useState } from "react";
import RevealLines from "./RevealLines";
import { useReveal } from "../hooks/useReveal";

/** 肆 · 落印：写下名字，以印为誓 */
export default function SealSection() {
  const [name, setName] = useState("");
  const [stamped, setStamped] = useState<string | null>(null);
  const [hint, setHint] = useState(false);
  const { ref, inView } = useReveal<HTMLDivElement>();

  const stamp = () => {
    const n = name.trim().slice(0, 4);
    if (!n) {
      setHint(true);
      window.setTimeout(() => setHint(false), 2400);
      return;
    }
    setStamped(null);
    requestAnimationFrame(() => requestAnimationFrame(() => setStamped(n)));
  };

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 sm:py-36">
      <div ref={ref} className={`grid gap-16 md:grid-cols-[1.15fr_1fr] md:gap-20 ${inView ? "is-in" : ""}`}>
        {/* 左：文字与落款 */}
        <div>
          <div className="relative">
            <span
              className="pointer-events-none absolute -left-4 -top-10 select-none text-[9rem] font-black leading-none text-ink-700/60 sm:text-[12rem]"
              aria-hidden="true"
            >
              肆
            </span>
            <div className="relative flex items-start gap-5">
              <span className="v-rl text-4xl font-black leading-snug text-mist sm:text-5xl">落印</span>
              <span className="v-rl mt-1 h-14 w-px bg-gradient-to-b from-rouge-500/80 to-transparent" />
              <span className="v-rl mt-1 text-xs tracking-[0.5em] text-fog/80">以印为誓</span>
            </div>
          </div>

          <RevealLines
            className="mt-12 text-lg leading-loose text-fog sm:text-xl sm:leading-loose"
            step={160}
            lines={[
              "纸上得来终觉浅。",
              "这封信的落款，",
              "想请两个人来完成——",
              "写下你的名字，",
              "我把它与我的心意，一并落印为誓。",
            ]}
          />

          <div className="mt-10 flex max-w-md items-stretch gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && stamp()}
              maxLength={4}
              placeholder="你的名字 · 至多四字"
              aria-label="你的名字"
              className="w-full border-b border-mist/20 bg-transparent px-1 py-3 text-lg text-mist outline-none transition-colors duration-500 placeholder:text-dim/70 focus:border-brass-400"
              style={{ fontFamily: "var(--font-song)" }}
            />
            <button
              onClick={stamp}
              className="shrink-0 border border-rouge-500/70 px-6 py-3 text-sm tracking-[0.5em] text-rouge-300 transition-all duration-500 hover:bg-rouge-600 hover:text-mist sm:px-8"
            >
              落印
            </button>
          </div>
          <p
            className={`mt-3 text-xs tracking-[0.2em] text-rouge-300 transition-opacity duration-500 ${
              hint ? "opacity-100" : "opacity-0"
            }`}
          >
            先留下名字，印才有处可落。
          </p>

          {stamped && (
            <div className="fade-up mt-10 border-l-2 border-rouge-500/70 pl-5">
              <RevealLines
                step={200}
                lines={[
                  <span key="1" className="block text-xl text-mist sm:text-2xl">
                    印已落，誓已成。
                  </span>,
                  <span key="2" className="mt-2 block text-base leading-8 text-fog sm:text-lg">
                    山河是你，归途也是你。
                  </span>,
                ]}
              />
              <button
                onClick={() => setStamped(null)}
                className="mt-5 text-[11px] tracking-[0.35em] text-dim underline decoration-mist/20 underline-offset-4 transition-colors hover:text-brass-300"
              >
                再落一枚
              </button>
            </div>
          )}
        </div>

        {/* 右：印位 */}
        <div className="flex items-center justify-center">
          {stamped ? (
            <div className="flex flex-col items-center gap-8">
              <div
                className="seal-stamp seal-face relative flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48"
                role="img"
                aria-label={`${stamped} 之印`}
              >
                <div className="grain absolute inset-0 opacity-25" aria-hidden="true" />
                <div className="relative flex flex-col items-center gap-1.5 py-4">
                  {stamped.split("").map((c, i) => (
                    <span
                      key={i}
                      className={`font-black leading-none text-[#f4ead8] ${
                        stamped.length >= 4
                          ? "text-xl sm:text-3xl"
                          : stamped.length === 3
                            ? "text-3xl sm:text-4xl"
                            : "text-4xl sm:text-5xl"
                      }`}
                      style={{ fontFamily: "var(--font-song)" }}
                    >
                      {c}
                    </span>
                  ))}
                  <span className="mt-1 text-sm font-semibold tracking-[0.3em] text-[#f4ead8]/90">之印</span>
                </div>
              </div>
              <p className="text-[11px] tracking-[0.4em] text-dim">
                {stamped} · 落于此页 · 终生有效
              </p>
            </div>
          ) : (
            <div className="flex h-40 w-40 rotate-[-8deg] items-center justify-center border border-dashed border-mist/20 sm:h-48 sm:w-48">
              <span className="v-rl text-sm tracking-[0.5em] text-dim">虚位以待</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
