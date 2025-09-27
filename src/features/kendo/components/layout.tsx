import type { FC, ReactElement, ReactNode, SyntheticEvent } from 'react';
import { cloneElement } from 'react';
import { Award, BookOpen, Star, Trophy, Users } from 'lucide-react';

import type { BadgeType, KendoUser } from '@/types/kendo';
import { cn } from '@/lib/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: FC<CardProps> = ({ children, className, onClick }) => (
  <div
    className={cn(
      'rounded-xl border border-slate-700 bg-slate-800/50 p-4 shadow-lg',
      onClick && 'cursor-pointer transition-colors hover:bg-slate-700/80',
      className,
    )}
    onClick={onClick}
  >
    {children}
  </div>
);

type AvatarUser = Pick<KendoUser, 'name' | 'avatarUrl'> | { name: string; avatarUrl?: string };

type AvatarSize = 'sm' | 'md' | 'lg';

interface UserAvatarProps {
  user?: AvatarUser;
  size?: AvatarSize;
  onClick?: () => void;
}

const avatarSizes: Record<AvatarSize, string> = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
};

export const UserAvatar: FC<UserAvatarProps> = ({ user, size = 'md', onClick }) => {
  const defaultAvatar =
    user?.name === '익명'
      ? 'https://placehold.co/100x100/475569/94a3b8?text=익명'
      : 'https://placehold.co/100x100/1e293b/94a3b8?text=??';

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    target.onerror = null;
    target.src = defaultAvatar;
  };

  return (
    <img
      src={user?.avatarUrl || defaultAvatar}
      alt={user?.name || 'User Avatar'}
      className={cn(
        'flex-shrink-0 rounded-full border-2 border-slate-600 bg-slate-700 object-cover',
        avatarSizes[size],
        onClick && 'cursor-pointer',
      )}
      onClick={onClick}
      onError={handleError}
    />
  );
};

const badgeStyles: Record<BadgeType, { icon: ReactElement; color: string }> = {
  'First Match': { icon: <Award className="h-3 w-3" />, color: 'bg-blue-500/20 text-blue-300' },
  '5-Win Streak': { icon: <Trophy className="h-3 w-3" />, color: 'bg-yellow-500/20 text-yellow-300' },
  'Weekly Activity King': { icon: <Star className="h-3 w-3" />, color: 'bg-green-500/20 text-green-300' },
  Mentor: { icon: <BookOpen className="h-3 w-3" />, color: 'bg-purple-500/20 text-purple-300' },
  'Community Contributor': { icon: <Users className="h-3 w-3" />, color: 'bg-indigo-500/20 text-indigo-300' },
};

interface BadgeProps {
  type: BadgeType;
}

export const Badge: FC<BadgeProps> = ({ type }) => {
  const style = badgeStyles[type];

  return (
    <div className={cn('flex h-16 w-16 items-center justify-center rounded-full', style.color)}>
      <div className="text-center">
        {cloneElement(style.icon, { className: 'mx-auto h-6 w-6' })}
        <p className="mt-1 whitespace-pre-line text-[10px] leading-tight">{type.replace(' ', '\n')}</p>
      </div>
    </div>
  );
};
