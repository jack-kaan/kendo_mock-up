import type { FC } from 'react';
import { X } from 'lucide-react';

import type { KendoUser, MiniDojoComment } from '@/types/kendo';
import { UserAvatar } from './layout';

type DetailViewType = 'comments' | 'likes';

interface DetailViewModalProps {
  type: DetailViewType;
  comments: MiniDojoComment[];
  likes: KendoUser[];
  onClose: () => void;
}

export const DetailViewModal: FC<DetailViewModalProps> = ({ type, comments, likes, onClose }) => {
  const title = type === 'comments' ? '댓글' : '좋아요';
  const hasData = type === 'comments' ? comments.length > 0 : likes.length > 0;

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-slate-800/90 backdrop-blur-sm">
      <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-700 p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-slate-400 transition-colors hover:text-white"
        >
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {!hasData && (
          <p className="rounded-lg bg-slate-700/50 p-3 text-sm text-slate-300">표시할 항목이 없습니다.</p>
        )}
        {type === 'comments' && comments.length > 0 && (
          <div className="space-y-2">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-lg bg-slate-700 p-2 text-sm text-slate-200">
                <span className="font-semibold text-blue-400">{comment.author}:</span>{' '}
                <span>{comment.text}</span>
              </div>
            ))}
          </div>
        )}
        {type === 'likes' && likes.length > 0 && (
          <div className="space-y-2">
            {likes.map((user) => (
              <div key={user.id} className="flex items-center gap-3 rounded-lg bg-slate-700 p-2">
                <UserAvatar user={user} size="sm" />
                <p className="font-semibold text-slate-200">{user.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
