import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import SectionHead from "./SectionHead";
import { useReveal } from "../hooks/useReveal";
import { EcgLine, HeartFill } from "./Icons";

const HANDS_IMG =
  "https://image.qwenlm.ai/generated-images/e7127b7c-e418-4b5a-9648-1db9b95ea607/_result.png";

const TAUNTS = [
  "咦？这个按钮怎么自己跑了",
  "别躲啦，诚实一点嘛～",
  "它说：你只能点「愿意」",
  "再点也没用哦，它已经害羞了",
  "好啦好啦，它认输——快选「愿意」！",
];

const BURST_COLORS = ["#f0a3ba", "#e67e9d", "#d75c83", "#c03f68", "#eac98b", "#f5e0b4"];

interface Props {
  reduced: boolean;
}

/** 终章：发问 + 会逃跑的按钮 + 两情相悦的庆祝 */
export default function Question({ reduced }: Props) {
  const [dodges, setDodges] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [toast, setToast] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const { ref, inView } = useReveal<HTMLDivElement>(0.2);
  const toastTimer = useRef<number | null>(null);
  const lastDodge = useRef(0);

  const giveUp = dodges >= TAUNTS.length;

  const dodge = () => {
    if (giveUp || accepted) return;
    const now = Date.now();
    if (now - lastDodge.current < 320) return; // 触屏上 pointerenter+click 防抖
    lastDodge.current = now;
    if (reduced) {
      setToast("偷偷告诉你：逃避是没有用的哦，这里只有「愿意」～");
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast(null), 2600);
      return;
    }
    const maxX = Math.min(150, window.innerWidth * 0.22);
    const x = (Math.random() * 2 - 1) * maxX;
    const y = -30 + Math.random() * 100;
    setOffset({ x, y });
    setDodges((d) => d + 1);
  };

  const sayYes = () => {
    if (accepted) return;
    setAccepted(true);
    if (!reduced) {
      const fire = (delay: number, opts: confetti.Options) =>
        window.setTimeout(() => confetti({ zIndex: 90, disableForReducedMotion: true, ...opts }), delay);
      fire(80, { particleCount: 130, spread: 75, origin: { y: 0.55 }, colors: BURST_COLORS, scalar: 1.1 });
      fire(350, { particleCount: 90, angle: 60, spread: 60, origin: { x: 0, y: 0.65 }, colors: BURST_COLORS });
      fire(350, { particleCount: 90, angle: 120, spread: 60, origin: { x: 1, y: 0.65 }, colors: BURST_COLORS });
      fire(800, { particleCount: 160, spread: 100, origin: { y: 0.5 }, colors: BURST_COLORS, scalar: 1.3 });
    }
  };

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <SectionHead en="Final Chapter · The Question" title="那么，最后——" sub="深呼吸。接下来的每一个字，我都是认真的。" />

      <div ref={ref} className={`reveal ${inView ? "is-in" : ""} mx-auto max-w-3xl text-center`} data-dir="zoom">
        <p className="text-4xl leading-snug text-rose-100 sm:text-6xl sm:leading-tight" style={{ fontFamily: "var(--font-hand)" }}>
          你愿意
          <HeartFill className="heartbeat mx-2 inline h-8 w-8 text-rose-500 sm:h-12 sm:w-12" />
          <br className="sm:hidden" />
          做我的心上人吗？
        </p>
        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-rose-200/70">
          往后的晚风、热奶茶、每一场日落和每一个清晨，
          <br />
          我都想和你一起。
        </p>

        {/* 按钮们 */}
        <div className="relative mx-auto mt-12 flex h-48 items-center justify-center gap-6 sm:gap-10">
          <button
            onClick={sayYes}
            className={`glow-pulse relative z-20 rounded-full border-2 border-gold-300/80 bg-gradient-to-b from-rose-500 to-rose-700 px-10 py-4 text-xl tracking-[0.3em] text-rose-100 shadow-xl transition-transform duration-300 hover:scale-110 active:scale-95 sm:px-14 sm:text-2xl ${reduced ? "" : "heartbeat"}`}
            style={{ fontFamily: "var(--font-hand)" }}
          >
            愿 意
          </button>

          <button
            onPointerEnter={dodge}
            onClick={dodge}
            disabled={giveUp}
            className={`relative z-10 rounded-full border border-rose-700/60 bg-night-800/70 px-8 py-3.5 text-base tracking-[0.25em] text-rose-200/80 transition-[opacity,border-color,color] duration-300 hover:border-rose-500 ${
              giveUp ? "cursor-not-allowed opacity-40 line-through" : ""
            }`}
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px)`,
              transition: reduced ? undefined : "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s",
            }}
          >
            {giveUp ? "让我想想（已认输）" : "让我想想"}
          </button>

          {/* 逃跑提示气泡 */}
          {!giveUp && dodges > 0 && (
            <p key={dodges} className="toast-in absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-rose-700/40 bg-night-800/90 px-4 py-1.5 text-xs text-rose-200/85">
              {TAUNTS[dodges - 1]}
            </p>
          )}
        </div>

        {toast && (
          <p className="toast-in mx-auto mt-2 w-fit rounded-full border border-gold-400/40 bg-night-800/90 px-5 py-2 text-sm text-gold-200">
            {toast}
          </p>
        )}
      </div>

      {accepted && <Celebration reduced={reduced} onClose={() => setAccepted(false)} />}
    </section>
  );
}

/* ---------------- 庆祝 ---------------- */

function Celebration({ reduced, onClose }: { reduced: boolean; onClose: () => void }) {
  const bursts = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => {
        const ang = Math.random() * Math.PI * 2;
        const dist = 120 + Math.random() * 260;
        return {
          id: i,
          dx: Math.cos(ang) * dist,
          dy: Math.sin(ang) * dist - 70,
          rot: (Math.random() - 0.5) * 260,
          size: 12 + Math.random() * 16,
          color: BURST_COLORS[i % BURST_COLORS.length],
          dur: 1.1 + Math.random() * 0.9,
          delay: Math.random() * 0.35,
        };
      }),
    []
  );

  const rain = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: 4 + Math.random() * 92,
        size: 12 + Math.random() * 14,
        dur: 7 + Math.random() * 6,
        delay: -Math.random() * 8,
        op: 0.35 + Math.random() * 0.4,
      })),
    []
  );

  const dateStr = useMemo(
    () => new Date().toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" }),
    []
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="overlay-in fixed inset-0 z-[80] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#57233f,#150711_75%)]" />
      <div className="absolute inset-0 opacity-40">
        <img src={HANDS_IMG} alt="" className="h-full w-full object-cover" onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-night-950/60 via-transparent to-night-950/80" />

      {/* 上升爱心雨 */}
      {!reduced &&
        rain.map((r) => (
          <span key={r.id} className="rise-heart" style={{ left: `${r.left}%`, ["--rise-dur" as string]: `${r.dur}s`, ["--rise-delay" as string]: `${r.delay}s`, ["--rise-op" as string]: r.op }}>
            <span style={{ display: "inline-block", width: r.size, height: r.size }}>
              <HeartFill className="h-full w-full text-rose-400" />
            </span>
          </span>
        ))}

      {/* 爆心 */}
      <div className="pointer-events-none absolute left-1/2 top-[38%]">
        {bursts.map((b) => (
          <span
            key={b.id}
            className="burst-heart absolute"
            style={{
              color: b.color,
              ["--dx" as string]: `${b.dx}px`,
              ["--dy" as string]: `${b.dy}px`,
              ["--rot" as string]: `${b.rot}deg`,
              ["--burst-dur" as string]: `${b.dur}s`,
              ["--burst-delay" as string]: `${b.delay}s`,
            }}
          >
            <span style={{ display: "inline-block", width: b.size, height: b.size }}>
              <HeartFill className="h-full w-full" />
            </span>
          </span>
        ))}
      </div>

      {/* 主文案 */}
      <div className="relative z-10 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.6em] text-gold-200/90" style={{ fontFamily: "var(--font-west)" }}>
          Two Hearts · One Answer
        </p>
        <h2 className="mt-5 text-6xl leading-tight text-rose-100 drop-shadow-[0_6px_32px_rgba(192,63,104,0.7)] sm:text-8xl" style={{ fontFamily: "var(--font-hand)" }}>
          此后心有归处
        </h2>
        <p className="mt-4 text-xl text-rose-200/90 sm:text-2xl" style={{ fontFamily: "var(--font-hand)" }}>
          从今天起，「我」变成了「我们」
        </p>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-night-900/60 px-5 py-2 text-xs tracking-[0.25em] text-gold-200/90 backdrop-blur-sm">
          <HeartFill className="heartbeat h-3.5 w-3.5 text-rose-400" />
          我们在一起的第 1 天 · {dateStr}
        </p>

        <EcgLine className="mx-auto mt-8 h-10 w-64 text-rose-400/90 sm:w-80" />
        <p className="mt-2 text-[10px] tracking-[0.5em] text-rose-300/60" style={{ fontFamily: "var(--font-west)" }}>
          MY HEART BEATS FOR YOU
        </p>

        <button
          onClick={onClose}
          className="mt-10 rounded-full border border-rose-500/60 bg-rose-600/20 px-8 py-3 text-sm tracking-[0.3em] text-rose-100 transition hover:border-gold-300 hover:bg-rose-600/40 hover:text-gold-200"
        >
          把这封信，再读一遍
        </button>
      </div>
    </div>
  );
}
