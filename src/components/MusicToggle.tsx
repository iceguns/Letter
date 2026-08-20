import { useEffect, useRef, useState } from "react";

/** 现场合成的慢速小调圆舞曲（Am–F–C–E），克制而温柔 */
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
    lp.frequency.value = 1400;
    lp.Q.value = 0.4;
    master.connect(lp).connect(ctx.destination);
    master.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 1.6);

    const bars: { bass: number; tones: number[] }[] = [
      { bass: 110.0, tones: [220.0, 329.63, 440.0] },
      { bass: 87.31, tones: [174.61, 261.63, 349.23] },
      { bass: 130.81, tones: [196.0, 261.63, 329.63] },
      { bass: 82.41, tones: [164.81, 246.94, 329.63] },
    ];
    let bar = 0;

    const note = (freq: number, when: number, vol: number, dur: number) => {
      if (!ctxRef.current) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = freq < 140 ? "sine" : "triangle";
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(vol, when + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
      osc.connect(g).connect(master);
      osc.start(when);
      osc.stop(when + dur + 0.1);
    };

    const playBar = () => {
      if (!ctxRef.current) return;
      const t0 = ctx.currentTime + 0.06;
      const b = bars[bar % bars.length];
      note(b.bass, t0, 0.9, 2.4);
      b.tones.forEach((f, i) => note(f, t0 + 0.5 + i * 0.42, 0.34, 1.9));
      note(b.tones[2] * 2, t0 + 1.85, 0.11, 1.6);
      bar += 1;
    };

    playBar();
    timerRef.current = window.setInterval(playBar, 2600);
    setPlaying(true);
  };

  useEffect(() => stop, []);

  return (
    <button
      onClick={playing ? stop : start}
      className="group flex items-center gap-2.5 border border-mist/15 px-4 py-2 text-[11px] tracking-[0.35em] text-fog transition-colors duration-500 hover:border-brass-400/60 hover:text-brass-300"
      aria-label={playing ? "停掉夜曲" : "奏一支夜曲"}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
          playing ? "bg-rouge-400 pulse-dot" : "bg-dim group-hover:bg-brass-400"
        }`}
      />
      {playing ? "夜曲进行中" : "夜曲"}
    </button>
  );
}
