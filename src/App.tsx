import { useEffect, useState } from "react";
import Ambient from "./components/Ambient";
import Envelope from "./components/Envelope";
import LetterSection from "./components/LetterSection";
import Reasons from "./components/Reasons";
import Timeline from "./components/Timeline";
import Interlude from "./components/Interlude";
import Vows from "./components/Vows";
import Question from "./components/Question";
import MusicToggle from "./components/MusicToggle";
import { EcgLine, HeartFill } from "./components/Icons";
import { usePrefersReducedMotion } from "./hooks/useReveal";

export default function App() {
  const [opened, setOpened] = useState(false);
  const reduced = usePrefersReducedMotion();

  // 拆信前锁定滚动
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <div className="relative min-h-screen">
      <Ambient />

      {/* 噪点质感层 */}
      <div className="noise-layer pointer-events-none fixed inset-0 z-[70] opacity-[0.055]" aria-hidden="true" />

      {/* 顶栏 */}
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-all duration-700 sm:px-8 ${
          opened ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <a href="#letter" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/50 bg-night-800/70 shadow-[0_4px_16px_rgba(192,63,104,0.35)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <HeartFill className="heartbeat h-4 w-4 text-rose-400" />
          </span>
          <span className="text-lg text-rose-100" style={{ fontFamily: "var(--font-hand)" }}>
            予你
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.4em] text-rose-300/60 sm:inline" style={{ fontFamily: "var(--font-west)" }}>
            To You
          </span>
        </a>
        <MusicToggle />
      </header>

      {/* 开场信封（拆开后收起） */}
      <div
        className={`transition-all duration-700 ease-in-out ${
          opened ? "h-0 overflow-hidden opacity-0" : "h-screen opacity-100"
        }`}
      >
        <Envelope reduced={reduced} onOpened={() => setOpened(true)} />
      </div>

      {/* 正文 */}
      <main className="relative z-10">
        <LetterSection active={opened} reduced={reduced} />

        <Divider />
        <Reasons />

        <Divider />
        <Timeline />

        <Interlude />

        <Vows />

        <Divider />
        <Question reduced={reduced} />
      </main>

      {/* 落款 */}
      <footer className="relative z-10 border-t border-rose-800/40 px-6 pb-14 pt-16 text-center">
        <EcgLine className="mx-auto h-8 w-56 text-rose-500/80" />
        <p className="mt-6 text-2xl text-rose-200/90 sm:text-3xl" style={{ fontFamily: "var(--font-hand)" }}>
          山海远阔，人间烟火，皆与你共
        </p>
        <p className="mx-auto mt-4 max-w-sm text-xs leading-6 text-rose-300/60">
          这封信没有有效期——从你点开的那一刻起，
          <br />
          我的喜欢，永久生效。
        </p>
        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.45em] text-rose-300/50" style={{ fontFamily: "var(--font-west)" }}>
          <span>Made with</span>
          <HeartFill className="heartbeat h-3 w-3 text-rose-500" />
          <span>for someone special</span>
        </div>
      </footer>
    </div>
  );
}

function Divider() {
  return (
    <div className="relative z-10 flex items-center justify-center py-4" aria-hidden="true">
      <span className="h-px w-20 bg-gradient-to-r from-transparent to-rose-600/50" />
      <HeartFill className="mx-3 h-2.5 w-2.5 text-rose-600/70" />
      <span className="h-px w-20 bg-gradient-to-l from-transparent to-rose-600/50" />
    </div>
  );
}
