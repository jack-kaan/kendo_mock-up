import React from 'react';
import { Home, Swords, Trophy, User as UserIcon, MapPin, Star, Shield, BarChart2, Settings, Users, MessageSquare, ThumbsUp, Share2, Award, BookOpen, Video, ShieldCheck, CheckCircle2, Store, Tag, X, ThumbsDown, Lock, Unlock, CheckSquare, Square, ArrowUp, ArrowDown, Flame, ChevronDown, Megaphone, Send, FileUp, Plane, Info, Gift, PlusCircle, Heart, Edit3, ChevronsLeft, ChevronsRight, FileText, BarChart as BarChartIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper function for combining Tailwind classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- TYPE DEFINITIONS ---
type OfficialRank = '1단' | '2단' | '3단' | '4단' | '5단';
type BadgeType = 'First Match' | '5-Win Streak' | 'Weekly Activity King' | 'Mentor' | 'Community Contributor';

type KendoUser = {
  id: number;
  name: string;
  dojang: string;
  location: string;
  platformRank: number;
  officialRank: OfficialRank;
  wins: number;
  losses: number;
  badges: BadgeType[];
  avatarUrl?: string;
  avatarItems: {
      jukdoCount: number;
  };
  rankHistory: { date: string; rank: number }[];
  detailedStats: {
    year: number;
    scoringBreakdown: { head: number; wrist: number; waist: number; thrust: number };
    homeAway: { home: string; away: string };
    vsHigherRank: { wins: number; losses: number; draws: number };
    interestingStats: { label: string; value: string }[];
  };
};

type Match = {
  id: number;
  opponent: KendoUser;
  date: string;
  status: 'upcoming' | 'completed';
  result?: 'win' | 'loss' | 'draw';
  score?: string;
  time?: string;
  privacy: 'public' | 'private';
  videoUrl?: string;
  commentary?: string;
  likes: number;
  dislikes: number;
  comments: { id: number; text: string }[];
  privacySettings?: {
      video: boolean;
      comments: boolean;
      likes: boolean;
      commentary: boolean;
  };
};

type CommunityPost = {
  id: number;
  author: KendoUser;
  type: 'review' | 'video';
  title: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
};

type AnonymousPost = Omit<CommunityPost, 'author' | 'type'> & { author: { name: '익명', avatarUrl?: string } };

type TradePost = {
    id: number;
    author: KendoUser;
    itemName: string;
    price: string;
    description: string;
    status: '판매중' | '예약중' | '판매완료';
    imageUrl?: string;
    timestamp: string;
};

type Ranking = {
  user: KendoUser;
  points: number;
  wins: number;
  rankChange: number;
};

type ChatMessage = {
    id: number;
    sender: 'me' | 'other' | string;
    text: string;
    timestamp: string;
};

type ChatPartner = KendoUser | { id: number; name: string; avatarUrl?: string; members?: number };

type Chat = {
    id: number;
    partner: ChatPartner;
    lastMessage: string;
    timestamp: string;
    unread: number;
    messages: ChatMessage[];
    type: 'private' | 'group' | 'club';
};

type TravelPackage = {
    id: number;
    destination: string;
    duration: string;
    description: string;
    price: string;
    currentApplicants: number;
    maxApplicants: number;
    isConfirmed: boolean;
    imageUrl: string;
    details: {
        location: string;
        curriculum: string[];
        schedule: { day: string; activity: string }[];
        notes: string[];
        applicants: string[];
    }
};


// --- MOCK DATA (Merged & Enhanced) ---
const currentUser = {
  id: 1,
  name: '한승오',
  dojang: '주이회',
  location: '대전',
  platformRank: 1510,
  officialRank: '4단',
  wins: 42,
  losses: 15,
  badges: ['First Match', 'Community Contributor', '5-Win Streak'],
  avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=SO',
  avatarItems: { jukdoCount: 3 },
  rankHistory: [{date: '2024-01-01', rank: 1480}, {date: '2024-03-01', rank: 1500}, {date: '2024-05-01', rank: 1490}, {date: '2024-07-01', rank: 1510}],
  detailedStats: {
    year: 2024,
    scoringBreakdown: { head: 45, wrist: 35, waist: 15, thrust: 5 },
    homeAway: { home: '20승 5패', away: '22승 10패' },
    vsHigherRank: { wins: 5, losses: 8, draws: 2 },
    interestingStats: [
        { label: '최고 연속 승리', value: '7연승' },
        { label: '평균 득점 시간', value: '25초' },
        { label: '주요 득점 기술', value: '손목치기' },
        { label: '월별 최다 대련', value: '5월 (10회)' },
        { label: '라이벌 전적 (vs 김형섭)', value: '3승 2패' },
        { label: '최다 연패', value: '3연패' },
        { label: '한판승 비율', value: '62%' },
        { label: '평균 경기 시간', value: '3분 10초' },
        { label: '가장 많이 만난 상대', value: '이노연 (7회)' },
        { label: '월간 MVP 횟수', value: '2회' },
        { label: '최단 시간 한판승', value: '7초' },
        { label: '연장전 승률', value: '75%' },
        { label: '주요 득점 요일', value: '토요일' },
        { label: '가장 까다로운 상대', value: '남경오 (1승 3패)' },
        { label: '시작 30초 내 득점률', value: '40%' },
        { label: '역전승 비율', value: '15%' },
        { label: '무실점 경기 수', value: '8경기' },
        { label: '월 평균 대련 횟수', value: '8.5회' },
        { label: '최다 득점 경기', value: '5점 (vs 이정현)' },
        { label: '심판 판정 항의 횟수', value: '0회' },
    ]
  }
};

const mockUsers = [
  { id: 2, name: '김형섭', dojang: '주이회', location: '대전', platformRank: 1550, officialRank: '2단', wins: 51, losses: 10, badges: ['5-Win Streak'], avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=HS', avatarItems: { jukdoCount: 5 }, rankHistory: [{date: '2024-01-01', rank: 1500}, {date: '2024-03-01', rank: 1520}, {date: '2024-05-01', rank: 1540}, {date: '2024-07-01', rank: 1550}], detailedStats: currentUser.detailedStats },
  { id: 3, name: '이노연', dojang: '주이회', location: '대전', platformRank: 1580, officialRank: '2단', wins: 30, losses: 8, badges: ['First Match'], avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=NY', avatarItems: { jukdoCount: 2 }, rankHistory: [{date: '2024-01-01', rank: 1590}, {date: '2024-03-01', rank: 1585}, {date: '2024-05-01', rank: 1580}, {date: '2024-07-01', rank: 1580}], detailedStats: currentUser.detailedStats },
  { id: 4, name: '문준형', dojang: '평송센터', location: '대전', platformRank: 1450, officialRank: '4단', wins: 78, losses: 20, badges: ['Weekly Activity King'], avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=JH', avatarItems: { jukdoCount: 4 }, rankHistory: [{date: '2024-01-01', rank: 1400}, {date: '2024-03-01', rank: 1420}, {date: '2024-05-01', rank: 1460}, {date: '2024-07-01', rank: 1450}], detailedStats: currentUser.detailedStats },
  { id: 5, name: '이정현', dojang: '원검도관', location: '서울', platformRank: 1420, officialRank: '2단', wins: 25, losses: 12, badges: [], avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=JH2', avatarItems: { jukdoCount: 1 }, rankHistory: [{date: '2024-01-01', rank: 1410}, {date: '2024-03-01', rank: 1400}, {date: '2024-05-01', rank: 1415}, {date: '2024-07-01', rank: 1420}], detailedStats: currentUser.detailedStats },
  { id: 6, name: '남경오', dojang: '경호관', location: '구미', platformRank: 1490, officialRank: '5단', wins: 18, losses: 5, badges: ['Mentor'], avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=KH', avatarItems: { jukdoCount: 6 }, rankHistory: [{date: '2024-01-01', rank: 1480}, {date: '2024-03-01', rank: 1485}, {date: '2024-05-01', rank: 1495}, {date: '2024-07-01', rank: 1490}], detailedStats: currentUser.detailedStats },
];

const allUsers = [currentUser, ...mockUsers];

const allRankings = {
  month: {
    score: allUsers.map(u => ({ user: u, points: u.platformRank + Math.floor(Math.random() * 50) - 25, wins: u.wins, rankChange: Math.floor(Math.random() * 7) - 3 })).sort((a,b) => b.points - a.points),
    wins: allUsers.map(u => ({ user: u, points: u.platformRank, wins: u.wins + Math.floor(Math.random() * 10), rankChange: Math.floor(Math.random() * 7) - 3 })).sort((a,b) => b.wins - a.wins),
  },
  season: {
    score: allUsers.map(u => ({ user: u, points: u.platformRank + Math.floor(Math.random() * 150) - 75, wins: u.wins, rankChange: Math.floor(Math.random() * 7) - 3 })).sort((a,b) => b.points - a.points),
    wins: allUsers.map(u => ({ user: u, points: u.platformRank, wins: u.wins + Math.floor(Math.random() * 30), rankChange: Math.floor(Math.random() * 7) - 3 })).sort((a,b) => b.wins - a.wins),
  },
  year: {
    score: allUsers.map(u => ({ user: u, points: u.platformRank + Math.floor(Math.random() * 300) - 150, wins: u.wins, rankChange: Math.floor(Math.random() * 7) - 3 })).sort((a,b) => b.points - a.points),
    wins: allUsers.map(u => ({ user: u, points: u.platformRank, wins: u.wins + Math.floor(Math.random() * 50), rankChange: Math.floor(Math.random() * 7) - 3 })).sort((a,b) => b.wins - a.wins),
  }
};


const mockMatchHistory = [
    { id: 1, opponent: mockUsers[0], result: 'win', date: '2024-05-20', score: '2-1', status: 'completed', privacy: 'public', videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video', commentary: '김형섭 선수의 머리치기가 매우 인상적인 경기였습니다. 한승오 선수는 침착하게 받아치며 점수를 획득했습니다.', likes: 128, dislikes: 5, comments: [{id: 1, text: '정말 멋진 경기였어요!'}, {id: 2, text: '두 분 다 대단하시네요.'}] },
    { id: 2, opponent: mockUsers[1], result: 'loss', date: '2024-05-18', score: '0-1', status: 'completed', privacy: 'private', videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video', likes: 0, dislikes: 0, comments: [], privacySettings: { video: true, comments: false, likes: false, commentary: false } },
    { id: 3, opponent: mockUsers[4], result: 'win', date: '2024-05-15', score: '1-0', status: 'completed', privacy: 'private', likes: 0, dislikes: 0, comments: [], privacySettings: { video: false, comments: false, likes: false, commentary: false } },
    { id: 4, opponent: mockUsers[2], result: 'draw', date: '2024-05-11', score: '1-1', status: 'completed', privacy: 'public', videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video', commentary: '팽팽한 접전 끝에 무승부로 마무리되었습니다.', likes: 95, dislikes: 2, comments: [{id: 1, text: '아슬아슬했네요!'}] },
    { id: 7, opponent: mockUsers[0], result: 'win', date: '2024-04-25', score: '1-0', status: 'completed', privacy: 'public', videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video', commentary: '빠른 손목치기로 승리했습니다.', likes: 88, dislikes: 1, comments: [] },
    { id: 8, opponent: mockUsers[3], result: 'loss', date: '2024-04-10', score: '1-2', status: 'completed', privacy: 'public', videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video', commentary: '접전 끝에 아쉽게 패배했습니다.', likes: 70, dislikes: 8, comments: [] },
    { id: 5, opponent: mockUsers[3], date: '2025-07-28', time: '18:00', status: 'upcoming', privacy: 'public', likes: 0, dislikes: 0, comments: [] },
    { id: 6, opponent: mockUsers[2], date: '2025-08-04', time: '19:00', status: 'upcoming', privacy: 'public', likes: 0, dislikes: 0, comments: [] },
];

const communityPosts = [
  { id: 1, author: mockUsers[0], type: 'video', title: '기본 머리치기 연습 영상', content: '기본기 훈련은 아무리 강조해도 지나치지 않습니다. 함께 보며 의견 나눠요.', likes: 128, comments: 15, timestamp: '2h ago' },
  { id: 2, author: currentUser, type: 'review', title: '이노연님과의 경기 후기', content: '세메(攻め)가 정말 날카로웠던 경기였습니다. 덕분에 많이 배울 수 있었습니다. 다음에는 오지와자(応じ技)를 더 연습해야겠습니다.', likes: 45, comments: 8, timestamp: '1d ago' },
];

const anonymousPosts = [
    { id: 101, author: { name: '익명' }, title: "요즘 슬럼프가 너무 심하게 오네요...", content: "머리치기가 전혀 되질 않습니다. 다들 어떻게 극복하시나요? 조언 부탁드립니다.", likes: 33, comments: 12, timestamp: "1h ago" },
    { id: 102, author: { name: '익명' }, title: "4단 심사 준비하시는 분 계신가요?", content: "본이랑 실기 준비를 어떻게 해야 할지 막막하네요. 같이 정보 공유해요.", likes: 45, comments: 18, timestamp: "3h ago" },
    { id: 103, author: { name: '익명' }, title: "도장에서 좀 불편한 사람이 있는데...", content: "대련할 때마다 너무 세게 하셔서 힘드네요. 관장님께 말씀드려야 할까요?", likes: 78, comments: 25, timestamp: "5h ago" },
    { id: 104, author: { name: '익명' }, title: "다들 죽도 어떤 거 쓰시나요?", content: "이번에 새로 하나 장만하려고 하는데, 동장형? 진죽? 추천 좀 해주세요.", likes: 29, comments: 11, timestamp: "1d ago" },
    { id: 105, author: { name: '익명' }, title: "체력 훈련 팁 공유합니다.", content: "매일 줄넘기 1000개랑 버피 100개씩 하니까 확실히 체력이 붙네요. 다들 화이팅!", likes: 95, comments: 22, timestamp: "2d ago" },
    { id: 106, author: { name: '익명' }, title: "검도 시작한 지 3개월 된 검린이입니다.", content: "아직은 어렵지만 너무 재밌네요. 선배님들 잘 부탁드립니다!", likes: 152, comments: 41, timestamp: "3d ago" },
    { id: 107, author: { name: '익명' }, title: "대회 앞두고 긴장이 너무 되네요.", content: "청심환이라도 먹어야 할까요? 다들 긴장 푸는 노하우가 있나요?", likes: 61, comments: 19, timestamp: "4d ago" },
    { id: 108, author: { name: '익명' }, title: "호구 냄새 어떻게 관리하시나요?", content: "페브리즈를 뿌려도 소용이 없네요. 좋은 방법 있으면 공유해주세요.", likes: 112, comments: 33, timestamp: "5d ago" },
];

const tradePosts = [
    { id: 201, author: mockUsers[2], itemName: "미사용 카본 죽도 (39)", price: "70,000원", description: "선물 받았는데 사이즈가 안 맞아 판매합니다. 포장도 안 뜯은 새 제품입니다.", status: '판매중', imageUrl: 'https://placehold.co/400x300/334155/94a3b8?text=죽도', timestamp: "1h ago" },
    { id: 202, author: mockUsers[3], itemName: "A급 중고 호구 세트 (남성용)", price: "150,000원", description: "1년 정도 사용했고 상태 아주 좋습니다. 175cm 전후 남성분께 잘 맞을 거예요.", status: '판매완료', imageUrl: 'https://placehold.co/400x300/334155/94a3b8?text=호구', timestamp: "8h ago" },
    { id: 203, author: mockUsers[4], itemName: "거의 새 것 같은 도복 (175cm)", price: "40,000원", description: "사이즈 미스로 몇 번 못 입은 도복입니다. 만번 도복이고 상태 최상입니다.", status: '판매중', imageUrl: 'https://placehold.co/400x300/334155/94a3b8?text=도복', timestamp: "1d ago" },
    { id: 204, author: mockUsers[0], itemName: "죽도 가방 (상태 좋음)", price: "20,000원", description: "튼튼한 죽도 가방입니다. 2개까지 들어갑니다.", status: '예약중', imageUrl: 'https://placehold.co/400x300/334155/94a3b8?text=가방', timestamp: "2d ago" },
    { id: 205, author: mockUsers[1], itemName: "코등이, 코등이 받침 여러 개", price: "15,000원", description: "예쁜 디자인 코등이 일괄 판매합니다.", status: '판매중', imageUrl: 'https://placehold.co/400x300/334155/94a3b8?text=코등이', timestamp: "2d ago" },
    { id: 206, author: mockUsers[4], itemName: "일제 쿠자쿠라 도복 상의", price: "90,000원", description: "고급 일제 도복입니다. 사이즈는 3호입니다.", status: '판매중', imageUrl: 'https://placehold.co/400x300/334155/94a3b8?text=상의', timestamp: "3d ago" },
    { id: 207, author: mockUsers[0], itemName: "호면 보호대 (새상품)", price: "22,000원", description: "충격 흡수 잘 되는 고급 호면 보호대입니다. 사이즈 미스로 판매합니다.", status: '판매중', imageUrl: 'https://placehold.co/400x300/334155/94a3b8?text=호면보호대', timestamp: "4d ago" },
    { id: 208, author: mockUsers[3], itemName: "죽도 오일", price: "10,000원", description: "죽도 관리용 오일입니다. 거의 사용 안했습니다.", status: '판매완료', imageUrl: 'https://placehold.co/400x300/334155/94a3b8?text=오일', timestamp: "5d ago" },
];

const mockChats = [
    { id: 101, type: 'club', partner: { id: 1001, name: '대전 카이스트 주이회', avatarUrl: 'https://placehold.co/100x100/0f766e/e0f2f1?text=K', members: 35 }, lastMessage: "김형섭: 이번 주 금요일 정기 수련 공지입니다.", timestamp: "10:45 AM", unread: 2, messages: Array.from({ length: 20 }, (_, i) => ({ id: i, sender: i % 3 === 0 ? 'me' : (i % 3 === 1 ? '김형섭' : '이노연'), text: `안녕하세요, 채팅 메시지 ${i+1}입니다.`, timestamp: `10:${45+i} AM` })) },
    { id: 102, type: 'group', partner: { id: 1002, name: '주말반 단톡방', avatarUrl: 'https://placehold.co/100x100/4a044e/f3e8ff?text=주말', members: 21 }, lastMessage: "이노연: 다들 고생하셨습니다!", timestamp: "어제", unread: 5, messages: Array.from({ length: 20 }, (_, i) => ({ id: i, sender: i % 2 === 0 ? 'me' : '이노연', text: `주말 수련 정말 좋았어요! ${i+1}`, timestamp: `어제 20:${11+i}`})) },
    { id: 103, type: 'group', partner: { id: 1003, name: '4단 승단 준비방', avatarUrl: 'https://placehold.co/100x100/7f1d1d/fee2e2?text=4단', members: 5 }, lastMessage: "문준형: 본국검법 영상 공유합니다.", timestamp: "2일 전", unread: 0, messages: [] },
    { id: 1, type: 'private', partner: mockUsers[0], lastMessage: "네, 좋습니다. 그럼 토요일 2시에 뵙겠습니다.", timestamp: "10:45 AM", unread: 0, messages: [
        {id: 1, sender: 'me', text: '김형섭님, 이번주 토요일에 대련 가능하신가요?', timestamp: '10:40 AM'},
        {id: 2, sender: 'other', text: '네, 가능합니다. 시간은 언제가 좋으신가요?', timestamp: '10:42 AM'},
        {id: 3, sender: 'me', text: '오후 2시 괜찮으신가요?', timestamp: '10:43 AM'},
        {id: 4, sender: 'other', text: '네, 좋습니다. 그럼 토요일 2시에 뵙겠습니다.', timestamp: '10:45 AM'},
    ]},
    { id: 2, type: 'private', partner: mockUsers[1], lastMessage: "고생하셨습니다. 덕분에 많이 배웠습니다!", timestamp: "어제", unread: 1, messages: [
        {id: 1, sender: 'other', text: '한승오님, 어제 대련 즐거웠습니다.', timestamp: '어제'},
        {id: 2, sender: 'other', text: '고생하셨습니다. 덕분에 많이 배웠습니다!', timestamp: '어제'},
    ]},
];

// --- NEW DATA FOR ANNOUNCEMENTS & SHOP ---
const danPromotions = [
    { id: 1, title: "1, 2단 승단 심사", date: "2025-08-15", location: "서울 중앙 연수원", details: "오전 9시부터 시작. 응시자는 8시 30분까지 집결 바랍니다. 준비물: 신분증, 응시표, 목검." },
    { id: 2, title: "3, 4단 승단 심사", date: "2025-08-16", location: "서울 중앙 연수원", details: "오전 9시부터 시작. 본, 실기, 학과 시험이 포함됩니다. 상세 공지 확인 필수." }
];

const seminars = [
    { id: 1, title: "고단자 강습회", date: "2025-09-20", location: "대전 평송수련원", details: "5단 이상 참가 가능. 참가비 5만원. 강사: 김태형 8단." },
    { id: 2, title: "심판 강습회", date: "2025-10-11", location: "부산 기장체육관", details: "심판 자격증 소지자 및 4단 이상 참가 가능. 최신 개정 규칙에 대한 교육이 진행됩니다." }
];

const promoItems = [
    { id: 1, type: 'openClass', title: "신규 검도장 오픈 클래스", organizer: "새로운 검도관 (서울)", content: "검도에 관심 있는 누구나 환영합니다! 기본 자세부터 체험까지. 친구와 함께 오시면 할인 혜택!", imageUrl: "https://placehold.co/400x200/164e63/9ca3af?text=Open+Class" },
    { id: 2, type: 'club', title: "직장인 연합 동호회 모집", organizer: "검우회", content: "열정 가득한 직장인 검도인을 모집합니다. 주 2회 저녁 합동 수련. 스트레스 해소와 건강을 동시에!", imageUrl: "https://placehold.co/400x200/155e75/9ca3af?text=Club" },
    { id: 3, type: 'event', title: "여름맞이 청소년 검도 대회", organizer: "대한검도회", content: "전국 청소년들이 기량을 뽐낼 수 있는 기회! 많은 참여 바랍니다. 참가자 전원 기념품 증정.", imageUrl: "https://placehold.co/400x200/0e7490/9ca3af?text=Event" }
];

const japanTravelPackages = [
    { id: 1, destination: "교토 8일 검도 수행", duration: "2025.08.01 ~ 2025.08.08", description: "전통 도장에서 현지 검도인들과 교류하며 심신을 단련하는 특별한 기회입니다.", price: "2,500,000원", currentApplicants: 8, maxApplicants: 15, isConfirmed: false, imageUrl: "https://placehold.co/600x400/1e293b/94a3b8?text=Kyoto+Dojo", details: {
        location: "일본 교토, 유서 깊은 무덕전",
        curriculum: ["기본기 수련 (오전)", "고단자 사범 지도 대련 (오후)", "현지 대학 검도부 교류전", "문화 탐방"],
        schedule: [
            { day: "1일차", activity: "인천 출발, 교토 도착 및 숙소 체크인" },
            { day: "2-4일차", activity: "무덕전 집중 수련" },
            { day: "5일차", activity: "교류전 및 문화 탐방 (기요미즈데라)" },
            { day: "6-7일차", activity: "합동 수련 및 개인 연습" },
            { day: "8일차", activity: "교토 출발, 인천 도착" },
        ],
        notes: ["개인 죽도, 도복, 호구 필수 지참", "여행자 보험 포함", "일부 식사 불포함"],
        applicants: ["김*섭", "이*연", "문*형", "박*진", "최*수", "강*민", "한*우", "조*현"]
    }},
    { id: 2, destination: "오사카 5일 집중 훈련", duration: "2025.09.10 ~ 2025.09.15", description: "경찰 특련단과의 합동 훈련을 통해 실전 감각을 끌어올립니다.", price: "1,800,000원", currentApplicants: 12, maxApplicants: 12, isConfirmed: true, imageUrl: "https://placehold.co/600x400/1e293b/94a3b8?text=Osaka+Police", details: {
        location: "일본 오사카 경찰수련원",
        curriculum: ["체력 훈련", "전술 훈련", "경찰 특련단과의 실전 대련"],
        schedule: [{day: "1-5일차", activity: "상세 일정은 참가자에게 별도 공지"}],
        notes: ["고강도 훈련이 포함되어 있습니다.", "4단 이상 참가 권장"],
        applicants: ["남*오", "이*현", "김*태", "윤*상", "정*훈", "외 7명"]
    }},
    { id: 3, destination: "후쿠오카 4일 단기 연수", duration: "2025.10.05 ~ 2025.10.09", description: "고단자 사범님의 지도를 받으며 기본기를 다지는 시간을 갖습니다.", price: "1,200,000원", currentApplicants: 5, maxApplicants: 10, isConfirmed: false, imageUrl: "https://placehold.co/600x400/334155/94a3b8?text=Fukuoka", details: { 
        location: "후쿠오카시 중앙무도관",
        curriculum: ["8단 교사(Kyoshi) 사범 초빙", "기본기 집중 교정", "개인별 맞춤 지도", "본(Kata) 심화 수련"],
        schedule: [
            {day: "1일차", activity: "후쿠오카 도착 및 오리엔테이션"},
            {day: "2-3일차", activity: "오전/오후 집중 수련"},
            {day: "4일차", activity: "마무리 수련 및 귀국"}
        ],
        notes: ["초심자부터 유단자까지 모두 환영", "개인별 지도 시간이 많아 기술 향상에 최적입니다."],
        applicants: ["이*정", "박*서", "김*준", "최*아", "황*민"]}},
    { id: 4, destination: "홋카이도 6일 동계 훈련", duration: "2026.01.12 ~ 2026.01.18", description: "설경 속에서 진행되는 특별한 동계 강습회에 참여해보세요.", price: "2,200,000원", currentApplicants: 15, maxApplicants: 15, isConfirmed: true, imageUrl: "https://placehold.co/600x400/334155/94a3b8?text=Hokkaido", details: { 
        location: "홋카이도 삿포로시 체육관",
        curriculum: ["설중 아침 수련 (Kangeiko)", "체력 및 정신력 강화 훈련", "현지 고등부 선수들과의 합동 훈련"],
        schedule: [
            {day: "1일차", activity: "삿포로 도착"},
            {day: "2-5일차", activity: "동계 훈련 캠프 참가"},
            {day: "6일차", activity: "귀국"}
        ],
        notes: ["방한 장비 필수", "강인한 정신력과 체력을 기르고 싶은 분께 추천합니다."],
        applicants: ["참가자 15명"]}},
    { id: 5, destination: "도쿄 무도관 방문 3일", duration: "상시 모집", description: "검도의 성지, 일본 무도관을 방문하고 기념품을 구매할 수 있는 기회입니다.", price: "800,000원", currentApplicants: 3, maxApplicants: 5, isConfirmed: false, imageUrl: "https://placehold.co/600x400/334155/94a3b8?text=Tokyo", details: { 
        location: "도쿄 일본무도관 및 경시청 도장",
        curriculum: ["일본무도관 견학", "경시청 특련단 훈련 참관", "유명 검도용품점 방문"],
        schedule: [
            {day: "1일차", activity: "도착, 일본무도관 방문"},
            {day: "2일차", activity: "경시청 훈련 참관 및 용품점 방문"},
            {day: "3일차", activity: "귀국"}
        ],
        notes: ["수련보다는 견학과 문화 체험 위주의 프로그램입니다."],
        applicants: ["김*영", "이*수", "박*철"]}},
    { id: 6, destination: "가고시마 7일 자연 수련", duration: "2025.11.01 ~ 2025.11.08", description: "아름다운 자연 속에서 심신을 수련하는 힐링 검도 캠프입니다.", price: "1,900,000원", currentApplicants: 2, maxApplicants: 10, isConfirmed: false, imageUrl: "https://placehold.co/600x400/334155/94a3b8?text=Kagoshima", details: { 
        location: "가고시마 키리시마시 자연수련원",
        curriculum: ["폭포 아래 명상 및 수련", "삼림욕을 겸한 야외 기본기 훈련", "현지 동호회와의 친선 교류"],
        schedule: [
            {day: "1-2일차", activity: "도착 및 자연 적응 훈련"},
            {day: "3-5일차", activity: "도장 수련 및 교류전"},
            {day: "6-7일차", activity: "자유 시간 및 귀국"}
        ],
        notes: ["검도와 함께 심신의 휴식을 원하는 분들께 추천합니다."],
        applicants: ["최*원", "정*호"]}},
    { id: 7, destination: "나고야 성(城) 검도 교류", duration: "2025.12.10 ~ 2025.12.14", description: "나고야 성 앞에서 펼쳐지는 특별한 야외 검도 교류회에 참여하세요.", price: "1,500,000원", currentApplicants: 9, maxApplicants: 20, isConfirmed: false, imageUrl: "https://placehold.co/600x400/334155/94a3b8?text=Nagoya", details: { 
        location: "나고야 아이치현 무도관",
        curriculum: ["나고야 성 배경 야외 수련", "아이치현 대표 선수단과의 합동稽古(Keiko)", "역사 탐방"],
        schedule: [
            {day: "1일차", activity: "도착"},
            {day: "2일차", activity: "나고야 성 야외 수련"},
            {day: "3일차", activity: "합동 게이코"},
            {day: "4일차", activity: "귀국"}
        ],
        notes: ["역사와 검도를 함께 즐길 수 있는 특별한 경험."],
        applicants: ["참가자 9명"]}},
    { id: 8, destination: "오키나와 5일 해변 수련", duration: "2026.02.20 ~ 2026.02.25", description: "따뜻한 오키나와 해변에서 진행되는 이색적인 검도 수련입니다.", price: "1,700,000원", currentApplicants: 0, maxApplicants: 12, isConfirmed: false, imageUrl: "https://placehold.co/600x400/334155/94a3b8?text=Okinawa", details: { 
        location: "오키나와 나하시 해변 및 시립체육관",
        curriculum: ["해변 모래사장 위에서의 발동작 및 체력 훈련", "전통 류큐 검술(琉球剣術) 체험", "현지 검도 연맹과의 교류"],
        schedule: [
            {day: "1-2일차", activity: "도착 및 해변 수련"},
            {day: "3일차", activity: "류큐 검술 체험"},
            {day: "4일차", activity: "교류전"},
            {day: "5일차", activity: "귀국"}
        ],
        notes: ["따뜻한 기후에서 즐기는 이색적인 검도 수련입니다."],
        applicants: []}},
];

const gifticonItems = [
    { category: "스타벅스", items: ["아메리카노 (4,500P)", "라떼 (5,000P)", "금액상품권 10,000원 (10,000P)"] },
    { category: "편의점 상품권", items: ["5,000원 (5,000P)", "10,000원 (10,000P)"] },
    { category: "주이회 상품권", items: ["5,000원 (5,000P)", "10,000원 (10,000P)", "30,000원 (30,000P)"] },
];

const shopItems = [
    { id: 1, name: "프리미엄 카본 죽도", price: "75,000원", imageUrl: "https://placehold.co/400x400/334155/94a3b8?text=Carbon+Jukdo" },
    { id: 2, name: "수제작 코등이 (벚꽃)", price: "30,000원", imageUrl: "https://placehold.co/400x400/581c87/f3e8ff?text=Tsuba" },
    { id: 3, name: "만번 도복 세트", price: "120,000원", imageUrl: "https://placehold.co/400x400/042f2e/cceceb?text=Dobok" },
    { id: 4, name: "경량 호구 세트", price: "450,000원", imageUrl: "https://placehold.co/400x400/4a044e/f3e8ff?text=Hogu" },
    { id: 5, name: "죽도 가방 (2개입)", price: "25,000원", imageUrl: "https://placehold.co/400x400/7f1d1d/fee2e2?text=Bag" },
    { id: 6, name: "기능성 수련복", price: "40,000원", imageUrl: "https://placehold.co/400x400/0c4a6e/e0f2fe?text=Training+Wear" },
];

const questList = [
    { id: 1, text: "손목 10점 따기", current: 1, target: 10, unit: "점", selected: true },
    { id: 2, text: "퇴격으로만 승리하기", current: 0, target: 1, unit: "승", selected: false },
    { id: 3, text: "3연승 달성하기", current: 1, target: 3, unit: "연승", selected: false },
    { id: 4, text: "고단자 상대로 승리하기 (+2단 이상)", current: 0, target: 1, unit: "승", selected: true },
    { id: 5, text: "하루에 5명과 대련하기", current: 2, target: 5, unit: "명", selected: false },
    { id: 6, text: "새로운 기술로 득점하기", current: 0, target: 1, unit: "회", selected: false },
    { id: 7, text: "다른 도장 방문하여 교류전하기", current: 2, target: 3, unit: "회", selected: true },
    { id: 8, text: "한판승 3회 달성하기", current: 1, target: 3, unit: "회", selected: false },
    { id: 9, text: "커뮤니티에 후기글 작성하기", current: 0, target: 1, unit: "회", selected: false },
    { id: 10, text: "대련 영상 3개 업로드하기", current: 1, target: 3, unit: "개", selected: false },
];

// --- [NEW] DATA FOR THEORY EXAM ---
const kendoTheoryData = [
    {
        id: 1,
        title: "검도의 四戒에 대하여 설명하라.",
        questionText: "검도의 [BLANK](四病)이라고도 하며, 검도를 수행함에 있어서 4가지 경계하여야 할 것을 말한다. [BLANK], [BLANK], [BLANK], [BLANK] (驚,懼,疑,惑) 즉, 놀라거나, 두려워하거나, 의심하거나, 미혹되지 말아야 함을 말한다. 검도의 승부는 기술뿐만 아니라 마음의 움직임에 지배되는 수가 많으므로 항상 사계를 마음에 두고 스스로 정신수양에 힘써 나가야 할 것이다. 항상 평상심을 가지고 마음이 동요됨이 없이 이 네가지를 초월해야만 상대를 이길 수 있다.",
        answers: ["4병", "경", "구", "의", "혹"]
    },
    {
        id: 2,
        title: "검도의 本의 필요성에 대하여 기술하라.",
        questionText: "검도의 본은 검도의 [BLANK]와 기술 중에서 기초가 되는 것들, 즉, 예법, 자세, 격자법, 거리, 기회, [BLANK] 등이 집약되어 있다. 검도의 본은 1) [BLANK]과 칼을 다루는 법을 확실히 익히기 위하여 2) 격법(格法)과 격자법의 기초 원리와 [BLANK]를 익히기 위하여, 3) 거리와 기회를 알고, 존심을 분명히 하기 위하여 필요하다.",
        answers: ["정수", "존심", "예법", "자세"]
    },
    {
        id: 3,
        title: "연격의 유의점과 효과에 대하여 기술하라.",
        questionText: "연격이란 검도의 [BLANK]과 기술을 조합하여 연속으로 행하는 종합적인 연습방법으로서, 검도를 배우는 사람에 있어서는 반드시 익혀야 하는 중요한 연습법이다. 연격연습을 올바르게 하기 위해 유의해야 할 점은 초보의 단계에서는 [BLANK]보다 [BLANK]을 크게, 정확히 하는데 중점을 둔다. 또한 머리치기에서 왼손 주먹은 항상 [BLANK] 상에서 이동하도록 한다. 정면 머리치기는 [BLANK]의 거리에서 정확히 치도록 한다.",
        answers: ["기본동작", "속도", "동작", "정중선", "일족일도"]
    },
    {
        id: 4,
        title: "유효격자에 대하여 기술하라.",
        questionText: "유효격자란 한판을 인정할 수 있는 격자로서, 검도경기·심판규칙 제12조에 따르면, 「[BLANK]는, 충실한 [BLANK]와 적정한 [BLANK]로써, 죽도의 격자부로 격자부위를 칼날을 바르게 하여 격자하고 [BLANK]이 있어야 한다.」고 되어 있다. 이때 [BLANK]가 일치하여야 한다.",
        answers: ["유효격자", "기세", "자세", "존심", "기검체"]
    },
    {
        id: 5,
        title: "거리에 대하여 설명하라.",
        questionText: "[BLANK]라 함은 상대와 대치했을 때 상호간의 [BLANK](시간적, 공간적, 심리적 간격을 포함한다)을 말한다. 일반적으로 거리는 3가지로 분류한다. (1) [BLANK]의 거리: 1보 들어가면 상대를 격자할 수 있는 거리. (2) [BLANK] 거리: 1보 전진하여도 격자하기 어려운 거리. (3) [BLANK] 거리: 반보 정도 들어가도 격자가 가능한 거리.",
        answers: ["거리", "간격", "일족일도", "먼", "가까운"]
    },
    {
        id: 6,
        title: "존심(存心)에 대하여 써라.",
        questionText: "[BLANK]이라는 말은 성리학상의 용어로서, 항상 마음에 새겨 [BLANK]을 잃지 않는 것 또는 늘 그렇게 한다는 한결 같은 마음이라 할 수 있다. 존심의 반대말은 [BLANK]이다. 검도에서는 격자자체가 성공했다 하여도 존심이 보이지 않으면 [BLANK]로 인정하지 않는다. 그리고 검도에서 공격 후에 존심이 특히 강조되고 있지만 [BLANK]하기 전에도, 공격 중에도 존심이 필요하다.",
        answers: ["존심", "본심", "방심", "유효격자", "공격"]
    },
    {
        id: 7,
        title: "삼살법(三殺法)에 대하여 써라.",
        questionText: "상대의 기선을 제압하여 효과적으로 상대를 이길 수 있는 세가지 방법으로서 상대의 [BLANK]을 죽이고, [BLANK]을 죽이고, [BLANK]를 죽이는 것을 [BLANK]이라고 한다. 칼을 죽인다는 것은 상대의 칼을 누르거나 제치거나 감는 등으로 상대 죽도의 자유동작 즉 상대의 [BLANK]을 죽이는 것을 말한다.",
        answers: ["칼", "기술", "기", "삼살법", "검선"]
    },
    {
        id: 8,
        title: "수파리(守,破.離)에 대하여 논하라.",
        questionText: "검도의 수련에는 세가지 단계가 있다. 1) [BLANK]란, 선생의 가르침을 잘 지키고, 그 가르침에 조금이라도 벗어남이 없이 수련을 하는 것이다. 2) [BLANK]란, 선생의 허가를 얻어 타 도장에 가서 다른 기술을 배우면서 지금까지 자기가 배워온 것을 버리지 않고 자유자재의 수련을 하는 것이다. 3) [BLANK]란, 배운 것으로부터 떠나서, 자기의 [BLANK]을 세울 수 있을 단계이며, 그 이상의 높은 수준의 [BLANK]를 개척하여 나아가는 것이다.",
        answers: ["수", "파", "리", "검도관", "독특한 경지"]
    },
    {
        id: 9,
        title: "담력정쾌(膽力精快)란 무엇인가?",
        questionText: "상대와의 대적 시에 가장 중요한 것을 순서대로 열거한 것이다. 첫째로 [BLANK]이니, 두려움이 없는 당당한 마음을 말한다. 둘째가 [BLANK]이니 이는 힘을 말한다. 셋째가 [BLANK]이니 빈틈없이 제자리를 찾아가는 정교한 기술을 말한다. 넷째가 [BLANK]니 이는 빠름을 말한다. 바르고 씩씩한 마음으로 수련을 통하여 힘을 얻고 정밀한 기술로 상대를 바르게 공격하는 것이 올바른 [BLANK]의 길임을 가르치는 말이다.",
        answers: ["담", "력", "정", "쾌", "무예"]
    },
    {
        id: 10,
        title: "부동심(不動心)",
        questionText: "[BLANK]은 무슨 일이 일어나도 마음의 [BLANK]이 일어나지 않는 상태를 말하며 또한 여러 가지 변동에 대하여도 그때그때 대응할 수 있는 [BLANK]을 뜻하기도 한다.",
        answers: ["부동심", "동요", "유연한 마음"]
    },
    {
        id: 11,
        title: "심판원의 자세",
        questionText: "심판원의 자세는 다음과 같다. 1) 경기진행을 [BLANK]하게 하여야 한다. 2) [BLANK]를 놓치는 일이 없도록 해야 한다. 3) [BLANK]에 충실한 심판을 하여야 한다. 4) 실제 심판을 하면서 항상 [BLANK]과 [BLANK]를 통하여 심판능력을 향상시키려는 마음을 가져야 한다.",
        answers: ["공평무사", "유효격자", "검리", "반성", "검토"]
    },
    {
        id: 12,
        title: "조선세법",
        questionText: "[BLANK]이 처음 소개된 책은 중국 명나라의 모원의가 쓴 [BLANK]이다. 이 책은 [BLANK]의 [BLANK]와 더불어 중국의 대표적인 병법서이다. 우리나라 조선조 정조때 발간된 [BLANK]에는 조선세법을 그대로 옮겨 실었으면서도 ‘조선세법’이라 하지 않고 ‘예도’라고 하였다.",
        answers: ["조선세법", "무비지", "척계광", "기효신서", "무예도보통지"]
    },
    {
        id: 13,
        title: "검도의 역사",
        questionText: "오늘날 검도경기의 원형은 [BLANK]이다. 우리나라에서는 신라 [BLANK]들이 격검을 수련하였다는 사실이 있다. <삼국유사>의 김유신조에 보이는 '검술을 연마하여 국선이 되었다.'라는 내용이 있다. 중국의 <무비지(武備志)>에 소개된 유일한 검법인 <[BLANK](朝鮮勢法)>과 현존하는 세계 최고(最古)의 검법인 <[BLANK](本國劍法)>은 세계검도사에 큰 빛이 되고 있는 것이다. 일본이 검도를 [BLANK]로 개발한 것은 그들의 자랑이요. 그 뿌리가 우리에게 있음은 우리의 긍지이다.",
        answers: ["격검", "화랑", "조선세법", "본국검법", "스포츠"]
    }
];

const testScoreHistory = [
    { date: "2025-05-10", score: 70 },
    { date: "2025-06-02", score: 60 },
    { date: "2025-06-15", score: 80 },
    { date: "2025-07-01", score: 75 },
];

// --- UI HELPER COMPONENTS ---
const Card = ({ children, className, onClick }) => (
  <div className={cn('bg-slate-800/50 border border-slate-700 rounded-xl p-4 shadow-lg', onClick && 'cursor-pointer transition-colors hover:bg-slate-700/80', className)} onClick={onClick}>
    {children}
  </div>
);

const UserAvatar = ({ user, size = 'md' }) => {
    const sizeClasses = { sm: 'w-10 h-10', md: 'w-16 h-16', lg: 'w-24 h-24' };
    const defaultAvatar = user?.name === '익명' 
        ? 'https://placehold.co/100x100/475569/94a3b8?text=익명'
        : `https://placehold.co/100x100/1e293b/94a3b8?text=??`;
    
    return (
        <img src={user?.avatarUrl || defaultAvatar} alt={user?.name || 'User Avatar'} className={cn('bg-slate-700 border-2 border-slate-600 rounded-full flex-shrink-0 object-cover', sizeClasses[size])}
            onError={(e) => { const target = e.target; target.onerror = null; target.src = defaultAvatar; }}
        />
    );
};

const Badge = ({ type }) => {
  const badgeStyles = {
    'First Match': { icon: <Award className="w-3 h-3" />, color: 'bg-blue-500/20 text-blue-300' },
    '5-Win Streak': { icon: <Trophy className="w-3 h-3" />, color: 'bg-yellow-500/20 text-yellow-300' },
    'Weekly Activity King': { icon: <Star className="w-3 h-3" />, color: 'bg-green-500/20 text-green-300' },
    'Mentor': { icon: <BookOpen className="w-3 h-3" />, color: 'bg-purple-500/20 text-purple-300' },
    'Community Contributor': { icon: <Users className="w-3 h-3" />, color: 'bg-indigo-500/20 text-indigo-300' },
  };
  const style = badgeStyles[type];
  return (
    <div className={cn('flex items-center justify-center w-16 h-16 rounded-full', style.color)}>
      <div className="text-center">
        {React.cloneElement(style.icon, { className: "w-6 h-6 mx-auto" })}
        <p className="text-[10px] mt-1 leading-tight">{type.replace(' ', '\n')}</p>
      </div>
    </div>
  );
};

const StatDistributionGraph = () => {
    const userPercentile = React.useMemo(() => Math.random() * 80 + 10, []); // Random value between 10 and 90

    return (
        <div className="mt-2 p-3 bg-slate-900/50 rounded-lg">
            <p className="text-xs text-center text-slate-400 mb-2">전체 사용자 중 나의 위치</p>
            <div className="relative w-full h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full">
                <div className="absolute h-full flex items-center" style={{ left: `${userPercentile}%`, transform: 'translateX(-50%)' }}>
                    <div className="w-1 h-6 bg-white rounded-full border-2 border-slate-900"></div>
                     <div className="absolute -top-5 text-xs font-bold text-white whitespace-nowrap">나</div>
                </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>하위</span>
                <span>평균</span>
                <span>상위</span>
            </div>
             <p className="text-center text-sm font-semibold text-blue-300 mt-2">상위 {100 - Math.round(userPercentile)}%</p>
        </div>
    );
};

const DetailedStatsCard = ({ stats }) => {
    const { scoringBreakdown, homeAway, vsHigherRank, interestingStats } = stats;
    const totalPoints = Object.values(scoringBreakdown).reduce((sum, value) => sum + value, 0);
    const [expandedStat, setExpandedStat] = React.useState(null);

    return (
        <Card className="border-blue-500/50">
            <h3 className="font-semibold text-lg flex items-center mb-4"><BarChart2 className="w-5 h-5 mr-2 text-blue-400"/>분석 결과</h3>
            <div className="space-y-6">
                <div>
                    <h4 className="font-semibold text-slate-300 mb-2">득점 부위 분석</h4>
                    <div className="space-y-1 text-xs">
                        {Object.entries(scoringBreakdown).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2">
                                <span className="w-12 capitalize">{key}</span>
                                <div className="flex-1 bg-slate-700 rounded-full h-4">
                                    <div className="bg-blue-500 h-4 rounded-full text-right pr-2 text-white font-bold" style={{ width: `${(value/totalPoints)*100}%` }}>{value}%</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="font-semibold text-slate-300">홈 성적</p>
                        <p className="text-lg font-bold">{homeAway.home}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-slate-300">어웨이 성적</p>
                        <p className="text-lg font-bold">{homeAway.away}</p>
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold text-slate-300 mb-2">고단자 상대 통계</h4>
                    <div className="flex justify-around text-center bg-slate-700/50 p-2 rounded-lg">
                        <div><p className="font-bold text-green-400">{vsHigherRank.wins}승</p></div>
                        <div><p className="font-bold text-red-400">{vsHigherRank.losses}패</p></div>
                        <div><p className="font-bold text-slate-400">{vsHigherRank.draws}무</p></div>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-300 mb-2">흥미로운 기록</h4>
                     <div className="space-y-1 text-sm bg-slate-800 p-2 rounded-lg">
                        {interestingStats.map(stat => (
                            <div key={stat.label} className="border-b border-slate-700/50 last:border-b-0 py-2">
                                <div 
                                    className="flex justify-between items-center cursor-pointer" 
                                    onClick={() => setExpandedStat(expandedStat === stat.label ? null : stat.label)}
                                >
                                    <span className="text-slate-400">{stat.label}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">{stat.value}</span>
                                        <ChevronDown className={cn("transition-transform", expandedStat === stat.label && "rotate-180")} size={16}/>
                                    </div>
                                </div>
                                {expandedStat === stat.label && (
                                    <StatDistributionGraph />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
};

const GeneralPostCard = ({post}) => (
    <Card>
        <div className="flex items-center gap-3 mb-3">
            <UserAvatar user={post.author} size="sm" />
            <div>
                <p className="font-semibold">{post.author.name}</p>
                {'dojang' in post.author && <p className="text-xs text-slate-400">{post.author.dojang} · {post.timestamp}</p>}
                {post.author.name === '익명' && <p className="text-xs text-slate-400">{post.timestamp}</p>}
            </div>
            {'type' in post && <div className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${post.type === 'review' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {post.type === 'review' ? '경기 후기' : '영상 공유'}
            </div>}
        </div>
        <h3 className="font-semibold text-slate-200 mb-1">{post.title}</h3>
        <p className="text-sm text-slate-400 mb-4 line-clamp-3">{post.content}</p>
        {'type' in post && post.type === 'video' && <div className="bg-slate-900 aspect-video rounded-lg flex items-center justify-center"><Video className="w-12 h-12 text-white/50"/></div>}
        <div className="flex items-center gap-4 text-slate-400 pt-4 border-t border-slate-700 mt-4">
            <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"><ThumbsUp className="w-4 h-4" /> <span className="text-sm font-medium">{post.likes}</span></button>
            <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"><MessageSquare className="w-4 h-4" /> <span className="text-sm font-medium">{post.comments}</span></button>
            <button className="flex items-center gap-1.5 ml-auto hover:text-blue-400 transition-colors"><Share2 className="w-4 h-4" /> <span className="text-sm font-medium">공유</span></button>
        </div>
    </Card>
);

const TradePostCard = ({post}) => {
    const statusStyle = {
        '판매중': 'bg-green-500/20 text-green-300',
        '예약중': 'bg-yellow-500/20 text-yellow-300',
        '판매완료': 'bg-slate-600/50 text-slate-400',
    };
    return (
        <Card className="flex gap-4">
            <img src={post.imageUrl} alt={post.itemName} className="w-24 h-24 rounded-lg object-cover bg-slate-700" />
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                    <p className="font-semibold text-slate-200">{post.itemName}</p>
                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold', statusStyle[post.status])}>{post.status}</span>
                </div>
                <p className="text-sm text-slate-400 mt-1 line-clamp-2">{post.description}</p>
                <div className="flex justify-between items-end mt-auto">
                    <p className="text-lg font-bold text-blue-400">{post.price}</p>
                    <p className="text-xs text-slate-500">{post.author.name} · {post.timestamp}</p>
                </div>
            </div>
        </Card>
    );
};

// --- SCREEN COMPONENTS ---
const GifticonModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold">기프트콘 교환</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-4">
                {gifticonItems.map(category => (
                    <div key={category.category}>
                        <h3 className="font-semibold text-blue-400 mb-2">{category.category}</h3>
                        <div className="space-y-2">
                            {category.items.map(item => (
                                <div key={item} className="bg-slate-700/50 p-3 rounded-lg flex justify-between items-center">
                                    <span className="text-sm">{item}</span>
                                    <button onClick={() => alert(`${item} 교환 신청!`)} className="text-xs bg-slate-600 px-3 py-1 rounded-md hover:bg-slate-500">교환</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const QuestSelectionModal = ({ onClose, activeQuests, onSave }) => {
    const [selectedQuests, setSelectedQuests] = React.useState(activeQuests);

    const handleToggle = (quest) => {
        setSelectedQuests(prev => {
            const isSelected = prev.some(q => q.id === quest.id);
            if (isSelected) {
                return prev.filter(q => q.id !== quest.id);
            }
            if (prev.length < 10) {
                return [...prev, quest];
            }
            return prev;
        });
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold">이달의 퀘스트 설정</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto space-y-2">
                    <p className="text-xs text-slate-400 mb-2">최대 10개의 퀘스트를 선택할 수 있습니다.</p>
                    {questList.map(quest => {
                        const isSelected = selectedQuests.some(q => q.id === quest.id);
                        const canSelectMore = selectedQuests.length < 10;
                        return (
                            <button 
                                key={quest.id}
                                onClick={() => handleToggle(quest)}
                                disabled={!isSelected && !canSelectMore}
                                className={cn(
                                    "w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors",
                                    "bg-slate-700/50 text-slate-200 hover:bg-slate-700",
                                    !canSelectMore && !isSelected && "opacity-60 cursor-not-allowed"
                                )}
                            >
                                {isSelected ? <CheckSquare className="w-5 h-5 text-blue-400" /> : <Square className="w-5 h-5 text-slate-500" />}
                                <span>{quest.text}</span>
                            </button>
                        )
                    })}
                </div>
                <div className="p-4 flex-shrink-0 border-t border-slate-700 flex gap-3">
                    <button onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">취소</button>
                    <button onClick={() => onSave(selectedQuests)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">저장</button>
                </div>
            </div>
        </div>
    );
};

const GoalSettingModal = ({ onClose }) => {
    const [year, setYear] = React.useState(2025);
    const [isSaved, setIsSaved] = React.useState(false);

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => {
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 text-white relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                <h2 className="text-xl font-bold text-center mb-4">목표 설정</h2>
                <div className="flex justify-center bg-slate-700 p-1 rounded-lg mb-4">
                    <button onClick={() => setYear(2025)} className={cn('w-1/2 py-1.5 rounded-md text-sm font-semibold', year === 2025 ? 'bg-blue-600' : 'hover:bg-slate-600')}>2025년</button>
                    <button onClick={() => setYear(2026)} className={cn('w-1/2 py-1.5 rounded-md text-sm font-semibold', year === 2026 ? 'bg-blue-600' : 'hover:bg-slate-600')}>2026년</button>
                </div>
                <textarea rows={5} placeholder={`${year}년 목표를 입력하세요...`} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white placeholder:text-slate-500"></textarea>
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-slate-300 mb-2">기본 목표</h3>
                    <label className="flex items-center gap-2 cursor-pointer bg-slate-700/50 p-2 rounded-lg">
                        <input type="checkbox" className="w-4 h-4 accent-blue-500" />
                        <span>100인 베기</span>
                    </label>
                </div>
                <div className="flex gap-3 mt-4">
                    <button onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">취소</button>
                    <button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">저장</button>
                </div>
                {isSaved && <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-green-500/90 text-white px-4 py-2 rounded-lg text-sm">목표가 저장되었습니다.</div>}
            </div>
        </div>
    );
};

const HomeScreen = ({ user, onNavigate }) => {
  const upcomingMatches = mockMatchHistory.filter(m => m.status === 'upcoming');
  const [isGoalModalOpen, setIsGoalModalOpen] = React.useState(false);
  const [isGifticonModalOpen, setIsGifticonModalOpen] = React.useState(false);
  const [isQuestModalOpen, setIsQuestModalOpen] = React.useState(false);
  const [activeQuests, setActiveQuests] = React.useState(questList.filter(q => q.selected));
  const [isAvatarSpaceOpen, setIsAvatarSpaceOpen] = React.useState(false);

  const handleSaveQuests = (newQuests) => {
      setActiveQuests(newQuests);
      setIsQuestModalOpen(false);
  };

  const getDday = (dateString) => {
      const today = new Date('2025-07-21'); // Assuming today is July 21, 2025
      const matchDate = new Date(dateString);
      const diffTime = matchDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
  };

  return (
  <>
    <div className="p-4 space-y-6 text-white">
        <Card>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <UserAvatar user={user} />
                    <div>
                        <p className="text-slate-400">환영합니다,</p>
                        <h1 className="text-2xl font-bold">{user.name}님</h1>
                    </div>
                </div>
                <div onClick={() => setIsAvatarSpaceOpen(true)} className="text-center cursor-pointer p-2 rounded-lg hover:bg-slate-700/50">
                    <AvatarIconSVG />
                    <p className="text-xs font-semibold mt-1">나의 공간</p>
                </div>
            </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-blue-500">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-blue-200">플랫폼 랭크</p>
                    <p className="text-3xl font-bold text-white">{user.platformRank} P</p>
                </div>
                <div className="text-right">
                    <p className="text-blue-200">공인 등급</p>
                    <p className="text-xl font-semibold text-white flex items-center gap-2">{user.officialRank} <ShieldCheck className="w-5 h-5 text-yellow-300"/></p>
                </div>
            </div>
             <button onClick={() => setIsGifticonModalOpen(true)} className="mt-3 w-full flex items-center justify-center gap-2 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 font-bold py-2 rounded-lg text-sm transition-colors">
                <Gift size={16} /> 기프트콘 교환하기
            </button>
        </Card>

        {upcomingMatches.length > 0 && <div>
            <h2 className="text-xl font-semibold mb-3">다가오는 대련</h2>
            <div className="space-y-3">
            {upcomingMatches.slice(0, 2).map(match => {
                const dDay = getDday(match.date);
                return (
                    <Card key={match.id}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <UserAvatar user={match.opponent} size="sm" />
                                <div>
                                    <p className="font-semibold">{match.opponent.name}</p>
                                    <p className="text-sm text-slate-400">{match.opponent.officialRank} / {match.opponent.platformRank}P</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-blue-400">{match.date}</p>
                                <p className={cn("text-sm font-bold", dDay <= 7 ? "text-red-400" : "text-slate-500")}>D-{dDay}</p>
                            </div>
                        </div>
                    </Card>
                )
            })}
            </div>
        </div>}

        <div>
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">이달의 퀘스트</h2>
                <button onClick={() => setIsQuestModalOpen(true)} className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg transition-colors">퀘스트 설정</button>
            </div>
            <div className="space-y-3">
                {activeQuests.map(quest => (
                     <Card key={quest.id} className="bg-gradient-to-r from-green-500 to-teal-600 border-green-500">
                        <div className="flex justify-between items-center">
                            <p className="font-bold">{quest.text}</p>
                            <p className="text-sm font-semibold opacity-90">{`${quest.current} / ${quest.target}${quest.unit}`}</p>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2.5 mt-2">
                            <div className="bg-white rounded-full h-2.5" style={{ width: `${(quest.current / quest.target) * 100}%` }}></div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>

        <div>
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">2025년 목표</h2>
                <button onClick={() => setIsGoalModalOpen(true)} className="p-2 text-slate-400 hover:text-white"><Settings size={18} /></button>
            </div>
            <Card>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">사범자격심사 도전</span>
                        <span className="flex items-center gap-1.5 text-green-400 font-semibold text-sm"><CheckCircle2 className="w-4 h-4" /> 완료</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium">4단 강습회 참석</span>
                        <span className="text-slate-500 font-semibold text-sm">예정</span>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">100인 베기</span>
                            <span className="font-semibold text-sm">57 / 100명</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2.5"><div className="bg-blue-500 rounded-full h-2.5" style={{ width: '57%' }}></div></div>
                    </div>
                </div>
            </Card>
        </div>

        <div>
            <h2 className="text-xl font-semibold mb-3">빠른 메뉴</h2>
            <div className="grid grid-cols-2 gap-4">
                <Card onClick={() => onNavigate('match')} className="items-center justify-center flex flex-col text-center"><Swords className="w-8 h-8 text-blue-400 mb-2" /><span className="font-semibold">대련 상대 찾기</span></Card>
                <Card onClick={() => onNavigate('community')} className="items-center justify-center flex flex-col text-center"><Users className="w-8 h-8 text-green-400 mb-2" /><span className="font-semibold">커뮤니티</span></Card>
            </div>
        </div>
    </div>
    {isGoalModalOpen && <GoalSettingModal onClose={() => setIsGoalModalOpen(false)} />}
    {isGifticonModalOpen && <GifticonModal onClose={() => setIsGifticonModalOpen(false)} />}
    {isQuestModalOpen && <QuestSelectionModal onClose={() => setIsQuestModalOpen(false)} activeQuests={activeQuests} onSave={handleSaveQuests} />}
    {isAvatarSpaceOpen && <AvatarSpaceModal user={user} onClose={() => setIsAvatarSpaceOpen(false)} />}
  </>
  );
};

const MatchRequestModal = ({ user, onClose }) => {
    const [matchType, setMatchType] = React.useState('public');
    const [privacySettings, setPrivacySettings] = React.useState({ video: true, comments: true, likes: true, commentary: true });
    const [isSent, setIsSent] = React.useState(false);

    const handleCheckboxChange = (key) => {
        setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSendRequest = () => {
        setIsSent(true);
        setTimeout(() => {
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 text-white relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white">
                    <X size={20} />
                </button>
                <h2 className="text-xl font-bold text-center mb-4">대련 신청</h2>
                
                <Card className="mb-4">
                    <div className="flex items-center gap-4">
                        <UserAvatar user={user} size="md" />
                        <div>
                            <p className="text-lg font-bold">{user.name}</p>
                            <p className="text-sm text-slate-300">{user.officialRank} / {user.location}</p>
                            <p className="text-sm text-slate-400">{user.wins}승 {user.losses}패</p>
                        </div>
                    </div>
                </Card>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">날짜 선택</label>
                        <input type="date" className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Match Type</label>
                        <div className="flex bg-slate-700 p-1 rounded-lg">
                            <button onClick={() => setMatchType('public')} className={cn('w-1/2 py-1.5 rounded-md text-sm font-semibold', matchType === 'public' ? 'bg-blue-600' : 'hover:bg-slate-600')}>전체 공개</button>
                            <button onClick={() => setMatchType('private')} className={cn('w-1/2 py-1.5 rounded-md text-sm font-semibold', matchType === 'private' ? 'bg-blue-600' : 'hover:bg-slate-600')}>협의 공개</button>
                        </div>
                    </div>
                    {matchType === 'private' && (
                        <div className="bg-slate-700/50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-slate-300 mb-2">공개 범위 설정</p>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.keys(privacySettings).map(key => (
                                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={privacySettings[key]} onChange={() => handleCheckboxChange(key)} className="w-4 h-4 accent-blue-500"/>
                                        <span className="text-sm capitalize">{key}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                     <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">기타</label>
                        <textarea rows={2} placeholder="하고 싶은 말을 남겨주세요." className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white placeholder:text-slate-500"></textarea>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">취소</button>
                    <button onClick={handleSendRequest} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">신청</button>
                </div>
                 {isSent && <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-green-500/90 text-white px-4 py-2 rounded-lg text-sm">{user.name}님에게 대련을 신청했습니다.</div>}
            </div>
        </div>
    );
};

const MatchScreen = () => {
    const [filter, setFilter] = React.useState('distance');
    const [modalUser, setModalUser] = React.useState(null);

    const filterTabs = [
        { id: 'distance', label: '거리순' },
        { id: 'experience', label: '경력순' },
        { id: 'rank', label: '단수' },
        { id: 'score', label: '최고점수' },
        { id: 'wins', label: '최다승' },
        { id: 'matches', label: '최다도전' },
    ];

    const sortedUsers = [...mockUsers].sort((a, b) => {
        switch(filter) {
            case 'experience': return (b.wins + b.losses) - (a.wins + a.losses);
            case 'rank': return parseInt(b.officialRank) - parseInt(a.officialRank);
            case 'score': return b.platformRank - a.platformRank;
            case 'wins': return b.wins - a.wins;
            case 'matches': return (b.wins + b.losses) - (a.wins + a.losses);
            case 'distance':
            default:
                return Math.abs(a.platformRank - currentUser.platformRank) - Math.abs(b.platformRank - currentUser.platformRank);
        }
    });

    return (
        <>
            <div className="p-4 space-y-4 text-white">
                <h1 className="text-2xl font-bold">대련 상대 찾기</h1>
                <div className="flex border-b border-slate-700 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {filterTabs.map(tab => (
                        <button key={tab.id} onClick={() => setFilter(tab.id)} className={cn('px-4 py-2 text-sm font-semibold whitespace-nowrap', filter === tab.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 border-b-2 border-transparent hover:text-slate-200')}>
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="space-y-3">
                    {sortedUsers.map(user => (
                        <Card key={user.id} className="flex items-center space-x-4">
                            <UserAvatar user={user} />
                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <p className="text-lg font-bold">{user.name}</p>
                                    <span className="text-sm font-semibold text-yellow-400 flex items-center"><Star className="w-4 h-4 mr-1" />{user.officialRank}</span>
                                </div>
                                <p className="text-sm text-slate-400 flex items-center"><MapPin className="w-3 h-3 mr-1.5" />{user.location} / {user.dojang}</p>
                                <p className="text-sm text-slate-300 mt-1">{user.platformRank}P ({user.wins}승 / {user.losses}패)</p>
                            </div>
                            <button onClick={() => setModalUser(user)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors flex-shrink-0">신청</button>
                        </Card>
                    ))}
                </div>
            </div>
            {modalUser && <MatchRequestModal user={modalUser} onClose={() => setModalUser(null)} />}
        </>
    );
};

const RankingTrendModal = ({ user, onClose }) => {
    const data = user.rankHistory;
    const minRank = Math.min(...data.map(p => p.rank));
    const maxRank = Math.max(...data.map(p => p.rank));
    const points = data.map((p, i) => `${i * 60},${90 - (p.rank - minRank) / (maxRank - minRank) * 80}`).join(' ');

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 text-white relative">
                 <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                 <div className="flex items-center gap-3 mb-4">
                    <UserAvatar user={user} size="sm" />
                    <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-sm text-slate-400">최근 랭크 추이</p>
                    </div>
                </div>
                <div className="h-40">
                    <svg viewBox="0 0 180 100" className="w-full h-full">
                        <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={points} />
                        {data.map((p, i) => <circle key={i} cx={i * 60} cy={90 - (p.rank - minRank) / (maxRank - minRank) * 80} r="3" fill="#3b82f6" />)}
                    </svg>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1월</span><span>3월</span><span>5월</span><span>7월</span>
                </div>
            </div>
        </div>
    );
};

const RankingScreen = () => {
    const [period, setPeriod] = React.useState('month');
    const [criteria, setCriteria] = React.useState('score');
    const [selectedUser, setSelectedUser] = React.useState(null);

    const playersOnMap = allUsers;
    const mapPositions = [
        { left: '40%', top: '55%' }, { left: '20%', top: '25%' }, { left: '70%', top: '65%' },
        { left: '50%', top: '15%' }, { left: '15%', top: '60%' }, { left: '80%', top: '30%' },
        { left: '30%', top: '80%' },
    ];
    
    const currentRankings = allRankings[period][criteria];

    return (
        <>
        <div className="p-4 space-y-4 text-white">
            <h1 className="text-2xl font-bold">랭킹</h1>
            <Card>
                <h3 className="font-semibold mb-3">지역별 TOP</h3>
                <div className="bg-slate-700 h-64 rounded-lg relative">
                    {/* Mock Map */}
                    <svg width="100%" height="100%" viewBox="0 0 200 150">
                        <path d="M 10 140 C 30 100, 50 80, 70 60 S 100 20, 130 10 L 190 10" stroke="#475569" strokeWidth="2" fill="none"/>
                        <path d="M 40 130 C 60 100, 80 90, 100 80 S 130 60, 160 50 L 190 40" stroke="#475569" strokeWidth="2" fill="none"/>
                    </svg>
                    {playersOnMap.map((player, index) => (
                        <div key={player.id} className="absolute group" style={mapPositions[index]}>
                            <UserAvatar user={player} size="sm" />
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 text-xs font-bold bg-slate-900/50 px-1.5 py-0.5 rounded whitespace-nowrap">
                                <Trophy className="w-3 h-3 text-yellow-400"/>
                                <span>{player.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
            <div>
                <div className="flex justify-center bg-slate-800 p-1 rounded-lg mb-2">
                     <button onClick={() => setPeriod('month')} className={cn('w-1/3 py-1.5 rounded-md text-sm font-semibold', period === 'month' ? 'bg-blue-600' : 'hover:bg-slate-700')}>1달</button>
                     <button onClick={() => setPeriod('season')} className={cn('w-1/3 py-1.5 rounded-md text-sm font-semibold', period === 'season' ? 'bg-blue-600' : 'hover:bg-slate-700')}>시즌</button>
                     <button onClick={() => setPeriod('year')} className={cn('w-1/3 py-1.5 rounded-md text-sm font-semibold', period === 'year' ? 'bg-blue-600' : 'hover:bg-slate-700')}>1년</button>
                </div>
                 <div className="flex justify-center bg-slate-800 p-1 rounded-lg">
                     <button onClick={() => setCriteria('score')} className={cn('w-1/2 py-1.5 rounded-md text-sm font-semibold', criteria === 'score' ? 'bg-blue-600' : 'hover:bg-slate-700')}>최고점</button>
                     <button onClick={() => setCriteria('wins')} className={cn('w-1/2 py-1.5 rounded-md text-sm font-semibold', criteria === 'wins' ? 'bg-blue-600' : 'hover:bg-slate-700')}>최다승</button>
                </div>
            </div>
            <div className="space-y-2">
                {currentRankings.map(({ user, points, wins, rankChange }, index) => (
                    <Card key={user.id} onClick={() => setSelectedUser(user)} className={cn('flex items-center space-x-3', user.id === currentUser.id && 'bg-blue-900/50 border-blue-500')}>
                        <span className="text-xl font-bold w-8 text-center text-slate-400">{index + 1}</span>
                        <UserAvatar user={user} size="sm" />
                        <div className="flex-grow">
                            <div className="flex flex-col items-start">
                                <div className="flex items-center h-4">
                                    {index === 0 && <Trophy className="w-4 h-4 text-yellow-400" />}
                                    {rankChange >= 3 && <Flame className="w-4 h-4 text-orange-500" />}
                                </div>
                                <p className="font-bold">{user.name}</p>
                                <p className="text-sm text-slate-400">{user.officialRank} / {user.dojang}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 text-right">
                                {rankChange > 0 && <span className="flex items-center justify-end text-green-400 text-xs font-semibold"><ArrowUp size={14} /> +{rankChange}</span>}
                                {rankChange < 0 && <span className="flex items-center justify-end text-red-400 text-xs font-semibold"><ArrowDown size={14} /> {rankChange}</span>}
                                {rankChange === 0 && <span className="text-slate-500 text-xs font-semibold">-</span>}
                            </div>
                            <div className="text-right w-20">
                                <p className="font-semibold text-blue-400">{criteria === 'score' ? `${points} P` : `${wins} 승`}</p>
                                <p className="text-xs text-slate-500">{user.wins}W {user.losses}L</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
        {selectedUser && <RankingTrendModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
        </>
    );
};

const InviteModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold">멤버 초대</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-3">
                {allUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between bg-slate-700/50 p-2 rounded-lg">
                        <div className="flex items-center gap-3">
                            <UserAvatar user={user} size="sm" />
                            <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-xs text-slate-400">{user.dojang}</p>
                            </div>
                        </div>
                        <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                    </div>
                ))}
            </div>
            <div className="p-4 flex-shrink-0">
                 <button onClick={() => { alert('초대를 보냈습니다.'); onClose(); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">초대하기</button>
            </div>
        </div>
    </div>
);

const CommunityScreen = () => {
    const [activeCategory, setActiveCategory] = React.useState('chat');
    const [selectedChat, setSelectedChat] = React.useState(null);
    const [isInviteModalOpen, setIsInviteModalOpen] = React.useState(false);

    const CategoryButton = ({cat, label}) => (
        <button onClick={() => setActiveCategory(cat)} className={cn('px-4 py-2 text-sm font-semibold whitespace-nowrap', activeCategory === cat ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 border-b-2 border-transparent hover:text-slate-200')}>
            {label}
        </button>
    );
    
    const ChatWindow = ({ chat, onBack }) => (
        <div className="h-full flex flex-col">
            <div className="flex items-center p-3 border-b border-slate-700">
                <button onClick={onBack} className="mr-3 p-1 text-white text-2xl font-bold">&lt;</button>
                <UserAvatar user={chat.partner} size="sm"/>
                <div className="ml-3">
                    <p className="font-bold">{chat.partner.name}</p>
                    {'members' in chat.partner && <p className="text-xs text-slate-400">{chat.partner.members}명</p>}
                </div>
                {chat.type === 'club' && (
                    <button onClick={() => setIsInviteModalOpen(true)} className="ml-auto p-2 text-slate-300 hover:text-white">
                        <PlusCircle size={20} />
                    </button>
                )}
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {chat.messages.map(msg => (
                    <div key={msg.id} className={cn('flex items-end gap-2', msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
                        {msg.sender !== 'me' && <UserAvatar user={allUsers.find(u => u.name === msg.sender) || {name: '?'}} size="sm"/>}
                        <div className={cn('max-w-[70%] p-3 rounded-2xl', msg.sender === 'me' ? 'bg-blue-600 rounded-br-none' : 'bg-slate-700 rounded-bl-none')}>
                            {msg.sender !== 'me' && <p className="text-xs font-bold text-blue-300 mb-1">{msg.sender}</p>}
                            <p>{msg.text}</p>
                            <p className="text-xs text-slate-400 mt-1 text-right">{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
                 {chat.messages.length === 0 && <p className="text-center text-sm text-slate-500">대화 기록이 없습니다.</p>}
            </div>
            <div className="p-2 border-t border-slate-700 flex items-center gap-2">
                <input type="text" placeholder="메시지 입력..." className="flex-1 bg-slate-700 rounded-full py-2 px-4 text-white placeholder:text-slate-500" />
                <button className="bg-blue-600 p-2 rounded-full"><Send size={18}/></button>
            </div>
        </div>
    );

    const ShopScreen = () => (
        <div className="grid grid-cols-2 gap-4">
            {shopItems.map((item) => (
                <Card key={item.id}>
                    <img src={item.imageUrl} alt={item.name} className="bg-slate-700 aspect-square rounded-lg mb-2 object-cover" />
                    <p className="font-semibold text-sm truncate">{item.name}</p>
                    <p className="text-xs text-blue-400">{item.price}</p>
                </Card>
            ))}
        </div>
    );

    if (selectedChat) {
        return (
            <>
                <ChatWindow chat={selectedChat} onBack={() => setSelectedChat(null)} />
                {isInviteModalOpen && <InviteModal onClose={() => setIsInviteModalOpen(false)} />}
            </>
        );
    }

    return (
        <div className="p-4 space-y-4 text-white">
            <h1 className="text-2xl font-bold">커뮤니티</h1>
            <div className="flex border-b border-slate-700 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <CategoryButton cat="chat" label="채팅" />
                <CategoryButton cat="general" label="수다방" />
                <CategoryButton cat="anonymous" label="익명방" />
                <CategoryButton cat="trade" label="거래방" />
                <CategoryButton cat="shop" label="상점" />
            </div>
            
            <div className="space-y-2">
                {activeCategory === 'chat' && mockChats.map(chat => (
                    <div key={chat.id} onClick={() => setSelectedChat(chat)} className="flex items-center p-2 gap-3 hover:bg-slate-800 rounded-lg cursor-pointer">
                        <UserAvatar user={chat.partner} size="sm" />
                        <div className="flex-1 overflow-hidden">
                            <div className="flex justify-between">
                                <p className="font-bold truncate">{chat.partner.name}{'members' in chat.partner && ` (${chat.partner.members})`}</p>
                                <p className="text-xs text-slate-400 flex-shrink-0">{chat.timestamp}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-slate-400 truncate">{chat.lastMessage}</p>
                                {chat.unread > 0 && <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">{chat.unread}</span>}
                            </div>
                        </div>
                    </div>
                ))}
                {activeCategory === 'general' && communityPosts.map(post => <GeneralPostCard key={post.id} post={post} />)}
                {activeCategory === 'anonymous' && anonymousPosts.map(post => <GeneralPostCard key={post.id} post={post} />)}
                {activeCategory === 'trade' && tradePosts.map(post => <TradePostCard key={post.id} post={post} />)}
                {activeCategory === 'shop' && <ShopScreen />}
            </div>
        </div>
    );
};

const MatchDetailModal = ({ match, onClose }) => {
    const PrivacySettingItem = ({ enabled, label }) => (
        <div className="flex items-center gap-2">
            {enabled ? <Unlock size={14} className="text-green-400" /> : <Lock size={14} className="text-red-400" />}
            <span className={cn("text-sm", enabled ? "text-slate-300" : "text-slate-500 line-through")}>{label}</span>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700">
                    <h2 className="text-lg font-bold">경기 상세 정보</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                
                <div className="p-4 overflow-y-auto space-y-4">
                    <Card>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <UserAvatar user={currentUser} size="sm" />
                                <p className="font-bold">{currentUser.name}</p>
                            </div>
                            <div className="text-center">
                                <p className={cn("font-bold text-xl", match.result === 'win' ? 'text-green-400' : 'text-red-400')}>{match.result?.toUpperCase()}</p>
                                <p className="font-semibold">{match.score}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="font-bold text-right">{match.opponent.name}</p>
                                <UserAvatar user={match.opponent} size="sm" />
                            </div>
                        </div>
                        <p className="text-center text-sm text-slate-400 mt-2">{match.date}</p>
                    </Card>

                    {match.privacy === 'public' && (
                        <>
                            {match.videoUrl && <div className="bg-slate-900 aspect-video rounded-lg flex items-center justify-center"><Video className="w-12 h-12 text-white/50"/></div>}
                            <div className="flex justify-center gap-4">
                                <button className="flex items-center gap-2 text-slate-300 hover:text-green-400"><ThumbsUp/> {match.likes}</button>
                                <button className="flex items-center gap-2 text-slate-300 hover:text-red-400"><ThumbsDown/> {match.dislikes}</button>
                            </div>
                            {match.commentary && <Card><h3 className="font-semibold mb-2 text-blue-400">해설</h3><p className="text-sm text-slate-300 italic">"{match.commentary}"</p></Card>}
                            <div>
                                <h3 className="font-semibold mb-2">익명 댓글 ({match.comments.length})</h3>
                                <div className="space-y-2">
                                    {match.comments.map(c => <p key={c.id} className="text-sm bg-slate-700 p-2 rounded-lg">{c.text}</p>)}
                                </div>
                            </div>
                        </>
                    )}

                    {match.privacy === 'private' && (
                         <>
                            {match.privacySettings?.video ? 
                                <div className="bg-slate-900 aspect-video rounded-lg flex items-center justify-center"><Video className="w-12 h-12 text-white/50"/></div>
                                : <Card className="text-center text-slate-500">비공개 영상입니다.</Card>
                            }
                            <Card>
                                <h3 className="font-semibold mb-3 text-blue-400">공개 설정</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <PrivacySettingItem enabled={match.privacySettings?.video ?? false} label="영상 공개" />
                                    <PrivacySettingItem enabled={match.privacySettings?.comments ?? false} label="댓글 허용" />
                                    <PrivacySettingItem enabled={match.privacySettings?.likes ?? false} label="좋아요 허용" />
                                    <PrivacySettingItem enabled={match.privacySettings?.commentary ?? false} label="해설 공개" />
                                </div>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const AvatarIconSVG = () => (
    <svg width="80" height="80" viewBox="0 0 28 28" shapeRendering="crispEdges" className="bg-slate-700 p-1 rounded-lg">
        <rect x="9" y="4" width="2" height="1" fill="#272727"/> <rect x="11" y="4" width="6" height="1" fill="#363636"/> <rect x="17" y="4" width="2" height="1" fill="#272727"/>
        <rect x="7" y="5" width="2" height="1" fill="#272727"/> <rect x="9" y="5" width="2" height="1" fill="#363636"/> <rect x="11" y="5" width="6" height="1" fill="#4e4e4e"/> <rect x="17" y="5" width="2" height="1" fill="#363636"/> <rect x="19" y="5" width="2" height="1" fill="#272727"/>
        <rect x="6" y="6" width="1" height="1" fill="#272727"/> <rect x="7" y="6" width="2" height="1" fill="#363636"/> <rect x="9" y="6" width="10" height="1" fill="#4e4e4e"/> <rect x="19" y="6" width="2" height="1" fill="#363636"/> <rect x="21" y="6" width="1" height="1" fill="#272727"/>
        <rect x="5" y="7" width="1" height="1" fill="#272727"/> <rect x="6" y="7" width="1" height="1" fill="#363636"/> <rect x="7" y="7" width="14" height="1" fill="#4e4e4e"/> <rect x="21" y="7" width="1" height="1" fill="#363636"/> <rect x="22" y="7" width="1" height="1" fill="#272727"/>
        <rect x="5" y="8" width="1" height="1" fill="#363636"/> <rect x="6" y="8" width="16" height="1" fill="#4e4e4e"/> <rect x="22" y="8" width="1" height="1" fill="#363636"/>
        <rect x="5" y="9" width="1" height="1" fill="#363636"/> <rect x="6" y="9" width="16" height="1" fill="#4e4e4e"/> <rect x="22" y="9" width="1" height="1" fill="#363636"/>
        <rect x="5" y="10" width="1" height="1" fill="#363636"/> <rect x="6" y="10" width="16" height="1" fill="#4e4e4e"/> <rect x="22" y="10" width="1" height="1" fill="#363636"/>
        <rect x="6" y="11" width="16" height="1" fill="#4e4e4e"/>
        <rect x="6" y="12" width="1" height="1" fill="#4e4e4e"/> <rect x="7" y="12" width="2" height="1" fill="#c1c1c1"/> <rect x="9" y="12" width="10" height="1" fill="#4e4e4e"/> <rect x="19" y="12" width="2" height="1" fill="#c1c1c1"/> <rect x="21" y="12" width="1" height="1" fill="#4e4e4e"/>
        <rect x="7" y="13" width="2" height="1" fill="#c1c1c1"/> <rect x="9" y="13" width="1" height="1" fill="#4e4e4e"/> <rect x="10" y="13" width="3" height="1" fill="#f1d3b4"/> <rect x="13" y="13" width="2" height="1" fill="#4e4e4e"/> <rect x="15" y="13" width="3" height="1" fill="#f1d3b4"/> <rect x="18" y="13" width="1" height="1" fill="#4e4e4e"/> <rect x="19" y="13" width="2" height="1" fill="#c1c1c1"/>
        <rect x="7" y="14" width="1" height="1" fill="#c1c1c1"/> <rect x="8" y="14" width="1" height="1" fill="#4e4e4e"/> <rect x="9" y="14" width="1" height="1" fill="#f1d3b4"/> <rect x="10" y="14" width="1" height="1" fill="#4e4e4e"/> <rect x="11" y="14" width="6" height="1" fill="#f1d3b4"/> <rect x="17" y="14" width="1" height="1" fill="#4e4e4e"/> <rect x="18" y="14" width="1" height="1" fill="#f1d3b4"/> <rect x="19" y="14" width="1" height="1" fill="#4e4e4e"/> <rect x="20" y="14" width="1" height="1" fill="#c1c1c1"/>
        <rect x="7" y="15" width="1" height="1" fill="#c1c1c1"/> <rect x="8" y="15" width="1" height="1" fill="#4e4e4e"/> <rect x="9" y="15" width="10" height="1" fill="#f1d3b4"/> <rect x="19" y="15" width="1" height="1" fill="#4e4e4e"/> <rect x="20" y="15" width="1" height="1" fill="#c1c1c1"/>
        <rect x="8" y="16" width="1" height="1" fill="#4e4e4e"/> <rect x="9" y="16" width="10" height="1" fill="#e2c1a0"/> <rect x="19" y="16" width="1" height="1" fill="#4e4e4e"/>
        <rect x="8" y="17" width="1" height="1" fill="#4e4e4e"/> <rect x="9" y="17" width="2" height="1" fill="#e2c1a0"/> <rect x="11" y="17" width="1" height="1" fill="#4e4e4e"/> <rect x="12" y="17" width="4" height="1" fill="#e2c1a0"/> <rect x="16" y="17" width="1" height="1" fill="#4e4e4e"/> <rect x="17" y="17" width="2" height="1" fill="#e2c1a0"/> <rect x="19" y="17" width="1" height="1" fill="#4e4e4e"/>
        <rect x="9" y="18" width="1" height="1" fill="#4e4e4e"/> <rect x="10" y="18" width="8" height="1" fill="#e2c1a0"/> <rect x="18" y="18" width="1" height="1" fill="#4e4e4e"/>
        <rect x="9" y="19" width="1" height="1" fill="#4e4e4e"/> <rect x="10" y="19" width="2" height="1" fill="#e2c1a0"/> <rect x="12" y="19" width="4" height="1" fill="#c1c1c1"/> <rect x="16" y="19" width="2" height="1" fill="#e2c1a0"/> <rect x="18" y="19" width="1" height="1" fill="#4e4e4e"/>
        <rect x="10" y="20" width="1" height="1" fill="#4e4e4e"/> <rect x="11" y="20" width="6" height="1" fill="#c1c1c1"/> <rect x="17" y="20" width="1" height="1" fill="#4e4e4e"/>
        <rect x="11" y="21" width="6" height="1" fill="#4e4e4e"/>
    </svg>
);

const AvatarDojoSVG = () => (
    <svg width="100%" height="100%" viewBox="0 0 160 120" className="absolute inset-0">
        <defs>
            <pattern id="tatami" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                <path d="M 0,0 l 10,0 m -5, -5 l 0,10" stroke="#b45309" strokeWidth="1"/>
            </pattern>
        </defs>
        <rect width="160" height="120" fill="#475569" />
        <rect y="60" width="160" height="60" fill="url(#tatami)" />
        {/* Hogu Stand */}
        <g transform="translate(120, 50)">
            <rect x="0" y="0" width="20" height="5" fill="#5c2d08"/>
            <rect x="8" y="5" width="4" height="25" fill="#5c2d08"/>
            <rect x="2" y="30" width="16" height="3" fill="#5c2d08"/>
             <path d="M 2 33 L 0 40 L 20 40 L 18 33 Z" fill="#5c2d08"/>
            {/* Hogu */}
            <rect x="3" y="10" width="14" height="16" fill="#1e293b" rx="2"/>
            <rect x="5" y="26" width="10" height="8" fill="#1e293b" />
        </g>
        {/* Clothes Hanger */}
         <g transform="translate(20, 40)">
            <path d="M 0 10 L 20 10 L 20 5 L 18 5 L 18 8 L 2 8 L 2 0 L 0 0 Z" fill="#5c2d08" />
            {/* Dobok */}
            <path d="M 4 10 L 4 25 L 16 25 L 16 10 L 12 10 L 10 15 L 8 10 Z" fill="#f1f5f9"/>
        </g>
        <g className="animate-thrust" style={{transformOrigin: '50px 100px'}}>
            <rect x="40" y="40" width="20" height="40" fill="#1e293b" rx="4"/>
            <rect x="34" y="28" width="32" height="32" fill="#d1d5db" rx="16"/>
            <rect x="38" y="38" width="24" height="6" fill="#1e293b" />
            <rect x="60" y="50" width="60" height="4" fill="#a16207" rx="2" style={{transform: 'rotate(-15deg)'}}/>
        </g>
    </svg>
);

const DetailViewModal = ({ type, onClose }) => {
    const title = type === 'comments' ? '댓글' : '좋아요';
    const mockData = type === 'comments' 
        ? ["완전 싸이월드구만!", "도토리로 도북, 죽도사는건가요 ㅋㅋ", "도장바닥 얼마에 까셨나요?ㅋㅋ", "도복 디자인 넘 좋은데요", "도복이 멋지네요!"]
        : mockUsers.slice(0, 4).map(u => u.name);

    return (
        <div className="absolute inset-0 bg-slate-800/90 backdrop-blur-sm z-30 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold">{title}</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto">
                {type === 'comments' ? (
                    <div className="space-y-2">
                        {mockData.map((comment, i) => <p key={i} className="text-sm bg-slate-700 p-2 rounded-lg"><span className="font-semibold text-blue-400">익명:</span> {comment}</p>)}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {mockData.map((name, i) => (
                             <div key={i} className="flex items-center gap-3 bg-slate-700 p-2 rounded-lg">
                                <UserAvatar user={mockUsers.find(u => u.name === name)} size="sm" />
                                <p className="font-semibold">{name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const AvatarSpaceModal = ({ user, onClose }) => {
    const [isPublic, setIsPublic] = React.useState(true);
    const [detailView, setDetailView] = React.useState(null);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white relative p-4 flex flex-col max-h-[90vh] overflow-hidden">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white z-40 bg-slate-800/50 rounded-full">
                    <X size={20} />
                </button>
                <div className="w-full aspect-video bg-slate-700 rounded-lg relative overflow-hidden">
                   <AvatarDojoSVG />
                   <div className="absolute bottom-2 left-2 flex items-center gap-3 bg-black/30 p-1.5 rounded-lg">
                       <button onClick={() => setDetailView('comments')} className="flex items-center gap-1 text-xs text-white hover:text-blue-300">
                           <MessageSquare size={14} /> 1.2k
                       </button>
                        <button onClick={() => setDetailView('likes')} className="flex items-center gap-1 text-xs text-white hover:text-red-300">
                           <Heart size={14} /> 2.5k
                       </button>
                   </div>
                </div>
                <div className="flex-grow overflow-y-auto pt-4">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-lg">{user.name}의 공간</h3>
                        <button onClick={() => setIsPublic(!isPublic)} className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-slate-700">
                            {isPublic ? <><CheckSquare size={16} className="text-green-400"/> 공개</> : <><Square size={16} className="text-slate-400"/> 비공개</>}
                        </button>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm bg-slate-700 p-3 rounded-lg"><span className="font-semibold text-blue-400">익명:</span> 완전싸이월드네요!</p>
                        <p className="text-sm bg-slate-700 p-3 rounded-lg"><span className="font-semibold text-blue-400">익명:</span> 도토리로 사는건가요??ㅋㅋ.</p>
                        <p className="text-sm bg-slate-700 p-3 rounded-lg"><span className="font-semibold text-blue-400">익명:</span> 도복이 멋지네요! 얼마에구입하셨나요?</p>
                        <p className="text-sm bg-slate-700 p-3 rounded-lg"><span className="font-semibold text-blue-400">익명:</span> 도장바닥은 이벤트로 받으신건가요?.</p>
                        <p className="text-sm bg-slate-700 p-3 rounded-lg"><span className="font-semibold text-blue-400">익명:</span> 이쁘게 꾸미고 싶네요 저도 ㅋㅋ</p>
                    </div>
                </div>
                {detailView && <DetailViewModal type={detailView} onClose={() => setDetailView(null)} />}
            </div>
        </div>
    );
};


const ProfileScreen = ({ user }) => {
    const [selectedMatch, setSelectedMatch] = React.useState(null);
    const [showAllMatches, setShowAllMatches] = React.useState(false);
    
    const totalBadges = 15;
    const earnedBadges = user.badges;
    const badgeSlots = Array.from({ length: totalBadges }, (_, i) => {
        return i < earnedBadges.length ? earnedBadges[i] : null;
    });

    const completedMatches = mockMatchHistory.filter(m => m.status === 'completed');
    const matchesToShow = showAllMatches ? completedMatches : completedMatches.slice(0, 4);

    return (
        <>
            <div className="p-4 space-y-6 text-white">
                <Card>
                    <div className="flex items-center space-x-4">
                        <UserAvatar user={user} size="lg" />
                        <div>
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            <p className="text-yellow-400 font-semibold text-lg">{user.officialRank}</p>
                            <p className="text-slate-400">{user.dojang} / {user.location}</p>
                        </div>
                    </div>
                </Card>
                
                <DetailedStatsCard stats={user.detailedStats} />

                <div>
                    <h3 className="font-semibold mb-3 text-lg">획득한 배지</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {badgeSlots.map((badge, index) => 
                            badge ? (
                                <Badge key={badge} type={badge} />
                            ) : (
                                <div key={index} className="w-16 h-16 rounded-full bg-slate-800 border-2 border-dashed border-slate-700 flex items-center justify-center">
                                    <Lock className="w-6 h-6 text-slate-600" />
                                </div>
                            )
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-3 text-lg">최근 대련 기록</h3>
                    <div className="space-y-3">
                        {matchesToShow.map(match => (
                            <Card key={match.id} onClick={() => setSelectedMatch(match)} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <UserAvatar user={match.opponent} size="sm" />
                                    <div>
                                        <p className="font-semibold">vs {match.opponent.name}</p>
                                        <p className="text-sm text-slate-400">{match.date}</p>
                                    </div>
                                </div>
                                <div className={cn('px-3 py-1 rounded-full text-sm font-bold',
                                    match.result === 'win' && 'bg-green-500/20 text-green-400',
                                    match.result === 'loss' && 'bg-red-500/20 text-red-400',
                                    match.result === 'draw' && 'bg-slate-500/20 text-slate-300'
                                )}>
                                    {match.result?.toUpperCase()} ({match.score})
                                </div>
                            </Card>
                        ))}
                    </div>
                    {!showAllMatches && completedMatches.length > 4 && (
                        <button onClick={() => setShowAllMatches(true)} className="w-full text-center py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-semibold text-slate-300 mt-3">
                            + 더보기
                        </button>
                    )}
                </div>
            </div>
            {selectedMatch && <MatchDetailModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />}
        </>
    );
};

// --- NEW/UPDATED ANNOUNCEMENTS COMPONENTS ---

const InfoModal = ({ title, date, location, details, onClose, showApplyButton }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 text-white relative">
            <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-sm text-slate-400 mb-4">{date} / {location}</p>
            <p className="text-sm text-slate-300 mb-6">{details}</p>
            <div className="flex gap-3">
                <button onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">닫기</button>
                {showApplyButton && <button onClick={() => { alert(`${title} 참가가 신청되었습니다.`); onClose(); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">참가하기</button>}
            </div>
        </div>
    </div>
);

const PromotionCard = ({ item }) => (
    <Card>
        <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover rounded-lg mb-3" />
        <h3 className="font-bold text-lg text-slate-200">{item.title}</h3>
        <p className="text-sm text-blue-400 font-semibold mb-2">{item.organizer}</p>
        <p className="text-sm text-slate-400">{item.content}</p>
    </Card>
);

const TravelPackageDetailModal = ({ pkg, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold">{pkg.destination}</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-4">
                <img src={pkg.imageUrl} alt={pkg.destination} className="rounded-lg mb-2" />
                <div className="space-y-4">
                    <p className="text-sm text-slate-300">{pkg.description}</p>
                    <div>
                        <h3 className="font-semibold text-blue-400 mb-2">커리큘럼</h3>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            {pkg.details.curriculum.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-blue-400 mb-2">일정</h3>
                        <div className="space-y-1 text-sm">
                           {pkg.details.schedule.map((s, i) => <p key={i}><span className="font-bold">{s.day}:</span> {s.activity}</p>)}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-blue-400 mb-2">주의사항</h3>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            {pkg.details.notes.map((n, i) => <li key={i}>{n}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-blue-400 mb-2">현재 신청 인원 ({pkg.details.applicants.length}/{pkg.maxApplicants})</h3>
                        <p className="text-sm text-slate-400">{pkg.details.applicants.join(', ')}</p>
                    </div>
                </div>
            </div>
             <div className="p-4 flex-shrink-0 border-t border-slate-700">
                 <button disabled={pkg.isConfirmed} onClick={() => alert(`${pkg.destination} 참가 신청!`)} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed">
                    {pkg.isConfirmed ? "모집 마감" : "참가 신청"}
                 </button>
            </div>
        </div>
    </div>
);

// --- [NEW] Theory Exam Components ---
const ExamResultHistoryModal = ({ history, onClose }) => {
    const scores = history.map(h => h.score);
    const chartHeight = 150;
    const chartWidth = 300;
    const yPadding = 20;
    const xPadding = 30;

    const getX = (index) => xPadding + (index / (history.length - 1)) * (chartWidth - xPadding);
    const getY = (score) => chartHeight - yPadding - (score / 100) * (chartHeight - yPadding * 2);

    const linePath = history.length > 1 ? history.map((h, i) => `${getX(i)},${getY(h.score)}`).join(' ') : '';

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold">시험 결과 이력</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto">
                    <h3 className="font-semibold text-blue-400 mb-2">점수 추이</h3>
                    <div className="bg-slate-900/50 p-2 rounded-lg">
                        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
                            {/* Y Axis Labels */}
                            {[0, 25, 50, 75, 100].map(score => (
                                <g key={score}>
                                    <line x1={xPadding} y1={getY(score)} x2={chartWidth} y2={getY(score)} stroke="#475569" strokeDasharray="2" />
                                    <text x={xPadding - 8} y={getY(score) + 4} fill="#94a3b8" fontSize="10" textAnchor="end">{score}</text>
                                </g>
                            ))}
                            {/* Line and Points */}
                            {history.length > 1 && <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={linePath} />}
                            {history.map((h, i) => (
                                <circle key={i} cx={getX(i)} cy={getY(h.score)} r="3" fill="#3b82f6" />
                            ))}
                        </svg>
                    </div>
                    <h3 className="font-semibold text-blue-400 mt-4 mb-2">점수 목록</h3>
                    <div className="space-y-2">
                        {history.slice().reverse().map((item, index) => (
                            <div key={index} className="bg-slate-700/50 p-3 rounded-lg flex justify-between items-center">
                                <span className="text-sm">{item.date}</span>
                                <span className="font-bold text-lg">{item.score}점</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExamQuestionScreen = ({ questions, onFinish }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [userAnswers, setUserAnswers] = React.useState(() =>
        questions.map(q => Array(q.answers.length).fill(''))
    );

    const handleAnswerChange = (blankIndex, value) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex][blankIndex] = value;
        setUserAnswers(newAnswers);
    };

    const currentQuestion = questions[currentQuestionIndex];
    const textParts = currentQuestion.questionText.split('[BLANK]');

    const handleSubmit = () => {
        let correctCount = 0;
        questions.forEach((q, qIndex) => {
            const isCorrect = q.answers.every((correctAnswer, ansIndex) => {
                return userAnswers[qIndex][ansIndex].trim() === correctAnswer.trim();
            });
            if (isCorrect) {
                correctCount++;
            }
        });
        const finalScore = Math.round((correctCount / questions.length) * 100);
        onFinish(finalScore);
    };

    return (
        <div className="p-4 flex flex-col h-full">
            <div className="flex-grow overflow-y-auto">
                <p className="text-sm text-blue-400 font-semibold mb-2">문제 {currentQuestionIndex + 1} / {questions.length}</p>
                <h3 className="font-bold text-lg mb-4">{currentQuestion.title}</h3>
                <div className="text-slate-300 leading-relaxed text-sm">
                    {textParts.map((part, index) => (
                        <React.Fragment key={index}>
                            {part.split('\n').map((line, lineIndex) => <React.Fragment key={lineIndex}>{line}<br/></React.Fragment>)}
                            {index < textParts.length - 1 && (
                                <input
                                    type="text"
                                    value={userAnswers[currentQuestionIndex][index]}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    className="inline-block w-24 mx-1 bg-slate-700 border-b-2 border-slate-500 focus:border-blue-400 text-center text-white outline-none"
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700 flex-shrink-0">
                <button
                    onClick={() => setCurrentQuestionIndex(i => i - 1)}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-600 rounded-lg disabled:opacity-50"
                >
                    <ChevronsLeft size={16} /> 이전
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                    <button
                        onClick={() => setCurrentQuestionIndex(i => i + 1)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-600 rounded-lg"
                    >
                        다음 <ChevronsRight size={16} />
                    </button>
                ) : (
                    <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg">
                        제출하기
                    </button>
                )}
            </div>
        </div>
    );
};

const ExamResultScreen = ({ score, onRetry, onViewResults }) => (
    <div className="p-4 text-center flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-bold mb-2">시험 결과</h2>
        <p className="text-6xl font-bold text-blue-400 mb-6">{score}<span className="text-2xl text-slate-400">점</span></p>
        <div className="w-full space-y-3">
             <button onClick={onViewResults} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">
                결과 보기
            </button>
            <button onClick={onRetry} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                다시 풀기
            </button>
        </div>
    </div>
);

const TheoryExamScreen = () => {
    const [testState, setTestState] = React.useState('idle'); // 'idle', 'ongoing', 'finished'
    const [questions, setQuestions] = React.useState([]);
    const [score, setScore] = React.useState(null);
    const [showHistory, setShowHistory] = React.useState(false);
    const [scoreHistory, setScoreHistory] = React.useState(testScoreHistory);

    const startTest = () => {
        const shuffled = [...kendoTheoryData].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 10));
        setTestState('ongoing');
        setScore(null);
    };

    const finishTest = (finalScore) => {
        setScore(finalScore);
        const newHistoryEntry = {
            date: new Date().toISOString().split('T')[0],
            score: finalScore
        };
        setScoreHistory(prev => [...prev, newHistoryEntry]);
        setTestState('finished');
    };

    const resetTest = () => {
        setTestState('idle');
        setQuestions([]);
        setScore(null);
    };

    if (showHistory) {
        return <ExamResultHistoryModal history={scoreHistory} onClose={() => setShowHistory(false)} />;
    }

    switch (testState) {
        case 'ongoing':
            return <ExamQuestionScreen questions={questions} onFinish={finishTest} />;
        case 'finished':
            return <ExamResultScreen score={score} onRetry={resetTest} onViewResults={() => setShowHistory(true)} />;
        case 'idle':
        default:
            return (
                <div className="p-4 space-y-4">
                    <Card className="text-center">
                        <h2 className="text-xl font-bold mb-2">학과 심사 모의 시험</h2>
                        <p className="text-sm text-slate-400 mb-4">랜덤으로 10문제가 출제됩니다. 빈칸에 알맞은 단어를 입력하세요.</p>
                        <button onClick={startTest} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                            시험 시작
                        </button>
                    </Card>
                    <Card className="text-center">
                         <h2 className="text-xl font-bold mb-2">지난 결과 보기</h2>
                        <p className="text-sm text-slate-400 mb-4">이전 시험 결과 및 점수 추이를 확인합니다.</p>
                        <button onClick={() => setShowHistory(true)} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">
                            결과 보기
                        </button>
                    </Card>
                </div>
            );
    }
};

const AnnouncementsScreen = () => {
    const [activeTab, setActiveTab] = React.useState('theory_exam');
    const [modalContent, setModalContent] = React.useState(null);
    const [selectedTravelPackage, setSelectedTravelPackage] = React.useState(null);

    const announceTabs = [
        { id: 'theory_exam', label: '학과심사' },
        { id: 'kka', label: '대한검도회' },
        { id: 'promo', label: '홍보' },
        { id: 'training', label: '무도수행' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'theory_exam':
                return <TheoryExamScreen />;
            case 'kka':
                return (
                    <div className="space-y-4">
                        <h2 className="font-semibold text-lg px-1 text-slate-300">대한검도회 공지</h2>
                        <Card>
                            <h3 className="text-lg font-semibold mb-2 text-blue-400">공식 시합</h3>
                            <p className="text-sm text-slate-300 mb-4">엑셀파일을 업로드하면, 자동으로 대련자와 매칭되어 시스템 업로드됩니다.</p>
                            <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors">
                                <FileUp size={18} /> 엑셀 파일 업로드
                            </button>
                        </Card>
                        <Card>
                             <h3 className="text-lg font-semibold mb-2 text-blue-400">심사 일정</h3>
                             <div className="space-y-2">
                                {danPromotions.map(p => (
                                    <div key={p.id} className="flex justify-between items-center bg-slate-700/50 p-2 rounded-lg">
                                        <p className="font-medium text-sm">{p.title}</p>
                                        <button onClick={() => setModalContent({ ...p, type: 'apply' })} className="text-xs bg-slate-600 px-2 py-1 rounded">보기</button>
                                    </div>
                                ))}
                             </div>
                        </Card>
                         <Card>
                             <h3 className="text-lg font-semibold mb-2 text-blue-400">강습회 일정</h3>
                             <div className="space-y-2">
                                {seminars.map(s => (
                                    <div key={s.id} className="flex justify-between items-center bg-slate-700/50 p-2 rounded-lg">
                                        <p className="font-medium text-sm">{s.title}</p>
                                        <button onClick={() => setModalContent({ ...s, type: 'apply' })} className="text-xs bg-slate-600 px-2 py-1 rounded">보기</button>
                                    </div>
                                ))}
                             </div>
                        </Card>
                    </div>
                );
            case 'promo':
                return (
                     <div className="space-y-4">
                        {promoItems.map(item => <PromotionCard key={item.id} item={item} />)}
                    </div>
                );
            case 'training':
                return (
                    <div className="space-y-4">
                        <Card className="border-red-500/50 bg-red-500/10">
                             <h2 className="text-lg font-semibold mb-2 text-red-400 flex items-center gap-2"><Info/> 사전 강습 안내</h2>
                             <p className="text-sm text-slate-300">일본으로의 방문은 사전 2회에 걸친 강습이 필수입니다. 기본 일본어, 일본식 예법에 대한 강습이 진행되오니 반드시 참여해주시기 바랍니다.</p>
                        </Card>
                        {japanTravelPackages.map(pkg => (
                            <Card key={pkg.id} onClick={() => setSelectedTravelPackage(pkg)} className={cn(pkg.isConfirmed && "opacity-60")}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-slate-200">{pkg.destination}</p>
                                        <p className="text-xs text-slate-400">{pkg.duration}</p>
                                    </div>
                                    <div className="text-right">
                                         <p className="font-bold text-blue-400">{pkg.price}</p>
                                         {pkg.isConfirmed && <CheckCircle2 className="w-5 h-5 text-green-400 inline-block ml-2" />}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                );
        }
    };

    return (
        <>
            <div className="p-4 space-y-4 text-white">
                <h1 className="text-2xl font-bold">공지 & 이벤트</h1>
                <div className="flex border-b border-slate-700 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {announceTabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn('px-4 py-2 text-sm font-semibold whitespace-nowrap', activeTab === tab.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 border-b-2 border-transparent hover:text-slate-200')}>
                            {tab.label}
                        </button>
                    ))}
                </div>
                {renderContent()}
            </div>
            {modalContent && (
                <InfoModal 
                    title={modalContent.title}
                    date={modalContent.date}
                    location={modalContent.location}
                    details={modalContent.details}
                    onClose={() => setModalContent(null)}
                    showApplyButton={modalContent.type === 'apply'}
                />
            )}
            {selectedTravelPackage && <TravelPackageDetailModal pkg={selectedTravelPackage} onClose={() => setSelectedTravelPackage(null)} />}
        </>
    );
};


// --- MAIN APP COMPONENT ---
const KendoAppPage = () => {
  const [activeTab, setActiveTab] = React.useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen user={currentUser} onNavigate={setActiveTab} />;
      case 'match':
        return <MatchScreen />;
      case 'ranking':
        return <RankingScreen />;
      case 'community':
        return <CommunityScreen />;
      case 'announcements':
        return <AnnouncementsScreen />;
      case 'profile':
        return <ProfileScreen user={currentUser} />;
      default:
        return <HomeScreen user={currentUser} onNavigate={setActiveTab} />;
    }
  };

  const navItems = [
    { id: 'home', label: '홈', icon: <Home /> },
    { id: 'match', label: '대련', icon: <Swords /> },
    { id: 'ranking', label: '랭킹', icon: <Trophy /> },
    { id: 'community', label: '커뮤니티', icon: <Users /> },
    { id: 'announcements', label: '수련', icon: <Megaphone /> },
    { id: 'profile', label: '프로필', icon: <UserIcon /> },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 font-sans">
      <style>{`
        @keyframes thrust {
            0%, 100% { transform: translateX(0) rotate(-15deg); }
            50% { transform: translateX(20px) rotate(-15deg); }
        }
        .animate-thrust {
            animation: thrust 1.5s ease-in-out infinite;
        }
      `}</style>
      <div className="w-full max-w-sm h-[800px] max-h-[90vh] bg-slate-950 rounded-3xl shadow-2xl shadow-blue-900/20 border-4 border-slate-800 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 border-b border-slate-800 flex-shrink-0">
            <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-blue-400" />
                <h1 className="font-bold text-xl text-white">일주일에 2회, 주이회</h1>
            </div>
            <button className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                <Settings className="w-5 h-5 text-slate-400" />
            </button>
        </header>

        <div className="flex-grow overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#334155 #1e293b' }}>
          {renderContent()}
        </div>

        <nav className="flex justify-around items-center p-2 border-t border-slate-800 bg-slate-950/80 backdrop-blur-sm flex-shrink-0">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'flex flex-col items-center justify-center w-1/5 p-1 rounded-lg transition-all duration-200',
                'text-slate-400 hover:bg-slate-800',
                activeTab === item.id ? 'text-blue-400' : ''
              )}
            >
              <div className={cn('mb-1 transition-transform', activeTab === item.id ? 'scale-110' : 'scale-100')}>{item.icon}</div>
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </main>
  );
};

export default KendoAppPage;
