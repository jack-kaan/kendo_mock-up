import React from 'react';
import { X, Gift } from 'lucide-react';
import { gifticonItems } from '../../data/mockData';

interface GifticonModalProps {
    onClose: () => void;
}

export const GifticonModal: React.FC<GifticonModalProps> = ({ onClose }) => {
    const [activeCategory, setActiveCategory] = React.useState(gifticonItems[0].category);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold flex items-center gap-2"><Gift className="text-yellow-400" size={20} /> 포인트 교환소</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="flex border-b border-slate-700 overflow-x-auto p-2 gap-2" style={{ scrollbarWidth: 'none' }}>
                    {gifticonItems.map(cat => (
                        <button
                            key={cat.category}
                            onClick={() => setActiveCategory(cat.category)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${activeCategory === cat.category ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
                        >
                            {cat.category}
                        </button>
                    ))}
                </div>
                <div className="p-4 overflow-y-auto space-y-3">
                    {gifticonItems.find(c => c.category === activeCategory)?.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer" onClick={() => alert(`${item.split('(')[0]} 교환 신청이 완료되었습니다!`)}>
                            <span className="text-sm font-medium">{item.split('(')[0]}</span>
                            <span className="text-xs font-bold text-yellow-400 bg-slate-800 px-2 py-1 rounded-full">{item.split('(')[1].replace(')', '')}</span>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-slate-700 bg-slate-800/50 rounded-b-2xl">
                    <p className="text-center text-xs text-slate-400">보유 포인트: <span className="text-yellow-400 font-bold text-sm">1,510 P</span></p>
                </div>
            </div>
        </div>
    );
};
