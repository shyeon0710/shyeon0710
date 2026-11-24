import { useMemo, useRef, useState } from 'react';
import { BentoShowcase } from './components/BentoShowcase';
import { CatalogStrip } from './components/CatalogStrip';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import {
  BookPreviewModal,
  CartDrawer,
  CartEntry,
  InterviewModal,
  MemberModal,
  RecentDrawer,
  ToastContainer,
  ToastItem,
} from './components/ModalsAndDrawers';
import { PricingSection } from './components/PricingSection';
import { BookCategory, BookItem, CATALOG_ITEMS, PricingTier } from './data/books';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<BookCategory>('전체');
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [recentOpen, setRecentOpen] = useState(false);
  const [interviewOpen, setInterviewOpen] = useState(false);
  const [memberOpen, setMemberOpen] = useState(false);
  const [previewBook, setPreviewBook] = useState<BookItem | null>(null);
  const [recentBooks, setRecentBooks] = useState<BookItem[]>(() => CATALOG_ITEMS.slice(0, 3));
  const [couponClaimed, setCouponClaimed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    tier: PricingTier;
    isAnnual: boolean;
  } | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastIdRef = useRef(0);

  const showToast = (message: string) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3000);
  };

  const filteredCatalog = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CATALOG_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === '전체' || item.category === activeCategory;
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.publisher.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const matchingSearchBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return CATALOG_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.publisher.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleOpenPreview = (book: BookItem) => {
    setPreviewBook(book);
    setRecentBooks((prev) => {
      const without = prev.filter((b) => b.id !== book.id);
      return [book, ...without].slice(0, 6);
    });
  };

  const handleSelectSearchBook = (bookId: number) => {
    const found = CATALOG_ITEMS.find((b) => b.id === bookId);
    if (found) {
      handleOpenPreview(found);
    }
  };

  const handleAddToCart = (book: BookItem) => {
    setOrderNumber(null);
    setCart((prev) => {
      const existing = prev.find((entry) => entry.book.id === book.id);
      if (existing) {
        return prev.map((entry) =>
          entry.book.id === book.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
    showToast(`'${book.title}' 도서가 장바구니에 담겼습니다.`);
  };

  const addToCartFromBento = (bookId: number) => {
    const book = CATALOG_ITEMS.find((b) => b.id === bookId);
    if (book) {
      handleAddToCart(book);
    }
  };

  const handleUpdateQty = (bookId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((entry) =>
          entry.book.id === bookId
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const handleRemoveCartItem = (bookId: number) => {
    setCart((prev) => prev.filter((entry) => entry.book.id !== bookId));
  };

  const handleClaimCoupon = () => {
    if (couponClaimed) return;
    setCouponClaimed(true);
    showToast('3,000원 도서 쿠폰이 발급되어 장바구니에 적용되었습니다.');
  };

  const handleSelectPlan = (tier: PricingTier, isAnnual: boolean) => {
    setSelectedPlan({ tier, isAnnual });
    const cycleLabel = isAnnual ? '연간' : '월간';
    showToast(`'${tier.name} (${cycleLabel})' 플랜이 선택되었습니다.`);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast('장바구니가 비어 있습니다.');
      return;
    }
    const generatedOrder = `Y24-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedOrder);
    setCart([]);
    showToast(`주문이 완료되었습니다 (주문번호 #${generatedOrder}).`);
  };

  const totalCartCount = cart.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <div id="top" className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectSearchBook={handleSelectSearchBook}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          const catalogEl = document.getElementById('catalog-section');
          if (cat !== '전체' && catalogEl) {
            catalogEl.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        recentCount={recentBooks.length}
        onOpenRecent={() => setRecentOpen(true)}
        onOpenMember={() => setMemberOpen(true)}
        matchingBooks={matchingSearchBooks}
      />

      <main className="flex-1">
        <HeroCarousel onOpenPreview={handleOpenPreview} onAddToCart={handleAddToCart} />

        <BentoShowcase
          onOpenPreview={handleOpenPreview}
          onAddToCartFromBento={addToCartFromBento}
          couponClaimed={couponClaimed}
          onClaimCoupon={handleClaimCoupon}
          onOpenInterview={() => setInterviewOpen(true)}
          onShowToast={showToast}
        />

        <CatalogStrip
          items={filteredCatalog}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onResetFilters={() => {
            setActiveCategory('전체');
            setSearchQuery('');
          }}
          onOpenPreview={handleOpenPreview}
          onAddToCart={handleAddToCart}
        />

        <PricingSection
          selectedPlanId={selectedPlan?.tier.id ?? null}
          onSelectPlan={handleSelectPlan}
        />
      </main>

      <footer className="max-w-7xl mx-auto w-full px-4 lg:px-8 mt-16 py-8 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 YES24 Creative Library. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setMemberOpen(true)}
            className="hover:text-slate-900 transition-colors"
          >
            멤버십 안내
          </button>
          <a href="#pricing-section" className="hover:text-slate-900 transition-colors">
            크레마클럽
          </a>
          <button
            type="button"
            onClick={() => setRecentOpen(true)}
            className="hover:text-slate-900 transition-colors"
          >
            최근 본 상품
          </button>
        </div>
      </footer>

      <BookPreviewModal
        book={previewBook}
        onClose={() => setPreviewBook(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        couponClaimed={couponClaimed}
        orderNumber={orderNumber}
        onCheckout={handleCheckout}
      />

      <RecentDrawer
        open={recentOpen}
        onClose={() => setRecentOpen(false)}
        books={recentBooks}
        onOpenPreview={handleOpenPreview}
      />

      <InterviewModal
        open={interviewOpen}
        onClose={() => setInterviewOpen(false)}
        onOpenFeaturedBook={() => {
          const specialBook = CATALOG_ITEMS.find((b) => b.id === 6) ?? CATALOG_ITEMS[0];
          handleOpenPreview(specialBook);
        }}
      />

      <MemberModal
        open={memberOpen}
        onClose={() => setMemberOpen(false)}
        couponClaimed={couponClaimed}
        selectedPlanName={
          selectedPlan
            ? `${selectedPlan.tier.name} (${selectedPlan.isAnnual ? '연간' : '월간'})`
            : null
        }
      />

      <ToastContainer toasts={toasts} />
    </div>
  );
}
