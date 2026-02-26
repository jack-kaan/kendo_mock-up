export type OfficialRank = '1단' | '2단' | '3단' | '4단' | '5단';
export type BadgeType = 'First Match' | '5-Win Streak' | 'Weekly Activity King' | 'Mentor' | 'Community Contributor';

export interface KendoUser {
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
}

export interface Match {
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
  commentary?: string | null;
  likes: number;
  dislikes: number;
  comments: { id: number; text: string }[];
  privacySettings?: {
    video: boolean;
    comments: boolean;
    likes: boolean;
    commentary: boolean;
  };
}

export interface CommunityPost {
  id: number;
  author: KendoUser;
  type: 'review' | 'video';
  title: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export type AnonymousPost = Omit<CommunityPost, 'author' | 'type'> & {
  author: { name: '익명'; avatarUrl?: string };
};

export interface TradePost {
  id: number;
  author: KendoUser;
  itemName: string;
  price: string;
  description: string;
  status: '판매중' | '예약중' | '판매완료';
  imageUrl?: string;
  timestamp: string;
}

export interface Ranking {
  user: KendoUser;
  points: number;
  wins: number;
  rankChange: number;
}

export interface ChatMessage {
  id: number;
  sender: 'me' | 'other' | string;
  text: string;
  timestamp: string;
}

export type ChatPartner = KendoUser | { id: number; name: string; avatarUrl?: string; members?: number };

export interface Chat {
  id: number;
  partner: ChatPartner;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: ChatMessage[];
  type: 'private' | 'group' | 'club';
}

export interface TravelPackage {
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
  };
}

export interface MiniDojoComment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
  replies: { id: number; author: string; text: string; timestamp: string }[];
}

export interface MiniDojoItem {
  id: number;
  name: string;
  description: string;
  points: number;
  imageUrl: string;
}

export interface GifticonCategory {
  category: string;
  items: string[];
}

export interface ShopItem {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

export interface Quest {
  id: number;
  text: string;
  current: number;
  target: number;
  unit: string;
  reward: number;
  selected: boolean;
  description: string;
}

export interface Goal {
  id: number;
  text: string;
  completed: boolean;
  current?: number;
  target?: number;
}

export interface PointHistoryEntry {
  date: string;
  change: string;
  reason: string;
}

export interface KendoTheoryQuestion {
  id: number;
  title: string;
  questionText: string;
  answers: string[];
}

export interface ScoreHistoryEntry {
  date: string;
  score: number;
}

export type NotificationType = 'new_request' | 'declined' | 'changed' | 'comment' | 'like';

export interface KendoNotification {
  id: number;
  type: NotificationType;
  opponent: KendoUser;
  read: boolean;
  message?: string;
}

export interface Promotion {
  id: number;
  title: string;
  date: string;
  location: string;
  details: string;
}

export interface Seminar {
  id: number;
  title: string;
  date: string;
  location: string;
  details: string;
}

export interface PromotionItem {
  id: number;
  type: 'openClass' | string;
  title: string;
  organizer: string;
  content: string;
  imageUrl: string;
}

export interface SparringCandidate {
  id: number;
  name: string;
  location: string;
  officialRank: OfficialRank;
  dojang: string;
  experience: number;
  winRate: number;
  features: string[];
  strategy: string[];
}
