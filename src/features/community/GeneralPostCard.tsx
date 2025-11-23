import React from 'react';
import { Video, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { UserAvatar } from '../../components/ui/UserAvatar';
import { CommunityPost, AnonymousPost } from '../../types';

interface GeneralPostCardProps {
    post: CommunityPost | AnonymousPost;
}

export const GeneralPostCard: React.FC<GeneralPostCardProps> = ({ post }) => (
    <Card>
        <div className="flex items-center gap-3 mb-3">
            <UserAvatar user={post.author} size="sm" />
            <div>
                <p className="font-semibold">{post.author.name}</p>
                {'dojang' in post.author && <p className="text-xs text-slate-400">{post.author.dojang} · {post.timestamp}</p>}
                {post.author.name === '익명' && <p className="text-xs text-slate-400">{post.timestamp}</p>}
            </div>
            {'type' in post && <div className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${post.type === 'review' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {post.type === 'review' ? '경기 후기' : '영상 공유'}
            </div>}
        </div>
        <h3 className="font-semibold text-slate-200 mb-1">{post.title}</h3>
        <p className="text-sm text-slate-400 mb-4 line-clamp-3">{post.content}</p>
        {'type' in post && post.type === 'video' && <div className="bg-slate-900 aspect-video rounded-lg flex items-center justify-center"><Video className="w-12 h-12 text-white/50" /></div>}
        <div className="flex items-center gap-4 text-slate-400 pt-4 border-t border-slate-700 mt-4">
            <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"><ThumbsUp className="w-4 h-4" /> <span className="text-sm font-medium">{post.likes}</span></button>
            <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"><MessageSquare className="w-4 h-4" /> <span className="text-sm font-medium">{post.comments}</span></button>
            <button className="flex items-center gap-1.5 ml-auto hover:text-blue-400 transition-colors"><Share2 className="w-4 h-4" /> <span className="text-sm font-medium">공유</span></button>
        </div>
    </Card>
);
