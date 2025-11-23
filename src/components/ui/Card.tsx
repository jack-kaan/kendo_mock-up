import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => (
    <div className={cn('bg-slate-800/50 border border-slate-700 rounded-xl p-4 shadow-lg', onClick && 'cursor-pointer transition-colors hover:bg-slate-700/80', className)} onClick={onClick}>
        {children}
    </div>
);
