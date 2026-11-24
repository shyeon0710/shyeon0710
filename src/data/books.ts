export type BookCategory = '전체' | '도서' | 'eBook' | '음반/문구' | '티켓' | '단독/이벤트';

export interface BookItem {
  id: number;
  title: string;
  author: string;
  publisher: string;
  category: Exclude<BookCategory, '전체'>;
  quote: string;
  desc: string;
  excerpt: string;
  price: number;
  originalPrice?: number;
  rating: string;
  reviewCount: number;
  tags: string[];
  img: string;
  formatLabel: string;
}

export interface RankingEntry {
  rank: number;
  bookId: number;
  title: string;
  authorLine: string;
  badgeText: string;
  trendType: 'hot' | 'up' | 'steady';
}

export type RankingPeriod = 'realtime' | 'daily' | 'weekly';

export const HERO_BOOKS: BookItem[] = [
  {
    id: 0,
    title: '소년이 온다 (노벨문학상 에디션)',
    author: '한강 저',
    publisher: '창비',
    category: '도서',
    quote:
      '"우리가 타인의 아픔에 귀 기울일 때, 상처는 눈부신 연대의 빛이 된다." 노벨문학상 수상 작가의 대표작 특별 에디션.',
    desc: '1980년 5월 광주를 배경으로, 당시의 참상과 남겨진 사람들의 아픔을 섬세하고 절절하게 그려낸 한강 작가의 대표작입니다.',
    excerpt:
      '네가 죽은 뒤 장례식을 치르지 못해, 내 삶이 장례식이 되었다. 흰 촛불을 켤 때마다 어둠 속에서 천천히 되살아나는 이름들.',
    price: 13500,
    originalPrice: 15000,
    rating: '4.9',
    reviewCount: 4820,
    tags: ['#노벨문학상', '#한국소설'],
    img: '/src/assets/images/book_human_acts_1795495718887.jpg',
    formatLabel: '양장 특별판',
  },
  {
    id: 1,
    title: '초역 부처의 말',
    author: '코이케 류노스케 저',
    publisher: '나무의마음',
    category: '도서',
    quote: '"복잡한 마음을 비우고 자유로워지는 삶의 지혜"',
    desc: '최근 읽으신 인문학·철학 분야와 구매 연관성을 분석하여 엄선한 작품으로, 불안과 집착을 내려놓고 평온을 되찾는 부처의 핵심 가르침을 현대어로 풀어냈습니다.',
    excerpt:
      '마음이 흔들릴 때는 멀리 내다보지 말고 지금 내딛는 한 걸음의 감촉에만 주의를 기울여라. 고요는 밖이 아니라 호흡 끝에 머문다.',
    price: 16200,
    originalPrice: 18000,
    rating: '4.9',
    reviewCount: 1240,
    tags: ['#마음챙김', '#베스트셀러'],
    img: '/src/assets/images/book_buddha_words_1795495720544.jpg',
    formatLabel: '종이책 · eBook',
  },
  {
    id: 2,
    title: '트렌드 코리아 2025',
    author: '김난도 외 저',
    publisher: '미래의창',
    category: '도서',
    quote: '"예리한 시선으로 포착한 대한민국 소비와 라이프스타일의 10가지 변화"',
    desc: '변화의 속도가 빨라지는 인공지능 시대, 우리가 주목해야 할 소비 시장과 일상 문화를 관통하는 10가지 핵심 키워드를 분석합니다.',
    excerpt:
      '초개인화된 취향의 시대일수록 브랜드는 거대한 담론이 아닌 한 사람의 아주 작은 감각과 루틴을 설계하는 데서 출발한다.',
    price: 17100,
    originalPrice: 19000,
    rating: '4.8',
    reviewCount: 2150,
    tags: ['#경제경영', '#트렌드'],
    img: '/src/assets/images/book_trend_korea_1795495719602.jpg',
    formatLabel: '양장 초판',
  },
];

export const CATALOG_ITEMS: BookItem[] = [
  ...HERO_BOOKS,
  {
    id: 3,
    title: '채식주의자 (리커버 eBook 에디션)',
    author: '한강 저',
    publisher: '창비',
    category: 'eBook',
    quote: '"인간의 폭력성과 순수성에 대한 강렬한 알레고리"',
    desc: '육식을 거부하며 나무가 되기를 꿈꾸는 한 여인의 이야기를 세 편의 연작으로 담아낸 한국 현대문학의 기념비적 작품입니다.',
    excerpt:
      '꿈속의 숲은 언제나 서늘하고 고요했다. 아무것도 해치지 않고 오직 햇빛과 빗물만으로 살아 숨 쉬는 세계.',
    price: 11200,
    originalPrice: 14000,
    rating: '4.9',
    reviewCount: 3690,
    tags: ['#크레마클럽', '#eBook'],
    img: '/src/assets/images/book_human_acts_1795495718887.jpg',
    formatLabel: 'eBook 즉시열람',
  },
  {
    id: 4,
    title: 'YES24 x 모나미 만년필 & 독서 노트 세트',
    author: 'YES24 굿즈 에디션',
    publisher: '예스이십사',
    category: '음반/문구',
    quote: '"문장을 필사하는 고요한 시간을 위한 데스크 스테이셔너리"',
    desc: '잉크 번짐이 적은 120g 미색 중성지 독서 기록 노트와 세필 만년필, 브라스 북마크가 포함된 한정 문구 세트입니다.',
    excerpt:
      '인상 깊은 문장을 손끝으로 옮겨 적는 순간, 책 속의 사유는 비로소 나만의 언어가 되어 오래도록 남습니다.',
    price: 24500,
    originalPrice: 28000,
    rating: '4.8',
    reviewCount: 512,
    tags: ['#필사노트', '#단독굿즈'],
    img: '/src/assets/images/book_buddha_words_1795495720544.jpg',
    formatLabel: '한정 패키지',
  },
  {
    id: 5,
    title: '2026 서울 국제 도서전 & 북토크 예매권',
    author: 'YES24 티켓 단독',
    publisher: 'YES24 티켓',
    category: '티켓',
    quote: '"작가와 독자가 한 공간에서 만나는 사유의 축제"',
    desc: '주요 문학상 수상 작가 강연, 독립출판 마켓, 크레마클럽 라운지 입장 혜택이 포함된 종일권 티켓입니다.',
    excerpt:
      '사전 예매 회원 전원에게 현장 도서 교환 바우처 3,000원권 및 스페셜 에코 파우치를 증정합니다.',
    price: 15000,
    rating: '4.9',
    reviewCount: 318,
    tags: ['#북토크', '#모바일티켓'],
    img: '/src/assets/images/book_trend_korea_1795495719602.jpg',
    formatLabel: '모바일 티켓',
  },
  {
    id: 6,
    title: '작가의 서재: 사유의 기록 (단독 특별판)',
    author: '윤서연 저',
    publisher: '문학의숲',
    category: '단독/이벤트',
    quote: '"글쓰기는 스스로를 구원하는 조용하고 단단한 여정"',
    desc: '채널예스 연재 인터뷰를 엮어 출간한 YES24 단독 특별판으로, 미공개 친필 원고 노트가 수록되어 있습니다.',
    excerpt:
      '매일 새벽 책상 위 램프를 켜는 의식은 세상의 소음을 잠시 닫고 내면의 문장을 건져 올리는 가장 정직한 노동이었다.',
    price: 15800,
    originalPrice: 17500,
    rating: '4.9',
    reviewCount: 428,
    tags: ['#채널예스', '#친필사인본'],
    img: '/src/assets/images/editorial_author_interview_1795495719956.jpg',
    formatLabel: 'YES24 단독',
  },
];

export const RANKING_DATA: Record<RankingPeriod, RankingEntry[]> = {
  realtime: [
    {
      rank: 1,
      bookId: 0,
      title: '소년이 온다 (노벨문학상 에디션)',
      authorLine: '한강 저 · 창비',
      badgeText: '실시간 1위',
      trendType: 'hot',
    },
    {
      rank: 2,
      bookId: 2,
      title: '트렌드 코리아 2025',
      authorLine: '김난도 외 · 미래의창',
      badgeText: '1단계 상승',
      trendType: 'up',
    },
    {
      rank: 3,
      bookId: 1,
      title: '초역 부처의 말',
      authorLine: '코이케 류노스케 · 나무의마음',
      badgeText: '2단계 상승',
      trendType: 'up',
    },
  ],
  daily: [
    {
      rank: 1,
      bookId: 1,
      title: '초역 부처의 말',
      authorLine: '코이케 류노스케 · 나무의마음',
      badgeText: '일간 1위',
      trendType: 'hot',
    },
    {
      rank: 2,
      bookId: 0,
      title: '소년이 온다 (노벨문학상 에디션)',
      authorLine: '한강 저 · 창비',
      badgeText: '유지',
      trendType: 'steady',
    },
    {
      rank: 3,
      bookId: 3,
      title: '채식주의자 (리커버 eBook 에디션)',
      authorLine: '한강 저 · 창비',
      badgeText: '3단계 상승',
      trendType: 'up',
    },
  ],
  weekly: [
    {
      rank: 1,
      bookId: 2,
      title: '트렌드 코리아 2025',
      authorLine: '김난도 외 · 미래의창',
      badgeText: '주간 1위',
      trendType: 'hot',
    },
    {
      rank: 2,
      bookId: 0,
      title: '소년이 온다 (노벨문학상 에디션)',
      authorLine: '한강 저 · 창비',
      badgeText: '유지',
      trendType: 'steady',
    },
    {
      rank: 3,
      bookId: 6,
      title: '작가의 서재: 사유의 기록 (단독 특별판)',
      authorLine: '윤서연 저 · 문학의숲',
      badgeText: '4단계 상승',
      trendType: 'up',
    },
  ],
};

export interface PricingTier {
  id: 'basic' | 'standard' | 'premium';
  name: string;
  subtitle: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'basic',
    name: '베이직 (Basic)',
    subtitle: '부담 없이 시작하는 eBook 라이브러리',
    monthlyPrice: 5500,
    annualPrice: 4400,
    features: [
      '10만 권 이상의 eBook 무제한 열람',
      '최대 5대 기기 동시 연결',
      '하이라이트 및 독서 메모 자동 동기화',
    ],
    ctaLabel: '선택하기',
  },
  {
    id: 'standard',
    name: '스탠다드 (Standard)',
    subtitle: '오디오북과 함께 즐기는 종합 독서 패키지',
    monthlyPrice: 9900,
    annualPrice: 7920,
    features: [
      '베이직 요금제의 모든 혜택 포함',
      '성우·저자 낭독 오디오북 무제한',
      '가족 및 개인 동시 접속 프로필 2개 지원',
    ],
    ctaLabel: '첫 달 0원 이용하기',
    featured: true,
  },
  {
    id: 'premium',
    name: '프리미엄 (Premium)',
    subtitle: '종이책 정기 배송이 결합된 멤버십',
    monthlyPrice: 14900,
    annualPrice: 11920,
    features: [
      '스탠다드 요금제의 모든 혜택 포함',
      '분기별 에디터 엄선 종이책 1권 배송',
      '크레마 단말기 전용 할인 쿠폰 증정',
    ],
    ctaLabel: '선택하기',
  },
];

export const TRENDING_KEYWORDS = [
  { rank: 1, keyword: '소년이 온다', change: '+2', bookId: 0 },
  { rank: 2, keyword: '트렌드 코리아 2025', change: '-', bookId: 2 },
  { rank: 3, keyword: '채식주의자', change: '+5', bookId: 3 },
  { rank: 4, keyword: '초역 부처의 말', change: '+1', bookId: 1 },
];

export const EDITORIAL_INTERVIEW_IMG = '/src/assets/images/editorial_author_interview_1795495719956.jpg';
