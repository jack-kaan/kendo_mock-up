import { GifticonCategory, MiniDojoComment, MiniDojoItem, ShopItem } from '../../types/kendo';

export const miniDojoComments: MiniDojoComment[] = [
  {
    id: 1,
    author: '익명',
    text: '완전 싸이월드네요!',
    timestamp: '5분 전',
    replies: [
      { id: 11, author: '익명', text: '와 정말 그래요! 도토리 느낌이에요 ㅋㅋ', timestamp: '3분 전' },
    ],
  },
  { id: 2, author: '익명', text: '도토리로 사는건가요??ㅋㅋ', timestamp: '10분 전', replies: [] },
  { id: 3, author: '익명', text: '도복이 멋지네요! 얼마에구입하셨나요?', timestamp: '15분 전', replies: [] },
  {
    id: 4,
    author: '익명',
    text: '미니도장 너무 귀여워요! 어디서 꾸미는 거예요?',
    timestamp: '20분 전',
    replies: [
      { id: 41, author: '익명', text: '저도 문의합니다!', timestamp: '18분 전' },
      { id: 42, author: '익명', text: '미니도장 쇼핑몰에서 살 수 있어요~', timestamp: '17분 전' },
    ],
  },
  { id: 5, author: '익명', text: '저도 미니도장 만들고 싶어요~', timestamp: '25분 전', replies: [] },
  { id: 6, author: '익명', text: '호구 대신 전시한 것도 재밌네요!', timestamp: '30분 전', replies: [] },
];

export const miniDojoItems: MiniDojoItem[] = [
  {
    id: 1,
    name: '죽도 선반 (10개 세트)',
    description: '미니도장에 전시할 다양한 사이즈의 죽도 집합',
    points: 8500,
    imageUrl: 'https://placehold.co/200x150/334155/94a3b8?text=죽도선반',
  },
  {
    id: 2,
    name: '검도복 진열장',
    description: '다양한 사이즈와 색상의 도복을 전시할 수 있는 진열장',
    points: 12000,
    imageUrl: 'https://placehold.co/200x150/1e40af/e0e7ff?text=도복진열',
  },
  {
    id: 3,
    name: '호구 전시대',
    description: '면, 손목보호대, 가슴보호대를 전시할 수 있는 전용 진열대',
    points: 15000,
    imageUrl: 'https://placehold.co/200x150/dc2626/fef2f2?text=호구전시',
  },
  {
    id: 4,
    name: '매트 바닥 공사',
    description: '미니도장 전용 고급 바닥 매트 설치 (다다미 패턴)',
    points: 25000,
    imageUrl: 'https://placehold.co/200x150/059669/d1fae5?text=바닥공사',
  },
  {
    id: 5,
    name: '벽체 인테리어 공사',
    description: '전통 도장 스타일의 벽체 공사와 창문 설치',
    points: 35000,
    imageUrl: 'https://placehold.co/200x150/7c3aed/f3e8ff?text=벽공사',
  },
  {
    id: 6,
    name: '조명 시스템',
    description: '미니도장 전용 LED 조명과 조명 컨트롤러',
    points: 18000,
    imageUrl: 'https://placehold.co/200x150/f59e0b/fef3c7?text=조명',
  },
  {
    id: 7,
    name: '목검 보관함',
    description: '연습용 목검을 안전하게 보관할 수 있는 전용 보관함',
    points: 6500,
    imageUrl: 'https://placehold.co/200x150/374151/9ca3af?text=목검보관',
  },
  {
    id: 8,
    name: '미니 신발장',
    description: '검도 신발과 양말을 정리할 수 있는 소형 신발장',
    points: 4200,
    imageUrl: 'https://placehold.co/200x150/0f766e/e0f2f1?text=신발장',
  },
  {
    id: 9,
    name: '전통 서예 데코',
    description: '미니도장 분위기를 내는 전통 한글 서예 데코레이션',
    points: 8800,
    imageUrl: 'https://placehold.co/200x150/1e293b/94a3b8?text=서예데코',
  },
  {
    id: 10,
    name: '미니 시상대',
    description: '대회 수상 경력과 메달을 전시할 수 있는 전용 시상대',
    points: 9200,
    imageUrl: 'https://placehold.co/200x150/eab308/fef3c7?text=시상대',
  },
];

export const gifticonItems: GifticonCategory[] = [
  {
    category: '커피전문점',
    items: [
      '스타벅스 아메리카노 (4,500P)',
      '스타벅스 카페라떼 (5,000P)',
      '이디야 아이스커피 (3,000P)',
      '투썸플레이스 케이크세트 (8,000P)',
    ],
  },
  {
    category: '편의점',
    items: ['CU 3,000원권 (3,000P)', 'GS25 5,000원권 (5,000P)', '세븐일레븐 도시락 (4,000P)'],
  },
  {
    category: '외식',
    items: ['맥도날드 빅맥세트 (6,500P)', 'KFC 치킨버거세트 (7,000P)', '서브웨이 샌드위치 (5,500P)'],
  },
  {
    category: '도장 관련',
    items: ['도장비 1일권 (10,000P)', '검도복 세탁서비스 (3,000P)', '개인레슨 30분 (15,000P)', '호구 점검 서비스 (5,000P)'],
  },
];

export const shopItems: ShopItem[] = [
  {
    id: 1,
    name: '프리미엄 카본 죽도',
    price: '75,000원',
    imageUrl: 'https://placehold.co/400x400/334155/94a3b8?text=Carbon+Jukdo',
  },
  {
    id: 2,
    name: '고급 호구 세트 (A급)',
    price: '320,000원',
    imageUrl: 'https://placehold.co/400x400/1e40af/e0e7ff?text=Premium+Hogu',
  },
  {
    id: 3,
    name: '전죽 죽도 (39사이즈)',
    price: '85,000원',
    imageUrl: 'https://placehold.co/400x400/dc2626/fef2f2?text=Jeonjuk+Jukdo',
  },
  {
    id: 4,
    name: '검도복 세트 (상하의)',
    price: '120,000원',
    imageUrl: 'https://placehold.co/400x400/059669/d1fae5?text=Kendo+Uniform',
  },
  {
    id: 5,
    name: '전자 호구 (AI 스코어링)',
    price: '450,000원',
    imageUrl: 'https://placehold.co/400x400/7c3aed/f3e8ff?text=Electronic+Hogu',
  },
  {
    id: 6,
    name: '목검 (연습용)',
    price: '28,000원',
    imageUrl: 'https://placehold.co/400x400/374151/9ca3af?text=Wooden+Sword',
  },
  {
    id: 7,
    name: '죽도 가방 (고급형)',
    price: '65,000원',
    imageUrl: 'https://placehold.co/400x400/0f766e/e0f2f1?text=Jukdo+Bag',
  },
  {
    id: 8,
    name: '검도 신발 (비슬립)',
    price: '45,000원',
    imageUrl: 'https://placehold.co/400x400/1e293b/94a3b8?text=Kendo+Shoes',
  },
  {
    id: 9,
    name: '전죽 죽도 세트 (37,38,39)',
    price: '240,000원',
    imageUrl: 'https://placehold.co/400x400/dc2626/fef2f2?text=Jukdo+Set',
  },
  {
    id: 10,
    name: '검도 이론 도서 세트',
    price: '89,000원',
    imageUrl: 'https://placehold.co/400x400/8b5cf6/f3e8ff?text=Kendo+Books',
  },
];
