import { useEffect, useRef, useState } from 'react';
import { Clock, Search, ShoppingBag, User, X } from 'lucide-react';
import { BookCategory, BookItem, TRENDING_KEYWORDS } from '../data/books';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectSearchBook: (bookId: number) => void;
  activeCategory: BookCategory;
  onSelectCategory: (cat: BookCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  recentCount: number;
  onOpenRecent: () => void;
  onOpenMember: () => void;
  matchingBooks: BookItem[];
}

const CATEGORIES: BookCategory[] = [
  '전체',
  '도서',
  'eBook',
  '음반/문구',
  '티켓',
  '단독/이벤트',
];

export function Header({
  searchQuery,
  onSearchChange,
  onSelectSearchBook,
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  recentCount,
  onOpenRecent,
  onOpenMember,
  matchingBooks,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleCremaJump = () => {
    const el = document.getElementById('pricing-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      {/* Slim Dismissible Utility Strip (Desktop only to preserve mobile <=15% sticky height cap) */}
      {!bannerDismissed && (
        <div className="hidden md:block bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-white whitespace-nowrap">
                YES24 Royal Membership
              </span>
              <span className="text-slate-500" aria-hidden="true">
                ·
              </span>
              <span className="text-slate-300 truncate">
                크레마클럽 첫 달 무료 체험 및 3,000원 도서 쿠폰 혜택
              </span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={onOpenMember}
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                로그인 / 마이페이지
              </button>
              <button
                type="button"
                onClick={onOpenRecent}
                className="hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>최근 본 상품</span>
                <span className="text-blue-400 font-semibold tabular-nums">{recentCount}</span>
              </button>
              <button
                type="button"
                onClick={() => setBannerDismissed(true)}
                aria-label="상단 안내 닫기"
                className="text-slate-400 hover:text-white p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main 3-Zone Header Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4 sm:gap-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('전체');
            onSearchChange('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl font-black tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center"
        >
          <span className="text-brand">YES</span>
          <span>24</span>
        </a>

        {/* Search Input with Live Dropdown */}
        <div ref={searchContainerRef} className="relative flex-1 max-w-xl">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setDropdownOpen(true)}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setDropdownOpen(true);
              }}
              placeholder="도서, 작가, 출판사, 키워드 검색"
              aria-label="도서 검색"
              className="w-full bg-slate-100 hover:bg-white focus:bg-white text-sm text-slate-900 rounded-xl py-2.5 pl-4 pr-11 border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/15 transition-colors outline-none placeholder:text-slate-400"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="검색어 지우기"
                className="absolute right-10 text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-label="검색 실행"
              className="absolute right-1.5 bg-brand hover:bg-brand-dark text-white w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50">
              {searchQuery.trim().length > 0 ? (
                <div>
                  <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-500">
                      검색 결과 ({matchingBooks.length}건)
                    </span>
                  </div>
                  {matchingBooks.length > 0 ? (
                    <div className="space-y-1.5">
                      {matchingBooks.slice(0, 5).map((book) => (
                        <button
                          key={book.id}
                          type="button"
                          onClick={() => {
                            onSelectSearchBook(book.id);
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left hover:bg-slate-50 px-3 py-2 rounded-xl flex items-center justify-between gap-3 transition-colors"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">
                              {book.title}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {book.author} · {book.publisher}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-slate-900 tabular-nums shrink-0">
                            {book.price.toLocaleString()}원
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 py-3 text-center">
                      일치하는 도서가 없습니다. 다른 키워드를 입력해 보세요.
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-500">
                      실시간 인기 검색어
                    </span>
                    <span className="text-[11px] text-slate-400 tabular-nums">13:00 기준</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm">
                    {TRENDING_KEYWORDS.map((item) => (
                      <button
                        key={item.rank}
                        type="button"
                        onClick={() => {
                          onSearchChange(item.keyword);
                          onSelectSearchBook(item.bookId);
                          setDropdownOpen(false);
                        }}
                        className="hover:bg-slate-50 px-2.5 py-2 rounded-lg flex items-center justify-between text-left transition-colors"
                      >
                        <span className="text-slate-800 font-medium truncate">
                          <span className="text-brand font-bold mr-2 tabular-nums">
                            {item.rank}.
                          </span>
                          {item.keyword}
                        </span>
                        <span className="text-xs text-slate-500 font-medium tabular-nums shrink-0 ml-2">
                          {item.change}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenMember}
            aria-label="마이페이지"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            <User className="w-4 h-4" />
            <span>마이페이지</span>
          </button>
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-brand hover:bg-brand-dark text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">장바구니</span>
            <span className="bg-white/20 text-white px-1.5 py-0.5 rounded-md tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Category Filter Rail (Desktop & Tablet, clean typographic links) */}
      <nav
        aria-label="주요 카테고리"
        className="hidden sm:block border-t border-slate-100 px-4 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-7 overflow-x-auto py-2.5 text-sm font-medium text-slate-600 no-scrollbar">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors ${
                  isActive
                    ? 'text-brand border-brand font-semibold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                {category === '전체' ? '전체 카테고리' : category}
              </button>
            );
          })}
          <button
            type="button"
            onClick={handleCremaJump}
            className="whitespace-nowrap shrink-0 pb-0.5 border-b-2 border-transparent text-slate-700 hover:text-brand transition-colors"
          >
            크레마클럽
          </button>
        </div>
      </nav>
    </header>
  );
}
