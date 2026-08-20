type P = { className?: string };

/** 实心爱心 */
export const HeartFill = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 21.2C6.8 17.2 2.9 13.7 2.9 9.7 2.9 6.9 5 4.8 7.7 4.8c1.7 0 3.3.9 4.3 2.3 1-1.4 2.6-2.3 4.3-2.3 2.7 0 4.8 2.1 4.8 4.9 0 4-3.9 7.5-9.1 11.5Z"
    />
  </svg>
);

/** 手绘线条爱心 */
export const HeartLine = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 20.4C7.2 16.7 3.6 13.4 3.6 9.8 3.6 7.2 5.6 5.3 8 5.3c1.6 0 3.1.8 4 2.2.9-1.4 2.4-2.2 4-2.2 2.4 0 4.4 1.9 4.4 4.5 0 3.6-3.6 6.9-8.4 10.6Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** 信封 */
export const Envelope = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="3" y="5.5" width="18" height="13" rx="1.8" stroke="currentColor" strokeWidth="1.6" />
    <path d="m3.6 6.5 7.5 6a1.5 1.5 0 0 0 1.8 0l7.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="m3.5 18 5.6-4.9M20.5 18l-5.6-4.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/** 四角星光 */
export const Spark = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2.6c.7 4.6 2.4 6.9 7.4 7.9-5 1-6.7 3.3-7.4 7.9-.7-4.6-2.4-6.9-7.4-7.9 5-1 6.7-3.3 7.4-7.9Z"
    />
  </svg>
);

/** 弯月 */
export const Moon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M19.5 14.2A8.1 8.1 0 0 1 9.8 4.5a8.1 8.1 0 1 0 9.7 9.7Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** 五角星 */
export const Star = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="m12 3.6 2.5 5.2 5.7.7-4.2 4 1.1 5.6L12 16.4l-5.1 2.7L8 13.5l-4.2-4 5.7-.7L12 3.6Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/**  infinity 永远 */
export const InfinityLoop = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M6.2 12c0-1.9 1.4-3.2 3-3.2 2.7 0 4.4 6.4 7.2 6.4 1.7 0 3-1.4 3-3.2s-1.3-3.2-3-3.2c-2.8 0-4.5 6.4-7.2 6.4-1.6 0-3-1.3-3-3.2Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

/** 双手捧心 */
export const HandsHeart = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 10.8c-1.5-2.6-5.4-2.4-6 .4-.5 2.4 2.6 4.6 6 7 3.4-2.4 6.5-4.6 6-7-.6-2.8-4.5-3-6-.4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M2.8 15.5c1.4 1.3 2.4 3 2.8 5M21.2 15.5c-1.4 1.3-2.4 3-2.8 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/** 戒指 */
export const Ring = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="14" r="6.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="m12 3.2 2.3 2.6L12 8.4 9.7 5.8 12 3.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

/** 音符 */
export const Note = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M9.5 18.2V5.8l9-1.9v12.3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6.9" cy="18.2" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="15.9" cy="16.2" r="2.6" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

/** 向下箭头 */
export const ArrowDown = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 4.5v15m0 0-5.5-5.5M12 19.5l5.5-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** 心电线 */
export const EcgLine = ({ className }: P) => (
  <svg viewBox="0 0 360 60" fill="none" className={className} aria-hidden="true">
    <path
      d="M0 30h70l14-16 16 32 14-24 10 8h60l12-20 18 38 12-26 8 8h126"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ecg-path"
    />
  </svg>
);
