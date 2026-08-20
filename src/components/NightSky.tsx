import { useMemo } from "react";
import { usePrefersReducedMotion } from "../hooks/useReveal";

interface Props {
  /** 0..1 阅读进度，决定月的盈亏 */
  progress: number;
  /** 对方答应之后，月即长圆 */
  full: boolean;
  bloomKey: number;
}

/** 常驻夜空：星、流星、一轮随阅读而渐圆的月 */
export default function NightSky({ progress, full, bloomKey }: Props) {
  const reduced = usePrefersReducedMotion();

  const stars = useMemo(
    () =>
      Array.from({ length: 84 }, (_, i) => ({
        left: `${(i * 37.7 + 11) % 100}%`,
        top: `${(i * 61.3 + 7) % 100}%`,
        size: i % 9 === 0 ? 2 : 1,
        dur: `${3 + ((i * 53) % 50) / 10}s`,
        delay: `${-((i * 97) % 60) / 10}s`,
        min: 0.08 + ((i * 13) % 20) / 100,
        max: 0.5 + ((i * 29) % 45) / 100,
        gold: i % 7 === 0,
      })),
    [],
  );

  const p = full ? 1 : progress;
  const phase = full || reduced ? 122 : 18 + p * 104; // 遮影偏移：细月 → 满月
  const lift = reduced ? 0 : p * -9; // 月随阅读缓缓升起（vh）

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {/* 星 */}
      <div
        className={`absolute inset-0 transition-opacity duration-[2500ms] ${
          full ? "opacity-100" : "opacity-80"
        }`}
      >
        {stars.map((s, i) => (
          <span
            key={i}
            className={`star ${s.gold ? "star-gold" : ""}`}
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              ["--st-dur" as string]: s.dur,
              ["--st-delay" as string]: s.delay,
              ["--st-min" as string]: s.min,
              ["--st-max" as string]: s.max,
            }}
          />
        ))}
        <span className="shooting-star" />
      </div>

      {/* 月 */}
      <div
        className="absolute right-[6vw] top-[9vh] transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${lift}vh)` }}
      >
        <div className="relative h-[clamp(120px,24vw,320px)] w-[clamp(120px,24vw,320px)]">
          {/* 光晕 */}
          <div
            className="absolute inset-[-45%] rounded-full transition-all duration-700"
            style={{
              background: `radial-gradient(circle, rgba(228,208,160,${0.1 + p * 0.14}) 0%, rgba(228,208,160,0.04) 42%, transparent 68%)`,
            }}
          />
          {/* 月面 */}
          <div
            className="absolute inset-0 overflow-hidden rounded-full transition-[filter] duration-700"
            style={{
              background:
                "radial-gradient(circle at 36% 32%, #f3e7c4 0%, #e4d0a0 38%, #d2ba80 66%, #b89c5f 100%)",
              boxShadow: "inset -14px -12px 34px rgba(122,94,48,0.5), inset 8px 10px 26px rgba(255,248,224,0.55)",
              filter: `brightness(${0.86 + p * 0.22})`,
            }}
          >
            {/* 环形山 */}
            <span className="absolute left-[26%] top-[38%] h-[9%] w-[9%] rounded-full bg-moon-500/35" />
            <span className="absolute left-[52%] top-[24%] h-[6%] w-[6%] rounded-full bg-moon-500/30" />
            <span className="absolute left-[42%] top-[60%] h-[13%] w-[13%] rounded-full bg-moon-500/28" />
            <span className="absolute left-[64%] top-[52%] h-[5%] w-[5%] rounded-full bg-moon-500/32" />
            {/* 月相遮影 */}
            <div
              className="absolute inset-0 rounded-full transition-transform duration-300 ease-linear"
              style={{
                transform: `translateX(${phase}%)`,
                background:
                  "radial-gradient(circle at 60% 40%, #0d1614 0%, #0a1110 60%)",
              }}
            />
          </div>
          {/* 月圆时的光环 */}
          {full &&
            [0, 0.35, 0.7].map((d, i) => (
              <span
                key={`${bloomKey}-${i}`}
                className="bloom-ring absolute inset-0 rounded-full border"
                style={{
                  borderColor: i === 1 ? "rgba(228,208,160,0.5)" : "rgba(205,95,79,0.45)",
                  ["--br-delay" as string]: `${d}s`,
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
