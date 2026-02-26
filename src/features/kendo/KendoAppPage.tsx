import React from 'react';
import {
  Bell,
  Home,
  Megaphone,
  Settings,
  Shield,
  Swords,
  Trophy,
  User as UserIcon,
  Users,
  X,
} from 'lucide-react';

import { cn } from '@/lib/cn';
import { useKendoDashboard, type DashboardTab } from '@/hooks/useKendoDashboard';
import { HomeScreen } from '@/features/kendo/screens/HomeScreen';
import type { KendoNotification } from '@/types/kendo';

interface NavItem {
  id: DashboardTab;
  label: string;
  icon: React.ReactElement;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '홈', icon: <Home size={20} /> },
  { id: 'match', label: '대련', icon: <Swords size={20} /> },
  { id: 'ranking', label: '랭킹', icon: <Trophy size={20} /> },
  { id: 'community', label: '커뮤니티', icon: <Users size={20} /> },
  { id: 'announcements', label: '수련', icon: <Megaphone size={20} /> },
  { id: 'profile', label: '프로필', icon: <UserIcon size={20} /> },
];

const NotificationBell: React.FC<{ count: number; onClick: () => void }> = ({ count, onClick }) => (
  <button onClick={onClick} className="relative rounded-full p-2 transition-colors hover:bg-slate-800">
    <Bell className="h-5 w-5 text-slate-400" />
    {count > 0 && (
      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white ring-2 ring-slate-900">
        {count}
      </span>
    )}
  </button>
);

const NotificationModal: React.FC<{
  notifications: KendoNotification[];
  onSelect: (notification: KendoNotification) => void;
  onClose: () => void;
}> = ({ notifications, onSelect, onClose }) => (
  <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 p-4">
    <div className="flex max-h-[90vh] w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 text-white">
      <div className="flex items-center justify-between border-b border-slate-700 p-4">
        <h2 className="text-lg font-semibold">알림</h2>
        <button onClick={onClose} className="rounded-full p-1 text-slate-400 transition-colors hover:text-white">
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {notifications.length === 0 ? (
          <p className="rounded-lg bg-slate-700/60 p-3 text-sm text-slate-300">새로운 알림이 없습니다.</p>
        ) : (
          notifications.map((notification) => (
            <button
              key={notification.id}
              type="button"
              onClick={() => onSelect(notification)}
              className="mb-2 w-full rounded-lg border border-slate-700 bg-slate-700/40 p-3 text-left text-sm transition-colors hover:border-slate-500"
            >
              <p className="font-semibold text-white">{notification.opponent.name}</p>
              <p className="text-slate-300">
                {notification.type === 'new_request' && '새로운 대련 신청이 도착했습니다.'}
                {notification.type === 'declined' && '대련이 거절되었습니다.'}
                {notification.type === 'changed' && '대련 일정 변경 요청이 있습니다.'}
                {notification.type === 'comment' && '새로운 댓글이 달렸습니다.'}
                {notification.type === 'like' && '좋아요를 받았습니다.'}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  </div>
);

const NotificationDetailModal: React.FC<{
  notification: KendoNotification;
  onClose: () => void;
}> = ({ notification, onClose }) => (
  <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 p-4">
    <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-800 p-6 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{notification.opponent.name}</h3>
        <button onClick={onClose} className="rounded-full p-1 text-slate-400 transition-colors hover:text-white">
          <X size={18} />
        </button>
      </div>
      <p className="mt-4 text-sm text-slate-300">
        {notification.type === 'new_request' && `${notification.opponent.name}님이 대련을 신청했습니다.`}
        {notification.type === 'declined' && (notification.message ?? '대련을 거절했습니다.')}
        {notification.type === 'changed' && '대련 일정 변경을 제안했습니다.'}
        {notification.type === 'comment' && '새로운 댓글이 등록되었습니다.'}
        {notification.type === 'like' && '좋아요를 받았습니다.'}
      </p>
    </div>
  </div>
);

const TabPlaceholder: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
  <div className="flex h-full flex-col items-center justify-center px-6 text-center text-slate-300">
    <h2 className="text-xl font-semibold text-white">{title}</h2>
    {description && <p className="mt-2 text-sm">{description}</p>}
  </div>
);

const KendoAppPage: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    user,
    notifications,
    unreadNotifications,
    unreadCount,
    showNotifications,
    openNotifications,
    closeNotifications,
    selectedNotification,
    setSelectedNotification,
    handleSelectNotification,
    matchHistory,
    initialQuests,
    questCompletionBonus,
    goals,
    pointHistory,
  } = useKendoDashboard();

  const renderContent = () => {
    if (activeTab === 'home') {
      return (
        <HomeScreen
          user={user}
          onNavigate={setActiveTab}
          notifications={unreadNotifications}
          onSelectNotification={handleSelectNotification}
          matchHistory={matchHistory}
          initialQuests={initialQuests}
          questCompletionBonus={questCompletionBonus}
          goals={goals}
          pointHistory={pointHistory}
        />
      );
    }

    switch (activeTab) {
      case 'match':
        return <TabPlaceholder title="대련" description="대련 기능은 곧 제공될 예정입니다." />;
      case 'ranking':
        return <TabPlaceholder title="랭킹" description="플랫폼 랭킹 데이터를 준비 중입니다." />;
      case 'community':
        return <TabPlaceholder title="커뮤니티" description="커뮤니티 피드를 준비 중입니다." />;
      case 'announcements':
        return <TabPlaceholder title="수련" description="수련 공지 기능을 준비 중입니다." />;
      case 'profile':
        return <TabPlaceholder title="프로필" description="프로필 화면은 곧 업데이트됩니다." />;
      case 'matchHistory':
        return <TabPlaceholder title="전적" description="전적 기록을 정리하는 중입니다." />;
      default:
        return null;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-4 font-sans text-white">
      <div className="flex h-[800px] w-full max-w-sm flex-col overflow-hidden rounded-3xl border-4 border-slate-800 bg-slate-950 shadow-2xl shadow-blue-900/20">
        <header className="flex items-center justify-between border-b border-slate-800 p-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-400" />
            <h1 className="text-xl font-bold">일주일에 2회, 주이회</h1>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell count={unreadCount} onClick={openNotifications} />
            <button className="rounded-full p-2 transition-colors hover:bg-slate-800">
              <Settings className="h-5 w-5 text-slate-400" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#334155 #1e293b' }}>
          {renderContent()}
        </div>

        <nav className="flex items-center justify-around border-t border-slate-800 bg-slate-950/80 p-2 backdrop-blur-sm">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'flex w-1/5 flex-col items-center justify-center rounded-lg p-1 text-xs font-semibold transition-all',
                'text-slate-400 hover:bg-slate-800',
                activeTab === item.id && 'text-blue-400',
              )}
            >
              <span className={cn('mb-1 transition-transform', activeTab === item.id ? 'scale-110' : 'scale-100')}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {showNotifications && (
        <NotificationModal
          notifications={notifications}
          onSelect={(notification) => {
            handleSelectNotification(notification);
          }}
          onClose={closeNotifications}
        />
      )}

      {selectedNotification && (
        <NotificationDetailModal
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
        />
      )}
    </main>
  );
};

export default KendoAppPage;
