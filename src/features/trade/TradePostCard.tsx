import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { Card } from '../../components/ui/Card';
import { TradePost } from '../../types';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TradePostCardProps {
    post: TradePost;
}

export const TradePostCard: React.FC<TradePostCardProps> = ({ post }) => {
    const statusStyle = {
        '판매중': 'bg-green-500/20 text-green-300',
        '예약중': 'bg-yellow-500/20 text-yellow-300',
        '판매완료': 'bg-slate-600/50 text-slate-400',
    };
    return (
        <Card className="flex gap-4">
            <img src={post.imageUrl} alt={post.itemName} className="w-24 h-24 rounded-lg object-cover bg-slate-700" />
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                    <p className="font-semibold text-slate-200">{post.itemName}</p>
                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold', statusStyle[post.status])}>{post.status}</span>
                </div>
                <p className="text-sm text-slate-400 mt-1 line-clamp-2">{post.description}</p>
                <div className="flex justify-between items-end mt-auto">
                    <p className="text-lg font-bold text-blue-400">{post.price}</p>
                    <p className="text-xs text-slate-500">{post.author.name} · {post.timestamp}</p>
                </div>
            </div>
        </Card>
    );
};
