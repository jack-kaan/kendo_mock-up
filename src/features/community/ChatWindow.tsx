import React from 'react';
import { ChevronsLeft, PlusCircle, Send } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { UserAvatar } from '../../components/ui/UserAvatar';
import { InviteModal } from './InviteModal';
import { Chat } from '../../types';
import { allUsers } from '../../data/mockData';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ChatWindowProps {
    chat: Chat;
    onBack: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onBack }) => {
    const [isInviteModalOpen, setIsInviteModalOpen] = React.useState(false);

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center p-3 border-b border-slate-700">
                <button onClick={onBack} className="mr-3 p-1 text-slate-300 hover:text-white"><ChevronsLeft size={20} /></button>
                <UserAvatar user={chat.partner} size="sm" />
                <div className="ml-3">
                    <p className="font-bold">{chat.partner.name}</p>
                    {'members' in chat.partner && <p className="text-xs text-slate-400">{chat.partner.members}명</p>}
                </div>
                {chat.type === 'club' && (
                    <button onClick={() => setIsInviteModalOpen(true)} className="ml-auto p-2 text-slate-300 hover:text-white">
                        <PlusCircle size={20} />
                    </button>
                )}
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {chat.messages.map(msg => (
                    <div key={msg.id} className={cn('flex items-end gap-2', msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
                        {msg.sender !== 'me' && <UserAvatar user={allUsers.find(u => u.name === msg.sender) || { name: '?' }} size="sm" />}
                        <div className={cn('max-w-[70%] p-3 rounded-2xl', msg.sender === 'me' ? 'bg-blue-600 rounded-br-none' : 'bg-slate-700 rounded-bl-none')}>
                            {msg.sender !== 'me' && <p className="text-xs font-bold text-blue-300 mb-1">{msg.sender}</p>}
                            <p>{msg.text}</p>
                            <p className="text-xs text-slate-400 mt-1 text-right">{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
                {chat.messages.length === 0 && <p className="text-center text-sm text-slate-500">대화 기록이 없습니다.</p>}
            </div>
            <div className="p-2 border-t border-slate-700 flex items-center gap-2">
                <input type="text" placeholder="메시지 입력..." className="flex-1 bg-slate-700 rounded-full py-2 px-4 text-white placeholder:text-slate-500" />
                <button className="bg-blue-600 p-2 rounded-full"><Send size={18} /></button>
            </div>
            {isInviteModalOpen && <InviteModal onClose={() => setIsInviteModalOpen(false)} />}
        </div>
    );
};
