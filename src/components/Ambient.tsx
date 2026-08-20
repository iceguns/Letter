import { useMemo } from "react";

/** 常驻氛围层：胶片噪点、游雾、上升微尘、暗角 */
export default function Ambient() {
  const motes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: `${(i * 71 + 13) % 100}%`,
        dur: `${16 + ((i * 53) % 14)}s`,
        delay: `${-((i * 97) % 20)}s`,
        x: `${((i % 5) - 2) * 18}px`,
        op: 0.25 + ((i * 37) % 40) / 100,
        size: i % 3 === 0 ? 2 : 3,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {/* 游雾 */}
      <div
        className="mist left-[-15%] top-[-12%] h-[46rem] w-[46rem] bg-rouge-700/25"
        style={{ ["--mist-dur" as string]: "46s" }}
      />
      <div
        className="mist bottom-[-18%] right-[-12%] h-[40rem] w-[40rem] bg-brass-700/15"
        style={{ ["--mist-dur" as string]: "58s" }}
      />
      <div
        className="mist left-[30%] top-[42%] h-[30rem] w-[30rem] bg-rouge-900/30"
        style={{ ["--mist-dur" as string]: "38s" }}
      />

      {/* 微尘 */}
      {motes.map((m, i) => (
        <span
          key={i}
          className="mote"
          style={{
            left: m.left,
            width: m.size,
            height: m.size,
            ["--mote-dur" as string]: m.dur,
            ["--mote-delay" as string]: m.delay,
            ["--mote-x" as string]: m.x,
            ["--mote-op" as string]: m.op,
          }}
        />
      ))}

      {/* 暗角 */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(6,3,2,0.72)]" />
      {/* 噪点 */}
      <div className="grain absolute inset-0 opacity-[0.07]" />
    </div>
  );
}
