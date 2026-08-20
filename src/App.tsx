import Ambient from "./components/Ambient";
import MusicToggle from "./components/MusicToggle";
import TitleSection from "./components/TitleSection";
import LetterSection from "./components/LetterSection";
import ImageInterlude from "./components/ImageInterlude";
import CounterSection from "./components/CounterSection";
import WishesSection from "./components/WishesSection";
import SealSection from "./components/SealSection";
import ClosingSection from "./components/ClosingSection";

const IMG_DESK =
  "https://image.qwenlm.ai/generated-images/85cd4e0a-3c95-4043-b0eb-3eea8a0e5e04/_result.png";
const IMG_RAIN =
  "https://image.qwenlm.ai/generated-images/06a8ba7e-ee74-4081-9522-a564122c9e29/_result.png";

/** 《与你书》—— 一封电影感的长信 */
export default function App() {
  return (
    <main className="relative">
      <Ambient />

      {/* 顶栏 */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 sm:px-8">
        <p className="text-xs tracking-[0.4em] text-fog/90">
          <span className="text-brass-300">《</span>与你书
          <span className="text-brass-300">》</span>
          <span className="ml-3 hidden text-[10px] text-dim sm:inline">纸短情长</span>
        </p>
        <MusicToggle />
      </div>

      <div className="relative z-10">
        <TitleSection />

        <LetterSection />

        <ImageInterlude
          src={IMG_DESK}
          alt="灯下写到一半的信"
          caption="灯下 · 信写到一半"
          quote="「人间所有的好，都不及你看我时，眼里那一点光。」"
          quoteSub="—— 信里没敢写的那一句"
        />

        <CounterSection />

        <WishesSection />

        <ImageInterlude
          src={IMG_RAIN}
          alt="雨夜共伞的两个人"
          caption="雨夜 · 一把伞的距离"
          quote="「众生皆草木，唯你是青山。」"
          quoteSub="—— 此后所有雨夜，都有我递伞"
        />

        <SealSection />

        <ClosingSection />
      </div>
    </main>
  );
}
