import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { mockGoals } from '../../data/mockData';

interface GoalSettingModalProps {
    onClose: () => void;
}

export const GoalSettingModal: React.FC<GoalSettingModalProps> = ({ onClose }) => {
    const [goals, setGoals] = React.useState(mockGoals);
    const [newGoalText, setNewGoalText] = React.useState('');

    const addGoal = () => {
        if (newGoalText.trim()) {
            setGoals([...goals, { id: Date.now(), text: newGoalText, completed: false }]);
            setNewGoalText('');
        }
    };

    const removeGoal = (id: number) => {
        setGoals(goals.filter(g => g.id !== id));
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold">목표 설정</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto space-y-3">
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={newGoalText}
                            onChange={(e) => setNewGoalText(e.target.value)}
                            placeholder="새로운 목표 입력"
                            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder:text-slate-500"
                            onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                        />
                        <button onClick={addGoal} className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white"><Plus size={20} /></button>
                    </div>
                    <div className="space-y-2">
                        {goals.map(goal => (
                            <div key={goal.id} className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                                <span className="text-sm">{goal.text}</span>
                                <button onClick={() => removeGoal(goal.id)} className="text-slate-400 hover:text-red-400"><Trash2 size={16} /></button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 flex-shrink-0">
                    <button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">저장하기</button>
                </div>
            </div>
        </div>
    );
};
