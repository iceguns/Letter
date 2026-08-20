import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface Props {
  lines: ReactNode[];
  step?: number;
  className?: string;
  lineClassName?: string;
  as?: "p" | "div" | "h1" | "h2" | "h3" | "blockquote";
}

/** 逐行遮罩揭幕：每行自下而上滑出，如被一页页翻开 */
export default function RevealLines({ lines, step = 140, className = "", lineClassName = "", as = "p" }: Props) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const Tag = as as "p";
  return (
    <div ref={ref} className={`reveal-x ${inView ? "is-in" : ""} ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <Tag
            className={`mask-line ${lineClassName}`}
            style={{ transitionDelay: `${i * step}ms` }}
          >
            {line}
          </Tag>
        </span>
      ))}
    </div>
  );
}
