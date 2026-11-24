import { useState } from 'react';
import { Check } from 'lucide-react';
import { PRICING_TIERS, PricingTier } from '../data/books';

interface PricingSectionProps {
  selectedPlanId: PricingTier['id'] | null;
  onSelectPlan: (tier: PricingTier, isAnnual: boolean) => void;
}

export function PricingSection({ selectedPlanId, onSelectPlan }: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing-section" className="max-w-7xl mx-auto px-4 lg:px-8 mt-16">
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-[#0f172a] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs font-semibold tracking-wider text-blue-300">
            CREMA CLUB MEMBERSHIP
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight text-balance">
            마음껏 읽는 즐거움, 크레마클럽 요금제
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            언제 어디서나 무제한으로 만나는 10만 권의 디지털 도서 라이브러리
          </p>

          {/* Monthly vs Annual Billing Toggle */}
          <div className="pt-5 flex justify-center items-center gap-3">
            <span
              className={`text-sm transition-colors ${
                !isAnnual ? 'font-bold text-white' : 'font-medium text-slate-400'
              }`}
            >
              월간 결제
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isAnnual}
              aria-label="연간 결제 할인 전환"
              onClick={() => setIsAnnual((prev) => !prev)}
              className="w-14 h-8 bg-brand rounded-full p-1 transition-colors relative focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span
                className={`block w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span
              className={`text-sm flex items-center gap-2 transition-colors ${
                isAnnual ? 'font-bold text-white' : 'font-medium text-slate-400'
              }`}
            >
              <span>연간 결제</span>
              <span className="text-[11px] font-bold text-rose-400">20% 할인</span>
            </span>
          </div>
        </div>

        {/* 3 Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {PRICING_TIERS.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            const isSelected = selectedPlanId === tier.id;

            return (
              <div
                key={tier.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-colors relative border ${
                  tier.featured
                    ? 'bg-gradient-to-b from-brand/20 to-indigo-950/60 border-brand/70 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/25'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                    {tier.featured && (
                      <span className="text-[11px] font-bold text-blue-300 whitespace-nowrap">
                        추천 플랜
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{tier.subtitle}</p>

                  <div className="my-6 flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-white tabular-nums">
                      {price.toLocaleString()}
                    </span>
                    <span className="text-slate-300 text-xs font-medium">
                      원 / 월 {isAnnual ? '(연간 약정)' : ''}
                    </span>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-200 border-t border-white/10 pt-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPlan(tier, isAnnual)}
                  className={`mt-8 w-full font-bold py-3 rounded-xl text-xs transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : tier.featured
                      ? 'bg-brand hover:bg-brand-dark text-white shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  }`}
                >
                  {isSelected ? '선택 완료' : tier.ctaLabel}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
