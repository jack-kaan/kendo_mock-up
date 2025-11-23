import React from 'react';
import { Search, MapPin, Filter, Calendar, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { UserAvatar } from '../../components/ui/UserAvatar';
import { MatchRequestModal } from './MatchRequestModal';
import { OpponentDetailModal } from './OpponentDetailModal';
import { mockUsers } from '../../data/mockData';
import { KendoUser } from '../../types';

export const MatchScreen: React.FC = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedUser, setSelectedUser] = React.useState<KendoUser | null>(null);
    const [isRequestModalOpen, setIsRequestModalOpen] = React.useState(false);

    const filteredOpponents = mockUsers.filter(u => u.name.includes(searchTerm) || u.dojang.includes(searchTerm));

    return (
        <div className="p-4 space-y-4 text-white pb-20">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="상대 이름, 도장 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
                <button className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
                    <Filter size={20} />
                </button>
            </div>

            <div className="space-y-3">
                {filteredOpponents.map(user => (
                    <Card key={user.id} onClick={() => setSelectedUser(user)} className="cursor-pointer hover:bg-slate-800/80 transition-colors">
                        <div className="flex items-center gap-4">
                            <UserAvatar user={user} size="md" />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-lg">{user.name}</p>
                                        <p className="text-sm text-slate-400 flex items-center gap-1"><MapPin size={12} /> {user.dojang}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full font-semibold">{user.officialRank}</span>
                                        <p className="text-xs text-slate-500 mt-1">{user.wins}승 {user.losses}패</p>
                                    </div>
                                </div>
                                <div className="mt-3 flex gap-2">
                                    <button onClick={(e) => { e.stopPropagation(); setSelectedUser(user); setIsRequestModalOpen(true); }} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 rounded-lg transition-colors">
                                        대련 신청
                                    </button>
                                    <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold py-2 rounded-lg transition-colors">
                                        프로필
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {selectedUser && !isRequestModalOpen && <OpponentDetailModal opponent={selectedUser} onClose={() => setSelectedUser(null)} />}
            {selectedUser && isRequestModalOpen && <MatchRequestModal user={selectedUser} onClose={() => { setIsRequestModalOpen(false); setSelectedUser(null); }} />}
        </div>
    );
};
