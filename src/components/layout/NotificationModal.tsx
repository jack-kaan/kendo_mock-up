import React from 'react';
import { X, Bell } from 'lucide-react';
import { UserAvatar } from '../../components/ui/UserAvatar';

interface NotificationModalProps {
    notifications: any[];
    onSelect: (notification: any) => void;
    onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ notifications, onSelect, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold flex items-center gap-2"><Bell size={20} /> 알림 센터</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                    <p className="text-center text-slate-500 py-8">새로운 알림이 없습니다.</p>
                ) : (
                    notifications.map(n => (
                        <div key={n.id} onClick={() => onSelect(n)} className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 ${n.read ? 'bg-slate-700/30' : 'bg-slate-700 border-l-4 border-blue-500'}`}>
                            <UserAvatar user={n.opponent} size="sm" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold">{n.type === 'new_request' ? '대련 신청' : '신청 거절'}</p>
                                <p className="text-xs text-slate-400">{n.opponent.name}님이 {n.type === 'new_request' ? '대련을 신청했습니다.' : '대련을 거절했습니다.'}</p>
                            </div>
                            {!n.read && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
);
