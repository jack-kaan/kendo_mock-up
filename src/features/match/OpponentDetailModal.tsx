import React from 'react';
import { X, Star, MapPin } from 'lucide-react';
import { UserAvatar } from '../../components/ui/UserAvatar';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { KendoUser } from '../../types';

interface OpponentDetailModalProps {
    opponent: KendoUser;
    onClose: () => void;
}

export const OpponentDetailModal: React.FC<OpponentDetailModalProps> = ({ opponent, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="relative">
                <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl"></div>
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-white/80 hover:text-white bg-black/20 rounded-full"><X size={20} /></button>
                <div className="absolute -bottom-12 left-6">
                    <UserAvatar user={opponent} size="lg" />
                </div>
            </div>
            <div className="pt-14 px-6 pb-6 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-1">{opponent.name}</h2>
                <p className="text-slate-400 flex items-center gap-1 text-sm mb-4"><MapPin size={14} /> {opponent.location} · {opponent.dojang}</p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-slate-700/50 p-3 rounded-xl text-center">
                        <p className="text-xs text-slate-400 mb-1">플랫폼 랭크</p>
                        <p className="text-xl font-bold text-blue-400">{opponent.platformRank}P</p>
                    </div>
                    <div className="bg-slate-700/50 p-3 rounded-xl text-center">
                        <p className="text-xs text-slate-400 mb-1">공인 단수</p>
                        <p className="text-xl font-bold text-yellow-400 flex justify-center items-center gap-1"><Star size={16} fill="currentColor" /> {opponent.officialRank}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold text-lg mb-2">전적</h3>
                        <div className="flex gap-4 text-sm">
                            <span className="text-green-400 font-semibold">{opponent.wins}승</span>
                            <span className="text-red-400 font-semibold">{opponent.losses}패</span>
                            <span className="text-slate-400">승률 {Math.round((opponent.wins / (opponent.wins + opponent.losses)) * 100)}%</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-2">스타일</h3>
                        <Card className="bg-slate-700/30 border-none">
                            <p className="text-sm mb-2"><span className="text-slate-400">주특기:</span> {opponent.specialty}</p>
                            <div className="flex flex-wrap gap-2">
                                {opponent.characteristics.map(c => <span key={c} className="text-xs bg-slate-600 px-2 py-1 rounded-full">{c}</span>)}
                            </div>
                        </Card>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-2">보유 뱃지</h3>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {opponent.badges.map(badge => <div key={badge} className="transform scale-75 origin-top-left"><Badge type={badge} /></div>)}
                        </div>
                    </div>
                </div>

                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/50">
                    대련 신청하기
                </button>
            </div>
        </div>
    </div>
);
