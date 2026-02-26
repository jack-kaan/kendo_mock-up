import {
  currentUser,
  mockUsers,
  allUsers,
  allRankings,
} from '@/data/kendo/users';
import {
  mockMatchHistory,
  sparringCandidatesList,
} from '@/data/kendo/matches';
import { mockNotifications } from '@/data/kendo/notifications';
import { initialQuestList, QUEST_COMPLETION_BONUS } from '@/data/kendo/quests';
import { mockGoals } from '@/data/kendo/goals';
import { mockPointHistory } from '@/data/kendo/points';
import {
  miniDojoComments,
  miniDojoItems,
  shopItems,
  gifticonItems,
} from '@/data/kendo/store';
import {
  communityPosts,
  anonymousPosts,
  tradePosts,
  mockChats,
} from '@/data/kendo/community';
import {
  danPromotions,
  seminars,
  promoItems,
  japanTravelPackages,
} from '@/data/kendo/travel';
import { kendoTheoryData, testScoreHistory } from '@/data/kendo/exams';
import type {
  AnonymousPost,
  Chat,
  CommunityPost,
  GifticonCategory,
  Goal,
  KendoNotification,
  KendoTheoryQuestion,
  KendoUser,
  Match,
  MiniDojoComment,
  MiniDojoItem,
  PointHistoryEntry,
  Promotion,
  PromotionItem,
  Quest,
  Ranking,
  ScoreHistoryEntry,
  Seminar,
  ShopItem,
  SparringCandidate,
  TradePost,
  TravelPackage,
} from '@/types/kendo';

export const kendoService = {
  getCurrentUser: (): KendoUser => currentUser,
  getUsers: (): KendoUser[] => mockUsers,
  getAllUsers: (): KendoUser[] => allUsers,
  getRankings: (): Ranking[] => allRankings,
  getMatchHistory: (): Match[] => mockMatchHistory,
  getSparringCandidates: (): SparringCandidate[] => sparringCandidatesList,
  getNotifications: (): KendoNotification[] => mockNotifications,
  getInitialQuests: (): Quest[] => initialQuestList,
  getQuestCompletionBonus: (): number => QUEST_COMPLETION_BONUS,
  getGoals: (): Goal[] => mockGoals,
  getPointHistory: (): PointHistoryEntry[] => mockPointHistory,
  getMiniDojoComments: (): MiniDojoComment[] => miniDojoComments,
  getMiniDojoItems: (): MiniDojoItem[] => miniDojoItems,
  getShopItems: (): ShopItem[] => shopItems,
  getGifticonItems: (): GifticonCategory[] => gifticonItems,
  getCommunityPosts: (): CommunityPost[] => communityPosts,
  getAnonymousPosts: (): AnonymousPost[] => anonymousPosts,
  getTradePosts: (): TradePost[] => tradePosts,
  getChats: (): Chat[] => mockChats,
  getPromotions: (): Promotion[] => danPromotions,
  getSeminars: (): Seminar[] => seminars,
  getPromoItems: (): PromotionItem[] => promoItems,
  getJapanTravelPackages: (): TravelPackage[] => japanTravelPackages,
  getTheoryQuestions: (): KendoTheoryQuestion[] => kendoTheoryData,
  getScoreHistory: (): ScoreHistoryEntry[] => testScoreHistory,
};
