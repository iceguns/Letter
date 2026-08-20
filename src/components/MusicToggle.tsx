import { useEffect, useRef, useState } from "react";

/** 五声音阶的小夜曲，慢，轻，像很远的地方有人在弹琴 */
export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  const stop = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (ctxRef.current) {
      try {
        void ctxRef.current.close();
      } catch {
        /* noop */
      }
      ctxRef.current = null;
    }
    setPlaying(false);
  };

  const start = () => {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0.0001;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1300;
    lp.Q.value = 0.3;
    master.connect(lp).connect(ctx.destination);
    master.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.8);

    // 羽调五声：A C D E G
    const scale = [220.0, 261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
    const basses = [110.0, 87.31, 98.0, 110.0];
    let bar = 0;

    const note = (freq: number, when: number, vol: number, dur: number) => {
      if (!ctxRef.current) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = freq < 140 ? "sine" : "triangle";
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(vol, when + 0.06);
      g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
      osc.connect(g).connect(master);
      osc.start(when);
      osc.stop(when + dur + 0.1);
    };

    const playBar = () => {
      if (!ctxRef.current) return;
      const t0 = ctx.currentTime + 0.08;
      note(basses[bar % basses.length], t0, 0.8, 3.4);
      // 每一小节，随手挑几个音，像即兴
      const pick = [0, 2, 4, 5, 3, 1];
      const k = bar % pick.length;
      note(scale[pick[k]], t0 + 0.65, 0.3, 2.6);
      note(scale[(pick[k] + 2) % 7], t0 + 1.25, 0.26, 2.4);
      note(scale[(pick[k] + 4) % 7] * (bar % 3 === 2 ? 2 : 1), t0 + 1.95, 0.18, 2.2);
      note(scale[pick[(k + 3) % 6]] * 2, t0 + 2.7, 0.09, 2.0);
      bar += 1;
    };

    playBar();
    timerRef.current = window.setInterval(playBar, 3600);
    setPlaying(true);
  };

  useEffect(() => stop, []);

  return (
    <button
      onClick={playing ? stop : start}
      className="group flex items-center gap-2.5 border border-mist/12 px-4 py-2 text-[11px] tracking-[0.4em] text-fog transition-all duration-500 hover:border-moon-400/50 hover:text-moon-300"
      aria-label={playing ? "停掉夜曲" : "奏一支夜曲"}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
          playing ? "bg-cinnabar-400 animate-pulse" : "bg-dim group-hover:bg-moon-400"
        }`}
      />
      {playing ? "夜曲进行中" : "夜曲"}
    </button>
  );
}
