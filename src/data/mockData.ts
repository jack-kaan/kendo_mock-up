import { KendoUser, Ranking, Match, CommunityPost, AnonymousPost, TradePost, Chat, TravelPackage } from '../types';

export const currentUser: KendoUser = {
    id: 1,
    name: '한승오',
    dojang: '주이회',
    location: '대전',
    platformRank: 1510,
    officialRank: '4단',
    wins: 42,
    losses: 15,
    badges: ['First Match', 'Community Contributor', '5-Win Streak'],
    avatarUrl: 'https://placehold.co/100x100/1e293b/1e293b?text=',
    avatarItems: { jukdoCount: 3 },
    rankHistory: [{ date: '2024-01-01', rank: 1480 }, { date: '2024-03-01', rank: 1500 }, { date: '2024-05-01', rank: 1490 }, { date: '2024-07-01', rank: 1510 }],
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

export const mockUsers: KendoUser[] = [
    { id: 2, name: '김형섭', dojang: '주이회', location: '대전', platformRank: 1550, officialRank: '2단', wins: 51, losses: 10, badges: ['5-Win Streak'], avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=HS', avatarItems: { jukdoCount: 5 }, rankHistory: [{ date: '2024-01-01', rank: 1500 }, { date: '2024-03-01', rank: 1520 }, { date: '2024-05-01', rank: 1540 }, { date: '2024-07-01', rank: 1550 }], detailedStats: currentUser.detailedStats, specialty: '빠른 머리치기', characteristics: ['공격적', '스피드가 빠름', '압박이 강함'] },
    { id: 3, name: '이노연', dojang: '주이회', location: '대전', platformRank: 1580, officialRank: '2단', wins: 30, losses: 8, badges: ['First Match'], avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=NY', avatarItems: { jukdoCount: 2 }, rankHistory: [{ date: '2024-01-01', rank: 1590 }, { date: '2024-03-01', rank: 1585 }, { date: '2024-05-01', rank: 1580 }, { date: '2024-07-01', rank: 1580 }], detailedStats: currentUser.detailedStats, specialty: '손목치기', characteristics: ['신중함', '정확도가 높음', '방어가 견고함'] },
    { id: 4, name: '문준형', dojang: '평송센터', location: '대전', platformRank: 1450, officialRank: '4단', wins: 78, losses: 20, badges: ['Weekly Activity King'], avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=JH', avatarItems: { jukdoCount: 4 }, rankHistory: [{ date: '2024-01-01', rank: 1400 }, { date: '2024-03-01', rank: 1420 }, { date: '2024-05-01', rank: 1460 }, { date: '2024-07-01', rank: 1450 }], detailedStats: currentUser.detailedStats, specialty: '퇴격머리치기', characteristics: ['노련함', '변칙적', '체력이 좋음'] },
    { id: 5, name: '이정현', dojang: '원검도관', location: '서울', platformRank: 1420, officialRank: '2단', wins: 25, losses: 12, badges: [], avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=JH2', avatarItems: { jukdoCount: 1 }, rankHistory: [{ date: '2024-01-01', rank: 1410 }, { date: '2024-03-01', rank: 1400 }, { date: '2024-05-01', rank: 1415 }, { date: '2024-07-01', rank: 1420 }], detailedStats: currentUser.detailedStats, specialty: '찌름', characteristics: ['과감함', '한방이 있음', '예측이 어려움'] },
    { id: 6, name: '남경오', dojang: '경호관', location: '구미', platformRank: 1490, officialRank: '5단', wins: 18, losses: 5, badges: ['Mentor'], avatarUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=KH', avatarItems: { jukdoCount: 6 }, rankHistory: [{ date: '2024-01-01', rank: 1480 }, { date: '2024-03-01', rank: 1485 }, { date: '2024-05-01', rank: 1495 }, { date: '2024-07-01', rank: 1490 }], detailedStats: currentUser.detailedStats, specialty: '상단', characteristics: ['기세가 강함', '압도적', '경험이 많음'] },
    { id: 7, name: '박민수', dojang: '서울대검도부', location: '서울', platformRank: 1380, officialRank: '3단', wins: 35, losses: 15, badges: ['Community Contributor'], avatarUrl: 'https://placehold.co/100x100/059669/d1fae5?text=MS', avatarItems: { jukdoCount: 3 }, rankHistory: [{ date: '2024-01-01', rank: 1350 }, { date: '2024-03-01', rank: 1365 }, { date: '2024-05-01', rank: 1375 }, { date: '2024-07-01', rank: 1380 }], detailedStats: currentUser.detailedStats, specialty: '응지기술', characteristics: ['반사신경이 빠름', '안정적', '기본기가 탄탄함'] },
    { id: 8, name: '최영훈', dojang: '부산검도연맹', location: '부산', platformRank: 1460, officialRank: '4단', wins: 42, losses: 18, badges: ['Weekly Activity King'], avatarUrl: 'https://placehold.co/100x100/dc2626/fef2f2?text=YH', avatarItems: { jukdoCount: 4 }, rankHistory: [{ date: '2024-01-01', rank: 1440 }, { date: '2024-03-01', rank: 1450 }, { date: '2024-05-01', rank: 1455 }, { date: '2024-07-01', rank: 1460 }], detailedStats: currentUser.detailedStats, specialty: '카운터 어택', characteristics: ['냉정함', '타이밍이 좋음', '분석력이 뛰어남'] },
    { id: 9, name: '정수현', dojang: '인천무도회', location: '인천', platformRank: 1520, officialRank: '3단', wins: 28, losses: 11, badges: ['First Match'], avatarUrl: 'https://placehold.co/100x100/7c3aed/f3e8ff?text=SH', avatarItems: { jukdoCount: 3 }, rankHistory: [{ date: '2024-01-01', rank: 1500 }, { date: '2024-03-01', rank: 1510 }, { date: '2024-05-01', rank: 1515 }, { date: '2024-07-01', rank: 1520 }], detailedStats: currentUser.detailedStats, specialty: '머리-손목 연결기', characteristics: ['창의적', '조합력이 좋음', '자신감이 넘침'] }
];

export const allUsers = [currentUser, ...mockUsers];

export const allRankings = {
    month: {
        score: allUsers.map(u => ({ user: u, points: u.platformRank + Math.floor(Math.random() * 50) - 25, wins: u.wins, rankChange: Math.floor(Math.random() * 7) - 3 })).sort((a, b) => b.points - a.points),
        wins: allUsers.map(u => ({ user: u, points: u.platformRank, wins: u.wins + Math.floor(Math.random() * 10), rankChange: Math.floor(Math.random() * 7) - 3 })).sort((a, b) => b.wins - a.wins),
    },
    season: {
        score: allUsers.map(u => ({ user: u, points: u.platformRank + Math.floor(Math.random() * 150) - 75, wins: u.wins, rankChange: Math.floor(Math.random() * 7) - 3 })).sort((a, b) => b.points - a.points),
        wins: allUsers.map(u => ({ user: u, points: u.platformRank, wins: u.wins + Math.floor(Math.random() * 30), rankChange: Math.floor(Math.random() * 7) - 3 })).sort((a, b) => b.wins - a.wins),
    },
    year: {
        score: allUsers.map(u => ({ user: u, points: u.platformRank + Math.floor(Math.random() * 300) - 150, wins: u.wins, rankChange: Math.floor(Math.random() * 7) - 3 })).sort((a, b) => b.points - a.points),
        wins: allUsers.map(u => ({ user: u, points: u.platformRank, wins: u.wins + Math.floor(Math.random() * 50), rankChange: Math.floor(Math.random() * 7) - 3 })).sort((a, b) => b.wins - a.wins),
    }
};

const initialMatchHistory: Match[] = [
    { id: 1, opponent: mockUsers[0], result: 'win', date: '2024-05-20', score: '2-1', scoreDetail: { myScore: ['머리', '손목'], opponentScore: ['머리'] }, status: 'completed', privacy: 'public', videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video', commentary: '김형섭 선수의 머리치기가 매우 인상적인 경기였습니다. 한승오 선수는 침착하게 받아치며 점수를 획득했습니다.', likes: 128, dislikes: 5, comments: [{ id: 1, text: '정말 멋진 경기였어요!' }, { id: 2, text: '두 분 다 대단하시네요.' }] },
    { id: 2, opponent: mockUsers[1], result: 'loss', date: '2024-05-18', score: '0-1', scoreDetail: { myScore: [], opponentScore: ['손목'] }, status: 'completed', privacy: 'private', videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video', likes: 0, dislikes: 0, comments: [], privacySettings: { video: true, comments: false, likes: false, commentary: false } },
    { id: 3, opponent: mockUsers[4], result: 'win', date: '2024-05-15', score: '1-0', scoreDetail: { myScore: ['허리'], opponentScore: [] }, status: 'completed', privacy: 'private', likes: 0, dislikes: 0, comments: [], privacySettings: { video: false, comments: false, likes: false, commentary: false } },
    { id: 4, opponent: mockUsers[2], result: 'draw', date: '2024-05-11', score: '1-1', scoreDetail: { myScore: ['머리'], opponentScore: ['머리'] }, status: 'completed', privacy: 'public', videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video', commentary: null, likes: 95, dislikes: 2, comments: [{ id: 1, text: '아슬아슬했네요!' }] },
    { id: 7, opponent: mockUsers[0], result: 'win', date: '2024-04-25', score: '1-0', scoreDetail: { myScore: ['손목'], opponentScore: [] }, status: 'completed', privacy: 'public', videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video', commentary: '빠른 손목치기로 승리했습니다.', likes: 88, dislikes: 1, comments: [] },
    { id: 8, opponent: mockUsers[3], result: 'loss', date: '2024-04-10', score: '1-2', scoreDetail: { myScore: ['머리'], opponentScore: ['손목', '허리'] }, status: 'completed', privacy: 'public', videoUrl: 'https://placehold.co/1600x900/1e293b/94a3b8?text=Match+Video', commentary: null, likes: 70, dislikes: 8, comments: [] },
    { id: 5, opponent: mockUsers[3], date: '2025-07-28', time: '18:00', status: 'upcoming', privacy: 'public', likes: 0, dislikes: 0, comments: [] },
    { id: 6, opponent: mockUsers[2], date: '2025-08-04', time: '19:00', status: 'upcoming', privacy: 'public', likes: 0, dislikes: 0, comments: [] },
    { id: 9, opponent: mockUsers[4], date: '2025-08-10', time: '20:00', status: 'upcoming', privacy: 'public', likes: 0, dislikes: 0, comments: [] },
];

const additionalWins: Match[] = Array.from({ length: 38 }, (_, i) => {
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

const additionalLosses: Match[] = Array.from({ length: 13 }, (_, i) => {
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

export const mockMatchHistory = [...initialMatchHistory, ...additionalWins, ...additionalLosses];

export const communityPosts: CommunityPost[] = [
    { id: 1, author: mockUsers[0], type: 'video', title: '기본 머리치기 연습 영상', content: '기본기 훈련은 아무리 강조해도 지나치지 않습니다. 함께 보며 의견 나뉀요.', likes: 128, comments: 15, timestamp: '2h ago' },
    { id: 2, author: currentUser, type: 'review', title: '이노연님과의 경기 후기', content: '세메(攻め)가 정말 날카로웠던 경기였습니다. 덕분에 많이 배울 수 있었습니다. 다음에는 오지와자(応じ技)를 더 연습해야겠습니다.', likes: 45, comments: 8, timestamp: '1d ago' },
    { id: 3, author: mockUsers[1], type: 'review', title: '승단심사 후기 및 팁', content: '4단 심사를 다녀왔습니다. 실기에서 중요한 것은 역시 대련자세와 정확한 기술 구사입니다.', likes: 89, comments: 23, timestamp: '3h ago' },
    { id: 4, author: mockUsers[2], type: 'video', title: '응지기술 단계별 연습법', content: '응지기술을 체계적으로 연습하는 방법을 소개합니다. 초보자부터 고단자까지 모두 활용할 수 있어요.', likes: 156, comments: 42, timestamp: '5h ago' },
    { id: 5, author: mockUsers[3], type: 'review', title: '전국체전 참가 후기', content: '올해 전국체전에 처음 출전했습니다. 대회 경험이 개인 실력 향상에 큰 도움이 되었습니다.', likes: 73, comments: 19, timestamp: '8h ago' },
    { id: 6, author: mockUsers[4], type: 'video', title: '하단 공격 방어법', content: '대련에서 자주 당하는 하단 공격에 대한 효과적인 방어법을 실전 예시와 함께 설명합니다.', likes: 94, comments: 31, timestamp: '12h ago' },
    { id: 7, author: mockUsers[5], type: 'review', title: '첫 대련 제신 성공 경험담', content: '오늘 처음으로 누군가에게 대련을 제신했는데 수락해 주셨어요! 너무 떨려서 누가 도움이 될까 싶어 경험을 공유합니다.', likes: 187, comments: 54, timestamp: '1d ago' },
    { id: 8, author: mockUsers[6], type: 'video', title: '단계별 기본 자세 체크리스트', content: '예니는 기본자세부터 고단자 자세까지 단계별로 체크할 수 있는 리스트를 준비했습니다.', likes: 112, comments: 27, timestamp: '1d ago' },
    { id: 9, author: mockUsers[7], type: 'review', title: '일본 도장 연수 후기', content: '작년 일본에서 3개월간 연수한 경험을 공유합니다. 다른 문화에서의 검도 수련은 정말 새로운 경험이었어요.', likes: 203, comments: 78, timestamp: '2d ago' },
    { id: 10, author: mockUsers[0], type: 'video', title: '대련 심리전 극복법', content: '대련 전 놀라움과 긴장을 이겨내는 심리적 준비 방법들을 실제 경험담과 함께 소개합니다.', likes: 165, comments: 43, timestamp: '2d ago' }
];

export const anonymousPosts: AnonymousPost[] = [
    { id: 101, author: { name: '익명' }, title: "요즘 슬럼프가 너무 심하게 오네요...", content: "머리치기가 전혀 되질 않습니다. 다들 어떻게 극복하시나요? 조언 부탁드립니다.", likes: 33, comments: 12, timestamp: "1h ago" },
    { id: 102, author: { name: '익명' }, title: "4단 심사 준비하시는 분 계신가요?", content: "본이랑 실기 준비를 어떻게 해야 할지 막막하네요. 같이 정보 공유해요.", likes: 45, comments: 18, timestamp: "3h ago" },
    { id: 103, author: { name: '익명' }, title: "성인 시작하기에 너무 늦었나요?", content: "35세에 검도를 시작하려고 하는데, 나이 때문에 주저하게 됩니다. 늦지 않았다고 말해주세요.", likes: 78, comments: 24, timestamp: "4h ago" },
    { id: 104, author: { name: '익명' }, title: "도장 선후배와 마찰이 있어서 힘들어요", content: "같은 도장 다니는 선후배가 자꾸 저를 비하는 것 같아요. 어떻게 하면 좋을까요?", likes: 52, comments: 31, timestamp: "6h ago" },
    { id: 105, author: { name: '익명' }, title: "처음 대회 출전 너무 떨려요", content: "다음 달 시대체전에 처음 나가는데 너무 떨려서 잘 늤이 없어요. 대회 경험 있으신 분들 조언 좋아요.", likes: 89, comments: 47, timestamp: "8h ago" },
    { id: 106, author: { name: '익명' }, title: "검도복과 호구 관리법 갈르쳐주세요", content: "운동 후 냄새 빠지지 않고 호구에 딴냄새도 배어 있어요. 효과적인 관리 방법이 있나요?", likes: 41, comments: 15, timestamp: "10h ago" },
    { id: 107, author: { name: '익명' }, title: "승단심사 불합격 후 우울감이 심해요", content: "준비 열심히 했는데 떨어져서 너무 상심이 커요. 어떻게 마음을 달래야 할지 모르겠어요.", likes: 67, comments: 29, timestamp: "12h ago" },
    { id: 108, author: { name: '익명' }, title: "좌수 상대로 대련할 때 무엇을 주의해야 하나요?", content: "우수 대련자로서 좌수 상대와 대련할 때 항상 당황스럽어요. 어떤 전략이 효과적인지 알고 싶어요.", likes: 73, comments: 38, timestamp: "14h ago" },
    { id: 109, author: { name: '익명' }, title: "검도 용어 너무 어려워요", content: "일본어로 된 용어들이 너무 많아서 외우기가 힘들어요. 효율적으로 용어를 익힐 수 있는 방법 있나요?", likes: 94, comments: 22, timestamp: "16h ago" },
    { id: 110, author: { name: '익명' }, title: "내년에 일본 연수 가고 싶은데 준비는 어떻게 하나요?", content: "일본 도장에서 3-6개월 연수하고 싶어요. 비자, 언어, 경비 등 준비할 것들이 많은 것 같아서 명료한 조언 구합니다.", likes: 126, comments: 56, timestamp: "18h ago" }
];

export const tradePosts: TradePost[] = [
    { id: 201, author: mockUsers[2], itemName: "미사용 카본 죽도 (39)", price: "70,000원", description: "선물 받았는데 사이즈가 안 맞아 판매합니다. 포장도 안 뜯은 새 제품입니다.", status: '판매중', imageUrl: 'https://placehold.co/400x300/334155/94a3b8?text=죽도', timestamp: "1h ago" },
    { id: 202, author: mockUsers[3], itemName: "A급 중고 호구 세트 (남성용)", price: "150,000원", description: "1년 정도 사용했고 상태 아주 좋습니다. 175cm 전후 남성분께 잘 맞을 거예요.", status: '판매완료', imageUrl: 'https://placehold.co/400x300/334155/94a3b8?text=호구', timestamp: "8h ago" },
    { id: 203, author: mockUsers[4], itemName: "검도복 하의 (대학생용)", price: "25,000원", description: "대학교 수업에서 사용했던 검도복 하의입니다. 세탁 황등으로 깨끗하게 관리했어요.", status: '판매중', imageUrl: 'https://placehold.co/400x300/1e293b/94a3b8?text=검도복', timestamp: "2h ago" },
    { id: 204, author: mockUsers[5], itemName: "전죽 죽도 세트 (37, 38, 39)", price: "120,000원", description: "사이즈별로 3개 세트로 판매합니다. 전부 좋은 품질의 전죽 죽도이고 개별 판매도 가능합니다.", status: '판매중', imageUrl: 'https://placehold.co/400x300/334155/94a3b8?text=죽도세트', timestamp: "3h ago" },
    { id: 205, author: mockUsers[6], itemName: "여성용 호구 세트 (S사이즈)", price: "180,000원", description: "6개월 사용한 여성용 호구입니다. 160cm 전후 여성분께 잘 맞습니다. 그동안 꿀탈 없이 사용했어요.", status: '판매중', imageUrl: 'https://placehold.co/400x300/8b5cf6/f3e8ff?text=여성호구', timestamp: "4h ago" },
    { id: 206, author: mockUsers[7], itemName: "목검 (연습용)", price: "15,000원", description: "기본기 연습에 사용하던 목검입니다. 스크래치는 있지만 연습용으로는 문제없어요.", status: '판매중', imageUrl: 'https://placehold.co/400x300/374151/9ca3af?text=목검', timestamp: "5h ago" },
    { id: 207, author: mockUsers[0], itemName: "카본 죽도 가방", price: "35,000원", description: "죽도 2개까지 넣을 수 있는 카본 죽도 전용 가방입니다. 가볍고 튼튼해서 이동시 편리해요.", status: '판매중', imageUrl: 'https://placehold.co/400x300/059669/d1fae5?text=가방', timestamp: "6h ago" },
    { id: 208, author: mockUsers[1], itemName: "대학교 공식 검도복 세트", price: "85,000원", description: "대학교 검도부 공식 유니폼입니다. 상의, 하의, 하카마 세트로 판매합니다. 졸업 후 사용하지 않아서 깨끗해요.", status: '판매완료', imageUrl: 'https://placehold.co/400x300/1e40af/e0e7ff?text=대학교복', timestamp: "12h ago" },
    { id: 209, author: mockUsers[2], itemName: "검도 도서 세트 (3권)", price: "45,000원", description: "검도의 원리, 기본동작, 심사규정 도서 3권 세트입니다. 승단심사 준비에 필수 도서들이에요.", status: '판매중', imageUrl: 'https://placehold.co/400x300/dc2626/fef2f2?text=도서세트', timestamp: "1d ago" },
    { id: 210, author: mockUsers[3], itemName: "대련용 전자 호구 (중고)", price: "220,000원", description: "AI 스코어링 기능이 있는 전자 호구입니다. 배터리 교체 필요하지만 대련 데이터 기록에 좋아요.", status: '예약중', imageUrl: 'https://placehold.co/400x300/7c3aed/f3e8ff?text=전자호구', timestamp: "1d ago" }
];

export const mockChats: Chat[] = [
    { id: 101, type: 'club', partner: { id: 1001, name: '대전 카이스트 주이회', avatarUrl: 'https://placehold.co/100x100/0f766e/e0f2f1?text=K', members: 35 }, lastMessage: "김형섭: 이번 주 금요일 정기 수련 공지입니다.", timestamp: "10:45 AM", unread: 2, messages: Array.from({ length: 15 }, (_, i) => ({ id: i, sender: i % 3 === 0 ? 'me' : (i % 3 === 1 ? '김형섭' : '이노연'), text: `안녕하세요, 채팅 메시지 ${i + 1}입니다.`, timestamp: `10:${45 + i} AM` })) },
    { id: 102, type: 'club', partner: { id: 1002, name: '서울 대학검도부', avatarUrl: 'https://placehold.co/100x100/1e40af/e0e7ff?text=S', members: 42 }, lastMessage: "박민수: 이번 주말 연습경기 참가자 모집합니다.", timestamp: "9:30 AM", unread: 5, messages: Array.from({ length: 12 }, (_, i) => ({ id: i, sender: i % 4 === 0 ? 'me' : (i % 4 === 1 ? '박민수' : i % 4 === 2 ? '김지영' : '이태현'), text: `연습경기 관련 메시지 ${i + 1}입니다.`, timestamp: `9:${30 + i} AM` })) },
    { id: 103, type: 'club', partner: { id: 1003, name: '부산 검도연맹', avatarUrl: 'https://placehold.co/100x100/dc2626/fef2f2?text=B', members: 28 }, lastMessage: "최영훈: 승단심사 일정이 변경되었습니다.", timestamp: "8:15 AM", unread: 1, messages: Array.from({ length: 8 }, (_, i) => ({ id: i, sender: i % 3 === 0 ? 'me' : (i % 3 === 1 ? '최영훈' : '강민지'), text: `승단심사 관련 메시지 ${i + 1}입니다.`, timestamp: `8:${15 + i} AM` })) },
    { id: 104, type: 'club', partner: { id: 1004, name: '인천 무도회', avatarUrl: 'https://placehold.co/100x100/059669/d1fae5?text=I', members: 31 }, lastMessage: "정수현: 새로운 도장 견학 일정을 공유합니다.", timestamp: "7:22 AM", unread: 3, messages: Array.from({ length: 10 }, (_, i) => ({ id: i, sender: i % 3 === 0 ? 'me' : (i % 3 === 1 ? '정수현' : '김현우'), text: `도장 견학 관련 메시지 ${i + 1}입니다.`, timestamp: `7:${22 + i} AM` })) },
    { id: 105, type: 'club', partner: { id: 1005, name: '대구 검도클럽', avatarUrl: 'https://placehold.co/100x100/7c3aed/f3e8ff?text=D', members: 25 }, lastMessage: "한지민: 월말 정기모임 장소가 변경되었습니다.", timestamp: "Yesterday", unread: 0, messages: Array.from({ length: 7 }, (_, i) => ({ id: i, sender: i % 3 === 0 ? 'me' : (i % 3 === 1 ? '한지민' : '오성민'), text: `정기모임 관련 메시지 ${i + 1}입니다.`, timestamp: `Yesterday ${14 + i}:00` })) },
    {
        id: 1, type: 'private', partner: mockUsers[0], lastMessage: "네, 좋습니다. 그럼 토요일 2시에 뵙겠습니다.", timestamp: "10:45 AM", unread: 0, messages: [
            { id: 1, sender: 'me', text: '김형섭님, 이번주 토요일에 대련 가능하신가요?', timestamp: '10:40 AM' },
            { id: 2, sender: 'other', text: '네, 가능합니다. 시간은 언제가 좋으신가요?', timestamp: '10:42 AM' },
            { id: 3, sender: 'me', text: '오후 2시 어떠신가요?', timestamp: '10:43 AM' },
            { id: 4, sender: 'other', text: '네, 좋습니다. 그럼 토요일 2시에 뵙겠습니다.', timestamp: '10:45 AM' },
        ]
    },
    {
        id: 2, type: 'private', partner: mockUsers[1], lastMessage: "고맙습니다. 많이 배웠습니다.", timestamp: "Yesterday", unread: 2, messages: [
            { id: 1, sender: 'other', text: '안녕하세요. 오늘 대련 감사했습니다.', timestamp: 'Yesterday 16:20' },
            { id: 2, sender: 'me', text: '저야말로 감사합니다. 이노연님 실력이 정말 늘으셨네요.', timestamp: 'Yesterday 16:22' },
            { id: 3, sender: 'other', text: '고맙습니다. 많이 배웠습니다.', timestamp: 'Yesterday 16:25' },
        ]
    },
    {
        id: 3, type: 'private', partner: mockUsers[2], lastMessage: "내일 연습 참석하시나요?", timestamp: "2h ago", unread: 1, messages: [
            { id: 1, sender: 'other', text: '안녕하세요. 내일 연습 참석하시나요?', timestamp: '2h ago' },
        ]
    },
];

export const danPromotions = [
    { id: 1, title: "1, 2단 승단 심사", date: "2025-08-15", location: "서울 중앙 연수원", details: "오전 9시부터 시작. 응시자는 8시 30분까지 집결 바랍니다. 준비물: 신분증, 응시표, 목검." },
    { id: 2, title: "3, 4단 승단 심사", date: "2025-08-16", location: "서울 중앙 연수원", details: "오전 9시부터 시작. 본, 실기, 학과 시험이 포함됩니다. 상세 공지 확인 필수." }
];
export const seminars = [
    { id: 1, title: "고단자 강습회", date: "2025-09-20", location: "대전 평송수련원", details: "5단 이상 참가 가능. 참가비 5만원. 강사: 김태형 8단." },
];
export const promoItems = [
    { id: 1, type: 'openClass', title: "신규 검도장 오픈 클래스", organizer: "새로운 검도관 (서울)", content: "검도에 관심 있는 누구나 환영합니다! 기본 자세부터 체험까지. 친구와 함께 오시면 할인 혜택!", imageUrl: "https://placehold.co/400x200/164e63/9ca3af?text=Open+Class" },
];
export const japanTravelPackages: TravelPackage[] = [
    {
        id: 1, destination: "교토 8일 검도 수행", duration: "2025.08.01 ~ 2025.08.08", description: "전통 도장에서 현지 검도인들과 교류하며 심신을 단련하는 특별한 기회입니다.", price: "2,500,000원", currentApplicants: 8, maxApplicants: 15, isConfirmed: false, imageUrl: "https://placehold.co/600x400/1e293b/94a3b8?text=Kyoto+Dojo", details: {
            location: "일본 교토, 유서 깊은 무덕전",
            curriculum: ["기본기 수련 (오전)", "고단자 사범 지도 대련 (오후)"],
            schedule: [{ day: "1-8일차", activity: "상세 일정은 참가자에게 별도 공지" }],
            notes: ["개인 죽도, 도복, 호구 필수 지참"],
            applicants: ["김*섭", "이*연", "문*형", "박*진", "최*수", "강*민", "한*우", "조*현"]
        }
    },
];
export const gifticonItems = [
    { category: "커피전문점", items: ["스타벅스 아메리카노 (4,500P)", "스타벅스 카페라떼 (5,000P)", "이디야 아이스커피 (3,000P)", "투썸플레이스 케이크세트 (8,000P)"] },
    { category: "편의점", items: ["CU 3,000원권 (3,000P)", "GS25 5,000원권 (5,000P)", "세븐일레븐 도시락 (4,000P)"] },
    { category: "외식", items: ["맥도날드 빅맥세트 (6,500P)", "KFC 치킨버거세트 (7,000P)", "서브웨이 샌드위치 (5,500P)"] },
    { category: "도장 관련", items: ["도장비 1일권 (10,000P)", "검도복 세탁서비스 (3,000P)", "개인레슨 30분 (15,000P)", "호구 점검 서비스 (5,000P)"] }
];
export const shopItems = [
    { id: 1, name: "프리미엄 카본 죽도", price: "75,000원", imageUrl: "https://placehold.co/400x400/334155/94a3b8?text=Carbon+Jukdo" },
    { id: 2, name: "고급 호구 세트 (A급)", price: "320,000원", imageUrl: "https://placehold.co/400x400/1e40af/e0e7ff?text=Premium+Hogu" },
    { id: 3, name: "전죽 죽도 (39사이즈)", price: "85,000원", imageUrl: "https://placehold.co/400x400/dc2626/fef2f2?text=Jeonjuk+Jukdo" },
    { id: 4, name: "검도복 세트 (상하의)", price: "120,000원", imageUrl: "https://placehold.co/400x400/059669/d1fae5?text=Kendo+Uniform" },
    { id: 5, name: "전자 호구 (AI 스코어링)", price: "450,000원", imageUrl: "https://placehold.co/400x400/7c3aed/f3e8ff?text=Electronic+Hogu" },
    { id: 6, name: "목검 (연습용)", price: "28,000원", imageUrl: "https://placehold.co/400x400/374151/9ca3af?text=Wooden+Sword" },
    { id: 7, name: "죽도 가방 (고급형)", price: "65,000원", imageUrl: "https://placehold.co/400x400/0f766e/e0f2f1?text=Jukdo+Bag" },
    { id: 8, name: "검도 신발 (비슬립)", price: "45,000원", imageUrl: "https://placehold.co/400x400/1e293b/94a3b8?text=Kendo+Shoes" },
    { id: 9, name: "전죽 죽도 세트 (37,38,39)", price: "240,000원", imageUrl: "https://placehold.co/400x400/dc2626/fef2f2?text=Jukdo+Set" },
    { id: 10, name: "검도 이론 도서 세트", price: "89,000원", imageUrl: "https://placehold.co/400x400/8b5cf6/f3e8ff?text=Kendo+Books" }
];
export const questList = [
    { id: 1, text: "손목 10점 따기", current: 1, target: 10, unit: "점", reward: 500, selected: true, description: '대련에서 상대방의 손목을 가격하여 10점을 획득하세요.' },
    { id: 2, text: "연속 5승 달성하기", current: 2, target: 5, unit: "승", reward: 800, selected: false, description: '대련에서 5연승을 달성하세요. 패배 시 카운트가 초기화됩니다.' },
    { id: 3, text: "머리치기 마스터", current: 15, target: 20, unit: "점", reward: 600, selected: false, description: '대련에서 머리치기로 20점을 획득하세요.' },
    { id: 4, text: "고단자 상대로 승리하기 (+2단 이상)", current: 0, target: 1, unit: "승", reward: 1200, selected: true, description: '자신보다 공인 단수가 2단 이상 높은 상대를 이겨야 합니다.' },
    { id: 5, text: "완벽한 한 주 (7일 연속 대련)", current: 3, target: 7, unit: "일", reward: 1000, selected: false, description: '7일 연속으로 최소 1회 이상 대련을 진행하세요.' },
    { id: 6, text: "찌름 기술 숙련하기", current: 2, target: 15, unit: "점", reward: 700, selected: false, description: '대련에서 찌름 기술로 15점을 획득하세요.' },
    { id: 7, text: "신규 대련상대 5명 만나기", current: 1, target: 5, unit: "명", reward: 900, selected: false, description: '이번 달에 처음 대련하는 상대 5명과 경기를 진행하세요.' },
    { id: 8, text: "응지기술 달인 되기", current: 8, target: 12, unit: "점", reward: 650, selected: false, description: '상대의 공격을 받아 응지기술로 12점을 획득하세요.' },
    { id: 9, text: "도장 출석왕 (20일)", current: 12, target: 20, unit: "일", reward: 1100, selected: false, description: '한 달 동안 20일 이상 도장에 출석하세요.' },
    { id: 10, text: "커뮤니티 활동가", current: 3, target: 10, unit: "회", reward: 400, selected: false, description: '게시판에 유익한 글을 10개 이상 작성하세요.' },
    { id: 11, text: "멘토 역할 하기", current: 0, target: 3, unit: "명", reward: 1500, selected: false, description: '초보 검도인 3명에게 조언을 제공하고 평가를 받으세요.' },
    { id: 12, text: "기본기 마스터", current: 25, target: 50, unit: "회", reward: 800, selected: false, description: '소메우치(기본베기) 연습을 50회 완료하세요.' }
];

export const questCompletionBonus = { totalQuests: questList.length, completionBonus: 5000, currentCompleted: 2 };

export const miniDojoComments = [
    {
        id: 1, author: '익명', text: '완전 싸이월드네요!', timestamp: '5분 전', replies: [
            { id: 11, author: '익명', text: '와 정말 그래요! 도토리 느낌이에요 ㅋㅋ', timestamp: '3분 전' }
        ]
    },
    { id: 2, author: '익명', text: '도토리로 사는건가요??ㅋㅋ', timestamp: '10분 전', replies: [] },
    { id: 3, author: '익명', text: '도복이 멋지네요! 얼마에구입하셨나요?', timestamp: '15분 전', replies: [] },
    {
        id: 4, author: '익명', text: '미니도장 너무 귀여워요! 어디서 꾸미는 거예요?', timestamp: '20분 전', replies: [
            { id: 41, author: '익명', text: '저도 문의합니다!', timestamp: '18분 전' },
            { id: 42, author: '익명', text: '미니도장 쇼핑몰에서 살 수 있어요~', timestamp: '17분 전' }
        ]
    },
    { id: 5, author: '익명', text: '저도 미니도장 만들고 싶어요~', timestamp: '25뵔 전', replies: [] },
    { id: 6, author: '익명', text: '호구 대신 전시한 것도 재밌네요!', timestamp: '30뵔 전', replies: [] }
];

export const miniDojoItems = [
    { id: 1, name: "죽도 선반 (10개 세트)", description: "미니도장에 전시할 다양한 사이즈의 죽도 집합", points: 8500, imageUrl: "https://placehold.co/200x150/334155/94a3b8?text=죽도선반" },
    { id: 2, name: "검도복 진열장", description: "다양한 사이즈와 색상의 도복을 전시할 수 있는 진열장", points: 12000, imageUrl: "https://placehold.co/200x150/1e40af/e0e7ff?text=도복진열" },
    { id: 3, name: "호구 전시대", description: "면, 손목보호대, 가슴보호대를 전시할 수 있는 전용 진열대", points: 15000, imageUrl: "https://placehold.co/200x150/dc2626/fef2f2?text=호구전시" },
    { id: 4, name: "매트 바닥 공사", description: "미니도장 전용 고급 바닥 매트 설치 (다다미 패턴)", points: 25000, imageUrl: "https://placehold.co/200x150/059669/d1fae5?text=바닥공사" },
    { id: 5, name: "벽체 인테리어 공사", description: "전통 도장 스타일의 벽체 공사와 창문 설치", points: 35000, imageUrl: "https://placehold.co/200x150/7c3aed/f3e8ff?text=벽공사" },
    { id: 6, name: "조명 시스템", description: "미니도장 전용 LED 조명과 조명 컨트롤러", points: 18000, imageUrl: "https://placehold.co/200x150/f59e0b/fef3c7?text=조명" },
    { id: 7, name: "목검 보관함", description: "연습용 목검을 안전하게 보관할 수 있는 전용 보관함", points: 6500, imageUrl: "https://placehold.co/200x150/374151/9ca3af?text=목검보관" },
    { id: 8, name: "미니 신발장", description: "검도 신발과 양말을 정리할 수 있는 소형 신발장", points: 4200, imageUrl: "https://placehold.co/200x150/0f766e/e0f2f1?text=신발장" },
    { id: 9, name: "전통 서예 데코", description: "미니도장 분위기를 내는 전통 한글 서예 데코레이션", points: 8800, imageUrl: "https://placehold.co/200x150/1e293b/94a3b8?text=서예데코" },
    { id: 10, name: "미니 시상대", description: "대회 수상 경력과 메달을 전시할 수 있는 전용 시상대", points: 9200, imageUrl: "https://placehold.co/200x150/eab308/fef3c7?text=시상대" }
];
export const mockPointHistory = [
    { date: '2025-07-21', change: '+10', reason: '김형섭님과 대련 승리' },
    { date: '2025-07-20', change: '+5', reason: '일일 출석 보너스' },
    { date: '2025-07-19', change: '-8', reason: '이노연님과 대련 패배' },
    { date: '2025-07-18', change: '+12', reason: '커뮤니티 글 작성' },
    { date: '2025-07-17', change: '+7', reason: '댓글 호응' },
    { date: '2025-07-16', change: '+20', reason: '주간 랭킹 보상' },
    { date: '2025-07-15', change: '-5', reason: '기프트콘 교환' },
    { date: '2025-07-14', change: '+3', reason: '일일 미션 완료' },
    { date: '2025-07-13', change: '+9', reason: '대회 참여' },
    { date: '2025-07-12', change: '+4', reason: '친구 초대 보너스' },
    { date: '2025-07-11', change: '+8', reason: '훈련 참여' },
    { date: '2025-07-10', change: '-3', reason: '패널티' },
    { date: '2025-07-09', change: '+6', reason: '커뮤니티 댓글 작성' },
    { date: '2025-07-08', change: '+5', reason: '연속 출석 보너스' },
    { date: '2025-07-07', change: '+11', reason: '도전 과제 완료' },
    { date: '2025-07-06', change: '+2', reason: '동영상 업로드' },
    { date: '2025-07-05', change: '-4', reason: '신고 처리' },
    { date: '2025-07-04', change: '+7', reason: '대련 승리' },
    { date: '2025-07-03', change: '+3', reason: '일일 출석 보너스' },
    { date: '2025-07-02', change: '+5', reason: '커뮤니티 글 작성' },
];
export const mockGoals = [
    { id: 1, text: '사범자격심사 도전', completed: true },
    { id: 2, text: '2025년 상반기 대회출전', completed: true },
    { id: 3, text: 'vs100명 대련', completed: false, current: 57, target: 100 },
    { id: 4, text: '일본 삿폿로 방문', completed: true },
];
export const kendoTheoryData = [
    { id: 1, title: "검도의 四戒에 대하여 설명하라.", questionText: "검도의 [BLANK](四病)이라고도 하며, 검도를 수행함에 있어서 4가지 경계하여야 할 것을 말한다. [BLANK], [BLANK], [BLANK], [BLANK] (驚,懼,疑,惑) 즉, 놀라거나, 두려워하거나, 의심하거나, 미혹되지 말아야 함을 말한다.", answers: ["4병", "경", "구", "의", "혹"] },
    { id: 4, title: "유효격자에 대하여 기술하라.", questionText: "유효격자란 한판을 인정할 수 있는 격자로서, 검도경기·심판규칙 제12조에 따르면, 「[BLANK]는, 충실한 [BLANK]와 적정한 [BLANK]로써, 죽도의 격자부로 격자부위를 칼날을 바르게 하여 격자하고 [BLANK]이 있어야 한다.」고 되어 있다. 이때 [BLANK]가 일치하여야 한다.", answers: ["유효격자", "기세", "자세", "존심", "기검체"] },
];
export const testScoreHistory = [{ date: "2025-05-10", score: 70 }, { date: "2025-07-01", score: 75 }];
export const mockNotifications = [
    { id: 1, type: 'new_request', opponent: mockUsers[1], read: false },
    { id: 2, type: 'declined', opponent: mockUsers[2], message: "죄송합니다. 그날은 선약이 있어서 어려울 것 같습니다.", read: false },
];
