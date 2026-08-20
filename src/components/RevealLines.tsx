import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface Props {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  step?: number;
}

/** 逐行遮罩揭幕：每一行从下方升起 */
export default function RevealLines({ lines, className = "", lineClassName = "", step = 130 }: Props) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`${inView ? "is-in" : ""} ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden py-[0.08em]">
          <span className="mask-line" style={{ transitionDelay: `${i * step}ms` }}>
            <span className={lineClassName}>{l}</span>
          </span>
        </span>
      ))}
    </div>
  );
}
