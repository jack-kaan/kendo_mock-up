import React from 'react';
import { Home, Swords, Trophy, Users, Megaphone, User as UserIcon, Shield, Settings } from 'lucide-react';
import { NotificationBell } from './components/layout/NotificationBell';
import { NotificationModal } from './components/layout/NotificationModal';
import { NotificationDetailModal } from './components/layout/NotificationDetailModal';
import { HomeScreen } from './features/dashboard/HomeScreen';
import { MatchScreen } from './features/match/MatchScreen';
import { RankingScreen } from './features/dashboard/RankingScreen';
import { CommunityScreen } from './features/community/CommunityScreen';
import { AnnouncementsScreen } from './features/announcements/AnnouncementsScreen';
import { ProfileScreen } from './features/profile/ProfileScreen';
import { MatchHistoryScreen } from './features/match/MatchHistoryScreen';
import { mockNotifications, currentUser } from './data/mockData';
import { cn } from './utils';

const KendoAppPage = () => {
    const [activeTab, setActiveTab] = React.useState('home');
    const [notifications, setNotifications] = React.useState(mockNotifications);
    const [showNotifications, setShowNotifications] = React.useState(false);
    const [selectedNotification, setSelectedNotification] = React.useState<any>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleSelectNotification = (notification: any) => {
        setSelectedNotification(notification);
        if (notification) {
            setNotifications(notifications.map(n => n.id === notification.id ? { ...n, read: true } : n));
        }
        setShowNotifications(false);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <HomeScreen user={currentUser} onNavigate={setActiveTab} notifications={notifications.filter(n => !n.read)} onSelectNotification={handleSelectNotification} />;
            case 'match':
                return <MatchScreen />;
            case 'ranking':
                return <RankingScreen />;
            case 'community':
                return <CommunityScreen />;
            case 'announcements':
                return <AnnouncementsScreen />;
            case 'profile':
                return <ProfileScreen user={currentUser} onNavigate={setActiveTab} />;
            case 'matchHistory':
                return <MatchHistoryScreen onBack={() => setActiveTab('profile')} />;
            default:
                return <HomeScreen user={currentUser} onNavigate={setActiveTab} notifications={notifications.filter(n => !n.read)} onSelectNotification={handleSelectNotification} />;
        }
    };

    const navItems = [
        { id: 'home', label: '홈', icon: <Home /> },
        { id: 'match', label: '대련', icon: <Swords /> },
        { id: 'ranking', label: '랭킹', icon: <Trophy /> },
        { id: 'community', label: '커뮤니티', icon: <Users /> },
        { id: 'announcements', label: '수련', icon: <Megaphone /> },
        { id: 'profile', label: '프로필', icon: <UserIcon /> },
    ];

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 font-sans">
            <style>{`
        @keyframes thrust {
            0%, 100% { transform: translateX(0) rotate(-15deg); }
            50% { transform: translateX(20px) rotate(-15deg); }
        }
        .animate-thrust {
            animation: thrust 1.5s ease-in-out infinite;
        }
      `}</style>
            <div className="w-full max-w-sm h-[800px] max-h-[90vh] bg-slate-950 rounded-3xl shadow-2xl shadow-blue-900/20 border-4 border-slate-800 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 border-b border-slate-800 flex-shrink-0">
                    <div className="flex items-center space-x-2">
                        <Shield className="w-6 h-6 text-blue-400" />
                        <h1 className="font-bold text-xl text-white">일주일에 2회, 주이회</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <NotificationBell count={unreadCount} onClick={() => setShowNotifications(true)} />
                        <button className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                            <Settings className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>
                </header>

                <div className="flex-grow overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#334155 #1e293b' }}>
                    {renderContent()}
                </div>

                <nav className="flex justify-around items-center p-2 border-t border-slate-800 bg-slate-950/80 backdrop-blur-sm flex-shrink-0">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn('flex flex-col items-center justify-center w-1/5 p-1 rounded-lg transition-all duration-200', 'text-slate-400 hover:bg-slate-800', activeTab === item.id || (activeTab === 'matchHistory' && item.id === 'profile') ? 'text-blue-400' : '')} >
                            <div className={cn('mb-1 transition-transform', activeTab === item.id ? 'scale-110' : 'scale-100')}>{item.icon}</div>
                            <span className="text-xs font-semibold">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
            {showNotifications && <NotificationModal notifications={notifications} onSelect={handleSelectNotification} onClose={() => setShowNotifications(false)} />}
            {selectedNotification && <NotificationDetailModal notification={selectedNotification} onClose={() => setSelectedNotification(null)} />}
        </main>
    );
};

export default KendoAppPage;
