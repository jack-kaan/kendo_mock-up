import React from 'react';
import { Home, Swords, Trophy, User as UserIcon, MapPin, Star, Shield, BarChart2, Settings, Users, MessageSquare, ThumbsUp, Share2, Award, BookOpen, Video, ShieldCheck, CheckCircle2, Store, Tag, X, ThumbsDown, Lock, Unlock, CheckSquare, Square, ArrowUp, ArrowDown, Flame, ChevronDown, Megaphone, Send, FileUp, Plane, Info, Gift, PlusCircle, Heart, Edit3, ChevronsLeft, ChevronsRight, FileText, BarChart as BarChartIcon, Calendar, Bell, Sparkles } from 'lucide-react';
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
  specialty: string;
  characteristics: string[];
};

type Match = {
  id: number;
  opponent: KendoUser;
  date: string;
  status: 'upcoming' | 'completed';
  result?: 'win' | 'loss' | 'draw';
  score?: string;
  scoreDetail?: {
    myScore: string[];
    opponentScore: string[];
  };
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
  },
  specialty: '받아허리치기',
  characteristics: ['수비적', '침착함', '기회를 잘 포착함', '지구력 좋음', '예의 바름'],
};

const mockUsers = [
  { id: 2, name: '김형섭', dojang: '주이회', location: '대전', platformRank: 1550, officialRank: '2단', wins: 51, losses: 10, badges: ['5-Win Streak'], avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=HS', avatarItems: { jukdoCount: 5 }, rankHistory: [{date: '2024-01-01', rank: 1500}, {date: '2024-03-01', rank: 1520}, {date: '2024-05-01', rank: 1540}, {date: '2024-07-01', rank: 1550}], detailedStats: currentUser.detailedStats, specialty: '빠른 머리치기', characteristics: ['공격적', '스피드가 빠름', '압박이 강함'] },
  { id: 3, name: '이노연', dojang: '주이회', location: '대전', platformRank: 1580, officialRank: '2단', wins: 30, losses: 8, badges: ['First Match'], avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=NY', avatarItems: { jukdoCount: 2 }, rankHistory: [{date: '2024-01-01', rank: 1590}, {date: '2024-03-01', rank: 1585}, {date: '2024-05-01', rank: 1580}, {date: '2024-07-01', rank: 1580}], detailedStats: currentUser.detailedStats, specialty: '손목치기', characteristics: ['신중함', '정확도가 높음', '방어가 견고함'] },
  { id: 4, name: '문준형', dojang: '평송센터', location: '대전', platformRank: 1450, officialRank: '4단', wins: 78, losses: 20, badges: ['Weekly Activity King'], avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=JH', avatarItems: { jukdoCount: 4 }, rankHistory: [{date: '2024-01-01', rank: 1400}, {date: '2024-03-01', rank: 1420}, {date: '2024-05-01', rank: 1460}, {date: '2024-07-01', rank: 1450}], detailedStats: currentUser.detailedStats, specialty: '퇴격머리치기', characteristics: ['노련함', '변칙적', '체력이 좋음'] },
  { id: 5, name: '이정현', dojang: '원검도관', location: '서울', platformRank: 1420, officialRank: '2단', wins: 25, losses: 12, badges: [], avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=JH2', avatarItems: { jukdoCount: 1 }, rankHistory: [{date: '2024-01-01', rank: 1410}, {date: '2024-03-01', rank: 1400}, {date: '2024-05-01', rank: 1415}, {date: '2024-07-01', rank: 1420}], detailedStats: currentUser.detailedStats, specialty: '찌름', characteristics: ['과감함', '한방이 있음', '예측이 어려움'] },
  { id: 6, name: '남경오', dojang: '경호관', location: '구미', platformRank: 1490, officialRank: '5단', wins: 18, losses: 5, badges: ['Mentor'], avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=KH', avatarItems: { jukdoCount: 6 }, rankHistory: [{date: '2024-01-01', rank: 1480}, {date: '2024-03-01', rank: 1485}, {date: '2024-05-01', rank: 1495}, {date: '2024-07-01', rank: 1490}], detailedStats: currentUser.detailedStats, specialty: '상단', characteristics: ['기세가 강함', '압도적', '경험이 많음'] },
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

const initialMatchHistory = [
    { id: 1, opponent: mockUsers[0], result: 'win', date: '2024-05-20', score: '2-1', scoreDetail: { myScore: ['머리', '손목'], opponentScore: ['머리'] }, status: 'completed', privacy: 'public', videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video', commentary: '김형섭 선수의 머리치기가 매우 인상적인 경기였습니다. 한승오 선수는 침착하게 받아치며 점수를 획득했습니다.', likes: 128, dislikes: 5, comments: [{id: 1, text: '정말 멋진 경기였어요!'}, {id: 2, text: '두 분 다 대단하시네요.'}] },
    { id: 2, opponent: mockUsers[1], result: 'loss', date: '2024-05-18', score: '0-1', scoreDetail: { myScore: [], opponentScore: ['손목'] }, status: 'completed', privacy: 'private', videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video', likes: 0, dislikes: 0, comments: [], privacySettings: { video: true, comments: false, likes: false, commentary: false } },
    { id: 3, opponent: mockUsers[4], result: 'win', date: '2024-05-15', score: '1-0', scoreDetail: { myScore: ['허리'], opponentScore: [] }, status: 'completed', privacy: 'private', likes: 0, dislikes: 0, comments: [], privacySettings: { video: false, comments: false, likes: false, commentary: false } },
    { id: 4, opponent: mockUsers[2], result: 'draw', date: '2024-05-11', score: '1-1', scoreDetail: { myScore: ['머리'], opponentScore: ['머리'] }, status: 'completed', privacy: 'public', videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video', commentary: null, likes: 95, dislikes: 2, comments: [{id: 1, text: '아슬아슬했네요!'}] },
    { id: 7, opponent: mockUsers[0], result: 'win', date: '2024-04-25', score: '1-0', scoreDetail: { myScore: ['손목'], opponentScore: [] }, status: 'completed', privacy: 'public', videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video', commentary: '빠른 손목치기로 승리했습니다.', likes: 88, dislikes: 1, comments: [] },
    { id: 8, opponent: mockUsers[3], result: 'loss', date: '2024-04-10', score: '1-2', scoreDetail: { myScore: ['머리'], opponentScore: ['손목', '허리'] }, status: 'completed', privacy: 'public', videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video', commentary: null, likes: 70, dislikes: 8, comments: [] },
    { id: 5, opponent: mockUsers[3], date: '2025-07-28', time: '18:00', status: 'upcoming', privacy: 'public', likes: 0, dislikes: 0, comments: [] },
    { id: 6, opponent: mockUsers[2], date: '2025-08-04', time: '19:00', status: 'upcoming', privacy: 'public', likes: 0, dislikes: 0, comments: [] },
    { id: 9, opponent: mockUsers[4], date: '2025-08-10', time: '20:00', status: 'upcoming', privacy: 'public', likes: 0, dislikes: 0, comments: [] },
];

const additionalWins = Array.from({ length: 38 }, (_, i) => {
    const opponent = mockUsers[i % mockUsers.length];
    return {
        id: 100 + i,
        opponent,
        result: 'win',
        date: `2024-03-${Math.floor(Math.random() * 28) + 1}`,
        score: '2-0',
        scoreDetail: { myScore: ['머리', '손목'], opponentScore: [] },
        status: 'completed',
        privacy: 'public',
        likes: Math.floor(Math.random() * 50),
        dislikes: Math.floor(Math.random() * 5),
        comments: []
    };
});

const additionalLosses = Array.from({ length: 13 }, (_, i) => {
    const opponent = mockUsers[i % mockUsers.length];
    return {
        id: 200 + i,
        opponent,
        result: 'loss',
        date: `2024-02-${Math.floor(Math.random() * 28) + 1}`,
        score: '0-2',
        scoreDetail: { myScore: [], opponentScore: ['머리', '손목'] },
        status: 'completed',
        privacy: 'public',
        likes: Math.floor(Math.random() * 50),
        dislikes: Math.floor(Math.random() * 5),
        comments: []
    };
});

const mockMatchHistory = [...initialMatchHistory, ...additionalWins, ...additionalLosses];


const communityPosts = [
  { id: 1, author: mockUsers[0], type: 'video', title: '기본 머리치기 연습 영상', content: '기본기 훈련은 아무리 강조해도 지나치지 않습니다. 함께 보며 의견 나눠요.', likes: 128, comments: 15, timestamp: '2h ago' },
  { id: 2, author: currentUser, type: 'review', title: '이노연님과의 경기 후기', content: '세메(攻め)가 정말 날카로웠던 경기였습니다. 덕분에 많이 배울 수 있었습니다. 다음에는 오지와자(応じ技)를 더 연습해야겠습니다.', likes: 45, comments: 8, timestamp: '1d ago' },
];

const anonymousPosts = [
    { id: 101, author: { name: '익명' }, title: "요즘 슬럼프가 너무 심하게 오네요...", content: "머리치기가 전혀 되질 않습니다. 다들 어떻게 극복하시나요? 조언 부탁드립니다.", likes: 33, comments: 12, timestamp: "1h ago" },
    { id: 102, author: { name: '익명' }, title: "4단 심사 준비하시는 분 계신가요?", content: "본이랑 실기 준비를 어떻게 해야 할지 막막하네요. 같이 정보 공유해요.", likes: 45, comments: 18, timestamp: "3h ago" },
];

const tradePosts = [
    { id: 201, author: mockUsers[2], itemName: "미사용 카본 죽도 (39)", price: "70,000원", description: "선물 받았는데 사이즈가 안 맞아 판매합니다. 포장도 안 뜯은 새 제품입니다.", status: '판매중', imageUrl: 'https://placehold.co/400x300/334155/94a3b8?text=죽도', timestamp: "1h ago" },
    { id: 202, author: mockUsers[3], itemName: "A급 중고 호구 세트 (남성용)", price: "150,000원", description: "1년 정도 사용했고 상태 아주 좋습니다. 175cm 전후 남성분께 잘 맞을 거예요.", status: '판매완료', imageUrl: 'https://placehold.co/400x300/334155/94a3b8?text=호구', timestamp: "8h ago" },
];

const mockChats = [
    { id: 101, type: 'club', partner: { id: 1001, name: '대전 카이스트 주이회', avatarUrl: 'https://placehold.co/100x100/0f766e/e0f2f1?text=K', members: 35 }, lastMessage: "김형섭: 이번 주 금요일 정기 수련 공지입니다.", timestamp: "10:45 AM", unread: 2, messages: Array.from({ length: 5 }, (_, i) => ({ id: i, sender: i % 3 === 0 ? 'me' : (i % 3 === 1 ? '김형섭' : '이노연'), text: `안녕하세요, 채팅 메시지 ${i+1}입니다.`, timestamp: `10:${45+i} AM` })) },
    { id: 1, type: 'private', partner: mockUsers[0], lastMessage: "네, 좋습니다. 그럼 토요일 2시에 뵙겠습니다.", timestamp: "10:45 AM", unread: 0, messages: [
        {id: 1, sender: 'me', text: '김형섭님, 이번주 토요일에 대련 가능하신가요?', timestamp: '10:40 AM'},
        {id: 2, sender: 'other', text: '네, 가능합니다. 시간은 언제가 좋으신가요?', timestamp: '10:42 AM'},
    ]},
];

const danPromotions = [
    { id: 1, title: "1, 2단 승단 심사", date: "2025-08-15", location: "서울 중앙 연수원", details: "오전 9시부터 시작. 응시자는 8시 30분까지 집결 바랍니다. 준비물: 신분증, 응시표, 목검." },
    { id: 2, title: "3, 4단 승단 심사", date: "2025-08-16", location: "서울 중앙 연수원", details: "오전 9시부터 시작. 본, 실기, 학과 시험이 포함됩니다. 상세 공지 확인 필수." }
];
const seminars = [
    { id: 1, title: "고단자 강습회", date: "2025-09-20", location: "대전 평송수련원", details: "5단 이상 참가 가능. 참가비 5만원. 강사: 김태형 8단." },
];
const promoItems = [
    { id: 1, type: 'openClass', title: "신규 검도장 오픈 클래스", organizer: "새로운 검도관 (서울)", content: "검도에 관심 있는 누구나 환영합니다! 기본 자세부터 체험까지. 친구와 함께 오시면 할인 혜택!", imageUrl: "https://placehold.co/400x200/164e63/9ca3af?text=Open+Class" },
];
const japanTravelPackages = [
    { id: 1, destination: "교토 8일 검도 수행", duration: "2025.08.01 ~ 2025.08.08", description: "전통 도장에서 현지 검도인들과 교류하며 심신을 단련하는 특별한 기회입니다.", price: "2,500,000원", currentApplicants: 8, maxApplicants: 15, isConfirmed: false, imageUrl: "https://placehold.co/600x400/1e293b/94a3b8?text=Kyoto+Dojo", details: {
        location: "일본 교토, 유서 깊은 무덕전",
        curriculum: ["기본기 수련 (오전)", "고단자 사범 지도 대련 (오후)"],
        schedule: [ { day: "1-8일차", activity: "상세 일정은 참가자에게 별도 공지" }],
        notes: ["개인 죽도, 도복, 호구 필수 지참"],
        applicants: ["김*섭", "이*연", "문*형", "박*진", "최*수", "강*민", "한*우", "조*현"]
    }},
];
const gifticonItems = [ { category: "스타벅스", items: ["아메리카노 (4,500P)", "라떼 (5,000P)"] }];
const shopItems = [ { id: 1, name: "프리미엄 카본 죽도", price: "75,000원", imageUrl: "https://placehold.co/400x400/334155/94a3b8?text=Carbon+Jukdo" }];
const questList = [
    { id: 1, text: "손목 10점 따기", current: 1, target: 10, unit: "점", selected: true, description: '대련에서 상대방의 손목을 가격하여 10점을 획득하세요.' },
    { id: 4, text: "고단자 상대로 승리하기 (+2단 이상)", current: 0, target: 1, unit: "승", selected: true, description: '자신보다 공인 단수가 2단 이상 높은 상대를 이겨야 합니다.' },
];
const mockPointHistory = [
    { date: '2025-07-21', change: '+10', reason: '김형섭님과 대련 승리' },
    { date: '2025-07-19', change: '-8', reason: '이노연님과 대련 패배' },
];
const mockGoals = [
    { id: 1, text: '사범자격심사 도전', completed: true },
    { id: 3, text: 'vs100명 대련', completed: false, current: 57, target: 100 },
];
const kendoTheoryData = [
    { id: 1, title: "검도의 四戒에 대하여 설명하라.", questionText: "검도의 [BLANK](四病)이라고도 하며, 검도를 수행함에 있어서 4가지 경계하여야 할 것을 말한다. [BLANK], [BLANK], [BLANK], [BLANK] (驚,懼,疑,惑) 즉, 놀라거나, 두려워하거나, 의심하거나, 미혹되지 말아야 함을 말한다.", answers: ["4병", "경", "구", "의", "혹"] },
    { id: 4, title: "유효격자에 대하여 기술하라.", questionText: "유효격자란 한판을 인정할 수 있는 격자로서, 검도경기·심판규칙 제12조에 따르면, 「[BLANK]는, 충실한 [BLANK]와 적정한 [BLANK]로써, 죽도의 격자부로 격자부위를 칼날을 바르게 하여 격자하고 [BLANK]이 있어야 한다.」고 되어 있다. 이때 [BLANK]가 일치하여야 한다.", answers: ["유효격자", "기세", "자세", "존심", "기검체"] },
];
const testScoreHistory = [ { date: "2025-05-10", score: 70 }, { date: "2025-07-01", score: 75 }];
const mockNotifications = [
    { id: 1, type: 'new_request', opponent: mockUsers[1], read: false },
    { id: 2, type: 'declined', opponent: mockUsers[2], message: "죄송합니다. 그날은 선약이 있어서 어려울 것 같습니다.", read: false },
];

// --- UI HELPER COMPONENTS ---
const Card = ({ children, className, onClick }) => (
  <div className={cn('bg-slate-800/50 border border-slate-700 rounded-xl p-4 shadow-lg', onClick && 'cursor-pointer transition-colors hover:bg-slate-700/80', className)} onClick={onClick}>
    {children}
  </div>
);

const UserAvatar = ({ user, size = 'md', onClick }) => {
    const sizeClasses = { sm: 'w-10 h-10', md: 'w-16 h-16', lg: 'w-24 h-24' };
    const defaultAvatar = user?.name === '익명' 
        ? 'https://placehold.co/100x100/475569/94a3b8?text=익명'
        : `https://placehold.co/100x100/1e293b/94a3b8?text=??`;
    
    return (
        <img src={user?.avatarUrl || defaultAvatar} alt={user?.name || 'User Avatar'} className={cn('bg-slate-700 border-2 border-slate-600 rounded-full flex-shrink-0 object-cover', sizeClasses[size], onClick && 'cursor-pointer')}
            onClick={onClick}
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
    const userPercentile = React.useMemo(() => Math.random() * 80 + 10, []);

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

const RadarChart = ({ data, size = 200 }) => {
    const labels = { head: '머리', wrist: '손목', waist: '허리', thrust: '찌름' };
    const keys = Object.keys(labels);
    const center = size / 2;
    const radius = size * 0.35;
    const numAxes = keys.length;
    const angleSlice = (Math.PI * 2) / numAxes;

    const maxVal = Math.max(...Object.values(data));

    const points = keys.map((key, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const r = (data[key] / maxVal) * radius;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {[0.25, 0.5, 0.75, 1].map(scale => (
            <polygon key={scale}
                points={keys.map((_, i) => {
                    const angle = angleSlice * i - Math.PI / 2;
                    const r = radius * scale;
                    const x = center + r * Math.cos(angle);
                    const y = center + r * Math.sin(angle);
                    return `${x},${y}`;
                }).join(' ')}
                className="fill-none stroke-slate-600"
            />
        ))}
        {keys.map((_, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return <line key={i} x1={center} y1={center} x2={x} y2={y} className="stroke-slate-600" />;
        })}
        <polygon points={points} className="fill-blue-500/50 stroke-blue-400" strokeWidth="2" />
        {keys.map((key, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const r = radius * 1.2;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return (
                <text key={key} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-slate-300 text-xs font-semibold">
                    {labels[key]}
                </text>
            );
        })}
      </svg>
    );
};

const PieChart = ({ data, size = 120 }) => {
    const center = size / 2;
    const radius = size / 2;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = -Math.PI / 2;

    const getCoords = (angle) => `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`;

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map(item => {
          const angle = (item.value / total) * 2 * Math.PI;
          const endAngle = startAngle + angle;
          const largeArcFlag = angle > Math.PI ? 1 : 0;
          const pathData = `M ${center},${center} L ${getCoords(startAngle)} A ${radius},${radius} 0 ${largeArcFlag},1 ${getCoords(endAngle)} Z`;
          startAngle = endAngle;
          return <path key={item.label} d={pathData} fill={item.color} />;
        })}
      </svg>
    );
};

const StackedBarChart = ({ data, height = 20, width = 200 }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let xOffset = 0;
    
    return (
        <div style={{ width, height }}>
            <svg width="100%" height="100%">
                {data.map(item => {
                    const barWidth = (item.value / total) * 100;
                    const rect = <rect key={item.label} x={`${xOffset}%`} y="0" width={`${barWidth}%`} height={height} fill={item.color} />;
                    xOffset += barWidth;
                    return rect;
                })}
            </svg>
        </div>
    );
};

const DetailedStatsCard = ({ stats }) => {
    const { scoringBreakdown, homeAway, vsHigherRank, interestingStats } = stats;
    const [expandedStat, setExpandedStat] = React.useState(null);

    const parseRecord = (recordStr) => {
        const winMatch = recordStr.match(/(\d+)승/);
        const lossMatch = recordStr.match(/(\d+)패/);
        return {
            wins: winMatch ? parseInt(winMatch[1], 10) : 0,
            losses: lossMatch ? parseInt(lossMatch[1], 10) : 0
        };
    };

    const homeRecord = parseRecord(homeAway.home);
    const awayRecord = parseRecord(homeAway.away);
    
    const homePieData = [{ label: '승', value: homeRecord.wins, color: '#4ade80' }, { label: '패', value: homeRecord.losses, color: '#f87171' }];
    const awayPieData = [{ label: '승', value: awayRecord.wins, color: '#4ade80' }, { label: '패', value: awayRecord.losses, color: '#f87171' }];

    const vsHigherRankData = [
        { label: '승', value: vsHigherRank.wins, color: '#4ade80' },
        { label: '패', value: vsHigherRank.losses, color: '#f87171' },
        { label: '무', value: vsHigherRank.draws, color: '#94a3b8' },
    ];

    return (
        <Card className="border-blue-500/50">
            <h3 className="font-semibold text-lg flex items-center mb-4"><BarChart2 className="w-5 h-5 mr-2 text-blue-400"/>분석 결과</h3>
            <div className="space-y-6">
                <div>
                    <h4 className="font-semibold text-slate-300 mb-2">득점 부위 분석</h4>
                    <div className="flex justify-center items-center bg-slate-900/50 p-2 rounded-lg">
                        <RadarChart data={scoringBreakdown} size={220} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <h4 className="font-semibold text-slate-300 mb-2">홈 성적</h4>
                        <div className="flex justify-center mb-2">
                           <PieChart data={homePieData} />
                        </div>
                        <p className="text-sm"><span className="text-green-400">{homeRecord.wins}승</span> / <span className="text-red-400">{homeRecord.losses}패</span></p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-300 mb-2">어웨이 성적</h4>
                         <div className="flex justify-center mb-2">
                           <PieChart data={awayPieData} />
                        </div>
                        <p className="text-sm"><span className="text-green-400">{awayRecord.wins}승</span> / <span className="text-red-400">{awayRecord.losses}패</span></p>
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold text-slate-300 mb-2">고단자 상대 통계</h4>
                    <div className="bg-slate-700/50 p-3 rounded-lg">
                        <StackedBarChart data={vsHigherRankData} />
                        <div className="flex justify-around text-xs mt-2">
                            <span className="font-bold text-green-400">{vsHigherRank.wins}승</span>
                            <span className="font-bold text-red-400">{vsHigherRank.losses}패</span>
                            <span className="font-bold text-slate-400">{vsHigherRank.draws}무</span>
                        </div>
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
        <g transform="translate(120, 50)">
            <rect x="0" y="0" width="20" height="5" fill="#5c2d08"/>
            <rect x="8" y="5" width="4" height="25" fill="#5c2d08"/>
            <rect x="2" y="30" width="16" height="3" fill="#5c2d08"/>
             <path d="M 2 33 L 0 40 L 20 40 L 18 33 Z" fill="#5c2d08"/>
            <rect x="3" y="10" width="14" height="16" fill="#1e293b" rx="2"/>
            <rect x="5" y="26" width="10" height="8" fill="#1e293b" />
        </g>
         <g transform="translate(20, 40)">
            <path d="M 0 10 L 20 10 L 20 5 L 18 5 L 18 8 L 2 8 L 2 0 L 0 0 Z" fill="#5c2d08" />
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
                    </div>
                </div>
                {detailView && <DetailViewModal type={detailView} onClose={() => setDetailView(null)} />}
            </div>
        </div>
    );
};

const NotificationBell = ({ count, onClick }) => (
    <button onClick={onClick} className="relative p-2 rounded-full hover:bg-slate-800 transition-colors">
        <Bell className="w-5 h-5 text-slate-400" />
        {count > 0 && (
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-slate-950">
                {count}
            </span>
        )}
    </button>
);

const NotificationModal = ({ notifications, onSelect, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold">새로운 소식</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-2 overflow-y-auto">
                {notifications.map(notif => (
                    <div key={notif.id} onClick={() => onSelect(notif)} className={cn(
                        "p-3 mb-2 hover:bg-slate-700/50 rounded-lg cursor-pointer flex items-center gap-3 border",
                        !notif.read ? 'bg-red-900/40 border-red-500/50' : 'bg-transparent border-red-500/30'
                    )}>
                        <UserAvatar user={notif.opponent} size="sm" />
                        <div className="flex-1">
                            <p className="text-sm">
                                <span className="font-bold">{notif.opponent.name}</span>
                                님으로부터{' '}
                                {notif.type === 'new_request' && '새로운 대련 신청이 도착했습니다.'}
                                {notif.type === 'declined' && '대련 거절 메시지가 도착했습니다.'}
                                {notif.type === 'changed' && '대련 변경 신청이 도착했습니다.'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const NotificationDetailModal = ({ notification, onClose }) => {
    const [message, setMessage] = React.useState('');
    const [action, setAction] = React.useState(null);

    const handleAction = (type) => { setAction(type); };
    const handleSend = () => { alert('메시지를 발송했습니다.'); onClose(); };

    const renderContent = () => {
        switch (notification.type) {
            case 'new_request':
                if (action) {
                    return (
                        <div>
                            <h3 className="font-semibold text-lg mb-2 text-center">
                                {action === 'accept' && '수락 메시지'} {action === 'decline' && '거절 메시지'} {action === 'change' && '변경 제안'}
                            </h3>
                            {action === 'change' && (
                                <div className="space-y-2 mb-4">
                                    <input type="text" placeholder="장소" className="w-full bg-slate-700 p-2 rounded-lg text-sm" />
                                    <input type="time" className="w-full bg-slate-700 p-2 rounded-lg text-sm" />
                                    <input type="date" className="w-full bg-slate-700 p-2 rounded-lg text-sm" />
                                </div>
                            )}
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows="3" placeholder="메시지를 입력하세요..." className="w-full bg-slate-700 p-2 rounded-lg text-sm mb-4"></textarea>
                            <button onClick={handleSend} className="w-full bg-blue-600 py-2 rounded-lg font-semibold">발송</button>
                        </div>
                    );
                }
                return (
                    <>
                        <p className="text-center mb-4">{notification.opponent.name}님이 대련을 신청했습니다.</p>
                        <div className="flex gap-2">
                            <button onClick={() => handleAction('accept')} className="w-full bg-green-600 py-2 rounded-lg font-semibold">수락</button>
                            <button onClick={() => handleAction('decline')} className="w-full bg-red-600 py-2 rounded-lg font-semibold">거절</button>
                            <button onClick={() => handleAction('change')} className="w-full bg-yellow-600 py-2 rounded-lg font-semibold">변경</button>
                        </div>
                    </>
                );
            case 'declined':
                return (
                    <div>
                        <p className="bg-slate-700/50 p-3 rounded-lg text-sm mb-4 italic">"{notification.message}"</p>
                        <textarea rows="3" placeholder="답장 메시지..." className="w-full bg-slate-700 p-2 rounded-lg text-sm mb-4"></textarea>
                        <button onClick={handleSend} className="w-full bg-blue-600 py-2 rounded-lg font-semibold">확인</button>
                    </div>
                );
            case 'changed': return null;
            default: return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 text-white relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                <div className="flex flex-col items-center mb-4">
                    <UserAvatar user={notification.opponent} size="md" />
                    <p className="font-bold mt-2">{notification.opponent.name}</p>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};

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
            if (isSelected) { return prev.filter(q => q.id !== quest.id); }
            if (prev.length < 10) { return [...prev, quest]; }
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
                            <button key={quest.id} onClick={() => handleToggle(quest)} disabled={!isSelected && !canSelectMore}
                                className={cn("w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors", "bg-slate-700/50 text-slate-200 hover:bg-slate-700", !canSelectMore && !isSelected && "opacity-60 cursor-not-allowed")}>
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

    const handleSave = () => { setIsSaved(true); setTimeout(() => { onClose(); }, 1500); };

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
                        <span>vs100명 대련</span>
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

const PointHistoryModal = ({ history, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold">포인트 누적 히스토리</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto">
                <div className="space-y-2">
                    {history.map((item, index) => (
                        <div key={index} className="bg-slate-700/50 p-3 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="text-sm font-semibold">{item.reason}</p>
                                <p className="text-xs text-slate-400">{item.date}</p>
                            </div>
                            <span className={cn("font-bold", item.change.startsWith('+') ? 'text-green-400' : 'text-red-400')}>{item.change}P</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const MatchActionModal = ({ opponent, type, onClose }) => {
    const title = type === 'cancel' ? '대련 취소' : '대련 연장';
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 text-white">
                <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
                <p className="text-center text-sm text-slate-400 mb-4">{opponent.name}님에게 {type === 'cancel' ? '취소' : '연장'} 요청 메시지를 보냅니다.</p>
                {type === 'postpone' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-300 mb-1">날짜 제안</label>
                        <input type="date" className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white" />
                    </div>
                )}
                <textarea rows={3} placeholder="메시지를 입력하세요..." className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white placeholder:text-slate-500 mb-4"></textarea>
                <div className="flex gap-3">
                    <button onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">취소</button>
                    <button onClick={() => { alert('메시지를 발송했습니다.'); onClose(); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">발송</button>
                </div>
            </div>
        </div>
    );
};

const OpponentDetailModal = ({ opponent, onClose }) => {
    const [action, setAction] = React.useState(null); // 'cancel' or 'postpone'

    if (action) {
        return <MatchActionModal opponent={opponent} type={action} onClose={() => { setAction(null); onClose(); }} />;
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold">상대 정보</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto space-y-4">
                    <div className="flex items-center gap-4">
                        <UserAvatar user={opponent} size="lg" />
                        <div>
                            <p className="text-2xl font-bold">{opponent.name}</p>
                            <p className="text-md text-slate-300">{opponent.officialRank} / {opponent.location}</p>
                            <p className="text-md font-semibold text-blue-400">{opponent.platformRank}P</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-slate-700/50 p-2 rounded-lg">
                            <p className="text-xs text-slate-400">전적</p>
                            <p className="font-bold">{opponent.wins + opponent.losses}전</p>
                        </div>
                        <div className="bg-slate-700/50 p-2 rounded-lg">
                            <p className="text-xs text-slate-400">승</p>
                            <p className="font-bold text-green-400">{opponent.wins}승</p>
                        </div>
                        <div className="bg-slate-700/50 p-2 rounded-lg">
                            <p className="text-xs text-slate-400">패</p>
                            <p className="font-bold text-red-400">{opponent.losses}패</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-300 mb-2">특기</h4>
                        <p className="bg-slate-700/50 p-2 rounded-lg text-sm font-medium">{opponent.specialty}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-300 mb-2">특징</h4>
                        <div className="flex flex-wrap gap-2">
                            {opponent.characteristics.map(char => (
                                <span key={char} className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-2 py-1 rounded-full">{char}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-shrink-0 border-t border-slate-700 flex gap-3">
                    <button onClick={() => setAction('cancel')} className="w-full bg-red-600/80 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors">취소</button>
                    <button onClick={() => setAction('postpone')} className="w-full bg-yellow-600/80 hover:bg-yellow-700 text-white font-bold py-3 rounded-lg transition-colors">연장</button>
                </div>
            </div>
        </div>
    );
};

const QuestDetailModal = ({ quest, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 text-white">
            <h2 className="text-xl font-bold text-center mb-2">{quest.text}</h2>
            <p className="text-center text-sm text-slate-400 mb-4">{quest.description}</p>
            <button onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">닫기</button>
        </div>
    </div>
);

const GoalChecklistModal = ({ goals, onClose }) => {
    const [checkedGoals, setCheckedGoals] = React.useState(goals.filter(g => g.completed).map(g => g.id));

    const handleToggle = (goalId) => {
        setCheckedGoals(prev => 
            prev.includes(goalId) ? prev.filter(id => id !== goalId) : [...prev, goalId]
        );
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                 <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold">2025년 목표</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto space-y-3">
                    {goals.map(goal => (
                         <label key={goal.id} className="flex items-center gap-3 cursor-pointer bg-slate-700/50 p-3 rounded-lg">
                            <input type="checkbox" checked={checkedGoals.includes(goal.id)} onChange={() => handleToggle(goal.id)} className="w-5 h-5 accent-blue-500" />
                            <span className={cn("flex-grow", checkedGoals.includes(goal.id) && "line-through text-slate-500")}>{goal.text}</span>
                            {goal.target && (
                                <span className="text-sm font-semibold">{goal.current} / {goal.target}</span>
                            )}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

const HomeScreen = ({ user, onNavigate, notifications, onSelectNotification }) => {
  const upcomingMatches = mockMatchHistory.filter(m => m.status === 'upcoming');
  const [modal, setModal] = React.useState(null); 
  const [selectedItem, setSelectedItem] = React.useState(null);

  const openModal = (type, item = null) => { setModal(type); setSelectedItem(item); };
  const closeModal = () => { setModal(null); setSelectedItem(null); };
  
  const getNotificationMessage = (notification) => {
    if (!notification) return '';
    const opponentName = notification.opponent.name;
    switch (notification.type) {
        case 'new_request': return `${opponentName}님으로부터 새로운 대련 신청이 도착했습니다.`;
        case 'declined': return `${opponentName}님이 대련을 거절했습니다.`;
        case 'changed': return `${opponentName}님이 대련 변경을 신청했습니다.`;
        default: return `${opponentName}님으로부터 새로운 알림이 도착했습니다.`;
    }
  };

  const getDday = (dateString) => {
      const today = new Date('2025-07-21');
      const matchDate = new Date(dateString);
      const diffTime = matchDate - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
  <>
    <div className="p-4 space-y-6 text-white">
        <Card>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <UserAvatar user={user} onClick={() => onNavigate('profile')} />
                    <div>
                        <p className="text-slate-400">환영합니다,</p>
                        <h1 className="text-2xl font-bold">{user.name}님</h1>
                    </div>
                </div>
                <div onClick={() => openModal('avatar_space')} className="text-center cursor-pointer p-2 rounded-lg hover:bg-slate-700/50">
                    <AvatarIconSVG />
                    <p className="text-xs font-semibold mt-1">나의 공간</p>
                </div>
            </div>
        </Card>

        <div className="space-y-2">
            {notifications.map(notification => (
                <Card key={notification.id} onClick={() => onSelectNotification(notification)} className="bg-red-900/40 border-red-500/50 animate-pulse hover:bg-red-900/60 cursor-pointer">
                    <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-red-400" />
                        <div>
                            <p className="font-bold text-red-300">새로운 소식</p>
                            <p className="text-sm">{getNotificationMessage(notification)}</p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>

        <Card onClick={() => openModal('points')} className="bg-gradient-to-br from-blue-600 to-blue-800 border-blue-500">
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
             <button onClick={(e) => { e.stopPropagation(); openModal('gift'); }} className="mt-3 w-full flex items-center justify-center gap-2 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 font-bold py-2 rounded-lg text-sm transition-colors">
                <Gift size={16} /> 기프트콘 교환하기
            </button>
        </Card>

        {upcomingMatches.length > 0 && <div>
            <h2 className="text-xl font-semibold mb-3">다가오는 대련</h2>
            <div className="space-y-3">
            {upcomingMatches.slice(0, 3).map(match => {
                const dDay = getDday(match.date);
                return (
                    <Card key={match.id} onClick={() => openModal('opponent', match.opponent)}>
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
                <button onClick={() => openModal('quest_select')} className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg transition-colors">퀘스트 설정</button>
            </div>
            <div className="space-y-3">
                {questList.filter(q => q.selected).map(quest => (
                     <Card key={quest.id} onClick={() => openModal('quest_detail', quest)} className="bg-gradient-to-r from-green-500 to-teal-600 border-green-500">
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
                <button onClick={() => openModal('goal_edit')} className="p-2 text-slate-400 hover:text-white"><Settings size={18} /></button>
            </div>
            <Card onClick={() => openModal('goal_check')}>
                <div className="space-y-4">
                    {mockGoals.map(goal => (
                         <div key={goal.id}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-medium">{goal.text}</span>
                                {goal.target ? (
                                    <span className="font-semibold text-sm">{goal.current} / {goal.target}명</span>
                                ) : (
                                    <span className={cn("flex items-center gap-1.5 font-semibold text-sm", goal.completed ? "text-green-400" : "text-slate-500")}>
                                        {goal.completed ? <><CheckCircle2 className="w-4 h-4" /> 완료</> : '예정'}
                                    </span>
                                )}
                            </div>
                            {goal.target && <div className="w-full bg-slate-700 rounded-full h-2.5"><div className="bg-blue-500 rounded-full h-2.5" style={{ width: `${(goal.current / goal.target) * 100}%` }}></div></div>}
                        </div>
                    ))}
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
    {modal === 'goal_edit' && <GoalSettingModal onClose={closeModal} />}
    {modal === 'gift' && <GifticonModal onClose={closeModal} />}
    {modal === 'quest_select' && <QuestSelectionModal onClose={closeModal} activeQuests={questList.filter(q => q.selected)} onSave={() => {}} />}
    {modal === 'avatar_space' && <AvatarSpaceModal user={user} onClose={closeModal} />}
    {modal === 'points' && <PointHistoryModal history={mockPointHistory} onClose={closeModal} />}
    {modal === 'opponent' && <OpponentDetailModal opponent={selectedItem} onClose={closeModal} />}
    {modal === 'quest_detail' && <QuestDetailModal quest={selectedItem} onClose={closeModal} />}
    {modal === 'goal_check' && <GoalChecklistModal goals={mockGoals} onClose={closeModal} />}
  </>
  );
};

const MatchRequestModal = ({ user, onClose }) => {
    const [message, setMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [matchType, setMatchType] = React.useState('public');
    const [privacySettings, setPrivacySettings] = React.useState({ video: true, comments: true, likes: true, commentary: true });
    const [isSent, setIsSent] = React.useState(false);

    const handleCheckboxChange = (key) => { setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] })); };
    
    const handleGenerateMessage = async () => {
        setIsLoading(true);
        setMessage("생성 중...");
        const date = new Date().toISOString().split('T')[0];
        const prompt = `너는 검도를 즐기는 예의 바른 검도인이야. ${user.name}님에게 대련을 신청하려고 해. 정중하고 친근한 어조로 대련 신청 메시지를 작성해줘. 날짜는 ${date} 근처로 제안해줘.`;

        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            const apiKey = "" 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
              const text = result.candidates[0].content.parts[0].text;
              setMessage(text);
            } else {
              setMessage("메시지 생성에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("Error generating message:", error);
            setMessage("오류가 발생했습니다. 네트워크 연결을 확인해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendRequest = () => { setIsSent(true); setTimeout(() => { onClose(); }, 1500); };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 text-white relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white"><X size={20} /></button>
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
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium text-slate-300">메시지</label>
                            <button onClick={handleGenerateMessage} disabled={isLoading} className="text-xs flex items-center gap-1 px-2 py-1 bg-blue-600/50 text-blue-300 rounded-md hover:bg-blue-600/80 disabled:opacity-50">
                                <Sparkles size={12} /> AI로 작성
                            </button>
                        </div>
                        <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="하고 싶은 말을 남겨주세요." className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white placeholder:text-slate-500"></textarea>
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
        { id: 'distance', label: '거리순' }, { id: 'experience', label: '경력순' }, { id: 'rank', label: '단수' },
        { id: 'score', label: '최고점수' }, { id: 'wins', label: '최다승' }, { id: 'matches', label: '최다도전' },
    ];

    const sortedUsers = [...mockUsers].sort((a, b) => {
        switch(filter) {
            case 'experience': return (b.wins + b.losses) - (a.wins + a.losses);
            case 'rank': return parseInt(b.officialRank) - parseInt(a.officialRank);
            case 'score': return b.platformRank - a.platformRank;
            case 'wins': return b.wins - a.wins;
            case 'matches': return (b.wins + b.losses) - (a.wins + a.losses);
            case 'distance': default: return Math.abs(a.platformRank - currentUser.platformRank) - Math.abs(b.platformRank - currentUser.platformRank);
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
    const mapPositions = [ { left: '40%', top: '55%' }, { left: '20%', top: '25%' }, { left: '70%', top: '65%' }, { left: '50%', top: '15%' }, { left: '15%', top: '60%' }, { left: '80%', top: '30%' } ];
    const currentRankings = allRankings[period][criteria];

    return (
        <>
        <div className="p-4 space-y-4 text-white">
            <h1 className="text-2xl font-bold">랭킹</h1>
            <Card>
                <h3 className="font-semibold mb-3">지역별 TOP</h3>
                <div className="bg-slate-700 h-64 rounded-lg relative">
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
                <button onClick={onBack} className="mr-3 p-1 text-slate-300 hover:text-white"><ChevronsLeft size={20}/></button>
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
    const [aiCommentary, setAiCommentary] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleGenerateCommentary = async () => {
        setIsLoading(true);
        setAiCommentary("AI가 경기 내용을 분석하고 있습니다...");

        const winner = match.result === 'win' ? currentUser.name : match.opponent.name;
        const myScoreText = match.scoreDetail.myScore.length > 0 ? match.scoreDetail.myScore.join(', ') : "득점 없음";
        const opponentScoreText = match.scoreDetail.opponentScore.length > 0 ? match.scoreDetail.opponentScore.join(', ') : "득점 없음";

        const prompt = `너는 검도 해설가야. 다음 경기 결과에 대한 해설을 작성해줘. 경기는 ${currentUser.name} 선수와 ${match.opponent.name} 선수 간에 치러졌어. 최종 스코어는 ${match.score}로 ${winner} 선수가 승리했어. ${currentUser.name} 선수는 ${myScoreText} 부위로 득점했고, ${match.opponent.name} 선수는 ${opponentScoreText} 부위로 득점했어. 이 정보를 바탕으로 박진감 넘치는 경기 해설을 작성해줘.`;

        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            const apiKey = "" 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
              const text = result.candidates[0].content.parts[0].text;
              setAiCommentary(text);
            } else {
              setAiCommentary("해설 생성에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("Error generating commentary:", error);
            setAiCommentary("오류가 발생했습니다. 네트워크 연결을 확인해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

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
                                <p className={cn("font-bold text-xl", match.result === 'win' ? 'text-green-400' : match.result === 'loss' ? 'text-red-400' : 'text-slate-400')}>{match.result?.toUpperCase()}</p>
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
                            
                            <Card>
                                <h3 className="font-semibold mb-2 text-blue-400">해설</h3>
                                {match.commentary && <p className="text-sm text-slate-300 italic">"{match.commentary}"</p>}
                                {aiCommentary && <p className="text-sm text-slate-300 italic whitespace-pre-wrap">"{aiCommentary}"</p>}
                                {!match.commentary && !aiCommentary && (
                                    <button onClick={handleGenerateCommentary} disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-blue-600/80 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors disabled:opacity-50">
                                        <Sparkles size={16} /> {isLoading ? '생성 중...' : '✨ AI 경기 요약 생성'}
                                    </button>
                                )}
                            </Card>

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

const ExamResultHistoryModal = ({ history, onClose }) => {
    const chartHeight = 150; const chartWidth = 300; const yPadding = 20; const xPadding = 30;
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
                            {[0, 25, 50, 75, 100].map(score => (
                                <g key={score}>
                                    <line x1={xPadding} y1={getY(score)} x2={chartWidth} y2={getY(score)} stroke="#475569" strokeDasharray="2" />
                                    <text x={xPadding - 8} y={getY(score) + 4} fill="#94a3b8" fontSize="10" textAnchor="end">{score}</text>
                                </g>
                            ))}
                            {history.length > 1 && <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={linePath} />}
                            {history.map((h, i) => (<circle key={i} cx={getX(i)} cy={getY(h.score)} r="3" fill="#3b82f6" /> ))}
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
    const [userAnswers, setUserAnswers] = React.useState(() => questions.map(q => Array(q.answers.length).fill('')) );

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
            if (q.answers.every((ans, ansIndex) => userAnswers[qIndex][ansIndex].trim() === ans.trim())) {
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
                                <input type="text" value={userAnswers[currentQuestionIndex][index]} onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    className="inline-block w-24 mx-1 bg-slate-700 border-b-2 border-slate-500 focus:border-blue-400 text-center text-white outline-none" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700 flex-shrink-0">
                <button onClick={() => setCurrentQuestionIndex(i => i - 1)} disabled={currentQuestionIndex === 0} className="flex items-center gap-2 px-4 py-2 bg-slate-600 rounded-lg disabled:opacity-50">
                    <ChevronsLeft size={16} /> 이전
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                    <button onClick={() => setCurrentQuestionIndex(i => i + 1)} className="flex items-center gap-2 px-4 py-2 bg-slate-600 rounded-lg">
                        다음 <ChevronsRight size={16} />
                    </button>
                ) : (
                    <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg">제출하기</button>
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
             <button onClick={onViewResults} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">결과 보기</button>
            <button onClick={onRetry} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">다시 풀기</button>
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
        setQuestions(shuffled.slice(0, 5)); // 5 problems
        setTestState('ongoing'); setScore(null);
    };

    const finishTest = (finalScore) => {
        setScore(finalScore);
        const newHistoryEntry = { date: new Date().toISOString().split('T')[0], score: finalScore };
        setScoreHistory(prev => [...prev, newHistoryEntry]);
        setTestState('finished');
    };

    const resetTest = () => { setTestState('idle'); setQuestions([]); setScore(null); };

    if (showHistory) { return <ExamResultHistoryModal history={scoreHistory} onClose={() => setShowHistory(false)} />; }
    switch (testState) {
        case 'ongoing': return <ExamQuestionScreen questions={questions} onFinish={finishTest} />;
        case 'finished': return <ExamResultScreen score={score} onRetry={resetTest} onViewResults={() => setShowHistory(true)} />;
        case 'idle': default: return (
            <div className="p-4 space-y-4">
                <Card className="text-center">
                    <h2 className="text-xl font-bold mb-2">학과 심사 모의 시험</h2>
                    <p className="text-sm text-slate-400 mb-4">랜덤으로 5문제가 출제됩니다.</p>
                    <button onClick={startTest} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">시험 시작</button>
                </Card>
                <Card className="text-center">
                     <h2 className="text-xl font-bold mb-2">지난 결과 보기</h2>
                    <p className="text-sm text-slate-400 mb-4">이전 시험 결과 및 점수 추이를 확인합니다.</p>
                    <button onClick={() => setShowHistory(true)} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">결과 보기</button>
                </Card>
            </div> );
    }
};

const InfoModal = ({ title, date, location, details, onClose, showApplyButton }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold">{title}</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-300"><Calendar size={14} /> <span>{date}</span></div>
                <div className="flex items-center gap-2 text-sm text-slate-300"><MapPin size={14} /> <span>{location}</span></div>
                <p className="text-sm bg-slate-700/50 p-3 rounded-lg">{details}</p>
            </div>
            {showApplyButton && (
                <div className="p-4 flex-shrink-0">
                    <button onClick={() => alert('신청 완료!')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">신청하기</button>
                </div>
            )}
        </div>
    </div>
);

const PromotionCard = ({ item }) => (
    <Card>
        <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover rounded-lg mb-3" />
        <p className="text-xs text-blue-400 font-semibold">{item.organizer}</p>
        <h3 className="font-bold text-lg">{item.title}</h3>
        <p className="text-sm text-slate-400 mt-1">{item.content}</p>
    </Card>
);

const TravelPackageDetailModal = ({ pkg, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="relative">
                <img src={pkg.imageUrl} alt={pkg.destination} className="w-full h-40 object-cover rounded-t-2xl" />
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-white bg-black/50 rounded-full hover:bg-black/80"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-4">
                <h2 className="text-xl font-bold">{pkg.destination}</h2>
                <p className="text-sm text-slate-400">{pkg.description}</p>
                <div className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                    <p className="font-bold text-lg text-blue-400">{pkg.price}</p>
                    <div className="text-right">
                        <p className="font-semibold">{pkg.currentApplicants} / {pkg.maxApplicants}명</p>
                        <p className="text-xs text-slate-400">신청 현황</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-blue-400 mb-2">커리큘럼</h3>
                    <div className="space-y-1">
                        {pkg.details.curriculum.map((c, i) => <p key={i} className="text-sm bg-slate-700/20 p-2 rounded-md">{c}</p>)}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-blue-400 mb-2">참고 사항</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        {pkg.details.notes.map((n, i) => <li key={i}>{n}</li>)}
                    </ul>
                </div>
            </div>
            <div className="p-4 flex-shrink-0">
                <button disabled={pkg.isConfirmed} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">
                    {pkg.isConfirmed ? '모집 마감' : '참가 신청'}
                </button>
            </div>
        </div>
    </div>
);

const AnnouncementsScreen = () => {
    const [activeTab, setActiveTab] = React.useState('theory_exam');
    const [modalContent, setModalContent] = React.useState(null);
    const [selectedTravelPackage, setSelectedTravelPackage] = React.useState(null);

    const announceTabs = [
        { id: 'theory_exam', label: '학과심사' }, { id: 'kka', label: '대한검도회' },
        { id: 'promo', label: '홍보' }, { id: 'training', label: '무도수행' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'theory_exam': return <TheoryExamScreen />;
            case 'kka': return (
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
                </div> );
            case 'promo': return ( <div className="space-y-4"> {promoItems.map(item => <PromotionCard key={item.id} item={item} />)} </div> );
            case 'training': return (
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
                </div> );
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
            {modalContent && ( <InfoModal {...modalContent} onClose={() => setModalContent(null)} showApplyButton={modalContent.type === 'apply'} /> )}
            {selectedTravelPackage && <TravelPackageDetailModal pkg={selectedTravelPackage} onClose={() => setSelectedTravelPackage(null)} />}
        </>
    );
};

const AIAnalysisModal = ({ user, onClose }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [analysis, setAnalysis] = React.useState('');

    React.useEffect(() => {
        const generateAnalysis = async () => {
            const stats = user.detailedStats;
            const interestingStatsText = stats.interestingStats.map(s => `${s.label}: ${s.value}`).join('\n');
            const prompt = `너는 검도 코치야. 다음 검도 수련자의 데이터를 보고, 이 사람의 검도 스타일, 강점, 그리고 개선점을 분석해줘. 친절하고 격려하는 말투로 답변해줘. 각 항목을 명확하게 구분해서 설명해줘.

### 선수 데이터
- **이름**: ${user.name}
- **공식 단수**: ${user.officialRank}
- **주특기**: ${user.specialty}
- **특징**: ${user.characteristics.join(', ')}
- **전체 전적**: ${user.wins}승 ${user.losses}패
- **득점 부위 분석**: 머리 ${stats.scoringBreakdown.head}%, 손목 ${stats.scoringBreakdown.wrist}%, 허리 ${stats.scoringBreakdown.waist}%, 찌름 ${stats.scoringBreakdown.thrust}%
- **고단자 상대 전적**: ${stats.vsHigherRank.wins}승 ${stats.vsHigherRank.losses}패 ${stats.vsHigherRank.draws}무
- **주요 기록**:
${interestingStatsText}`;

            try {
                let chatHistory = [];
                chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                const payload = { contents: chatHistory };
                const apiKey = "" 
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const result = await response.json();
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                  const text = result.candidates[0].content.parts[0].text;
                  setAnalysis(text);
                } else {
                  setAnalysis("분석 데이터를 생성하는 데 실패했습니다. 다시 시도해주세요.");
                }
            } catch (error) {
                console.error("Error generating analysis:", error);
                setAnalysis("오류가 발생했습니다. 네트워크 연결을 확인해주세요.");
            } finally {
                setIsLoading(false);
            }
        };

        generateAnalysis();
    }, [user]);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold flex items-center gap-2"><Sparkles className="text-yellow-400" size={20}/> AI 스타일 분석</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-48">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
                            <p className="mt-4 text-slate-400">AI가 데이터를 분석 중입니다...</p>
                        </div>
                    ) : (
                        <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{analysis}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProfileScreen = ({ user, onNavigate }) => {
    const [expandedRecord, setExpandedRecord] = React.useState(null);
    const [isAiModalOpen, setIsAiModalOpen] = React.useState(false);

    const toggleRecord = (type) => {
        setExpandedRecord(prev => (prev === type ? null : type));
    };

    const matchesToShow = mockMatchHistory.filter(m => m.status === 'completed' && m.result === expandedRecord);

    return (
        <>
            <div className="p-4 space-y-6 text-white">
                <Card>
                    <div className="flex items-center gap-4">
                        <UserAvatar user={user} size="lg" />
                        <div className="flex-1">
                             <h1 className="text-2xl font-bold">{user.name}</h1>
                            <p className="text-slate-400">{user.dojang} · {user.location}</p>
                            <div className="mt-2 flex items-center gap-4">
                                <span className="font-semibold text-yellow-400 flex items-center gap-1.5"><Star className="w-4 h-4" />{user.officialRank}</span>
                                <span className="font-semibold text-blue-400">{user.platformRank}P</span>
                            </div>
                        </div>
                    </div>
                </Card>
                
                <Card onClick={() => setIsAiModalOpen(true)} className="bg-gradient-to-r from-purple-500/30 to-blue-500/30 border-purple-500/50">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-6 h-6 text-yellow-300" />
                            <p className="font-bold text-lg">✨ AI로 내 검도 스타일 분석하기</p>
                        </div>
                        <ChevronsRight className="w-6 h-6 text-purple-400" />
                    </div>
                </Card>

                <div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <Card onClick={() => toggleRecord('win')}>
                            <div className="flex justify-center items-center gap-2">
                                <p className="text-2xl font-bold text-green-400">{user.wins}</p>
                                <p className="text-sm text-slate-400">승리</p>
                                <ChevronDown className={cn("transition-transform text-slate-400", expandedRecord === 'win' && "rotate-180")} size={20}/>
                            </div>
                        </Card>
                        <Card onClick={() => toggleRecord('loss')}>
                            <div className="flex justify-center items-center gap-2">
                                <p className="text-2xl font-bold text-red-400">{user.losses}</p>
                                <p className="text-sm text-slate-400">패배</p>
                                 <ChevronDown className={cn("transition-transform text-slate-400", expandedRecord === 'loss' && "rotate-180")} size={20}/>
                            </div>
                        </Card>
                    </div>
                    {expandedRecord && (
                        <div className="mt-2 bg-slate-800/50 border border-slate-700 rounded-xl p-2 max-h-60 overflow-y-auto">
                            <div className="space-y-1">
                            {matchesToShow.map(match => (
                                <div key={match.id} className="bg-slate-700/50 p-2 rounded-md text-sm flex justify-between items-center">
                                    <span className="truncate">vs {match.opponent.name} ({match.date})</span>
                                    <span className="font-semibold flex-shrink-0 ml-2">{match.score}</span>
                                </div>
                            ))}
                            </div>
                        </div>
                    )}
                </div>

                <Card>
                    <h3 className="font-semibold text-lg mb-3">뱃지</h3>
                    <div className="flex justify-around">
                        {user.badges.map(badge => <Badge key={badge} type={badge} />)}
                    </div>
                </Card>
                
                <Card onClick={() => onNavigate('matchHistory')} className="bg-blue-600/30 border-blue-500/50">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <FileText className="w-6 h-6 text-blue-300" />
                            <p className="font-bold text-lg">전체 전적 보기</p>
                        </div>
                        <ChevronsRight className="w-6 h-6 text-blue-400" />
                    </div>
                </Card>

                <Card>
                    <h3 className="font-semibold text-lg mb-3">나의 스타일</h3>
                    <div className="space-y-2">
                        <p className="text-sm"><strong className="text-slate-400 w-16 inline-block">특기:</strong> {user.specialty}</p>
                        <div className="flex items-start">
                            <strong className="text-slate-400 w-16 inline-block pt-1">특징:</strong>
                            <div className="flex flex-wrap gap-2 flex-1">
                                {user.characteristics.map(c => <span key={c} className="bg-slate-700 text-xs font-medium px-2 py-1 rounded-full">{c}</span>)}
                            </div>
                        </div>
                    </div>
                </Card>

                <DetailedStatsCard stats={user.detailedStats} />
            </div>

            {isAiModalOpen && <AIAnalysisModal user={user} onClose={() => setIsAiModalOpen(false)} />}
        </>
    );
};

const MatchHistoryScreen = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = React.useState('completed');
    const [selectedMatch, setSelectedMatch] = React.useState(null);

    const filteredMatches = mockMatchHistory.filter(m => m.status === activeTab);

    const MatchHistoryItem = ({ match }) => {
        const isWin = match.result === 'win';
        const isLoss = match.result === 'loss';
        const isDraw = match.result === 'draw';

        return (
            <Card onClick={() => setSelectedMatch(match)}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <UserAvatar user={match.opponent} size="sm" />
                        <div>
                            <p className="font-semibold">{match.opponent.name}</p>
                            <p className="text-sm text-slate-400">{match.date} {match.time || ''}</p>
                        </div>
                    </div>
                    {match.status === 'completed' && (
                        <div className="text-right">
                            <p className={cn( "font-bold text-lg", isWin && "text-green-400", isLoss && "text-red-400", isDraw && "text-slate-400" )}>{match.result?.toUpperCase()}</p>
                            <p className="text-sm font-semibold">{match.score}</p>
                        </div>
                    )}
                    {match.status === 'upcoming' && ( <div className="text-right"><p className="font-bold text-blue-400">예정</p></div> )}
                </div>
            </Card>
        );
    };

    return (
        <>
            <div className="p-4 space-y-4 text-white">
                <div className="flex items-center gap-2">
                    <button onClick={() => onNavigate('profile')} className="p-2 text-slate-300 hover:text-white"><ChevronsLeft size={24} /></button>
                    <h1 className="text-2xl font-bold">전적</h1>
                </div>
                <div className="flex bg-slate-800 p-1 rounded-lg">
                    <button onClick={() => setActiveTab('completed')} className={cn('w-1/2 py-2 rounded-md text-sm font-semibold', activeTab === 'completed' ? 'bg-blue-600' : 'hover:bg-slate-700')}>완료된 경기</button>
                    <button onClick={() => setActiveTab('upcoming')} className={cn('w-1/2 py-2 rounded-md text-sm font-semibold', activeTab === 'upcoming' ? 'bg-blue-600' : 'hover:bg-slate-700')}>예정된 경기</button>
                </div>
                <div className="space-y-3">
                    {filteredMatches.map(match => <MatchHistoryItem key={match.id} match={match} />)}
                </div>
            </div>
            {selectedMatch && <MatchDetailModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />}
        </>
    );
};

// --- MAIN APP COMPONENT ---
const KendoAppPage = () => {
  const [activeTab, setActiveTab] = React.useState('home');
  const [notifications, setNotifications] = React.useState(mockNotifications);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [selectedNotification, setSelectedNotification] = React.useState(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSelectNotification = (notification) => {
      setSelectedNotification(notification);
      setNotifications(notifications.map(n => n.id === notification.id ? { ...n, read: true } : n));
      setShowNotifications(false);
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen user={currentUser} onNavigate={setActiveTab} notifications={notifications.filter(n => !n.read)} onSelectNotification={handleSelectNotification} />;
      case 'match':
        return <MatchScreen />;
      case 'ranking':
        return <RankingScreen />;
      case 'community':
        return <CommunityScreen />;
      case 'announcements':
        return <AnnouncementsScreen />;
      case 'profile':
        return <ProfileScreen user={currentUser} onNavigate={setActiveTab} />;
      case 'matchHistory':
        return <MatchHistoryScreen onNavigate={setActiveTab} />;
      default:
        return <HomeScreen user={currentUser} onNavigate={setActiveTab} notifications={notifications.filter(n => !n.read)} onSelectNotification={handleSelectNotification} />;
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
            <div className="flex items-center gap-2">
                <NotificationBell count={unreadCount} onClick={() => setShowNotifications(true)} />
                <button className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                    <Settings className="w-5 h-5 text-slate-400" />
                </button>
            </div>
        </header>

        <div className="flex-grow overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#334155 #1e293b' }}>
          {renderContent()}
        </div>

        <nav className="flex justify-around items-center p-2 border-t border-slate-800 bg-slate-950/80 backdrop-blur-sm flex-shrink-0">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn( 'flex flex-col items-center justify-center w-1/5 p-1 rounded-lg transition-all duration-200', 'text-slate-400 hover:bg-slate-800', activeTab === item.id || (activeTab === 'matchHistory' && item.id === 'profile') ? 'text-blue-400' : '' )} >
              <div className={cn('mb-1 transition-transform', activeTab === item.id ? 'scale-110' : 'scale-100')}>{item.icon}</div>
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {showNotifications && <NotificationModal notifications={notifications} onSelect={handleSelectNotification} onClose={() => setShowNotifications(false)} />}
      {selectedNotification && <NotificationDetailModal notification={selectedNotification} onClose={() => setSelectedNotification(null)} />}
    </main>
  );
};

export default KendoAppPage;
