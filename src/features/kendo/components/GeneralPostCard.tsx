import type { FC } from 'react';
import { MessageSquare, Share2, ThumbsUp, Video } from 'lucide-react';

import type { AnonymousPost, CommunityPost } from '@/types/kendo';
import { Card, UserAvatar } from './layout';

type GeneralPost = CommunityPost | AnonymousPost;

interface GeneralPostCardProps {
  post: GeneralPost;
}

const isCommunityPost = (post: GeneralPost): post is CommunityPost => 'type' in post;

export const GeneralPostCard: FC<GeneralPostCardProps> = ({ post }) => {
  const { author, title, content, likes, comments, timestamp } = post;
  const isVideoPost = isCommunityPost(post) && post.type === 'video';

  const postTypeBadge = isCommunityPost(post)
    ? {
        label: post.type === 'review' ? '경기 후기' : '영상 공유',
        className:
          post.type === 'review'
            ? 'bg-green-500/20 text-green-300'
            : 'bg-red-500/20 text-red-300',
      }
    : null;

  const showDojang = 'dojang' in author;

  return (
    <Card>
      <div className="mb-3 flex items-center gap-3">
        <UserAvatar user={author} size="sm" />
        <div>
          <p className="font-semibold">{author.name}</p>
          {showDojang ? (
            <p className="text-xs text-slate-400">{author.dojang} · {timestamp}</p>
          ) : (
            <p className="text-xs text-slate-400">{timestamp}</p>
          )}
        </div>
        {postTypeBadge && (
          <div className={`ml-auto rounded-full px-2 py-1 text-xs font-medium ${postTypeBadge.className}`}>
            {postTypeBadge.label}
          </div>
        )}
      </div>
      <h3 className="mb-1 font-semibold text-slate-200">{title}</h3>
      <p className="mb-4 line-clamp-3 text-sm text-slate-400">{content}</p>
      {isVideoPost && (
        <div className="flex aspect-video items-center justify-center rounded-lg bg-slate-900">
          <Video className="h-12 w-12 text-white/50" />
        </div>
      )}
      <div className="mt-4 flex items-center gap-4 border-t border-slate-700 pt-4 text-slate-400">
        <button
          type="button"
          className="flex items-center gap-1.5 transition-colors hover:text-blue-400"
        >
          <ThumbsUp className="h-4 w-4" />
          <span className="text-sm font-medium">{likes}</span>
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 transition-colors hover:text-blue-400"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm font-medium">{comments}</span>
        </button>
        <button
          type="button"
          className="ml-auto flex items-center gap-1.5 transition-colors hover:text-blue-400"
        >
          <Share2 className="h-4 w-4" />
          <span className="text-sm font-medium">공유</span>
        </button>
      </div>
    </Card>
  );
};
