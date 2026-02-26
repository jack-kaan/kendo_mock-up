import React, { useMemo, useState } from 'react';
import {
  Bell,
  CheckCircle2,
  ShieldCheck,
  Swords,
  Users,
  X,
} from 'lucide-react';

import { Card, UserAvatar } from '@/features/kendo/components/layout';
import { useKendoModals } from '@/hooks/useKendoModals';
import type { DashboardTab } from '@/hooks/useKendoDashboard';
import { cn } from '@/lib/cn';
import type {
  Goal,
  KendoNotification,
  KendoUser,
  Match,
  PointHistoryEntry,
  Quest,
} from '@/types/kendo';

type HomeModalType = 'points' | 'quest_select' | 'goal_check';

type HomeModalPayload = null;

export interface HomeScreenProps {
  user: KendoUser;
  onNavigate: (tab: DashboardTab) => void;
  notifications: KendoNotification[];
  onSelectNotification: (notification: KendoNotification) => void;
  matchHistory: Match[];
  initialQuests: Quest[];
  questCompletionBonus: number;
  goals: Goal[];
  pointHistory: PointHistoryEntry[];
}

interface PointHistoryModalProps {
  history: PointHistoryEntry[];
  onClose: () => void;
}

const PointHistoryModal: React.FC<PointHistoryModalProps> = ({ history, onClose }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
    <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
      <div className="flex justify-between items-center p-4 border-b border-slate-700">
        <h2 className="text-lg font-bold">포인트 내역</h2>
        <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
          <X size={20} />
        </button>
      </div>
      <div className="p-4 overflow-y-auto space-y-2">
        {history.map((entry) => (
          <div key={`${entry.date}-${entry.reason}`} className="bg-slate-700/50 p-3 rounded-lg flex justify-between items-center text-sm">
            <div>
              <p className="font-semibold text-slate-200">{entry.reason}</p>
              <p className="text-xs text-slate-400">{entry.date}</p>
            </div>
            <span className={cn('font-bold', entry.change.startsWith('+') ? 'text-green-400' : 'text-red-400')}>
              {entry.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

interface QuestSelectionModalProps {
  quests: Quest[];
  onSave: (selectedIds: number[]) => void;
  onClose: () => void;
}

const QuestSelectionModal: React.FC<QuestSelectionModalProps> = ({ quests, onSave, onClose }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>(() => quests.filter((quest) => quest.selected).map((quest) => quest.id));

  const toggleQuest = (questId: number) => {
    setSelectedIds((prev) =>
      prev.includes(questId)
        ? prev.filter((id) => id !== questId)
        : [...prev, questId].slice(0, 3),
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 className="text-lg font-bold">퀘스트 선택</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto space-y-2">
          {quests.map((quest) => {
            const isSelected = selectedIds.includes(quest.id);
            return (
              <button
                key={quest.id}
                type="button"
                onClick={() => toggleQuest(quest.id)}
                className={cn(
                  'w-full text-left p-3 rounded-lg border text-sm',
                  isSelected ? 'border-blue-500 bg-blue-500/20' : 'border-slate-700 bg-slate-700/50 hover:border-slate-500',
                )}
              >
                <p className="font-semibold">{quest.text}</p>
                <p className="text-xs text-slate-300 mt-1">
                  진행률 {quest.current}/{quest.target} {quest.unit}
                </p>
              </button>
            );
          })}
        </div>
        <div className="flex gap-2 p-4 border-t border-slate-700">
          <button onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-700 py-2 rounded-lg font-semibold">
            취소
          </button>
          <button
            onClick={() => {
              onSave(selectedIds);
              onClose();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

interface GoalChecklistModalProps {
  goals: Goal[];
  onClose: () => void;
}

const GoalChecklistModal: React.FC<GoalChecklistModalProps> = ({ goals, onClose }) => {
  const [checkedGoals, setCheckedGoals] = useState<number[]>(() => goals.filter((goal) => goal.completed).map((goal) => goal.id));

  const toggleGoal = (goalId: number) => {
    setCheckedGoals((prev) =>
      prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId],
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 className="text-lg font-bold">목표 체크리스트</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto space-y-2">
          {goals.map((goal) => (
            <label key={goal.id} className="flex items-center gap-3 bg-slate-700/50 p-3 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={checkedGoals.includes(goal.id)}
                onChange={() => toggleGoal(goal.id)}
                className="w-4 h-4 accent-blue-500"
              />
              <span className={cn('flex-1 text-sm', checkedGoals.includes(goal.id) && 'line-through text-slate-500')}>
                {goal.text}
              </span>
              {goal.target && (
                <span className="text-xs text-slate-300">
                  {goal.current}/{goal.target}
                </span>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  onNavigate,
  notifications,
  onSelectNotification,
  matchHistory,
  initialQuests,
  questCompletionBonus,
  goals,
  pointHistory,
}) => {
  const upcomingMatches = useMemo(() => matchHistory.filter((match) => match.status === 'upcoming').slice(0, 3), [matchHistory]);
  const [quests, setQuests] = useState<Quest[]>(() => initialQuests.map((quest) => ({ ...quest })));
  const { modal, openModal, closeModal } = useKendoModals<HomeModalType, HomeModalPayload>();

  const selectedQuests = quests.filter((quest) => quest.selected).slice(0, 3);
  const completionSummary = useMemo(
    () => ({
      total: quests.length,
      completed: quests.filter((quest) => quest.current >= quest.target).length,
    }),
    [quests],
  );

  const handleQuestSave = (selectedIds: number[]) => {
    setQuests((prev) => prev.map((quest) => ({ ...quest, selected: selectedIds.includes(quest.id) })));
  };


  return (
    <div className="p-4 space-y-6 text-white">
      <div className="space-y-2">
        <div className="text-center">
          <p className="text-xs text-slate-400">
            환영합니다, <span className="text-white font-medium">{user.name}님</span>
          </p>
        </div>
        <Card className="py-3">
          <div className="flex items-center gap-3">
            <UserAvatar user={user} size="sm" onClick={() => onNavigate('profile')} />
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-lg font-bold">
                <span>{user.name}</span>
                <ShieldCheck className="w-4 h-4 text-yellow-300" />
                <span>{user.officialRank}</span>
              </div>
              <p className="text-sm text-slate-300">
                {user.location} · {user.dojang}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card className="bg-slate-800/60 border-slate-700 text-slate-300 text-sm">
            새로운 알림이 없습니다.
          </Card>
        ) : (
          notifications.slice(0, 3).map((notification) => (
            <Card
              key={notification.id}
              onClick={() => onSelectNotification(notification)}
              className="flex items-center gap-3 cursor-pointer border-slate-700 hover:border-slate-500"
            >
              <Bell className="w-5 h-5 text-blue-300" />
              <div>
                <p className="font-semibold text-slate-100">{notification.opponent.name}</p>
                <p className="text-xs text-slate-300">
                  {notification.type === 'new_request' && '새로운 대련 신청이 도착했습니다.'}
                  {notification.type === 'declined' && '대련 거절 메시지가 도착했습니다.'}
                  {notification.type === 'comment' && '댓글이 도착했습니다.'}
                  {notification.type === 'like' && '좋아요를 받았습니다.'}
                  {notification.type === 'changed' && '대련 변경 요청이 있습니다.'}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>

      <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-blue-500">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-blue-200">플랫폼 랭크</p>
            <p className="text-3xl font-bold">{user.platformRank} P</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-blue-200">이번 달 보너스</p>
            <p className="text-lg font-semibold text-white">+{questCompletionBonus.toLocaleString()}P</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => openModal('points', null)}
          className="mt-4 w-full bg-blue-500/30 hover:bg-blue-500/40 py-2 rounded-lg text-sm font-semibold"
        >
          포인트 내역 보기
        </button>
      </Card>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">다가오는 대련</h2>
          <button className="text-xs text-slate-300" onClick={() => onNavigate('matchHistory')}>
            일정 보기
          </button>
        </div>
        {upcomingMatches.length === 0 ? (
          <Card className="text-sm text-slate-300 border-slate-700">예정된 대련이 없습니다.</Card>
        ) : (
          upcomingMatches.map((match) => (
            <Card key={match.id} className="flex items-center gap-3 border-slate-700">
              <UserAvatar user={match.opponent} size="sm" />
              <div className="flex-1">
                <p className="font-semibold">{match.opponent.name}</p>
                <p className="text-xs text-slate-400">{match.date}</p>
              </div>
              <span className="text-xs font-semibold text-blue-300">
                D-{Math.max(0, Math.ceil((new Date(match.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))}
              </span>
            </Card>
          ))
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">이번 주 퀘스트</h2>
          <button
            type="button"
            onClick={() => openModal('quest_select', null)}
            className="text-xs text-blue-300 hover:text-blue-100"
          >
            퀘스트 설정
          </button>
        </div>
        {selectedQuests.length === 0 ? (
          <Card className="text-sm text-slate-300 border-slate-700">선택된 퀘스트가 없습니다. 설정 버튼으로 퀘스트를 선택해보세요.</Card>
        ) : (
          selectedQuests.map((quest) => (
            <Card key={quest.id} className="border-slate-700 bg-slate-800/60">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{quest.text}</p>
                <span className="text-xs text-slate-300">
                  {quest.current}/{quest.target}
                </span>
              </div>
              <div className="mt-2 h-1.5 rounded bg-slate-700">
                <div
                  className="h-full rounded bg-blue-500"
                  style={{ width: `${Math.min(100, (quest.current / quest.target) * 100)}%` }}
                />
              </div>
            </Card>
          ))
        )}
        <p className="text-xs text-slate-400">
          총 {completionSummary.completed}/{completionSummary.total}개의 퀘스트를 완료했습니다.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">2025년 목표</h2>
          <button
            type="button"
            onClick={() => openModal('goal_check', null)}
            className="text-xs text-blue-300 hover:text-blue-100"
          >
            체크리스트
          </button>
        </div>
        <Card className="space-y-2 border-slate-700">
          {goals.slice(0, 3).map((goal) => (
            <div key={goal.id} className="flex items-center justify-between text-sm">
              <span>{goal.text}</span>
              {goal.target ? (
                <span className="text-xs text-slate-400">
                  {goal.current}/{goal.target}
                </span>
              ) : (
                <span className={cn('text-xs font-semibold flex items-center gap-1', goal.completed ? 'text-green-400' : 'text-slate-500')}>
                  {goal.completed ? <CheckCircle2 className="w-4 h-4" /> : null}
                  {goal.completed ? '완료' : '예정'}
                </span>
              )}
            </div>
          ))}
        </Card>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">빠른 메뉴</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card
            onClick={() => onNavigate('match')}
            className="flex flex-col items-center justify-center gap-2 py-6 border-slate-700 hover:border-slate-500"
          >
            <Swords className="w-6 h-6 text-blue-300" />
            <span className="text-sm font-semibold">대련 찾기</span>
          </Card>
          <Card
            onClick={() => onNavigate('community')}
            className="flex flex-col items-center justify-center gap-2 py-6 border-slate-700 hover:border-slate-500"
          >
            <Users className="w-6 h-6 text-emerald-300" />
            <span className="text-sm font-semibold">커뮤니티</span>
          </Card>
        </div>
      </div>

      {modal === 'points' && <PointHistoryModal history={pointHistory} onClose={closeModal} />} 
      {modal === 'quest_select' && (
        <QuestSelectionModal quests={quests} onSave={handleQuestSave} onClose={closeModal} />
      )}
      {modal === 'goal_check' && <GoalChecklistModal goals={goals} onClose={closeModal} />}
    </div>
  );
};

