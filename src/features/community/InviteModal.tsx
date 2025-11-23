import React from 'react';
import { X } from 'lucide-react';
import { UserAvatar } from '../../components/ui/UserAvatar';
import { allUsers } from '../../data/mockData';

interface InviteModalProps {
    onClose: () => void;
}

export const InviteModal: React.FC<InviteModalProps> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold">멤버 초대</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-3">
                {allUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between bg-slate-700/50 p-2 rounded-lg">
                        <div className="flex items-center gap-3">
                            <UserAvatar user={user} size="sm" />
                            <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-xs text-slate-400">{user.dojang}</p>
                            </div>
                        </div>
                        <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                    </div>
                ))}
            </div>
            <div className="p-4 flex-shrink-0">
                <button onClick={() => { alert('초대를 보냈습니다.'); onClose(); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">초대하기</button>
            </div>
        </div>
    </div>
);
