import React from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';

interface PointHistoryModalProps {
    history: { date: string; change: string; reason: string }[];
    onClose: () => void;
}

export const PointHistoryModal: React.FC<PointHistoryModalProps> = ({ history, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold">포인트 내역</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-3">
                {history.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                        <div>
                            <p className="font-medium text-sm">{item.reason}</p>
                            <p className="text-xs text-slate-400">{item.date}</p>
                        </div>
                        <div className={`font-bold ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
                            {item.change.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {item.change}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
