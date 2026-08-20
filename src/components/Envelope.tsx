import { useState } from "react";
import { HeartFill } from "./Icons";

interface Props {
  reduced: boolean;
  onOpened: () => void;
}

/** 开场：一枚火漆封信封，轻触即拆开 */
export default function Envelope({ reduced, onOpened }: Props) {
  const [opening, setOpening] = useState(false);
  const [sealed, setSealed] = useState(true); // false = 火漆印已碎

  const open = () => {
    if (opening) return;
    setOpening(true);
    setSealed(false);
    const wait = reduced ? 250 : 1650;
    window.setTimeout(onOpened, wait);
  };

  return (
    <section className="relative flex h-screen min-h-[640px] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* 顶部小字 */}
      <p
        className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.5em] text-gold-300/80"
        style={{ fontFamily: "var(--font-west)" }}
      >
        <span className="h-px w-10 bg-gold-400/40" />
        A Letter For You
        <span className="h-px w-10 bg-gold-400/40" />
      </p>

      <h1
        className="text-7xl leading-none text-rose-100 drop-shadow-[0_4px_24px_rgba(192,63,104,0.45)] sm:text-8xl"
        style={{ fontFamily: "var(--font-hand)" }}
      >
        予你
      </h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-rose-200/80 sm:text-base">
        一封写了很久、改了又改的信，
        <br />
        藏着我所有没敢说出口的<span className="text-rose-300">心动</span>。
      </p>

      {/* 信封 */}
      <div className="persp relative mt-10 sm:mt-12">
        {/* 环绕的小爱心 */}
        <HeartFill className="bob absolute -left-12 top-2 h-5 w-5 text-rose-500/70" />
        <HeartFill className="bob absolute -right-14 top-16 h-4 w-4 text-gold-300/70" />
        <HeartFill className="bob absolute -left-8 bottom-4 h-3 w-3 text-rose-300/60" />

        <div className="relative h-[230px] w-[min(86vw,400px)] sm:h-[250px]">
          {/* 信封背面 */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-rose-700 to-rose-800 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]" />

          {/* 信纸（开启时升起） */}
          <div
            className={`paper absolute inset-x-4 top-3 bottom-3 z-10 flex items-start justify-center rounded-sm pt-6 shadow-md transition-transform duration-700 ease-out ${
              opening ? "-translate-y-[62%]" : ""
            }`}
            style={{ transitionDelay: opening && !reduced ? "420ms" : "0ms" }}
          >
            <div className="text-center" style={{ fontFamily: "var(--font-hand)" }}>
              <HeartFill className="heartbeat mx-auto h-8 w-8 text-rose-600" />
              <p className="mt-2 text-2xl text-ink">见字如面</p>
            </div>
          </div>

          {/* 信封前袋 */}
          <div
            className="absolute inset-0 z-20 rounded-lg bg-gradient-to-b from-rose-600 to-rose-700"
            style={{ clipPath: "polygon(0 6%, 50% 52%, 100% 6%, 100% 100%, 0 100%)" }}
          >
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 6%, 50% 52%, 100% 6%, 100% 100%, 0 100%)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.14), transparent 30%)",
              }}
            />
          </div>

          {/* 信封盖（开启时翻起） */}
          <div
            className={`origin-top-3d absolute inset-x-0 top-0 z-30 h-[54%] transition-transform duration-700 ${
              opening ? "[transform:rotateX(-178deg)] [z-index:5]" : ""
            }`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(180deg, #b03a5e, #8c2748 70%, #7c2340)",
              borderRadius: "8px 8px 0 0",
            }}
          />

          {/* 火漆印 */}
          <button
            onClick={open}
            aria-label="拆开信封"
            className={`group absolute left-1/2 top-[46%] z-40 -translate-x-1/2 transition-all duration-500 ${
              !sealed ? "scale-0 rotate-[50deg] opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <span className="seal-ring absolute inset-0 rounded-full border-2 border-gold-300/70" />
            <span className="seal-ring absolute inset-0 rounded-full border border-rose-300/60" style={{ ["--ring-delay" as string]: "0.9s" }} />
            <span
              className={`relative flex h-16 w-16 items-center justify-center rounded-full text-rose-100 shadow-[inset_0_2px_6px_rgba(255,255,255,0.35),inset_0_-4px_8px_rgba(60,8,26,0.55),0_8px_20px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95 sm:h-[72px] sm:w-[72px] ${
                reduced ? "" : "glow-pulse"
              }`}
              style={{ background: "radial-gradient(circle at 32% 28%, #e9b268, #c08f43 45%, #8a5c26 100%)" }}
            >
              <HeartFill className="h-7 w-7 drop-shadow-[0_1px_2px_rgba(60,20,10,0.6)] sm:h-8 sm:w-8" />
            </span>
          </button>
        </div>
      </div>

      {/* 提示 */}
      <div className="mt-12 flex flex-col items-center gap-2 text-rose-200/75">
        <p className="text-sm tracking-[0.3em]">轻触火漆印 · 拆开我的心意</p>
        <HeartFill className={`h-4 w-4 text-rose-400 ${reduced ? "" : "heartbeat"}`} />
      </div>
    </section>
  );
}
