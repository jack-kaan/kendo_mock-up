import React from 'react';
import { X, CheckCircle2, Circle } from 'lucide-react';

interface QuestDetailModalProps {
    quest: {
        id: number;
        text: string;
        current: number;
        target: number;
        unit: string;
        reward: number;
        description: string;
        selected: boolean;
    };
    onClose: () => void;
}

export const QuestDetailModal: React.FC<QuestDetailModalProps> = ({ quest, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-slate-700">
                <h2 className="text-lg font-bold">퀘스트 상세</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="text-center">
                    <div className="inline-block p-3 bg-blue-500/20 rounded-full mb-3">
                        {quest.current >= quest.target ? <CheckCircle2 className="w-10 h-10 text-blue-400" /> : <Circle className="w-10 h-10 text-blue-400" />}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{quest.text}</h3>
                    <p className="text-slate-400 text-sm">{quest.description}</p>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-xl space-y-3">
                    <div className="flex justify-between text-sm font-semibold">
                        <span>진행도</span>
                        <span className="text-blue-400">{Math.round((quest.current / quest.target) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-3">
                        <div className="bg-blue-500 rounded-full h-3 transition-all duration-500" style={{ width: `${Math.min((quest.current / quest.target) * 100, 100)}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                        <span>0{quest.unit}</span>
                        <span>{quest.target}{quest.unit}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center bg-slate-700/30 p-3 rounded-lg border border-slate-600">
                    <span className="text-sm font-medium text-slate-300">완료 보상</span>
                    <span className="font-bold text-yellow-400">{quest.reward} P</span>
                </div>
            </div>
            <div className="p-4 border-t border-slate-700">
                <button onClick={onClose} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors">닫기</button>
            </div>
        </div>
    </div>
);
