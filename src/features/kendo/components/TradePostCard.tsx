import type { FC } from 'react';

import type { TradePost } from '@/types/kendo';
import { cn } from '@/lib/cn';
import { Card } from './layout';

interface TradePostCardProps {
  post: TradePost;
}

const statusStyles: Record<TradePost['status'], string> = {
  판매중: 'bg-green-500/20 text-green-300',
  예약중: 'bg-yellow-500/20 text-yellow-300',
  판매완료: 'bg-slate-600/50 text-slate-400',
};

export const TradePostCard: FC<TradePostCardProps> = ({ post }) => {
  return (
    <Card className="flex gap-4">
      <img
        src={post.imageUrl}
        alt={post.itemName}
        className="h-24 w-24 rounded-lg bg-slate-700 object-cover"
      />
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <p className="font-semibold text-slate-200">{post.itemName}</p>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-xs font-semibold',
              statusStyles[post.status],
            )}
          >
            {post.status}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-slate-400">{post.description}</p>
        <div className="mt-auto flex items-end justify-between">
          <p className="text-lg font-bold text-blue-400">{post.price}</p>
          <div className="text-right text-xs text-slate-500">
            <p>{post.author.name}</p>
            <p>{post.timestamp}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
