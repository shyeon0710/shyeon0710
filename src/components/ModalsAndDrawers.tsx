import {
  CheckCircle2,
  Clock,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { BookItem, EDITORIAL_INTERVIEW_IMG } from '../data/books';
import { BookCoverImage } from './BookCoverImage';

export interface CartEntry {
  book: BookItem;
  quantity: number;
}

export interface ToastItem {
  id: number;
  message: string;
}

interface PreviewModalProps {
  book: BookItem | null;
  onClose: () => void;
  onAddToCart: (book: BookItem) => void;
}

export function BookPreviewModal({ book, onClose, onAddToCart }: PreviewModalProps) {
  if (!book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${book.title} 상세 미리보기`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="미리보기 닫기"
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col sm:flex-row gap-6">
          <BookCoverImage
            src={book.img}
            alt={book.title}
            fallbackTitle={book.title}
            className="w-36 h-52 object-cover rounded-xl shadow-lg mx-auto sm:mx-0 flex-shrink-0"
          />
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-brand">{book.category}</span>
              <span aria-hidden="true">·</span>
              <span>{book.formatLabel}</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 leading-snug">
              {book.title}
            </h3>
            <p className="text-xs text-slate-500">
              {book.author} · {book.publisher} · 평점 {book.rating} ({book.reviewCount.toLocaleString()}명)
            </p>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <p className="text-xs font-bold text-slate-800">책 소개 및 본문 발췌</p>
              <p className="text-xs text-slate-600 leading-relaxed">{book.desc}</p>
              <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                &ldquo;{book.excerpt}&rdquo;
              </p>
            </div>

            <div className="pt-3 flex items-center justify-between gap-4">
              <div>
                <span className="text-lg font-black text-slate-900 tabular-nums">
                  {book.price.toLocaleString()}원
                </span>
                {book.originalPrice && (
                  <span className="text-xs text-slate-400 line-through ml-2 tabular-nums">
                    {book.originalPrice.toLocaleString()}원
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  onAddToCart(book);
                  onClose();
                }}
                className="bg-brand hover:bg-brand-dark text-white font-bold px-6 py-3 rounded-xl text-xs shadow-sm transition-colors whitespace-nowrap"
              >
                장바구니에 담기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartEntry[];
  onUpdateQty: (bookId: number, delta: number) => void;
  onRemoveItem: (bookId: number) => void;
  couponClaimed: boolean;
  orderNumber: string | null;
  onCheckout: () => void;
}

export function CartDrawer({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  couponClaimed,
  orderNumber,
  onCheckout,
}: CartDrawerProps) {
  if (!open) return null;

  const subtotal = items.reduce((sum, entry) => sum + entry.book.price * entry.quantity, 0);
  const couponDiscount = couponClaimed && subtotal > 0 ? Math.min(3000, subtotal) : 0;
  const finalTotal = Math.max(0, subtotal - couponDiscount);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="장바구니"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand" />
              <span>장바구니 목록</span>
            </h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="장바구니 닫기"
              className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {orderNumber ? (
            <div className="my-auto py-10 px-4 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <p className="text-xs font-semibold text-emerald-700">
                주문이 정상적으로 접수되었습니다
              </p>
              <h4 className="text-xl font-black text-slate-900 tabular-nums">
                주문번호 #{orderNumber}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                출고 준비가 시작되면 알림으로 안내해 드립니다. 오늘도 즐거운 독서 되세요.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors"
              >
                쇼핑 계속하기
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="my-auto text-center py-12 space-y-2">
              <p className="text-sm font-semibold text-slate-500">
                장바구니에 담긴 도서가 없습니다.
              </p>
              <p className="text-xs text-slate-400">
                추천 도서나 베스트셀러에서 원하는 책을 담아 보세요.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-3 overflow-y-auto pr-1 flex-1">
              {items.map(({ book, quantity }) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <BookCoverImage
                      src={book.img}
                      alt={book.title}
                      fallbackTitle={book.title}
                      className="w-12 h-16 object-cover rounded-lg shadow-xs shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {book.title}
                      </p>
                      <p className="text-xs font-bold text-brand mt-0.5 tabular-nums">
                        {(book.price * quantity).toLocaleString()}원
                      </p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(book.id, -1)}
                          aria-label="수량 감소"
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-5 text-center tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(book.id, 1)}
                          aria-label="수량 증가"
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(book.id)}
                    aria-label={`${book.title} 삭제`}
                    className="text-slate-400 hover:text-rose-500 p-1.5 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {!orderNumber && (
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="flex justify-between text-xs text-slate-500">
              <span>상품 합계</span>
              <span className="tabular-nums">{subtotal.toLocaleString()}원</span>
            </div>
            {couponClaimed && subtotal > 0 && (
              <div className="flex justify-between text-xs text-emerald-700 font-semibold">
                <span>오늘의 도서 쿠폰 할인</span>
                <span className="tabular-nums">-{couponDiscount.toLocaleString()}원</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold pt-1">
              <span>총 결제금액</span>
              <span className="text-brand font-black text-base tabular-nums">
                {finalTotal.toLocaleString()}원
              </span>
            </div>
            <button
              type="button"
              onClick={onCheckout}
              className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3.5 rounded-2xl shadow-sm text-sm transition-colors mt-1"
            >
              주문하러 가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface RecentDrawerProps {
  open: boolean;
  onClose: () => void;
  books: BookItem[];
  onOpenPreview: (book: BookItem) => void;
}

export function RecentDrawer({ open, onClose, books, onOpenPreview }: RecentDrawerProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="최근 본 상품"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm h-full p-6 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand" />
            <span>최근 본 상품</span>
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="최근 본 상품 닫기"
            className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4 space-y-3 overflow-y-auto flex-1">
          {books.map((book) => (
            <button
              key={book.id}
              type="button"
              onClick={() => {
                onClose();
                onOpenPreview(book);
              }}
              className="w-full text-left flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <BookCoverImage
                src={book.img}
                alt={book.title}
                fallbackTitle={book.title}
                className="w-12 h-16 object-cover rounded-lg shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{book.title}</p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {book.author} · {book.publisher}
                </p>
                <p className="text-xs font-bold text-brand mt-1 tabular-nums">
                  {book.price.toLocaleString()}원
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface InterviewModalProps {
  open: boolean;
  onClose: () => void;
  onOpenFeaturedBook: () => void;
}

export function InterviewModal({ open, onClose, onOpenFeaturedBook }: InterviewModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="채널예스 작가 인터뷰"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 bg-slate-900">
          <BookCoverImage
            src={EDITORIAL_INTERVIEW_IMG}
            alt="채널예스 작가 인터뷰"
            fallbackTitle="채널예스 작가 인터뷰"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="인터뷰 닫기"
            className="absolute top-4 right-4 text-white/90 hover:text-white w-8 h-8 rounded-full bg-black/40 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <p className="text-xs font-semibold text-blue-200">채널예스 인터뷰</p>
            <h3 className="text-xl font-black mt-1">
              &ldquo;글쓰기는 스스로를 구원하는 여정&rdquo;
            </h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            매일 새벽, 가장 고요한 시간에 책상 앞 스탠드를 켜며 문장을 고르는 작가 윤서연.
            이번 인터뷰에서는 신작 『작가의 서재: 사유의 기록』을 집필하며 마주한 질문과
            오래 남는 문장의 비밀을 들려줍니다.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenFeaturedBook();
              }}
              className="px-5 py-2.5 text-xs font-bold bg-brand hover:bg-brand-dark text-white rounded-xl"
            >
              관련 도서 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MemberModalProps {
  open: boolean;
  onClose: () => void;
  couponClaimed: boolean;
  selectedPlanName: string | null;
}

export function MemberModal({
  open,
  onClose,
  couponClaimed,
  selectedPlanName,
}: MemberModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="마이페이지 및 멤버십 현황"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">YES24 로얄 멤버십</h3>
              <p className="text-xs text-slate-500">내 독서 혜택 및 쿠폰 현황</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="마이페이지 닫기"
            className="text-slate-400 hover:text-slate-800 p-1.5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between p-3.5 bg-slate-50 rounded-2xl">
            <span className="text-slate-600 font-medium">보유 도서 쿠폰</span>
            <span className="font-bold text-slate-900 tabular-nums">
              {couponClaimed ? '3,000원 할인권 (1매)' : '미발급 (오늘의 혜택에서 발급)'}
            </span>
          </div>
          <div className="flex justify-between p-3.5 bg-slate-50 rounded-2xl">
            <span className="text-slate-600 font-medium">크레마클럽 구독</span>
            <span className="font-bold text-brand">
              {selectedPlanName ?? '첫 달 무료 체험 가능'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export function ToastContainer({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-toast bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-2.5 pointer-events-auto"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
