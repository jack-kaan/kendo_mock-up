import React from 'react';
import { Award, BookOpen, Star, Trophy, Users } from 'lucide-react';
import { KendoUser, BadgeType } from '../../../types/kendo';
import { cn } from '../../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => (
  <div
    className={cn(
      'bg-slate-800/50 border border-slate-700 rounded-xl p-4 shadow-lg',
      onClick && 'cursor-pointer transition-colors hover:bg-slate-700/80',
      className,
    )}
    onClick={onClick}
  >
    {children}
  </div>
);

interface UserAvatarProps {
  user: KendoUser | { name: string; avatarUrl?: string } | undefined;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'md', onClick }) => {
  const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };
  const defaultAvatar = user?.name === '익명'
    ? 'https://placehold.co/100x100/475569/94a3b8?text=익명'
    : 'https://placehold.co/100x100/1e293b/94a3b8?text=??';

  return (
    <img
      src={user?.avatarUrl || defaultAvatar}
      alt={user?.name || 'User Avatar'}
      className={cn(
        'bg-slate-700 border-2 border-slate-600 rounded-full flex-shrink-0 object-cover',
        sizeClasses[size],
        onClick && 'cursor-pointer',
      )}
      onClick={onClick}
      onError={(event) => {
        const target = event.currentTarget;
        target.onerror = null;
        target.src = defaultAvatar;
      }}
    />
  );
};

const badgeStyles: Record<BadgeType, { icon: React.ReactElement; color: string }> = {
  'First Match': { icon: <Award className="w-3 h-3" />, color: 'bg-blue-500/20 text-blue-300' },
  '5-Win Streak': { icon: <Trophy className="w-3 h-3" />, color: 'bg-yellow-500/20 text-yellow-300' },
  'Weekly Activity King': { icon: <Star className="w-3 h-3" />, color: 'bg-green-500/20 text-green-300' },
  Mentor: { icon: <BookOpen className="w-3 h-3" />, color: 'bg-purple-500/20 text-purple-300' },
  'Community Contributor': { icon: <Users className="w-3 h-3" />, color: 'bg-indigo-500/20 text-indigo-300' },
};

interface BadgeProps {
  type: BadgeType;
}

export const Badge: React.FC<BadgeProps> = ({ type }) => {
  const style = badgeStyles[type];

  return (
    <div className={cn('flex items-center justify-center w-16 h-16 rounded-full', style.color)}>
      <div className="text-center">
        {React.cloneElement(style.icon, { className: 'w-6 h-6 mx-auto' })}
        <p className="text-[10px] mt-1 leading-tight">{type.replace(' ', '\n')}</p>
      </div>
    </div>
  );
};
