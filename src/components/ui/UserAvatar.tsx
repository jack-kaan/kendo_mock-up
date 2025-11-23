import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { KendoUser, ChatPartner } from '../../types';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface UserAvatarProps {
    user: KendoUser | ChatPartner | { name: string; avatarUrl?: string };
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'md', onClick }) => {
    const sizeClasses = { sm: 'w-10 h-10', md: 'w-16 h-16', lg: 'w-24 h-24' };
    const defaultAvatar = user?.name === '익명'
        ? 'https://placehold.co/100x100/475569/94a3b8?text=익명'
        : `https://placehold.co/100x100/1e293b/94a3b8?text=??`;

    return (
        <img src={user?.avatarUrl || defaultAvatar} alt={user?.name || 'User Avatar'} className={cn('bg-slate-700 border-2 border-slate-600 rounded-full flex-shrink-0 object-cover', sizeClasses[size], onClick && 'cursor-pointer')}
            onClick={onClick}
            onError={(e) => { const target = e.target as HTMLImageElement; target.onerror = null; target.src = defaultAvatar; }}
        />
    );
};
