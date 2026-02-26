import { useCallback, useMemo, useState } from 'react';

import { kendoService } from '@/services/kendoService';
import type {
  Goal,
  KendoNotification,
  KendoUser,
  Match,
  PointHistoryEntry,
  Quest,
} from '@/types/kendo';

export type DashboardTab =
  | 'home'
  | 'match'
  | 'ranking'
  | 'community'
  | 'announcements'
  | 'profile'
  | 'matchHistory';

export function useKendoDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [notifications, setNotifications] = useState(() => kendoService.getNotifications());
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<KendoNotification | null>(null);

  const user = useMemo(() => kendoService.getCurrentUser(), []);
  const matchHistory = useMemo(() => kendoService.getMatchHistory(), []);
  const initialQuests = useMemo(() => kendoService.getInitialQuests(), []);
  const questCompletionBonus = useMemo(
    () => kendoService.getQuestCompletionBonus(),
    [],
  );
  const goals = useMemo(() => kendoService.getGoals(), []);
  const pointHistory = useMemo(() => kendoService.getPointHistory(), []);

  const unreadNotifications = useMemo(
    () => notifications.filter((notification) => !notification.read),
    [notifications],
  );
  const unreadCount = unreadNotifications.length;

  const markNotificationAsRead = useCallback((notificationId: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  }, []);

  const handleSelectNotification = useCallback(
    (notification: KendoNotification) => {
      markNotificationAsRead(notification.id);
      setSelectedNotification(notification);
      setShowNotifications(false);
    },
    [markNotificationAsRead],
  );

  const openNotifications = useCallback(() => setShowNotifications(true), []);
  const closeNotifications = useCallback(() => setShowNotifications(false), []);

  return {
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
  };
}
