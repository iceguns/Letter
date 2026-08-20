import { useMemo } from "react";
import { HeartFill } from "./Icons";

type Rand = () => number;

/** 星空 + 飘落花瓣 + 流萤 + 月亮 —— 全局氛围层 */
export default function Ambient() {
  const stars = useMemo(() => {
    const r: Rand = Math.random;
    return Array.from({ length: 90 }, (_, i) => ({
      id: i,
      top: r() * 100,
      left: r() * 100,
      size: 1 + r() * 2.2,
      dur: 2.6 + r() * 5,
      delay: r() * 6,
    }));
  }, []);

  const petals = useMemo(() => {
    const r: Rand = Math.random;
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: r() * 100,
      fallDur: 11 + r() * 12,
      fallDelay: -r() * 20,
      swayDur: 2.8 + r() * 2.4,
      drift: (r() - 0.5) * 160,
      spin: 200 + r() * 320,
      scale: 0.5 + r() * 0.8,
      hue: r(),
    }));
  }, []);

  const fireflies = useMemo(() => {
    const r: Rand = Math.random;
    return Array.from({ length: 9 }, (_, i) => ({
      id: i,
      top: 12 + r() * 76,
      left: 4 + r() * 92,
      dur: 7 + r() * 7,
      delay: -r() * 8,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* 星 */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            ["--tw-dur" as string]: `${s.dur}s`,
            ["--tw-delay" as string]: `${s.delay}s`,
          }}
        />
      ))}

      {/* 月与光晕 */}
      <div className="cloud-drift absolute -right-16 top-[6%] sm:right-[4%]">
        <div className="floaty relative h-28 w-28 sm:h-40 sm:w-40">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(250,224,180,0.5),transparent_65%)] blur-md" />
          <svg viewBox="0 0 100 100" className="relative h-full w-full drop-shadow-[0_0_28px_rgba(250,224,180,0.45)]">
            <defs>
              <radialGradient id="moonG" cx="38%" cy="35%">
                <stop offset="0%" stopColor="#fdf0cd" />
                <stop offset="70%" stopColor="#eecf92" />
                <stop offset="100%" stopColor="#d9ab5f" />
              </radialGradient>
            </defs>
            <path d="M63 8a42 42 0 1 0 29 72A46 46 0 0 1 63 8Z" fill="url(#moonG)" />
          </svg>
        </div>
      </div>

      {/* 花瓣 */}
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal-outer"
          style={{
            left: `${p.left}%`,
            ["--fall-dur" as string]: `${p.fallDur}s`,
            ["--fall-delay" as string]: `${p.fallDelay}s`,
            ["--drift" as string]: `${p.drift}px`,
            ["--spin" as string]: `${p.spin}deg`,
          }}
        >
          <span className="petal-inner" style={{ ["--sway-dur" as string]: `${p.swayDur}s` }}>
            <svg width={26 * p.scale} height={26 * p.scale} viewBox="0 0 24 24">
              <path
                d="M12 2.4c6.6 4.2 8.6 10.4 0 19.2-8.6-8.8-6.6-15 0-19.2Z"
                fill={p.hue > 0.5 ? "#e67e9d" : "#f0a3ba"}
                opacity="0.55"
              />
            </svg>
          </span>
        </span>
      ))}

      {/* 流萤 */}
      {fireflies.map((f) => (
        <span
          key={f.id}
          className="firefly"
          style={{
            top: `${f.top}%`,
            left: `${f.left}%`,
            ["--ff-dur" as string]: `${f.dur}s`,
            ["--ff-delay" as string]: `${f.delay}s`,
          }}
        />
      ))}

      {/* 远处漂浮的小爱心 */}
      <HeartFill className="bob absolute left-[8%] top-[30%] h-4 w-4 text-rose-600/40" />
      <HeartFill className="bob absolute right-[12%] top-[52%] h-3 w-3 text-rose-400/40" />
      <HeartFill
        className="bob absolute left-[16%] top-[72%] h-5 w-5 text-rose-500/25"
      />

      {/* 底部暗角 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(10,3,8,0.55)_100%)]" />
    </div>
  );
}
