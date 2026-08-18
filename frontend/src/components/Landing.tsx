import React, { useRef, useState } from 'react';

interface LandingProps {
  onStart: () => void;
}

const slides = [
  {
    illustration: 'share',
    title: '대용량은 같이 사고',
    text: '즉석밥, 컵라면, 음료처럼 개별 포장된 상품을 이웃과 필요한 만큼 나눠요.',
  },
  {
    illustration: 'sealed',
    title: '미개봉 단위로 깔끔하게',
    text: '신선식품 재포장 없이 제조사 포장 단위로만 거래해요.',
  },
  {
    illustration: 'nearby',
    title: '내 주변 반경으로 탐색',
    text: '현재 위치를 기준으로 가까운 소분 글만 빠르게 확인해요.',
  },
];

function LandingIllustration({ type }: { type: string }) {
  if (type === 'sealed') {
    return (
      <svg viewBox="0 0 220 220" className="w-56 h-56" aria-hidden="true">
        <rect x="24" y="36" width="172" height="148" rx="32" fill="#ffffff" stroke="#d8dccf" strokeWidth="4" />
        <rect x="52" y="68" width="116" height="88" rx="18" fill="#c6ee6b" />
        <path d="M73 66h74l-10 24H83L73 66Z" fill="#7ec151" />
        <circle cx="88" cy="116" r="7" fill="#316b00" />
        <circle cx="132" cy="116" r="7" fill="#316b00" />
        <path d="M92 134c10 9 26 9 36 0" fill="none" stroke="#316b00" strokeWidth="6" strokeLinecap="round" />
        <circle cx="162" cy="58" r="22" fill="#316b00" />
        <path d="M151 58l8 8 15-17" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="69" y="164" width="82" height="12" rx="6" fill="#e0e4d7" />
      </svg>
    );
  }

  if (type === 'nearby') {
    return (
      <svg viewBox="0 0 220 220" className="w-56 h-56" aria-hidden="true">
        <rect x="24" y="32" width="172" height="156" rx="34" fill="#ffffff" stroke="#d8dccf" strokeWidth="4" />
        <circle cx="110" cy="110" r="66" fill="#e6eadc" />
        <circle cx="110" cy="110" r="46" fill="#c6ee6b" opacity="0.75" />
        <circle cx="110" cy="110" r="20" fill="#316b00" />
        <path d="M110 63c20 0 36 16 36 36 0 29-36 58-36 58S74 128 74 99c0-20 16-36 36-36Z" fill="#7ec151" stroke="#316b00" strokeWidth="5" />
        <circle cx="110" cy="98" r="12" fill="#ffffff" />
        <circle cx="80" cy="70" r="8" fill="#f6b95b" />
        <circle cx="157" cy="147" r="9" fill="#f6b95b" />
        <circle cx="58" cy="139" r="6" fill="#316b00" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 220" className="w-56 h-56" aria-hidden="true">
      <rect x="24" y="34" width="172" height="152" rx="34" fill="#ffffff" stroke="#d8dccf" strokeWidth="4" />
      <rect x="46" y="82" width="74" height="68" rx="16" fill="#c6ee6b" />
      <rect x="100" y="66" width="74" height="84" rx="18" fill="#7ec151" />
      <rect x="58" y="96" width="50" height="12" rx="6" fill="#ffffff" opacity="0.75" />
      <rect x="114" y="82" width="46" height="12" rx="6" fill="#ffffff" opacity="0.75" />
      <circle cx="72" cy="124" r="5" fill="#316b00" />
      <circle cx="98" cy="124" r="5" fill="#316b00" />
      <path d="M76 136c6 5 15 5 21 0" fill="none" stroke="#316b00" strokeWidth="4" strokeLinecap="round" />
      <circle cx="123" cy="118" r="5" fill="#316b00" />
      <circle cx="149" cy="118" r="5" fill="#316b00" />
      <path d="M127 130c6 5 15 5 21 0" fill="none" stroke="#316b00" strokeWidth="4" strokeLinecap="round" />
      <path d="M70 64c20-18 56-18 76 0" fill="none" stroke="#316b00" strokeWidth="6" strokeLinecap="round" />
      <path d="M154 51l9 9-9 9" fill="none" stroke="#316b00" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const scrollerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const goToSlide = (index: number) => {
    scrollerRef.current?.scrollTo({
      left: scrollerRef.current.clientWidth * index,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };
  const prevSlide = () => goToSlide(Math.max(0, activeIndex - 1));
  const nextSlide = () => goToSlide(Math.min(slides.length - 1, activeIndex + 1));

  return (
    <main className="h-dvh bg-[#f7fbed] text-[#191d15] overflow-hidden flex flex-col">
      <header className="px-6 pt-5 pb-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-[#316b00] font-extrabold text-[19px]">
          <span className="w-8 h-8 rounded-xl bg-[#316b00] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] fill-1">eco</span>
          </span>
          <span>소분소분</span>
        </div>
        <button
          type="button"
          onClick={onStart}
          className="text-[13px] font-bold text-[#316b00] px-3 py-2 rounded-full hover:bg-[#e6eadc]"
        >
          건너뛰기
        </button>
      </header>

      <section
        ref={scrollerRef}
        className="flex-1 flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
        onScroll={(event) => {
          const width = event.currentTarget.clientWidth;
          setActiveIndex(Math.round(event.currentTarget.scrollLeft / width));
        }}
      >
        {slides.map((slide) => (
          <article
            key={slide.title}
            className="min-w-full snap-center px-6 pb-6 flex flex-col justify-center text-center"
          >
            <div className="mx-auto w-64 h-64 flex items-center justify-center mb-8">
              <LandingIllustration type={slide.illustration} />
            </div>

            <h1 className="text-[30px] leading-tight font-extrabold text-[#191d15] mb-3">
              {slide.title}
            </h1>
            <p className="text-[16px] leading-7 text-[#41493a] max-w-[300px] mx-auto">
              {slide.text}
            </p>
          </article>
        ))}
      </section>

      <footer className="px-6 pb-7 pt-3 shrink-0">
        <div className="flex items-center justify-between mb-5">
          <button
            type="button"
            onClick={prevSlide}
            disabled={activeIndex === 0}
            aria-label="이전 안내"
            className="w-11 h-11 rounded-full border border-[#e0e4d7] bg-white text-[#316b00] disabled:opacity-30 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
          </button>

          <div className="flex justify-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`${index + 1}번째 안내 보기`}
                className={`h-2 rounded-full transition-all ${activeIndex === index ? 'w-7 bg-[#316b00]' : 'w-2 bg-[#c1c9b6]'}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            disabled={activeIndex === slides.length - 1}
            aria-label="다음 안내"
            className="w-11 h-11 rounded-full border border-[#e0e4d7] bg-white text-[#316b00] disabled:opacity-30 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_right</span>
          </button>
        </div>

        <div className="sr-only" aria-live="polite">
          {activeIndex + 1} / {slides.length}
        </div>

        <button
          type="button"
          onClick={onStart}
          className="w-full h-14 rounded-2xl bg-[#316b00] text-white text-[16px] font-extrabold shadow-md active:scale-[0.99]"
        >
          시작하기
        </button>
      </footer>
    </main>
  );
};
