import React from 'react';
import { Store, X, Heart, MessageSquare, CheckSquare, Square } from 'lucide-react';
import dojoImage from '../../assets/dojo_1.png';
import { miniDojoComments, miniDojoItems, mockUsers } from '../../data/mockData';
import { UserAvatar } from '../../components/ui/UserAvatar';
import { KendoUser } from '../../types';

interface MiniDojoModalProps {
    onClose: () => void;
}

const ShopModal = ({ onClose }: { onClose: () => void }) => {
    // ... (ShopModal logic if needed, but it seems to be a separate component in the original file, let's check)
    // Actually, there is a ShopModal and a MiniDojoShopModal.
    // Let's implement MiniDojoShopModal here as it is related to MiniDojo.
    return null; // Placeholder if not used directly here, but MiniDojoModal uses ShopModal?
    // Wait, MiniDojoModal uses ShopModal (line 1003) and MiniDojoShopModal (line 1108).
    // Let's define them here or import them.
    // The original code has ShopModal (lines 847-876) and MiniDojoShopModal (lines 1008-1052).
    // ShopModal seems to be for general shop, MiniDojoShopModal for mini dojo items.
    // Let's put MiniDojoShopModal here.
};

export const MiniDojoShopModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-md border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold">미니도장 쇼핑</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto space-y-3">
                    <div className="mb-4 p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Store className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-semibold text-blue-300">미니도장 꼬미기</span>
                        </div>
                        <div className="text-xs text-slate-300">
                            나만의 소중한 미니도장을 꿔며보세요! 다양한 아이템으로 꾸미기가 가능합니다.
                        </div>
                    </div>
                    {miniDojoItems.map(item => (
                        <div key={item.id} className="bg-slate-700/50 p-3 rounded-lg flex gap-3">
                            <img src={item.imageUrl} alt={item.name} className="w-16 h-12 rounded object-cover bg-slate-600" />
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                                <p className="text-xs text-slate-300 mt-1">{item.description}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm font-bold text-yellow-400">{item.points.toLocaleString()}P</span>
                                    <button
                                        onClick={() => alert(`${item.name} 구매 완료!`)}
                                        className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md transition-colors"
                                    >
                                        구매
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 flex-shrink-0 border-t border-slate-700 text-center">
                    <div className="text-xs text-slate-400">
                        현재 보유 포인트: <span className="text-yellow-400 font-bold">15,430P</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const MiniDojoModal: React.FC<MiniDojoModalProps> = ({ onClose }) => {
    const [comments, setComments] = React.useState(miniDojoComments);
    const [newComment, setNewComment] = React.useState('');
    const [replyTo, setReplyTo] = React.useState<number | null>(null);
    const [newReply, setNewReply] = React.useState('');
    const [showShop, setShowShop] = React.useState(false);

    const addComment = () => {
        if (!newComment.trim()) return;
        const comment = {
            id: Date.now(),
            author: '익명',
            text: newComment,
            timestamp: '방금 전',
            replies: []
        };
        setComments([comment, ...comments]);
        setNewComment('');
    };

    const addReply = (commentId: number) => {
        if (!newReply.trim()) return;
        const reply = {
            id: Date.now(),
            author: '익명',
            text: newReply,
            timestamp: '방금 전'
        };
        setComments(comments.map(comment =>
            comment.id === commentId
                ? { ...comment, replies: [...comment.replies, reply] }
                : comment
        ));
        setNewReply('');
        setReplyTo(null);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <div className="bg-slate-800 rounded-2xl w-full max-w-md border border-slate-700 text-white flex flex-col max-h-[90vh]">
                    <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                        <h2 className="text-lg font-bold">미니도장</h2>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setShowShop(true)} className="p-2 text-slate-400 hover:text-white">
                                <Store size={20} />
                            </button>
                            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                        </div>
                    </div>

                    <div className="p-4 border-b border-slate-700">
                        <img src={dojoImage} alt="미니도장" className="w-full h-48 object-contain rounded-lg bg-slate-700/30" />
                        <div className="flex items-center gap-4 mt-3 text-sm text-slate-400">
                            <div className="flex items-center gap-1">
                                <Heart size={16} className="text-red-400" />
                                <span>2.5k</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageSquare size={16} className="text-blue-400" />
                                <span>{comments.reduce((total, c) => total + 1 + c.replies.length, 0)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {comments.map(comment => (
                            <div key={comment.id} className="space-y-2">
                                <div className="bg-slate-700/50 p-3 rounded-lg">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-semibold text-blue-400">{comment.author}</span>
                                        <span className="text-xs text-slate-400">{comment.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-slate-200">{comment.text}</p>
                                    <button
                                        onClick={() => setReplyTo(comment.id)}
                                        className="text-xs text-slate-400 hover:text-blue-400 mt-2"
                                    >
                                        답글
                                    </button>
                                </div>

                                {comment.replies.map(reply => (
                                    <div key={reply.id} className="ml-6 bg-slate-600/50 p-3 rounded-lg">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-semibold text-blue-400">{reply.author}</span>
                                            <span className="text-xs text-slate-400">{reply.timestamp}</span>
                                        </div>
                                        <p className="text-sm text-slate-200">{reply.text}</p>
                                    </div>
                                ))}

                                {replyTo === comment.id && (
                                    <div className="ml-6 flex gap-2">
                                        <input
                                            value={newReply}
                                            onChange={(e) => setNewReply(e.target.value)}
                                            placeholder="답글을 입력하세요..."
                                            className="flex-1 bg-slate-600 text-white px-3 py-2 rounded-lg text-sm"
                                            onKeyPress={(e) => e.key === 'Enter' && addReply(comment.id)}
                                        />
                                        <button onClick={() => addReply(comment.id)} className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm">
                                            전송
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-slate-700 flex gap-2">
                        <input
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="댓글을 입력하세요..."
                            className="flex-1 bg-slate-700 text-white px-3 py-2 rounded-lg text-sm"
                            onKeyPress={(e) => e.key === 'Enter' && addComment()}
                        />
                        <button onClick={addComment} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
                            전송
                        </button>
                    </div>
                </div>
            </div>
            {showShop && <MiniDojoShopModal onClose={() => setShowShop(false)} />}
        </>
    );
};

const DetailViewModal = ({ type, onClose }: { type: 'comments' | 'likes'; onClose: () => void }) => {
    const title = type === 'comments' ? '댓글' : '좋아요';
    const mockData = type === 'comments'
        ? ["완전 싸이월드구만!", "도토리로 도북, 죽도사는건가요 ㅋㅋ", "도장바닥 얼마에 까셨나요?ㅋㅋ", "도복 디자인 넘 좋은데요", "도복이 멋지네요!"]
        : mockUsers.slice(0, 4).map(u => u.name);

    return (
        <div className="absolute inset-0 bg-slate-800/90 backdrop-blur-sm z-30 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold">{title}</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto">
                {type === 'comments' ? (
                    <div className="space-y-2">
                        {mockData.map((comment, i) => <p key={i} className="text-sm bg-slate-700 p-2 rounded-lg"><span className="font-semibold text-blue-400">익명:</span> {comment}</p>)}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {mockData.map((name, i) => (
                            <div key={i} className="flex items-center gap-3 bg-slate-700 p-2 rounded-lg">
                                <UserAvatar user={mockUsers.find(u => u.name === name) || { name }} size="sm" />
                                <p className="font-semibold">{name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export const AvatarSpaceModal = ({ user, onClose }: { user: KendoUser; onClose: () => void }) => {
    const [isPublic, setIsPublic] = React.useState(true);
    const [detailView, setDetailView] = React.useState<'comments' | 'likes' | null>(null);
    const [showShop, setShowShop] = React.useState(false);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white relative p-4 flex flex-col max-h-[90vh] overflow-hidden">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white z-40 bg-slate-800/50 rounded-full">
                    <X size={20} />
                </button>
                <div className="w-full aspect-video bg-slate-700 rounded-lg relative overflow-hidden">
                    <img src={dojoImage} alt="미니도장" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 flex items-center gap-3 bg-black/30 p-1.5 rounded-lg">
                        <button onClick={() => setDetailView('comments')} className="flex items-center gap-1 text-xs text-white hover:text-blue-300">
                            <MessageSquare size={14} /> 1.2k
                        </button>
                        <button onClick={() => setDetailView('likes')} className="flex items-center gap-1 text-xs text-white hover:text-red-300">
                            <Heart size={14} /> 2.5k
                        </button>
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto pt-4">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-lg">{user.name}의 공간</h3>
                        <button onClick={() => setIsPublic(!isPublic)} className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-slate-700">
                            {isPublic ? <><CheckSquare size={16} className="text-green-400" /> 공개</> : <><Square size={16} className="text-slate-400" /> 비공개</>}
                        </button>
                    </div>
                    {/* 쇼핑 배너 */}
                    <div className="mb-4 p-3 bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-lg cursor-pointer hover:from-orange-600/30 hover:to-red-600/30 transition-colors" onClick={() => setShowShop(true)}>
                        <div className="flex items-center gap-2 mb-2">
                            <Store className="w-4 h-4 text-orange-400" />
                            <span className="text-sm font-semibold text-orange-300">미니도장 쇼핑몰</span>
                            <div className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">NEW</div>
                        </div>
                        <div className="text-xs text-slate-300">
                            나만의 미니도장을 꿔라보세요! 죽도, 도복, 호구부터 인테리어까지!
                        </div>
                        <div className="text-xs text-orange-400 font-semibold mt-1">
                            클릭해서 둥러보기 ▶
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm bg-slate-700 p-3 rounded-lg"><span className="font-semibold text-blue-400">익명:</span> 완전싸이월드네요!</p>
                        <p className="text-sm bg-slate-700 p-3 rounded-lg"><span className="font-semibold text-blue-400">익명:</span> 도토리로 사는건가요??ㅋㅋ.</p>
                        <p className="text-sm bg-slate-700 p-3 rounded-lg"><span className="font-semibold text-blue-400">익명:</span> 도복이 멋지네요! 얼마에구입하셨나요?</p>
                        <p className="text-sm bg-slate-700 p-3 rounded-lg"><span className="font-semibold text-blue-400">익명:</span> 미니도장 너무 귀여워요! 어디서 꾸미는 거예요?</p>
                        <p className="text-sm bg-slate-700 p-3 rounded-lg"><span className="font-semibold text-blue-400">익명:</span> 저도 미니도장 만들고 싶어요~</p>
                    </div>
                </div>
                {detailView && <DetailViewModal type={detailView} onClose={() => setDetailView(null)} />}
                {showShop && <MiniDojoShopModal onClose={() => setShowShop(false)} />}
            </div>
        </div>
    );
};
