import React from 'react';
import { ShieldCheck, ChevronRight, Settings, LogOut } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { UserAvatar } from '../../components/ui/UserAvatar';
import { Badge } from '../../components/ui/Badge';
import { DetailedStatsCard } from './DetailedStatsCard';
import { AIAnalysisModal } from './AIAnalysisModal';
import { KendoUser } from '../../types';

interface ProfileScreenProps {
    user: KendoUser;
    onNavigate: (screen: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onNavigate }) => {
    const [showAIAnalysis, setShowAIAnalysis] = React.useState(false);

    return (
        <div className="p-4 space-y-6 text-white pb-20">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">내 프로필</h1>
                <button className="p-2 text-slate-400 hover:text-white"><Settings size={20} /></button>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <UserAvatar user={user} size="lg" />
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">{user.name} <ShieldCheck className="w-5 h-5 text-blue-400" /></h2>
                    <p className="text-slate-400">{user.dojang} / {user.location}</p>
                    <div className="flex gap-2 mt-2">
                        <span className="bg-slate-700 px-2 py-1 rounded text-xs font-bold text-white">{user.officialRank}</span>
                        <span className="bg-blue-900/50 px-2 py-1 rounded text-xs font-bold text-blue-300">{user.platformRank} P</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center mb-6">
                <div className="bg-slate-800 p-3 rounded-xl">
                    <p className="text-xs text-slate-400 mb-1">전적</p>
                    <p className="font-bold text-lg">{user.wins + user.losses}전</p>
                </div>
                <div className="bg-slate-800 p-3 rounded-xl">
                    <p className="text-xs text-slate-400 mb-1">승률</p>
                    <p className="font-bold text-lg text-blue-400">{Math.round(user.wins / (user.wins + user.losses) * 100)}%</p>
                </div>
                <div className="bg-slate-800 p-3 rounded-xl">
                    <p className="text-xs text-slate-400 mb-1">연승</p>
                    <p className="font-bold text-lg text-green-400">3연승</p>
                </div>
            </div>

            <DetailedStatsCard stats={user.detailedStats} />

            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg">획득 배지</h3>
                    <button className="text-xs text-slate-400 hover:text-white flex items-center">전체보기 <ChevronRight size={12} /></button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {user.badges.map((badge, index) => <Badge key={index} type={badge} />)}
                </div>
            </div>

            <Card onClick={() => onNavigate('match_history')} className="cursor-pointer hover:bg-slate-800/80 transition-colors flex justify-between items-center">
                <span className="font-bold">대련 기록 전체보기</span>
                <ChevronRight className="text-slate-400" />
            </Card>

            <button className="w-full py-3 text-red-400 font-bold flex items-center justify-center gap-2 hover:bg-red-900/20 rounded-lg transition-colors">
                <LogOut size={18} /> 로그아웃
            </button>

            {showAIAnalysis && <AIAnalysisModal user={user} onClose={() => setShowAIAnalysis(false)} />}
        </div>
    );
};
