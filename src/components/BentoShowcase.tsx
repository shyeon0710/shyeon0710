import { useEffect, useState } from 'react';
import { BarChart3, Check, Download, Play, Ticket } from 'lucide-react';
import {
  BookItem,
  CATALOG_ITEMS,
  EDITORIAL_INTERVIEW_IMG,
  RANKING_DATA,
  RankingPeriod,
} from '../data/books';
import { BookCoverImage } from './BookCoverImage';

interface BentoShowcaseProps {
  onOpenPreview: (book: BookItem) => void;
  onAddToCartFromBento: (bookId: number) => void;
  couponClaimed: boolean;
  onClaimCoupon: () => void;
  onOpenInterview: () => void;
  onShowToast: (message: string) => void;
}

export function BentoShowcase({
  onOpenPreview,
  onAddToCartFromBento,
  couponClaimed,
  onClaimCoupon,
  onOpenInterview,
  onShowToast,
}: BentoShowcaseProps) {
  const [rankingPeriod, setRankingPeriod] = useState<RankingPeriod>('realtime');
  const [readerCount, setReaderCount] = useState(1428900);

  // Featured book for Bento 1 (id: 1 -> 초역 부처의 말)
  const featuredBook = CATALOG_ITEMS.find((item) => item.id === 1) ?? CATALOG_ITEMS[1];

  useEffect(() => {
    const timer = setInterval(() => {
      setReaderCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleRankingTab = (period: RankingPeriod) => {
    setRankingPeriod(period);
    const label = period === 'realtime' ? '실시간' : period === 'daily' ? '일간' : '주간';
    onShowToast(`베스트셀러 ${label} 랭킹을 불러왔습니다.`);
  };

  const rankings = RANKING_DATA[rankingPeriod];

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 mt-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            YES24 큐레이션 &amp; 라이브
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            독서 취향과 실시간 트렌드를 반영한 맞춤 도서 쇼케이스
          </p>
        </div>
      </div>

      {/* Bento Grid Layout Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {/* Bento 1 (Large 2x2): Personalized AI Recommendation (User's Updated Spec) */}
        <div className="md:col-span-2 lg:col-span-2 md:row-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between group">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-brand text-xs font-semibold px-3 py-1 border border-slate-200 rounded-full tracking-wider">
                AI 맞춤 추천
              </span>
              <span className="text-xs text-slate-400 font-medium">
                독서 취향 분석 기반
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 group-hover:text-brand transition-colors text-balance">
              생각의 깊이를 더해줄 이번 주 AI 추천 도서
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              최근 읽으신 &apos;인문학/철학&apos; 분야와 구매 연관성을 분석하여 엄선한 작품입니다.
            </p>

            {/* Book Item Detail Card (clickable for preview) */}
            <button
              type="button"
              onClick={() => onOpenPreview(featuredBook)}
              className="w-full text-left flex items-center gap-5 p-4 bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-100 transition-colors cursor-pointer"
            >
              <BookCoverImage
                src={featuredBook.img}
                alt={featuredBook.title}
                fallbackTitle={featuredBook.title}
                className="w-20 h-28 object-cover rounded-lg shadow-md flex-shrink-0"
              />
              <div className="space-y-1 min-w-0">
                <h4 className="font-bold text-slate-900 text-base line-clamp-1">
                  {featuredBook.title}
                </h4>
                <p className="text-xs text-slate-500">
                  {featuredBook.author} | {featuredBook.publisher}
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <span className="text-slate-900 font-black text-base tabular-nums">
                    {featuredBook.price.toLocaleString()}원
                  </span>
                  {featuredBook.originalPrice && (
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      {featuredBook.originalPrice.toLocaleString()}원
                    </span>
                  )}
                </div>
              </div>
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span>#마음챙김</span>
              <span aria-hidden="true">·</span>
              <span>#베스트셀러</span>
            </div>
            <button
              type="button"
              onClick={() => onAddToCartFromBento(1)}
              className="text-xs font-bold text-white bg-brand hover:bg-brand-dark px-6 py-3 rounded-2xl shadow-sm transition-colors active:scale-[0.98] flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              구매하기
            </button>
          </div>
        </div>

        {/* Bento 2 (Wide 2x1): Realtime Ranking with Tabs */}
        <div className="md:col-span-2 lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2 whitespace-nowrap">
              <BarChart3 className="w-5 h-5 text-brand" />
              <span>실시간 베스트셀러</span>
            </h3>
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold shrink-0">
              {(
                [
                  { id: 'realtime', label: '실시간' },
                  { id: 'daily', label: '일간' },
                  { id: 'weekly', label: '주간' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleRankingTab(tab.id)}
                  className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    rankingPeriod === tab.id
                      ? 'bg-white shadow-xs text-brand'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {rankings.map((entry) => {
              const targetBook =
                CATALOG_ITEMS.find((b) => b.id === entry.bookId) ?? CATALOG_ITEMS[0];
              return (
                <button
                  key={`${rankingPeriod}-${entry.rank}`}
                  type="button"
                  onClick={() => onOpenPreview(targetBook)}
                  className="w-full text-left flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`text-base font-black w-5 text-center tabular-nums shrink-0 ${
                        entry.rank === 1 ? 'text-brand' : 'text-slate-700'
                      }`}
                    >
                      {entry.rank}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {entry.title}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {entry.authorLine}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded whitespace-nowrap shrink-0 ml-2 ${
                      entry.trendType === 'hot'
                        ? 'text-rose-600 bg-rose-50'
                        : entry.trendType === 'up'
                        ? 'text-emerald-700 bg-emerald-50'
                        : 'text-slate-500 bg-slate-100'
                    }`}
                  >
                    {entry.badgeText}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento 3 (Tall 1x2): Crema Club Unlimited Banner */}
        <div className="bg-gradient-to-b from-slate-900 to-[#1e1b4b] text-white p-6 rounded-3xl shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand/20 rounded-full blur-xl pointer-events-none" />
          <div className="relative z-10">
            <span className="text-blue-200 text-xs font-semibold tracking-wide">
              무제한 독서 멤버십
            </span>
            <h3 className="text-xl font-black mt-3 mb-2">크레마클럽</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              첫 달 0원으로 10만 권의 eBook과 오디오북을 무제한으로 경험해 보세요.
            </p>
          </div>
          <div className="relative z-10 mt-6 space-y-3">
            <div className="text-xs text-slate-300">
              <span className="text-white font-bold text-lg tabular-nums">
                {readerCount.toLocaleString()}
              </span>
              <span className="ml-1">명이 독서 중</span>
            </div>
            <a
              href="#pricing-section"
              className="block text-center bg-white text-slate-900 font-bold text-xs py-3 rounded-xl shadow-md hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              무료 체험 시작하기
            </a>
          </div>
        </div>

        {/* Bento 4 (1x1): Coupon & Benefit Collector */}
        <div className="bg-amber-50/80 p-6 rounded-3xl border border-amber-200/70 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <Ticket className="w-6 h-6 text-amber-600" />
              <span className="text-xs font-semibold text-amber-900">오늘의 혜택</span>
            </div>
            <h4 className="font-bold text-slate-900 text-base">3,000원 도서 쿠폰</h4>
            <p className="text-xs text-slate-600 mt-1">
              발급 시 장바구니 결제 금액에서 즉시 할인 적용
            </p>
          </div>
          <button
            type="button"
            onClick={onClaimCoupon}
            disabled={couponClaimed}
            className={`mt-5 w-full font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap ${
              couponClaimed
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-amber-500 hover:bg-amber-600 text-white active:scale-[0.98]'
            }`}
          >
            {couponClaimed ? (
              <>
                <Check className="w-4 h-4" />
                <span>발급 완료 (장바구니 적용)</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>쿠폰 받기</span>
              </>
            )}
          </button>
        </div>

        {/* Bento 5 (1x1): Channel YES Magazine & Interview */}
        <button
          type="button"
          onClick={onOpenInterview}
          className="text-left bg-slate-900 text-white p-6 rounded-3xl shadow-sm flex flex-col justify-between relative overflow-hidden group cursor-pointer min-h-[190px]"
        >
          <BookCoverImage
            src={EDITORIAL_INTERVIEW_IMG}
            alt="채널예스 작가 인터뷰"
            fallbackTitle="채널예스 작가 인터뷰"
            className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25 pointer-events-none" />
          <div className="relative z-10">
            <span className="text-[11px] font-bold text-blue-200">채널예스</span>
            <h4 className="font-bold text-white text-base mt-1.5 line-clamp-2 leading-snug">
              &ldquo;글쓰기는 스스로를 구원하는 여정&rdquo;
            </h4>
          </div>
          <div className="relative z-10 flex justify-between items-center pt-4 w-full">
            <span className="text-xs text-slate-200">작가 인터뷰 전문 읽기</span>
            <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-brand transition-colors shrink-0">
              <Play className="w-3.5 h-3.5 fill-current" />
            </span>
          </div>
        </button>
      </div>
    </section>
  );
}
