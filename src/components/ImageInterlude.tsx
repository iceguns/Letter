import RevealLines from "./RevealLines";

interface Props {
  src: string;
  alt: string;
  caption: string;
  quote: string;
  quoteSub?: string;
}

/** 全屏影像间章：Ken Burns 呼吸 + 竖排小签 + 引言揭幕 */
export default function ImageInterlude({ src, alt, caption, quote, quoteSub }: Props) {
  return (
    <section className="relative h-[74vh] overflow-hidden sm:h-[84vh]">
      <div className="absolute inset-0 bg-gradient-to-br from-ink-800 via-rouge-900 to-ink-950" aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        className="kenburns absolute inset-0 h-full w-full object-cover opacity-85"
      />
      {/* 压暗上下，融入夜色 */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink-900 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-900 via-ink-900/70 to-transparent" aria-hidden="true" />

      {/* 竖排小签 */}
      <span className="v-rl absolute right-5 top-1/2 -translate-y-1/2 text-xs tracking-[0.55em] text-brass-300/90 sm:right-10">
        {caption}
      </span>

      {/* 引言 */}
      <div className="absolute bottom-10 left-6 max-w-3xl sm:bottom-16 sm:left-14">
        <RevealLines
          lines={[quote]}
          step={200}
          className="text-2xl font-semibold leading-relaxed text-mist sm:text-4xl sm:leading-relaxed"
        />
        {quoteSub && (
          <RevealLines lines={[quoteSub]} step={200} className="mt-4 text-sm tracking-[0.25em] text-fog/80" />
        )}
      </div>
    </section>
  );
}
