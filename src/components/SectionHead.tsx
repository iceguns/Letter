import { useReveal } from "../hooks/useReveal";
import { HeartFill } from "./Icons";

interface Props {
  en: string;
  title: string;
  sub?: string;
}

/** 统一的章节标题：英文小签 + 手写大标 + 爱心分隔 */
export default function SectionHead({ en, title, sub }: Props) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${inView ? "is-in" : ""} mx-auto mb-14 max-w-2xl text-center sm:mb-20`}>
      <p className="text-[11px] uppercase tracking-[0.5em] text-gold-300/85" style={{ fontFamily: "var(--font-west)" }}>
        {en}
      </p>
      <h2 className="love-underline mt-4 inline-block text-4xl text-rose-100 sm:text-5xl" style={{ fontFamily: "var(--font-hand)" }}>
        {title}
      </h2>
      {sub && <p className="mt-5 text-sm leading-7 text-rose-200/75 sm:text-base">{sub}</p>}
      <div className="mt-6 flex items-center justify-center gap-3 text-rose-500/80">
        <span className="h-px w-14 bg-gradient-to-r from-transparent to-rose-500/60" />
        <HeartFill className="h-3.5 w-3.5" />
        <span className="h-px w-14 bg-gradient-to-l from-transparent to-rose-500/60" />
      </div>
    </div>
  );
}
