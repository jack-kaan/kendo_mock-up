import React from 'react';
import { Award, Trophy, Star, BookOpen, Users } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { BadgeType } from '../../types';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface BadgeProps {
    type: BadgeType;
}

export const Badge: React.FC<BadgeProps> = ({ type }) => {
    const badgeStyles: Record<string, { icon: React.ReactElement; color: string }> = {
        'First Match': { icon: <Award className="w-3 h-3" />, color: 'bg-blue-500/20 text-blue-300' },
        '5-Win Streak': { icon: <Trophy className="w-3 h-3" />, color: 'bg-yellow-500/20 text-yellow-300' },
        'Weekly Activity King': { icon: <Star className="w-3 h-3" />, color: 'bg-green-500/20 text-green-300' },
        'Mentor': { icon: <BookOpen className="w-3 h-3" />, color: 'bg-purple-500/20 text-purple-300' },
        'Community Contributor': { icon: <Users className="w-3 h-3" />, color: 'bg-indigo-500/20 text-indigo-300' },
    };
    const style = badgeStyles[type];

    if (!style) return null;

    return (
        <div className={cn('flex items-center justify-center w-16 h-16 rounded-full', style.color)}>
            <div className="text-center">
                {React.cloneElement(style.icon, { className: "w-6 h-6 mx-auto" })}
                <p className="text-[10px] mt-1 leading-tight">{type.replace(' ', '\n')}</p>
            </div>
        </div>
    );
};
