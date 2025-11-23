import React from 'react';
import { Search, Trophy, Medal, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { UserAvatar } from '../../components/ui/UserAvatar';
import { RankingTrendModal } from './RankingTrendModal';
import { mockUsers } from '../../data/mockData';
import { KendoUser } from '../../types';

export const RankingScreen: React.FC = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedUser, setSelectedUser] = React.useState<KendoUser | null>(null);

    const filteredUsers = mockUsers.filter(u => u.name.includes(searchTerm) || u.dojang.includes(searchTerm));

    return (
        <div className="p-4 space-y-4 text-white pb-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="이름, 도장 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
            </div>

            <div className="space-y-3">
                {filteredUsers.map((user, index) => (
                    <Card key={user.id} onClick={() => setSelectedUser(user)} className={`cursor-pointer transition-all hover:bg-slate-800/80 ${index < 3 ? 'border-yellow-500/30 bg-gradient-to-r from-slate-800 to-slate-900' : ''}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-8 text-center font-bold text-lg text-slate-400">
                                {index === 0 ? <Trophy className="w-6 h-6 text-yellow-400 mx-auto" /> :
                                    index === 1 ? <Medal className="w-6 h-6 text-slate-300 mx-auto" /> :
                                        index === 2 ? <Medal className="w-6 h-6 text-orange-400 mx-auto" /> :
                                            index + 1}
                            </div>
                            <UserAvatar user={user} size="md" />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-lg">{user.name}</p>
                                    <span className="text-xs bg-slate-700 px-1.5 py-0.5 rounded text-slate-300">{user.officialRank}</span>
                                </div>
                                <p className="text-sm text-slate-400">{user.dojang}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-blue-400">{user.platformRank.toLocaleString()} P</p>
                                <div className="flex items-center justify-end text-xs text-slate-500 mt-1">
                                    <span>상세보기</span>
                                    <ChevronRight size={12} />
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            {selectedUser && <RankingTrendModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
        </div>
    );
};
