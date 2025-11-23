export type OfficialRank = '1단' | '2단' | '3단' | '4단' | '5단';
export type BadgeType = 'First Match' | '5-Win Streak' | 'Weekly Activity King' | 'Mentor' | 'Community Contributor';

export type KendoUser = {
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

export type Match = {
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

export type CommunityPost = {
    id: number;
    author: KendoUser;
    type: 'review' | 'video';
    title: string;
    content: string;
    likes: number;
    comments: number;
    timestamp: string;
};

export type AnonymousPost = Omit<CommunityPost, 'author' | 'type'> & { author: { name: '익명', avatarUrl?: string } };

export type TradePost = {
    id: number;
    author: KendoUser;
    itemName: string;
    price: string;
    description: string;
    status: '판매중' | '예약중' | '판매완료';
    imageUrl?: string;
    timestamp: string;
};

export type Ranking = {
    user: KendoUser;
    points: number;
    wins: number;
    rankChange: number;
};

export type ChatMessage = {
    id: number;
    sender: 'me' | 'other' | string;
    text: string;
    timestamp: string;
};

export type ChatPartner = KendoUser | { id: number; name: string; avatarUrl?: string; members?: number };

export type Chat = {
    id: number;
    partner: ChatPartner;
    lastMessage: string;
    timestamp: string;
    unread: number;
    messages: ChatMessage[];
    type: 'private' | 'group' | 'club';
};

export type TravelPackage = {
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

export type ExamQuestion = {
    id: number;
    title: string;
    questionText: string;
    answers: string[];
    imageUrl?: string;
};
