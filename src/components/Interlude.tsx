import { useReveal } from "../hooks/useReveal";

const IMG =
  "https://image.qwenlm.ai/generated-images/c17cf2ae-0055-435f-933e-f539b24f4e8c/_result.png";

/** 插曲：月色真美 —— 呼吸感全屏画面 */
export default function Interlude() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.2);

  return (
    <section className="relative h-[76vh] min-h-[520px] overflow-hidden">
      {/* 底色兜底 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#4a2038,#1e0a18_70%)]" />
      <div className="absolute inset-0">
        <img
          src={IMG}
          alt="月色下相依的两个人"
          className="kenburns h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-night-950 via-transparent to-night-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(21,7,17,0.6)_100%)]" />

      <div ref={ref} className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p
          className={`reveal ${inView ? "is-in" : ""} text-xs uppercase tracking-[0.6em] text-gold-200/85`}
          style={{ fontFamily: "var(--font-west)" }}
        >
          Sous la lune · 月下
        </p>
        <h2
          className={`reveal ${inView ? "is-in" : ""} mt-6 text-6xl text-rose-100 drop-shadow-[0_6px_30px_rgba(154,44,80,0.6)] sm:text-8xl`}
          style={{ fontFamily: "var(--font-hand)", transitionDelay: "150ms" }}
        >
          「今晚月色真美」
        </h2>
        <p
          className={`reveal ${inView ? "is-in" : ""} mt-7 max-w-md text-sm leading-8 text-rose-200/85 sm:text-base`}
          style={{ transitionDelay: "300ms" }}
        >
          这是我能想到的，最含蓄也最郑重的喜欢。
          <br />
          而此刻的月亮，不及你万分之一。
        </p>
      </div>
    </section>
  );
}
