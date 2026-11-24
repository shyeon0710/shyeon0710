import { useEffect, useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { BookItem, HERO_BOOKS } from '../data/books';
import { BookCoverImage } from './BookCoverImage';

interface HeroCarouselProps {
  onOpenPreview: (book: BookItem) => void;
  onAddToCart: (book: BookItem) => void;
}

export function HeroCarousel({ onOpenPreview, onAddToCart }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_BOOKS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeBook = HERO_BOOKS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_BOOKS.length) % HERO_BOOKS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_BOOKS.length);
  };

  return (
    <section
      className="max-w-7xl mx-auto px-4 lg:px-8 mt-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-[#003E99] rounded-3xl overflow-hidden shadow-xl text-white p-6 sm:p-10 lg:p-14 min-h-[430px] flex items-center">
        {/* Subtle ambient depth */}
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-brand/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left Editorial Content */}
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-semibold tracking-wider text-blue-200">
              이달의 스포트라이트 도서 · {activeBook.formatLabel}
            </p>

            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.18] text-white text-balance">
              {activeBook.title}
            </h1>

            <p className="text-slate-300 font-medium text-sm sm:text-base">
              {activeBook.author} · {activeBook.publisher}
            </p>

            <p className="text-slate-200/90 text-sm sm:text-base leading-relaxed max-w-xl">
              {activeBook.quote}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenPreview(activeBook)}
                className="bg-brand hover:bg-brand-dark text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition-colors active:scale-[0.98] inline-flex items-center gap-2 text-sm whitespace-nowrap shrink-0"
              >
                <BookOpen className="w-4 h-4" />
                <span>지금 미리보기</span>
              </button>
              <button
                type="button"
                onClick={() => onAddToCart(activeBook)}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-2xl border border-white/20 transition-colors active:scale-[0.98] inline-flex items-center gap-2 text-sm whitespace-nowrap shrink-0"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>장바구니 담기</span>
              </button>
            </div>
          </div>

          {/* Right 3D Interactive Book Showcase */}
          <div className="lg:col-span-5 flex justify-center items-center py-2">
            <button
              type="button"
              onClick={() => onOpenPreview(activeBook)}
              aria-label={`${activeBook.title} 미리보기 열기`}
              className="book-container text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-xl"
            >
              <div className="book-cover relative w-44 sm:w-56 h-60 sm:h-80 rounded-r-xl overflow-hidden bg-slate-800">
                <BookCoverImage
                  src={activeBook.img}
                  alt={activeBook.title}
                  fallbackTitle={activeBook.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/45 via-white/20 to-transparent pointer-events-none" />
              </div>
            </button>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-5 left-6 sm:left-14 right-6 sm:right-14 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            {HERO_BOOKS.map((book, idx) => (
              <button
                key={book.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`슬라이드 ${idx + 1}: ${book.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-8 bg-brand'
                    : 'w-2 bg-white/35 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="이전 추천 도서"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="다음 추천 도서"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
