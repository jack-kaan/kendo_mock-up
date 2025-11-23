import React from 'react';
import { X, CheckCircle2, Circle } from 'lucide-react';

interface GoalChecklistModalProps {
    goals: { id: number; text: string; completed: boolean; current?: number; target?: number }[];
    onClose: () => void;
}

export const GoalChecklistModal: React.FC<GoalChecklistModalProps> = ({ goals, onClose }) => {
    const [localGoals, setLocalGoals] = React.useState(goals);

    const toggleGoal = (id: number) => {
        setLocalGoals(localGoals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold">목표 체크리스트</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto space-y-3">
                    {localGoals.map(goal => (
                        <div
                            key={goal.id}
                            onClick={() => !goal.target && toggleGoal(goal.id)}
                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-all ${goal.completed ? 'bg-green-900/20 border-green-500/50' : 'bg-slate-700/30 border-transparent hover:bg-slate-700/50'}`}
                        >
                            <div className="flex-1 mr-3">
                                <p className={`font-medium ${goal.completed ? 'text-green-300 line-through' : 'text-slate-200'}`}>{goal.text}</p>
                                {goal.target && (
                                    <div className="mt-2">
                                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                                            <span>진행률</span>
                                            <span>{Math.round(((goal.current || 0) / goal.target) * 100)}%</span>
                                        </div>
                                        <div className="w-full bg-slate-600 rounded-full h-1.5">
                                            <div className="bg-blue-500 rounded-full h-1.5" style={{ width: `${((goal.current || 0) / goal.target) * 100}%` }}></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {!goal.target && (
                                goal.completed ? <CheckCircle2 className="text-green-500 w-6 h-6 flex-shrink-0" /> : <Circle className="text-slate-600 w-6 h-6 flex-shrink-0" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
