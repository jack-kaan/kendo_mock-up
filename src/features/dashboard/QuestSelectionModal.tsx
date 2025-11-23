import React from 'react';
import { X, CheckCircle2, Circle } from 'lucide-react';
import { questList } from '../../data/mockData';

interface QuestSelectionModalProps {
    onClose: () => void;
    activeQuests: typeof questList;
    onSave: (quests: typeof questList) => void;
}

export const QuestSelectionModal: React.FC<QuestSelectionModalProps> = ({ onClose, activeQuests, onSave }) => {
    const [selectedIds, setSelectedIds] = React.useState<number[]>(activeQuests.map(q => q.id));

    const toggleQuest = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(qId => qId !== id));
        } else {
            if (selectedIds.length >= 3) {
                alert('최대 3개까지 선택 가능합니다.');
                return;
            }
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleSave = () => {
        // In a real app, this would update the backend or global state
        // For now, we just close the modal as we are using mock data
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold">월간 퀘스트 선택</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-2 bg-blue-900/30 text-center text-xs text-blue-300">
                    최대 3개까지 선택하여 집중 공략하세요!
                </div>
                <div className="p-4 overflow-y-auto space-y-3">
                    {questList.map(quest => (
                        <div
                            key={quest.id}
                            onClick={() => toggleQuest(quest.id)}
                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-all ${selectedIds.includes(quest.id) ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-700/30 border-transparent hover:bg-slate-700/50'}`}
                        >
                            <div className="flex-1 mr-3">
                                <p className={`font-bold text-sm ${selectedIds.includes(quest.id) ? 'text-blue-300' : 'text-slate-300'}`}>{quest.text}</p>
                                <p className="text-xs text-slate-500 mt-1">보상: {quest.reward}P</p>
                            </div>
                            {selectedIds.includes(quest.id) ? <CheckCircle2 className="text-blue-500 w-6 h-6 flex-shrink-0" /> : <Circle className="text-slate-600 w-6 h-6 flex-shrink-0" />}
                        </div>
                    ))}
                </div>
                <div className="p-4 flex-shrink-0 border-t border-slate-700">
                    <button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                        선택 완료 ({selectedIds.length}/3)
                    </button>
                </div>
            </div>
        </div>
    );
};
