import React from 'react';
import { X } from 'lucide-react';

interface ExamResultHistoryModalProps {
    history: { date: string; score: number }[];
    onClose: () => void;
}

export const ExamResultHistoryModal: React.FC<ExamResultHistoryModalProps> = ({ history, onClose }) => {
    const chartHeight = 150; const chartWidth = 300; const yPadding = 20; const xPadding = 30;
    const getX = (index: number) => xPadding + (index / (history.length - 1)) * (chartWidth - xPadding);
    const getY = (score: number) => chartHeight - yPadding - (score / 100) * (chartHeight - yPadding * 2);
    const linePath = history.length > 1 ? history.map((h, i) => `${getX(i)},${getY(h.score)}`).join(' ') : '';

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold">시험 결과 이력</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto">
                    <h3 className="font-semibold text-blue-400 mb-2">점수 추이</h3>
                    <div className="bg-slate-900/50 p-2 rounded-lg">
                        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
                            {[0, 25, 50, 75, 100].map(score => (
                                <g key={score}>
                                    <line x1={xPadding} y1={getY(score)} x2={chartWidth} y2={getY(score)} stroke="#475569" strokeDasharray="2" />
                                    <text x={xPadding - 8} y={getY(score) + 4} fill="#94a3b8" fontSize="10" textAnchor="end">{score}</text>
                                </g>
                            ))}
                            {history.length > 1 && <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={linePath} />}
                            {history.map((h, i) => (<circle key={i} cx={getX(i)} cy={getY(h.score)} r="3" fill="#3b82f6" />))}
                        </svg>
                    </div>
                    <h3 className="font-semibold text-blue-400 mt-4 mb-2">점수 목록</h3>
                    <div className="space-y-2">
                        {history.slice().reverse().map((item, index) => (
                            <div key={index} className="bg-slate-700/50 p-3 rounded-lg flex justify-between items-center">
                                <span className="text-sm">{item.date}</span>
                                <span className="font-bold text-lg">{item.score}점</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
