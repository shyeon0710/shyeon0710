import { BookOpen, ShoppingCart } from 'lucide-react';
import { BookCategory, BookItem } from '../data/books';
import { BookCoverImage } from './BookCoverImage';

interface CatalogStripProps {
  items: BookItem[];
  activeCategory: BookCategory;
  searchQuery: string;
  onResetFilters: () => void;
  onOpenPreview: (book: BookItem) => void;
  onAddToCart: (book: BookItem) => void;
}

export function CatalogStrip({
  items,
  activeCategory,
  searchQuery,
  onResetFilters,
  onOpenPreview,
  onAddToCart,
}: CatalogStripProps) {
  const isFiltered = activeCategory !== '전체' || searchQuery.trim().length > 0;

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 lg:px-8 mt-14">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {searchQuery.trim()
              ? `'${searchQuery.trim()}' 검색 결과`
              : activeCategory === '전체'
              ? '이달의 큐레이션 컬렉션'
              : `${activeCategory} 큐레이션`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            총 <span className="font-semibold text-slate-800 tabular-nums">{items.length}</span>권의 큐레이션 상품
          </p>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-semibold text-brand hover:text-brand-dark px-3.5 py-2 rounded-xl border border-slate-200 bg-white transition-colors whitespace-nowrap"
          >
            전체 보기
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <p className="text-sm font-semibold text-slate-700">
            조건에 맞는 도서나 상품이 없습니다.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            검색어를 변경하거나 전체 카테고리로 돌아가 확인해 보세요.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 bg-brand hover:bg-brand-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            전체 도서 보기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((book) => (
            <article
              key={book.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              <div>
                <button
                  type="button"
                  onClick={() => onOpenPreview(book)}
                  className="w-full aspect-[4/3] rounded-2xl bg-slate-100 overflow-hidden mb-4 block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <BookCoverImage
                    src={book.img}
                    alt={book.title}
                    fallbackTitle={book.title}
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                  />
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                  <span className="font-semibold text-brand">{book.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{book.formatLabel}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {book.author} · {book.publisher}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-black text-slate-900 tabular-nums">
                    {book.price.toLocaleString()}원
                  </span>
                  {book.originalPrice && (
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      {book.originalPrice.toLocaleString()}원
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenPreview(book)}
                    aria-label={`${book.title} 미리보기`}
                    className="p-2 text-slate-600 hover:text-brand hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onAddToCart(book)}
                    className="bg-slate-900 hover:bg-brand text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>담기</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
