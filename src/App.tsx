import { useEffect, useState, type ReactNode } from "react";
import NightSky from "./components/NightSky";
import CursorGlow from "./components/CursorGlow";
import MusicToggle from "./components/MusicToggle";
import RevealLines from "./components/RevealLines";
import AskSection from "./components/AskSection";
import { usePrefersReducedMotion } from "./hooks/useReveal";

const IMG_RAIN =
  "https://image.qwenlm.ai/generated-images/06a8ba7e-ee74-4081-9522-a564122c9e29/_result.png";

const STORE_KEY = "jieyue-vow-v1";

const Em = ({ children }: { children: ReactNode }) => (
  <em className="em not-italic">{children}</em>
);

/** 《借月》—— 借今晚的月色，说一件藏了很久的事 */
export default function App() {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [accepted, setAccepted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [bloomKey, setBloomKey] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const accept = () => {
    setAccepted(true);
    setBloomKey((k) => k + 1);
    try {
      localStorage.setItem(STORE_KEY, "1");
    } catch {
      /* noop */
    }
  };

  return (
    <main className="relative">
      <NightSky progress={progress} full={accepted} bloomKey={bloomKey} />
      <CursorGlow />

      {/* 颗粒与暗角 */}
      <div className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.06]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-[55] shadow-[inset_0_0_180px_rgba(4,8,7,0.7)]" aria-hidden="true" />

      {/* 阅读进度：一根慢慢注满的线 */}
      <div className="fixed left-4 top-1/2 z-40 hidden h-[36vh] w-px -translate-y-1/2 bg-mist/10 sm:left-7 sm:block" aria-hidden="true">
        <div
          className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-moon-400 to-cinnabar-400"
          style={{ transform: `scaleY(${progress})` }}
        />
        <span
          className="absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-moon-300"
          style={{ top: `${progress * 100}%` }}
        />
      </div>

      {/* 顶栏 */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center bg-cinnabar-500 text-sm font-black text-moon-200 shadow-[0_4px_16px_rgba(179,69,56,0.45)]" style={{ fontFamily: "var(--font-song)" }}>
            月
          </span>
          <p className="text-xs tracking-[0.45em] text-fog">
            借月<span className="ml-2 hidden text-[10px] tracking-[0.3em] text-dim sm:inline">一封信 · 写给唯一的你</span>
          </p>
        </div>
        <MusicToggle />
      </header>

      <div className="relative z-10">
        {/* 卷首 */}
        <section className="flex min-h-screen flex-col justify-center px-6 pb-24 pt-36 sm:px-16 sm:pt-24 lg:px-24">
          <p className="fade-up mb-8 text-[11px] tracking-[0.6em] text-moon-300/80" style={{ animationDelay: "0.3s" }}>
            今夜 · 无风 · 有月
          </p>
          <RevealLines
            as="h1"
            lines={["今晚月色真美。"]}
            step={400}
            className="max-w-4xl text-[clamp(2.7rem,8.5vw,6.8rem)] font-bold leading-tight text-mist"
          />
          <div className="mt-10 max-w-xl">
            <RevealLines
              step={320}
              className="text-base leading-8 text-fog sm:text-lg sm:leading-9"
              lines={[
                <span key="a">—— 夏目漱石说，「我爱你」，这样讲就够了。</span>,
                <span key="b" className="mt-2 block text-mist">可我还是想，再多说几句。</span>,
              ]}
            />
          </div>
          <div className="fade-in mt-20 flex items-center gap-4" style={{ animationDelay: "1.6s" }}>
            <span className="relative block h-16 w-px overflow-hidden bg-mist/10">
              <span className="cue-dot absolute left-0 top-0 h-5 w-px bg-moon-300" />
            </span>
            <span className="text-[10px] tracking-[0.5em] text-dim">往下 · 听我说完</span>
          </div>
        </section>

        {/* 其一：开口的样子 */}
        <section className="mx-auto max-w-5xl px-6 py-24 sm:px-16 sm:py-36 lg:px-24">
          <RevealLines
            step={240}
            className="max-w-2xl text-xl leading-loose text-fog sm:text-2xl sm:leading-[2.6rem]"
            lines={[
              "我练习过很多次开口。",
              "在电梯里，在伞下，",
              "在你低头挑关东煮的便利店门口。",
              "排练好的那些句子，都很得体——",
              <span key="x">只是见了<Em>你</Em>，词语就自己先红了脸。</span>,
            ]}
          />
          <RevealLines
            as="h2"
            step={300}
            className="mt-20 max-w-4xl text-[clamp(2rem,5.6vw,4.3rem)] font-bold leading-snug text-mist sm:mt-28"
            lines={["所以，只好借今晚的月亮。"]}
          />
        </section>

        {/* 图版：雨夜 */}
        <figure className="relative mx-auto max-w-6xl px-6 py-16 sm:px-16 sm:py-24">
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-night-800 via-night-700 to-cinnabar-800" aria-hidden="true" />
            <img
              src={IMG_RAIN}
              alt="雨夜共伞的两个人"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="kenburns relative h-[52vh] w-full object-cover opacity-80 transition-[opacity,filter] duration-1000 group-hover:opacity-95 group-hover:brightness-110 sm:h-[68vh]"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-night-950/90 to-transparent" aria-hidden="true" />
          </div>
          <figcaption className="mt-5 flex items-baseline justify-between gap-6 text-[11px] tracking-[0.35em] text-dim">
            <span>插图 · 雨夜</span>
            <RevealLines lines={["那晚雨很大，伞很小，刚好。"]} step={200} className="text-right text-fog/80" />
          </figcaption>
        </figure>

        {/* 其二：喜欢很轻 */}
        <section className="mx-auto max-w-5xl px-6 py-24 sm:px-16 sm:py-36 lg:px-24">
          <div className="flex justify-end">
            <RevealLines
              step={240}
              className="max-w-2xl text-xl leading-loose text-fog sm:text-right sm:text-2xl sm:leading-[2.6rem]"
              lines={[
                "别人口中的喜欢，大概都很隆重。",
                "我的喜欢很轻，轻到只有我知道——",
                "是雨天不自觉倾向你的那半边伞，",
                "是你随口一提、我就记了很久的小事，",
                "是人群里第一眼找到你，",
                <span key="q">再假装，是<Em>碰巧</Em>。</span>,
              ]}
            />
          </div>
        </section>

        {/* 其三：押给你的小事 */}
        <section className="mx-auto max-w-5xl px-6 py-24 sm:px-16 sm:py-36 lg:px-24">
          <RevealLines
            step={260}
            className="max-w-2xl text-xl leading-loose text-fog sm:text-2xl sm:leading-[2.6rem]"
            lines={[
              "我不太会说宏大的永远，",
              "只把这些小事，押给你：",
            ]}
          />
          <div className="mt-12 max-w-2xl border-l border-moon-400/25 pl-7 sm:mt-16 sm:pl-10">
            <RevealLines
              step={280}
              className="text-lg leading-[2.7rem] text-mist/90 sm:text-xl sm:leading-[2.9rem]"
              lines={[
                "冬天的第一口热汤；",
                "深夜为你留着的那盏灯；",
                "争执之后，先递过去的那杯水；",
                "和往后每一个「明天见」。",
              ]}
            />
            <RevealLines
              as="h3"
              className="mt-10 text-3xl font-bold text-moon-200 sm:text-4xl"
              lines={["都算数。"]}
            />
          </div>
        </section>

        {/* 其四：月的分寸 */}
        <section className="mx-auto max-w-5xl px-6 py-24 sm:px-16 sm:py-36 lg:px-24">
          <RevealLines
            step={260}
            className="max-w-2xl text-xl leading-loose text-fog sm:text-2xl sm:leading-[2.6rem]"
            lines={[
              "月亮从不替谁说话。",
              "可今晚它亮得刚刚好——",
              "多一分太满，少一分太浅，",
              <span key="m">像极了我想<Em>你</Em>的分寸。</span>,
            ]}
          />
        </section>

        {/* 终章：一问 */}
        <AskSection accepted={accepted} onAccept={accept} />

        {/* 页脚 */}
        <footer className="relative px-6 pb-12 pt-10 text-center">
          <div className="mx-auto mb-8 flex items-center justify-center gap-4" aria-hidden="true">
            <span className="h-px w-14 bg-mist/12" />
            <span className="inline-block h-2 w-2 rotate-45 bg-cinnabar-500/80" />
            <span className="h-px w-14 bg-mist/12" />
          </div>
          <p className="text-[11px] tracking-[0.4em] text-dim">
            《借月》 · 以页面为纸 · 以月光为墨
          </p>
          <p className="mx-auto mt-4 max-w-md text-xs leading-7 tracking-[0.15em] text-fog/70">
            若你读到这里时，心跳快了一拍——
            <br className="sm:hidden" />
            这封信，就没白写。
          </p>
        </footer>
      </div>
    </main>
  );
}
