import RevealLines from "./RevealLines";

/** 卷首：竖排题字，如一部电影的片头 */
export default function TitleSection() {
  return (
    <header className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* 一弯细月 */}
      <svg
        viewBox="0 0 100 100"
        className="fade-in absolute right-[12%] top-[14%] h-16 w-16 text-brass-300/70 sm:h-24 sm:w-24"
        fill="none"
        aria-hidden="true"
        style={{ animationDelay: "1.2s" }}
      >
        <path d="M68 12a40 40 0 1 0 20 52A32 32 0 0 1 68 12Z" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="30" cy="30" r="1" fill="currentColor" opacity="0.7" />
        <circle cx="48" cy="74" r="0.8" fill="currentColor" opacity="0.5" />
      </svg>

      <div className="flex items-center gap-8 sm:gap-14">
        {/* 右侧小签（先读） */}
        <RevealLines
          className="order-2 sm:order-1"
          step={260}
          lines={[
            <span key="a" className="v-rl text-sm tracking-[0.5em] text-fog/90 sm:text-base">
              纸短情长 · 见字如面
            </span>,
            <span key="b" className="v-rl mt-6 hidden h-24 w-px bg-gradient-to-b from-brass-400/70 to-transparent sm:ml-2 sm:block" />,
          ]}
        />

        {/* 主标题：与你书 */}
        <div className="order-1 flex flex-col items-center sm:order-2">
          <p
            className="fade-up mb-8 text-[11px] tracking-[0.6em] text-brass-300/90 sm:text-xs"
            style={{ animationDelay: "0.2s" }}
          >
            一封信 · 予心上人
          </p>
          <RevealLines
            step={340}
            lines={[
              <span
                key="t"
                className="v-rl text-[26vw] font-black leading-none text-mist drop-shadow-[0_0_40px_rgba(160,58,69,0.25)] sm:text-[11rem]"
                style={{ fontFamily: "var(--font-song)" }}
              >
                与你书
              </span>,
            ]}
          />
        </div>

        {/* 左侧留白平衡 */}
        <div className="order-3 hidden w-px sm:block" aria-hidden="true" />
      </div>

      {/* 朱生豪题记 */}
      <p
        className="fade-in absolute bottom-24 left-6 text-xs leading-6 text-dim sm:bottom-28 sm:left-12 sm:text-sm"
        style={{ animationDelay: "1.6s" }}
      >
        「醒来觉得，甚是爱你。」
        <span className="ml-3 text-[10px] tracking-[0.3em] text-dim/70">—— 朱生豪</span>
      </p>

      {/* 往下读 */}
      <div
        className="fade-in absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-10"
        style={{ animationDelay: "2s" }}
      >
        <span className="v-rl text-[10px] tracking-[0.5em] text-fog/80">往下 · 慢慢读</span>
        <span className="relative block h-16 w-px overflow-hidden bg-mist/10">
          <span className="cue-dot absolute left-0 top-0 h-6 w-px bg-brass-300" />
        </span>
      </div>
    </header>
  );
}
