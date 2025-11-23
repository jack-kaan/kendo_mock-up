import React from 'react';
import { X } from 'lucide-react';
import { UserAvatar } from '../../components/ui/UserAvatar';
import { KendoUser } from '../../types';

interface RankingTrendModalProps {
    user: KendoUser;
    onClose: () => void;
}

export const RankingTrendModal: React.FC<RankingTrendModalProps> = ({ user, onClose }) => {
    const data = user.rankHistory;
    const minRank = Math.min(...data.map(p => p.rank));
    const maxRank = Math.max(...data.map(p => p.rank));
    const points = data.map((p, i) => `${i * 60},${90 - (p.rank - minRank) / (maxRank - minRank) * 80}`).join(' ');

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 text-white relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                <div className="flex items-center gap-3 mb-4">
                    <UserAvatar user={user} size="sm" />
                    <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-sm text-slate-400">최근 랭크 추이</p>
                    </div>
                </div>
                <div className="h-40">
                    <svg viewBox="0 0 180 100" className="w-full h-full">
                        <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={points} />
                        {data.map((p, i) => <circle key={i} cx={i * 60} cy={90 - (p.rank - minRank) / (maxRank - minRank) * 80} r="3" fill="#3b82f6" />)}
                    </svg>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1월</span><span>3월</span><span>5월</span><span>7월</span>
                </div>
            </div>
        </div>
    );
};
