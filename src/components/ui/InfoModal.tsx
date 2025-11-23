import React from 'react';
import { X, Calendar, MapPin } from 'lucide-react';

interface InfoModalProps {
    title: string;
    date: string;
    location: string;
    details: string;
    onClose: () => void;
    showApplyButton?: boolean;
}

export const InfoModal: React.FC<InfoModalProps> = ({ title, date, location, details, onClose, showApplyButton }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold">{title}</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-300"><Calendar size={14} /> <span>{date}</span></div>
                <div className="flex items-center gap-2 text-sm text-slate-300"><MapPin size={14} /> <span>{location}</span></div>
                <p className="text-sm bg-slate-700/50 p-3 rounded-lg">{details}</p>
            </div>
            {showApplyButton && (
                <div className="p-4 flex-shrink-0">
                    <button onClick={() => alert('신청 완료!')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">신청하기</button>
                </div>
            )}
        </div>
    </div>
);
