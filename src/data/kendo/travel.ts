import { Promotion, PromotionItem, Seminar, TravelPackage } from '../../types/kendo';

export const danPromotions: Promotion[] = [
  {
    id: 1,
    title: '1, 2단 승단 심사',
    date: '2025-08-15',
    location: '서울 중앙 연수원',
    details: '오전 9시부터 시작. 응시자는 8시 30분까지 집결 바랍니다. 준비물: 신분증, 응시표, 목검.',
  },
  {
    id: 2,
    title: '3, 4단 승단 심사',
    date: '2025-08-16',
    location: '서울 중앙 연수원',
    details: '오전 9시부터 시작. 본, 실기, 학과 시험이 포함됩니다. 상세 공지 확인 필수.',
  },
];

export const seminars: Seminar[] = [
  {
    id: 1,
    title: '고단자 강습회',
    date: '2025-09-20',
    location: '대전 평송수련원',
    details: '5단 이상 참가 가능. 참가비 5만원. 강사: 김태형 8단.',
  },
];

export const promoItems: PromotionItem[] = [
  {
    id: 1,
    type: 'openClass',
    title: '신규 검도장 오픈 클래스',
    organizer: '새로운 검도관 (서울)',
    content:
      '검도에 관심 있는 누구나 환영합니다! 기본 자세부터 체험까지. 친구와 함께 오시면 할인 혜택!',
    imageUrl: 'https://placehold.co/400x200/164e63/9ca3af?text=Open+Class',
  },
];

export const japanTravelPackages: TravelPackage[] = [
  {
    id: 1,
    destination: '교토 8일 검도 수행',
    duration: '2025.08.01 ~ 2025.08.08',
    description: '전통 도장에서 현지 검도인들과 교류하며 심신을 단련하는 특별한 기회입니다.',
    price: '2,500,000원',
    currentApplicants: 8,
    maxApplicants: 15,
    isConfirmed: false,
    imageUrl: 'https://placehold.co/600x400/1e293b/94a3b8?text=Kyoto+Dojo',
    details: {
      location: '일본 교토, 유서 깊은 무덕전',
      curriculum: ['기본기 수련 (오전)', '고단자 사범 지도 대련 (오후)'],
      schedule: [{ day: '1-8일차', activity: '상세 일정은 참가자에게 별도 공지' }],
      notes: ['개인 죽도, 도복, 호구 필수 지참'],
      applicants: ['김*섭', '이*연', '문*형', '박*진', '최*수', '강*민', '한*우', '조*현'],
    },
  },
];
