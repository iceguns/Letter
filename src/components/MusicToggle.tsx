import { useEffect, useRef, useState } from "react";
import { Note } from "./Icons";

/** 用 WebAudio 现场合成的八音盒小夜曲，可开关 */
export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const gainRef = useRef<GainNode | null>(null);

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
      gainRef.current = null;
    }
    setPlaying(false);
  };

  const start = () => {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    ctxRef.current = ctx;
    gainRef.current = master;
    master.gain.exponentialRampToValueAtTime(0.055, ctx.currentTime + 1.2);

    // 温柔的琶音和弦进行（Am — F — C — G）
    const chords: number[][] = [
      [220.0, 261.63, 329.63, 440.0, 523.25],
      [174.61, 220.0, 261.63, 349.23, 440.0],
      [130.81, 196.0, 261.63, 329.63, 392.0],
      [196.0, 246.94, 293.66, 392.0, 493.88],
    ];
    let bar = 0;

    const playNote = (freq: number, when: number, vol: number) => {
      if (!ctxRef.current) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(vol, when + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, when + 1.35);
      osc.connect(g).connect(master);
      osc.start(when);
      osc.stop(when + 1.5);
    };

    const playBar = () => {
      if (!ctxRef.current) return;
      const t0 = ctx.currentTime + 0.05;
      const chord = chords[bar % chords.length];
      chord.forEach((f, i) => playNote(f, t0 + i * 0.34, i === 0 ? 0.9 : 0.55));
      // 高八度点缀音
      playNote(chord[2] * 2, t0 + 1.5, 0.28);
      bar += 1;
    };

    playBar();
    timerRef.current = window.setInterval(playBar, 2000);
    setPlaying(true);
  };

  useEffect(() => stop, []);

  return (
    <button
      onClick={playing ? stop : start}
      className="group flex items-center gap-2 rounded-full border border-rose-700/50 bg-night-800/70 px-3.5 py-1.5 text-xs tracking-widest text-rose-200/90 backdrop-blur-sm transition hover:border-gold-400/60 hover:text-gold-200"
      aria-label={playing ? "关闭小夜曲" : "播放小夜曲"}
      title={playing ? "暂停小夜曲" : "为你奏一支小夜曲"}
    >
      <Note className="h-4 w-4 text-gold-300 transition-transform group-hover:-rotate-12" />
      <span className="hidden sm:inline">{playing ? "夜曲播放中" : "奏一支夜曲"}</span>
      <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`w-[2px] rounded-full bg-gold-300 transition-all ${playing ? "" : "opacity-30"}`}
            style={
              playing
                ? {
                    animation: `heartbeat 0.9s ease-in-out ${i * 0.18}s infinite`,
                    height: [6, 10, 7][i],
                  }
                : { height: 4 }
            }
          />
        ))}
      </span>
    </button>
  );
}
