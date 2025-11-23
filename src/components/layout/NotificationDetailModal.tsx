import React from 'react';
import { X } from 'lucide-react';
import { UserAvatar } from '../../components/ui/UserAvatar';

interface NotificationDetailModalProps {
    notification: any;
    onClose: () => void;
}

export const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({ notification, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white p-6 relative">
            <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            <div className="flex flex-col items-center mb-4">
                <UserAvatar user={notification.opponent} size="lg" />
                <h2 className="text-xl font-bold mt-2">{notification.opponent.name}</h2>
                <p className="text-slate-400 text-sm">{notification.opponent.dojang}</p>
            </div>

            <div className="bg-slate-700/50 p-4 rounded-xl mb-6 text-center">
                <p className="font-semibold text-lg mb-2">{notification.type === 'new_request' ? '대련 신청이 도착했습니다!' : '대련 신청이 거절되었습니다.'}</p>
                {notification.message && <p className="text-slate-300 text-sm">"{notification.message}"</p>}
            </div>

            {notification.type === 'new_request' ? (
                <div className="flex gap-3">
                    <button onClick={() => { alert('거절했습니다.'); onClose(); }} className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">거절</button>
                    <button onClick={() => { alert('수락했습니다!'); onClose(); }} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">수락</button>
                </div>
            ) : (
                <button onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">확인</button>
            )}
        </div>
    </div>
);
