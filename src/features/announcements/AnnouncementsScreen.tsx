import React from 'react';
import { FileUp, Info } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { InfoModal } from '../../components/ui/InfoModal';
import { ExamScreen } from '../exam/ExamScreen';
import { TravelPackageDetailModal } from './TravelPackageDetailModal';
import { danPromotions, seminars, promoItems, japanTravelPackages } from '../../data/mockData';
import { TravelPackage } from '../../types';

export const AnnouncementsScreen: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState('theory_exam');
    const [modalContent, setModalContent] = React.useState<any>(null);
    const [selectedTravelPackage, setSelectedTravelPackage] = React.useState<TravelPackage | null>(null);

    const announceTabs = [
        { id: 'theory_exam', label: '학과심사' }, { id: 'kka', label: '대한검도회' },
        { id: 'promo', label: '홍보' }, { id: 'training', label: '무도수행' },
    ];

    const PromotionCard = ({ item }: { item: any }) => (
        <Card>
            <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover rounded-lg mb-3" />
            <p className="text-xs text-blue-400 font-semibold">{item.organizer}</p>
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm text-slate-400 mt-1">{item.content}</p>
        </Card>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'theory_exam': return <ExamScreen />;
            case 'kka': return (
                <div className="space-y-4">
                    <h2 className="font-semibold text-lg px-1 text-slate-300">대한검도회 공지</h2>
                    <Card>
                        <h3 className="text-lg font-semibold mb-2 text-blue-400">공식 시합</h3>
                        <p className="text-sm text-slate-300 mb-4">엑셀파일을 업로드하면, 자동으로 대련자와 매칭되어 시스템 업로드됩니다.</p>
                        <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors">
                            <FileUp size={18} /> 엑셀 파일 업로드
                        </button>
                    </Card>
                    <Card>
                        <h3 className="text-lg font-semibold mb-2 text-blue-400">심사 일정</h3>
                        <div className="space-y-2">
                            {danPromotions.map(p => (
                                <div key={p.id} className="flex justify-between items-center bg-slate-700/50 p-2 rounded-lg">
                                    <p className="font-medium text-sm">{p.title}</p>
                                    <button onClick={() => setModalContent({ ...p, type: 'apply' })} className="text-xs bg-slate-600 px-2 py-1 rounded">보기</button>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Card>
                        <h3 className="text-lg font-semibold mb-2 text-blue-400">강습회 일정</h3>
                        <div className="space-y-2">
                            {seminars.map(s => (
                                <div key={s.id} className="flex justify-between items-center bg-slate-700/50 p-2 rounded-lg">
                                    <p className="font-medium text-sm">{s.title}</p>
                                    <button onClick={() => setModalContent({ ...s, type: 'apply' })} className="text-xs bg-slate-600 px-2 py-1 rounded">보기</button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>);
            case 'promo': return (<div className="space-y-4"> {promoItems.map(item => <PromotionCard key={item.id} item={item} />)} </div>);
            case 'training': return (
                <div className="space-y-4">
                    <Card className="border-red-500/50 bg-red-500/10">
                        <h2 className="text-lg font-semibold mb-2 text-red-400 flex items-center gap-2"><Info /> 사전 강습 안내</h2>
                        <p className="text-sm text-slate-300">일본으로의 방문은 사전 2회에 걸친 강습이 필수입니다. 기본 일본어, 일본식 예법에 대한 강습이 진행되오니 반드시 참여해주시기 바랍니다.</p>
                    </Card>
                    {japanTravelPackages.map(pkg => (
                        <Card key={pkg.id} onClick={() => setSelectedTravelPackage(pkg)} className="cursor-pointer hover:bg-slate-800/80 transition-colors">
                            <div className="relative mb-3">
                                <img src={pkg.imageUrl} alt={pkg.destination} className="w-full h-32 object-cover rounded-lg" />
                                <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-xs font-bold text-white">{pkg.duration}</div>
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg">{pkg.destination}</h3>
                                <span className={pkg.isConfirmed ? "text-green-400 text-xs font-bold border border-green-400 px-1.5 py-0.5 rounded" : "text-yellow-400 text-xs font-bold border border-yellow-400 px-1.5 py-0.5 rounded"}>
                                    {pkg.isConfirmed ? '출발 확정' : '모집 중'}
                                </span>
                            </div>
                            <p className="text-sm text-slate-400 mb-3 line-clamp-2">{pkg.description}</p>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-blue-400">{pkg.price}</span>
                                <span className="text-slate-500">{pkg.currentApplicants}/{pkg.maxApplicants}명</span>
                            </div>
                        </Card>
                    ))}
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className="p-4 space-y-4 text-white pb-20">
            <h1 className="text-2xl font-bold">공지사항</h1>
            <div className="flex border-b border-slate-700 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                {announceTabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 text-sm font-semibold whitespace-nowrap ${activeTab === tab.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 border-b-2 border-transparent hover:text-slate-200'}`}>
                        {tab.label}
                    </button>
                ))}
            </div>
            {renderContent()}
            {modalContent && <InfoModal {...modalContent} onClose={() => setModalContent(null)} showApplyButton={modalContent.type === 'apply'} />}
            {selectedTravelPackage && <TravelPackageDetailModal pkg={selectedTravelPackage} onClose={() => setSelectedTravelPackage(null)} />}
        </div>
    );
};
