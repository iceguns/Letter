import RevealLines from "./RevealLines";

/** 尾声 + 页脚 */
export default function ClosingSection() {
  return (
    <footer className="relative px-6 pb-14 pt-28 sm:pt-40">
      <div className="mx-auto max-w-3xl text-center">
        <RevealLines
          lines={["信终，意不尽。"]}
          step={200}
          className="text-4xl font-black text-mist sm:text-6xl"
        />
        <RevealLines
          className="mt-10"
          step={300}
          lines={[
            <span key="sig" className="text-2xl text-brass-300 sm:text-3xl" style={{ fontFamily: "var(--font-kai)" }}>
              一个把心交给你的人 · 手书
            </span>,
          ]}
        />
        <div className="mx-auto mt-12 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-mist/15" />
          <span className="inline-block h-2.5 w-2.5 rotate-45 bg-rouge-500/90" aria-hidden="true" />
          <span className="h-px w-16 bg-mist/15" />
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-5xl flex-col items-center justify-between gap-3 border-t border-mist/10 pt-6 text-[10px] tracking-[0.35em] text-dim sm:flex-row sm:text-[11px]">
        <span>《与你书》 · 纸短情长</span>
        <span>本页无一字不真心</span>
        <span>灯下深夜 · 手书</span>
      </div>
    </footer>
  );
}
