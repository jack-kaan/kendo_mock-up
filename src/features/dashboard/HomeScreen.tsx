import React from 'react';
import { Bell, ShieldCheck, Gift, Settings, CheckCircle2, Swords, Users } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Card } from '../../components/ui/Card';
import { UserAvatar } from '../../components/ui/UserAvatar';
import { NotificationBell } from '../../components/layout/NotificationBell';
import { GoalSettingModal } from './GoalSettingModal';
import { GifticonModal } from './GifticonModal';
import { QuestSelectionModal } from './QuestSelectionModal';
import { PointHistoryModal } from './PointHistoryModal';
import { QuestDetailModal } from './QuestDetailModal';
import { GoalChecklistModal } from './GoalChecklistModal';
import { OpponentDetailModal } from '../match/OpponentDetailModal';
import { MiniDojoModal, AvatarSpaceModal } from '../minidojo/MiniDojo';
import { mockMatchHistory, questList, questCompletionBonus, mockGoals, mockPointHistory } from '../../data/mockData';
import { getDday } from '../../utils';
import { KendoUser } from '../../types';

interface HomeScreenProps {
    user: KendoUser;
    onNavigate: (screen: string) => void;
    notifications: any[];
    onSelectNotification: (notification: any) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ user, onNavigate, notifications, onSelectNotification }) => {
    const upcomingMatches = mockMatchHistory.filter(m => m.status === 'upcoming');
    const [modal, setModal] = React.useState<string | null>(null);
    const [selectedItem, setSelectedItem] = React.useState<any>(null);
    const [showMiniDojo, setShowMiniDojo] = React.useState(false);

    const newsBanners = [
        '새로운소식, 정승연님으로부터 새로운 댓글이 달렸습니다',
        '새로운소식, 이정연님으로부터 좋아요를 받았습니다',
    ];

    const openModal = (type: string, item: any = null) => { setModal(type); setSelectedItem(item); };
    const closeModal = () => { setModal(null); setSelectedItem(null); };

    return (
        <>
            <div className="p-4 space-y-6 text-white">
                <div className="space-y-2">
                    <div className="text-center">
                        <p className="text-xs text-slate-400">환영합니다, <span className="text-white font-medium">{user.name}님</span></p>
                    </div>
                    <Card className="py-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center space-x-3">
                                <UserAvatar user={user} size="sm" onClick={() => onNavigate('profile')} />
                                <div className="text-sm">
                                    <div className="flex flex-wrap items-center gap-x-1 text-white font-bold text-lg">
                                        {user.name}
                                        <span className="text-xs font-normal text-slate-400 ml-1">{user.officialRank}</span>
                                        <ShieldCheck className="w-3 h-3 text-blue-400" />
                                    </div>
                                    <div className="text-xs text-slate-400">{user.dojang}</div>
                                </div>
                                <div className="ml-auto flex items-center gap-2">
                                    <NotificationBell count={notifications.filter(n => !n.read).length} onClick={() => onSelectNotification(null)} />
                                    <button onClick={() => openModal('goalSetting')} className="p-2 rounded-full hover:bg-slate-800 transition-colors"><Settings className="w-5 h-5 text-slate-400" /></button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center bg-slate-900/50 rounded-lg p-2 mt-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-400">내 포인트</span>
                                    <span className="text-sm font-bold text-yellow-400 cursor-pointer hover:underline" onClick={() => openModal('pointHistory')}>{user.platformRank.toLocaleString()} P</span>
                                </div>
                                <button onClick={() => openModal('gifticon')} className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded-md transition-colors text-slate-300">
                                    <Gift className="w-3 h-3" /> 교환소
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="overflow-hidden rounded-xl relative">
                    <Swiper modules={[Autoplay, Pagination]} spaceBetween={10} slidesPerView={1} autoplay={{ delay: 3000, disableOnInteraction: false }} pagination={{ clickable: true }} className="w-full">
                        {newsBanners.map((banner, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-gradient-to-r from-blue-900 to-slate-900 p-4 h-24 flex items-center justify-center text-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
                                    <p className="text-sm font-medium text-blue-100 px-8">{banner}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-400" /> 이달의 퀘스트</h2>
                        <button onClick={() => openModal('questSelection')} className="text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded-md">설정</button>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-xs text-slate-400">전체 달성 보너스 <span className="text-yellow-400 font-bold">+{questCompletionBonus.completionBonus.toLocaleString()}P</span></div>
                            <div className="text-xs font-bold text-blue-400">{Math.round((questCompletionBonus.currentCompleted / questCompletionBonus.totalQuests) * 100)}%</div>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5 mb-4">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(questCompletionBonus.currentCompleted / questCompletionBonus.totalQuests) * 100}%` }}></div>
                        </div>
                        <div className="space-y-3">
                            {questList.slice(0, 3).map(quest => (
                                <div key={quest.id} onClick={() => openModal('questDetail', quest)} className="group flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-600">
                                    <div className={`w-2 h-2 rounded-full ${quest.current >= quest.target ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-slate-600'}`}></div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <span className={`text-sm ${quest.current >= quest.target ? 'text-slate-400 line-through' : 'text-slate-200 group-hover:text-white'}`}>{quest.text}</span>
                                            <span className="text-xs text-slate-500">{quest.current}/{quest.target}{quest.unit}</span>
                                        </div>
                                        <div className="w-full bg-slate-800 rounded-full h-1">
                                            <div className={`h-1 rounded-full transition-all duration-500 ${quest.current >= quest.target ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${Math.min((quest.current / quest.target) * 100, 100)}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-bold flex items-center gap-2"><Swords className="w-5 h-5 text-red-400" /> 예정된 대련</h2>
                        <span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-bold">{upcomingMatches.length}건</span>
                    </div>
                    {upcomingMatches.length > 0 ? (
                        <div className="space-y-3">
                            {upcomingMatches.map(match => (
                                <Card key={match.id} className="border-l-4 border-l-red-500 hover:bg-slate-800/80 transition-colors cursor-pointer" onClick={() => openModal('opponentDetail', match.opponent)}>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <UserAvatar user={match.opponent} size="md" />
                                            <div>
                                                <p className="font-bold text-lg">{match.opponent.name}</p>
                                                <p className="text-xs text-slate-400">{match.opponent.dojang}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-red-400 font-bold text-sm">D-{getDday(match.date)}</div>
                                            <div className="text-xs text-slate-500 mt-1">{match.date}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-xs py-2 rounded text-slate-300 transition-colors">전력 분석</button>
                                        <button className="flex-1 bg-red-900/30 hover:bg-red-900/50 text-xs py-2 rounded text-red-400 border border-red-900/50 transition-colors">취소/변경</button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-slate-800/30 rounded-xl border border-slate-700/50 border-dashed">
                            <p className="text-slate-500 mb-2">예정된 대련이 없습니다.</p>
                            <button onClick={() => onNavigate('match')} className="text-sm text-blue-400 font-semibold hover:underline">대련 상대 찾기</button>
                        </div>
                    )}
                </div>

                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-bold flex items-center gap-2"><Users className="w-5 h-5 text-purple-400" /> 미니도장 & 목표</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div onClick={() => setShowMiniDojo(true)} className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl border border-slate-700 cursor-pointer hover:border-blue-500/50 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><Users size={40} /></div>
                            <h3 className="font-bold text-slate-200 mb-1">미니도장</h3>
                            <p className="text-xs text-slate-400 mb-3">나만의 도장을 꾸미고<br />친구들과 소통하세요!</p>
                            <div className="flex -space-x-2 overflow-hidden py-1">
                                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-800 bg-slate-600"></div>
                                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-800 bg-slate-500"></div>
                                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-800 bg-slate-400 flex items-center justify-center text-[8px] font-bold text-slate-800">+5</div>
                            </div>
                        </div>
                        <div onClick={() => openModal('goalChecklist')} className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl border border-slate-700 cursor-pointer hover:border-blue-500/50 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><CheckCircle2 size={40} /></div>
                            <h3 className="font-bold text-slate-200 mb-1">2025 목표</h3>
                            <p className="text-xs text-slate-400 mb-3">올해 목표 달성률</p>
                            <div className="flex items-end gap-1">
                                <span className="text-2xl font-bold text-blue-400">35</span>
                                <span className="text-sm text-slate-500 mb-1">%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                                <div className="bg-blue-500 h-1 rounded-full" style={{ width: '35%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {modal === 'goalSetting' && <GoalSettingModal onClose={closeModal} />}
            {modal === 'gifticon' && <GifticonModal onClose={closeModal} />}
            {modal === 'questSelection' && <QuestSelectionModal onClose={closeModal} activeQuests={questList} onSave={() => closeModal()} />}
            {modal === 'pointHistory' && <PointHistoryModal history={mockPointHistory} onClose={closeModal} />}
            {modal === 'questDetail' && <QuestDetailModal quest={selectedItem} onClose={closeModal} />}
            {modal === 'goalChecklist' && <GoalChecklistModal goals={mockGoals} onClose={closeModal} />}
            {modal === 'opponentDetail' && <OpponentDetailModal opponent={selectedItem} onClose={closeModal} />}
            {showMiniDojo && <MiniDojoModal onClose={() => setShowMiniDojo(false)} />}
        </>
    );
};
