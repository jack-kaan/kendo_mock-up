import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { UserAvatar } from '../../components/ui/UserAvatar';
import { GeneralPostCard } from './GeneralPostCard';
import { TradePostCard } from '../trade/TradePostCard';
import { ChatWindow } from './ChatWindow';
import { ShopScreen } from './ShopScreen';
import { InviteModal } from './InviteModal';
import { mockChats, communityPosts, anonymousPosts, tradePosts } from '../../data/mockData';
import { Chat } from '../../types';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const CommunityScreen: React.FC = () => {
    const [activeCategory, setActiveCategory] = React.useState('chat');
    const [selectedChat, setSelectedChat] = React.useState<Chat | null>(null);
    const [isInviteModalOpen, setIsInviteModalOpen] = React.useState(false);

    const CategoryButton = ({ cat, label }: { cat: string, label: string }) => (
        <button onClick={() => setActiveCategory(cat)} className={cn('px-4 py-2 text-sm font-semibold whitespace-nowrap', activeCategory === cat ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 border-b-2 border-transparent hover:text-slate-200')}>
            {label}
        </button>
    );

    if (selectedChat) {
        return (
            <>
                <ChatWindow chat={selectedChat} onBack={() => setSelectedChat(null)} />
                {isInviteModalOpen && <InviteModal onClose={() => setIsInviteModalOpen(false)} />}
            </>
        );
    }

    return (
        <div className="p-4 space-y-4 text-white pb-20">
            <h1 className="text-2xl font-bold">커뮤니티</h1>
            <div className="flex border-b border-slate-700 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                <CategoryButton cat="chat" label="채팅" />
                <CategoryButton cat="general" label="수다방" />
                <CategoryButton cat="anonymous" label="익명방" />
                <CategoryButton cat="trade" label="거래방" />
                <CategoryButton cat="shop" label="상점" />
            </div>

            <div className="space-y-2">
                {activeCategory === 'chat' && mockChats.map(chat => (
                    <div key={chat.id} onClick={() => setSelectedChat(chat)} className="flex items-center p-2 gap-3 hover:bg-slate-800 rounded-lg cursor-pointer">
                        <UserAvatar user={chat.partner} size="sm" />
                        <div className="flex-1 overflow-hidden">
                            <div className="flex justify-between">
                                <p className="font-bold truncate">{chat.partner.name}{'members' in chat.partner && ` (${chat.partner.members})`}</p>
                                <p className="text-xs text-slate-400 flex-shrink-0">{chat.timestamp}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-slate-400 truncate">{chat.lastMessage}</p>
                                {chat.unread > 0 && <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">{chat.unread}</span>}
                            </div>
                        </div>
                    </div>
                ))}
                {activeCategory === 'general' && communityPosts.map(post => <GeneralPostCard key={post.id} post={post} />)}
                {activeCategory === 'anonymous' && anonymousPosts.map(post => <GeneralPostCard key={post.id} post={post} />)}
                {activeCategory === 'trade' && tradePosts.map(post => <TradePostCard key={post.id} post={post} />)}
                {activeCategory === 'shop' && <ShopScreen />}
            </div>
        </div>
    );
};
