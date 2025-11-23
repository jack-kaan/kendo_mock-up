import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { UserAvatar } from '../../components/ui/UserAvatar';
import { MatchDetailModal } from './MatchDetailModal';
import { mockMatchHistory } from '../../data/mockData';
import { Match } from '../../types';

interface MatchHistoryScreenProps {
    onBack: () => void;
}

export const MatchHistoryScreen: React.FC<MatchHistoryScreenProps> = ({ onBack }) => {
    const [selectedMatch, setSelectedMatch] = React.useState<Match | null>(null);

    return (
        <div className="p-4 space-y-4 text-white pb-20">
            <div className="flex items-center gap-3 mb-4">
                <button onClick={onBack} className="p-1 text-slate-300 hover:text-white"><ChevronLeft size={24} /></button>
                <h1 className="text-2xl font-bold">대련 기록</h1>
            </div>

            <div className="space-y-3">
                {mockMatchHistory.filter(m => m.status === 'completed').map(match => (
                    <Card key={match.id} onClick={() => setSelectedMatch(match)} className="cursor-pointer hover:bg-slate-800/80 transition-colors border-l-4 border-l-slate-600">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <UserAvatar user={match.opponent} size="md" />
                                <div>
                                    <p className="font-bold text-lg">{match.opponent.name}</p>
                                    <p className="text-xs text-slate-400">{match.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold text-lg ${match.result === 'win' ? 'text-green-400' : 'text-red-400'}`}>{match.result === 'win' ? 'WIN' : 'LOSS'}</p>
                                <p className="text-sm font-semibold text-slate-300">{match.score}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            {selectedMatch && <MatchDetailModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />}
        </div>
    );
};
