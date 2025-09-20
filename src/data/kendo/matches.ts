import { Match, SparringCandidate } from '../../types/kendo';
import { currentUser, mockUsers } from './users';

const initialMatchHistory: Match[] = [
  {
    id: 1,
    opponent: mockUsers[0],
    result: 'win',
    date: '2024-05-20',
    score: '2-1',
    scoreDetail: { myScore: ['머리', '손목'], opponentScore: ['머리'] },
    status: 'completed',
    privacy: 'public',
    videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video',
    commentary:
      '김형섭 선수의 머리치기가 매우 인상적인 경기였습니다. 한승오 선수는 침착하게 받아치며 점수를 획득했습니다.',
    likes: 128,
    dislikes: 5,
    comments: [
      { id: 1, text: '정말 멋진 경기였어요!' },
      { id: 2, text: '두 분 다 대단하시네요.' },
    ],
  },
  {
    id: 2,
    opponent: mockUsers[1],
    result: 'loss',
    date: '2024-05-18',
    score: '0-1',
    scoreDetail: { myScore: [], opponentScore: ['손목'] },
    status: 'completed',
    privacy: 'private',
    videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video',
    likes: 0,
    dislikes: 0,
    comments: [],
    privacySettings: { video: true, comments: false, likes: false, commentary: false },
  },
  {
    id: 3,
    opponent: mockUsers[4],
    result: 'win',
    date: '2024-05-15',
    score: '1-0',
    scoreDetail: { myScore: ['허리'], opponentScore: [] },
    status: 'completed',
    privacy: 'private',
    likes: 0,
    dislikes: 0,
    comments: [],
    privacySettings: { video: false, comments: false, likes: false, commentary: false },
  },
  {
    id: 4,
    opponent: mockUsers[2],
    result: 'draw',
    date: '2024-05-11',
    score: '1-1',
    scoreDetail: { myScore: ['머리'], opponentScore: ['머리'] },
    status: 'completed',
    privacy: 'public',
    videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video',
    commentary: null,
    likes: 95,
    dislikes: 2,
    comments: [{ id: 1, text: '아슬아슬했네요!' }],
  },
  {
    id: 7,
    opponent: mockUsers[0],
    result: 'win',
    date: '2024-04-25',
    score: '1-0',
    scoreDetail: { myScore: ['손목'], opponentScore: [] },
    status: 'completed',
    privacy: 'public',
    videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video',
    commentary: '빠른 손목치기로 승리했습니다.',
    likes: 88,
    dislikes: 1,
    comments: [],
  },
  {
    id: 8,
    opponent: mockUsers[3],
    result: 'loss',
    date: '2024-04-10',
    score: '1-2',
    scoreDetail: { myScore: ['머리'], opponentScore: ['손목', '허리'] },
    status: 'completed',
    privacy: 'public',
    videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video',
    commentary: null,
    likes: 70,
    dislikes: 8,
    comments: [],
  },
  {
    id: 5,
    opponent: mockUsers[3],
    date: '2025-07-28',
    time: '18:00',
    status: 'upcoming',
    privacy: 'public',
    likes: 0,
    dislikes: 0,
    comments: [],
  },
  {
    id: 6,
    opponent: mockUsers[2],
    date: '2025-08-04',
    time: '19:00',
    status: 'upcoming',
    privacy: 'public',
    likes: 0,
    dislikes: 0,
    comments: [],
  },
  {
    id: 9,
    opponent: mockUsers[4],
    date: '2025-08-10',
    time: '20:00',
    status: 'upcoming',
    privacy: 'public',
    likes: 0,
    dislikes: 0,
    comments: [],
  },
];

const additionalWins: Match[] = Array.from({ length: 38 }, (_, index) => {
  const opponent = mockUsers[index % mockUsers.length];
  return {
    id: 100 + index,
    opponent,
    result: 'win',
    date: `2024-03-${Math.floor(Math.random() * 28) + 1}`,
    score: '2-0',
    scoreDetail: { myScore: ['머리', '손목'], opponentScore: [] },
    status: 'completed',
    privacy: 'public',
    likes: Math.floor(Math.random() * 50),
    dislikes: Math.floor(Math.random() * 5),
    comments: [],
  };
});

const additionalLosses: Match[] = Array.from({ length: 13 }, (_, index) => {
  const opponent = mockUsers[index % mockUsers.length];
  return {
    id: 200 + index,
    opponent,
    result: 'loss',
    date: `2024-02-${Math.floor(Math.random() * 28) + 1}`,
    score: '0-2',
    scoreDetail: { myScore: [], opponentScore: ['머리', '손목'] },
    status: 'completed',
    privacy: 'public',
    likes: Math.floor(Math.random() * 50),
    dislikes: Math.floor(Math.random() * 5),
    comments: [],
  };
});

export const mockMatchHistory: Match[] = [
  ...initialMatchHistory,
  ...additionalWins,
  ...additionalLosses,
];

export const sparringCandidatesList: SparringCandidate[] = Array.from({ length: 20 }, (_, index) => {
  const base = mockUsers[index % mockUsers.length];
  const winRate = Math.round((base.wins / (base.wins + base.losses)) * 100);
  return {
    id: index + 1,
    name: index < mockUsers.length ? base.name : `${base.name} ${Math.floor(index / mockUsers.length) + 1}`,
    location: base.location,
    officialRank: base.officialRank,
    dojang: base.dojang,
    experience: 3 + (index % 5),
    winRate,
    features: ['공격적 스타일', '빠른 발놀림', '침착한 수비', '강한 체력'],
    strategy: ['초반 적극 공세', '중반 페이스 조절', '상대 빈틈 분석', '마지막에 결정타'],
  };
}).sort((a, b) => b.winRate - a.winRate);

export const homeRecord = {
  wins: 20,
  losses: 5,
};

export const awayRecord = {
  wins: 22,
  losses: 10,
};

export const vsHigherRankRecord = currentUser.detailedStats.vsHigherRank;

export const interestingStats = currentUser.detailedStats.interestingStats;
