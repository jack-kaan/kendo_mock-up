import React from 'react';
import {
  ArrowDown,
  ArrowUp,
  Award,
  BarChart2,
  BarChart as BarChartIcon,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Edit3,
  FileText,
  FileUp,
  Flame,
  Gift,
  Heart,
  Info,
  Lock,
  MapPin,
  Megaphone,
  MessageSquare,
  Plane,
  Send,
  Settings,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  Square,
  Star,
  Store,
  Swords,
  Tag,
  ThumbsDown,
  ThumbsUp,
  Trophy,
  Unlock,
  User as UserIcon,
  Users,
  Video,
  X,
} from 'lucide-react';
import dojoImage from '../../assets/dojo_1.png';

import { cn } from '../../utils/cn';
import { callGemini } from '../../utils/gemini';
import { calculateDistanceKm } from '../../data/kendo/locations';
import {
  currentUser,
  mockUsers,
  allUsers,
  allRankings,
} from '../../data/kendo/users';
import {
  mockMatchHistory,
  sparringCandidatesList,
} from '../../data/kendo/matches';
import {
  initialQuestList,
  QUEST_COMPLETION_BONUS,
} from '../../data/kendo/quests';
import {
  gifticonItems,
  shopItems,
  miniDojoComments,
  miniDojoItems,
} from '../../data/kendo/store';
import { mockGoals } from '../../data/kendo/goals';
import { mockPointHistory } from '../../data/kendo/points';
import { kendoTheoryData, testScoreHistory } from '../../data/kendo/exams';
import { mockNotifications } from '../../data/kendo/notifications';
import {
  communityPosts,
  anonymousPosts,
  tradePosts,
  mockChats,
} from '../../data/kendo/community';
import {
  danPromotions,
  seminars,
  promoItems,
  japanTravelPackages,
} from '../../data/kendo/travel';
import { Card, UserAvatar, Badge } from './components/layout';
import {
  RadarChart,
  PieChart,
  StatDistributionGraph,
  StackedBarChart,
} from './components/charts';

// --- DATA HELPERS ---

const DetailedStatsCard = ({ stats }) => {
    const { scoringBreakdown, homeAway, vsHigherRank, interestingStats } = stats;
    const [expandedStat, setExpandedStat] = React.useState(null);

    const parseRecord = (recordStr) => {
        const winMatch = recordStr.match(/(\d+)승/);
        const lossMatch = recordStr.match(/(\d+)패/);
        return {
            wins: winMatch ? parseInt(winMatch[1], 10) : 0,
            losses: lossMatch ? parseInt(lossMatch[1], 10) : 0
        };
    };

    const homeRecord = parseRecord(homeAway.home);
    const awayRecord = parseRecord(homeAway.away);
    
    const homePieData = [{ label: '승', value: homeRecord.wins, color: '#4ade80' }, { label: '패', value: homeRecord.losses, color: '#f87171' }];
    const awayPieData = [{ label: '승', value: awayRecord.wins, color: '#4ade80' }, { label: '패', value: awayRecord.losses, color: '#f87171' }];

    const vsHigherRankData = [
        { label: '승', value: vsHigherRank.wins, color: '#4ade80' },
        { label: '패', value: vsHigherRank.losses, color: '#f87171' },
        { label: '무', value: vsHigherRank.draws, color: '#94a3b8' },
    ];

    return (
        <Card className="border-blue-500/50">
            <h3 className="font-semibold text-lg flex items-center mb-4"><BarChart2 className="w-5 h-5 mr-2 text-blue-400"/>분석 결과</h3>
            <div className="space-y-6">
                <div>
                    <h4 className="font-semibold text-slate-300 mb-2">득점 부위 분석</h4>
                    <div className="flex justify-center items-center bg-slate-900/50 p-2 rounded-lg">
                        <RadarChart data={scoringBreakdown} size={220} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <h4 className="font-semibold text-slate-300 mb-2">홈 성적</h4>
                        <div className="flex justify-center mb-2">
                           <PieChart data={homePieData} />
                        </div>
                        <p className="text-sm"><span className="text-green-400">{homeRecord.wins}승</span> / <span className="text-red-400">{homeRecord.losses}패</span></p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-300 mb-2">어웨이 성적</h4>
                         <div className="flex justify-center mb-2">
                           <PieChart data={awayPieData} />
                        </div>
                        <p className="text-sm"><span className="text-green-400">{awayRecord.wins}승</span> / <span className="text-red-400">{awayRecord.losses}패</span></p>
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold text-slate-300 mb-2">고단자 상대 통계</h4>
                    <div className="bg-slate-700/50 p-3 rounded-lg">
                        <StackedBarChart data={vsHigherRankData} />
                        <div className="flex justify-around text-xs mt-2">
                            <span className="font-bold text-green-400">{vsHigherRank.wins}승</span>
                            <span className="font-bold text-red-400">{vsHigherRank.losses}패</span>
                            <span className="font-bold text-slate-400">{vsHigherRank.draws}무</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-300 mb-2">흥미로운 기록</h4>
                     <div className="space-y-1 text-sm bg-slate-800 p-2 rounded-lg">
                        {interestingStats.map(stat => (
                            <div key={stat.label} className="border-b border-slate-700/50 last:border-b-0 py-2">
                                <div 
                                    className="flex justify-between items-center cursor-pointer" 
                                    onClick={() => setExpandedStat(expandedStat === stat.label ? null : stat.label)}
                                >
                                    <span className="text-slate-400">{stat.label}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">{stat.value}</span>
                                        <ChevronDown className={cn("transition-transform", expandedStat === stat.label && "rotate-180")} size={16}/>
                                    </div>
                                </div>
                                {expandedStat === stat.label && (
                                    <StatDistributionGraph />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
};

const GeneralPostCard = ({post}) => (
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
        {'type' in post && post.type === 'video' && <div className="bg-slate-900 aspect-video rounded-lg flex items-center justify-center"><Video className="w-12 h-12 text-white/50"/></div>}
        <div className="flex items-center gap-4 text-slate-400 pt-4 border-t border-slate-700 mt-4">
            <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"><ThumbsUp className="w-4 h-4" /> <span className="text-sm font-medium">{post.likes}</span></button>
            <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"><MessageSquare className="w-4 h-4" /> <span className="text-sm font-medium">{post.comments}</span></button>
            <button className="flex items-center gap-1.5 ml-auto hover:text-blue-400 transition-colors"><Share2 className="w-4 h-4" /> <span className="text-sm font-medium">공유</span></button>
        </div>
    </Card>
);

const TradePostCard = ({post}) => {
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

const AvatarIconSVG = () => (
    <svg width="80" height="80" viewBox="0 0 28 28" shapeRendering="crispEdges" className="bg-slate-700 p-1 rounded-lg">
        <rect x="9" y="4" width="2" height="1" fill="#272727"/> <rect x="11" y="4" width="6" height="1" fill="#363636"/> <rect x="17" y="4" width="2" height="1" fill="#272727"/>
        <rect x="7" y="5" width="2" height="1" fill="#272727"/> <rect x="9" y="5" width="2" height="1" fill="#363636"/> <rect x="11" y="5" width="6" height="1" fill="#4e4e4e"/> <rect x="17" y="5" width="2" height="1" fill="#363636"/> <rect x="19" y="5" width="2" height="1" fill="#272727"/>
        <rect x="6" y="6" width="1" height="1" fill="#272727"/> <rect x="7" y="6" width="2" height="1" fill="#363636"/> <rect x="9" y="6" width="10" height="1" fill="#4e4e4e"/> <rect x="19" y="6" width="2" height="1" fill="#363636"/> <rect x="21" y="6" width="1" height="1" fill="#272727"/>
        <rect x="5" y="7" width="1" height="1" fill="#272727"/> <rect x="6" y="7" width="1" height="1" fill="#363636"/> <rect x="7" y="7" width="14" height="1" fill="#4e4e4e"/> <rect x="21" y="7" width="1" height="1" fill="#363636"/> <rect x="22" y="7" width="1" height="1" fill="#272727"/>
        <rect x="5" y="8" width="1" height="1" fill="#363636"/> <rect x="6" y="8" width="16" height="1" fill="#4e4e4e"/> <rect x="22" y="8" width="1" height="1" fill="#363636"/>
        <rect x="5" y="9" width="1" height="1" fill="#363636"/> <rect x="6" y="9" width="16" height="1" fill="#4e4e4e"/> <rect x="22" y="9" width="1" height="1" fill="#363636"/>
        <rect x="5" y="10" width="1" height="1" fill="#363636"/> <rect x="6" y="10" width="16" height="1" fill="#4e4e4e"/> <rect x="22" y="10" width="1" height="1" fill="#363636"/>
        <rect x="6" y="11" width="16" height="1" fill="#4e4e4e"/>
        <rect x="6" y="12" width="1" height="1" fill="#4e4e4e"/> <rect x="7" y="12" width="2" height="1" fill="#c1c1c1"/> <rect x="9" y="12" width="10" height="1" fill="#4e4e4e"/> <rect x="19" y="12" width="2" height="1" fill="#c1c1c1"/> <rect x="21" y="12" width="1" height="1" fill="#4e4e4e"/>
        <rect x="7" y="13" width="2" height="1" fill="#c1c1c1"/> <rect x="9" y="13" width="1" height="1" fill="#4e4e4e"/> <rect x="10" y="13" width="3" height="1" fill="#f1d3b4"/> <rect x="13" y="13" width="2" height="1" fill="#4e4e4e"/> <rect x="15" y="13" width="3" height="1" fill="#f1d3b4"/> <rect x="18" y="13" width="1" height="1" fill="#4e4e4e"/> <rect x="19" y="13" width="2" height="1" fill="#c1c1c1"/>
        <rect x="7" y="14" width="1" height="1" fill="#c1c1c1"/> <rect x="8" y="14" width="1" height="1" fill="#4e4e4e"/> <rect x="9" y="14" width="1" height="1" fill="#f1d3b4"/> <rect x="10" y="14" width="1" height="1" fill="#4e4e4e"/> <rect x="11" y="14" width="6" height="1" fill="#f1d3b4"/> <rect x="17" y="14" width="1" height="1" fill="#4e4e4e"/> <rect x="18" y="14" width="1" height="1" fill="#f1d3b4"/> <rect x="19" y="14" width="1" height="1" fill="#4e4e4e"/> <rect x="20" y="14" width="1" height="1" fill="#c1c1c1"/>
        <rect x="7" y="15" width="1" height="1" fill="#c1c1c1"/> <rect x="8" y="15" width="1" height="1" fill="#4e4e4e"/> <rect x="9" y="15" width="10" height="1" fill="#f1d3b4"/> <rect x="19" y="15" width="1" height="1" fill="#4e4e4e"/> <rect x="20" y="15" width="1" height="1" fill="#c1c1c1"/>
        <rect x="8" y="16" width="1" height="1" fill="#4e4e4e"/> <rect x="9" y="16" width="10" height="1" fill="#e2c1a0"/> <rect x="19" y="16" width="1" height="1" fill="#4e4e4e"/>
        <rect x="8" y="17" width="1" height="1" fill="#4e4e4e"/> <rect x="9" y="17" width="2" height="1" fill="#e2c1a0"/> <rect x="11" y="17" width="1" height="1" fill="#4e4e4e"/> <rect x="12" y="17" width="4" height="1" fill="#e2c1a0"/> <rect x="16" y="17" width="1" height="1" fill="#4e4e4e"/> <rect x="17" y="17" width="2" height="1" fill="#e2c1a0"/> <rect x="19" y="17" width="1" height="1" fill="#4e4e4e"/>
        <rect x="9" y="18" width="1" height="1" fill="#4e4e4e"/> <rect x="10" y="18" width="8" height="1" fill="#e2c1a0"/> <rect x="18" y="18" width="1" height="1" fill="#4e4e4e"/>
        <rect x="9" y="19" width="1" height="1" fill="#4e4e4e"/> <rect x="10" y="19" width="2" height="1" fill="#e2c1a0"/> <rect x="12" y="19" width="4" height="1" fill="#c1c1c1"/> <rect x="16" y="19" width="2" height="1" fill="#e2c1a0"/> <rect x="18" y="19" width="1" height="1" fill="#4e4e4e"/>
        <rect x="10" y="20" width="1" height="1" fill="#4e4e4e"/> <rect x="11" y="20" width="6" height="1" fill="#c1c1c1"/> <rect x="17" y="20" width="1" height="1" fill="#4e4e4e"/>
        <rect x="11" y="21" width="6" height="1" fill="#4e4e4e"/>
    </svg>
);

const AvatarDojoSVG = () => (
    <svg width="100%" height="100%" viewBox="0 0 160 120" className="absolute inset-0">
        <defs>
            <pattern id="tatami" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(0)">
                <rect width="8" height="8" fill="#92400e"/>
                <rect x="0" y="0" width="8" height="1" fill="#451a03"/>
                <rect x="0" y="7" width="8" height="1" fill="#451a03"/>
                <rect x="0" y="0" width="1" height="8" fill="#451a03"/>
                <rect x="7" y="0" width="1" height="8" fill="#451a03"/>
            </pattern>
            <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc"/>
                <stop offset="100%" stopColor="#e2e8f0"/>
            </linearGradient>
        </defs>
        <rect width="160" height="60" fill="url(#wallGrad)" />
        <rect y="60" width="160" height="60" fill="url(#tatami)" />
        
        <g transform="translate(10, 45)">
            <rect x="0" y="0" width="25" height="8" fill="#7c2d12" rx="1"/>
            <rect x="2" y="-3" width="2" height="11" fill="#a16207" />
            <rect x="6" y="-3" width="2" height="11" fill="#a16207" />
            <rect x="10" y="-3" width="2" height="11" fill="#a16207" />
            <rect x="14" y="-3" width="2" height="11" fill="#a16207" />
            <rect x="18" y="-3" width="2" height="11" fill="#a16207" />
            <rect x="21" y="-3" width="2" height="11" fill="#a16207" />
        </g>
        
        <g transform="translate(125, 40)">
            <rect x="0" y="0" width="30" height="25" fill="#1e293b" rx="2"/>
            <circle cx="8" cy="8" r="6" fill="#f1f5f9" stroke="#374151" strokeWidth="1"/>
            <rect x="5" y="5" width="6" height="3" fill="#374151"/>
            <rect x="18" y="6" r="4" width="8" height="12" fill="#f59e0b" rx="2"/>
        </g>
        
        <g transform="translate(60, 15)">
            <rect x="0" y="0" width="40" height="25" fill="#fef3c7" stroke="#92400e" strokeWidth="2" rx="2"/>
            <text x="20" y="15" textAnchor="middle" fontSize="8" fill="#92400e" fontFamily="serif">검도의 도</text>
        </g>
        
        <g transform="translate(40, 50)">
            <rect x="0" y="0" width="20" height="15" fill="#eab308" rx="2"/>
            <circle cx="10" cy="5" r="3" fill="#f59e0b"/>
            <rect x="8" y="8" width="4" height="7" fill="#a16207"/>
        </g>
        
        <g transform="translate(75, 75)">
            <rect x="0" y="0" width="12" height="25" fill="#1e293b" rx="6"/>
            <circle cx="6" cy="-5" r="6" fill="#f3e8ff"/>
            <rect x="12" y="8" width="20" height="2" fill="#a16207" rx="1"/>
            <g className="animate-pulse">
                <circle cx="32" cy="9" r="2" fill="#fbbf24" opacity="0.7"/>
                <circle cx="35" cy="7" r="1" fill="#f59e0b" opacity="0.5"/>
            </g>
        </g>
        <ellipse cx="80" cy="105" rx="15" ry="3" fill="#78350f" opacity="0.3"/>
    </svg>
);

const DetailViewModal = ({ type, onClose }) => {
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
                                <UserAvatar user={mockUsers.find(u => u.name === name)} size="sm" />
                                <p className="font-semibold">{name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ShopModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-md border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold">상점</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto space-y-3">
                    {shopItems.map(item => (
                        <div key={item.id} className="bg-slate-700/50 p-3 rounded-lg flex gap-3">
                            <img src={item.imageUrl} alt={item.name} className="w-16 h-12 rounded object-cover bg-slate-600" />
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm font-bold text-green-400">{item.price}</span>
                                    <button 
                                        onClick={() => alert(`${item.name} 구매 완료!`)}
                                        className="text-xs bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md transition-colors"
                                    >
                                        구매
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MiniDojoModal = ({ onClose }) => {
    const [comments, setComments] = React.useState(miniDojoComments);
    const [newComment, setNewComment] = React.useState('');
    const [replyTo, setReplyTo] = React.useState(null);
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

    const addReply = (commentId) => {
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
            {showShop && <ShopModal onClose={() => setShowShop(false)} />}
        </>
    );
};

const MiniDojoShopModal = ({ onClose }) => {
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

const AvatarSpaceModal = ({ user, onClose }) => {
    const [isPublic, setIsPublic] = React.useState(true);
    const [detailView, setDetailView] = React.useState(null);
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
                            {isPublic ? <><CheckSquare size={16} className="text-green-400"/> 공개</> : <><Square size={16} className="text-slate-400"/> 비공개</>}
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
                            나만의 미니도장을 꾸며보세요! 죽도, 도복, 호구부터 인테리어까지!
                        </div>
                        <div className="text-xs text-orange-400 font-semibold mt-1">
                            클릭해서 둘러보기 ▶
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

const NotificationBell = ({ count, onClick }) => (
    <button onClick={onClick} className="relative p-2 rounded-full hover:bg-slate-800 transition-colors">
        <Bell className="w-5 h-5 text-slate-400" />
        {count > 0 && (
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-slate-950">
                {count}
            </span>
        )}
    </button>
);

const NotificationModal = ({ notifications, onSelect, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold">새로운 소식</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-2 overflow-y-auto">
                {notifications.map(notif => (
                    <div key={notif.id} onClick={() => onSelect(notif)} className={cn(
                        "p-3 mb-2 hover:bg-slate-700/50 rounded-lg cursor-pointer flex items-center gap-3 border",
                        !notif.read ? 'bg-red-900/40 border-red-500/50' : 'bg-transparent border-red-500/30'
                    )}>
                        <UserAvatar user={notif.opponent} size="sm" />
                        <div className="flex-1">
                            <p className="text-sm">
                                <span className="font-bold">{notif.opponent.name}</span>
                                님으로부터{' '}
                                {notif.type === 'new_request' && '새로운 대련 신청이 도착했습니다.'}
                                {notif.type === 'declined' && '대련 거절 메시지가 도착했습니다.'}
                                {notif.type === 'changed' && '대련 변경 신청이 도착했습니다.'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const NotificationDetailModal = ({ notification, onClose }) => {
    const [message, setMessage] = React.useState('');
    const [action, setAction] = React.useState(null);

    const handleAction = (type) => { setAction(type); };
    const handleSend = () => { alert('메시지를 발송했습니다.'); onClose(); };

    const renderContent = () => {
        switch (notification.type) {
            case 'new_request':
                if (action) {
                    return (
                        <div>
                            <h3 className="font-semibold text-lg mb-2 text-center">
                                {action === 'accept' && '수락 메시지'} {action === 'decline' && '거절 메시지'} {action === 'change' && '변경 제안'}
                            </h3>
                            {action === 'change' && (
                                <div className="space-y-2 mb-4">
                                    <input type="text" placeholder="장소" className="w-full bg-slate-700 p-2 rounded-lg text-sm" />
                                    <input type="time" className="w-full bg-slate-700 p-2 rounded-lg text-sm" />
                                    <input type="date" className="w-full bg-slate-700 p-2 rounded-lg text-sm" />
                                </div>
                            )}
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows="3" placeholder="메시지를 입력하세요..." className="w-full bg-slate-700 p-2 rounded-lg text-sm mb-4"></textarea>
                            <button onClick={handleSend} className="w-full bg-blue-600 py-2 rounded-lg font-semibold">발송</button>
                        </div>
                    );
                }
                return (
                    <>
                        <p className="text-center mb-4">{notification.opponent.name}님이 대련을 신청했습니다.</p>
                        <div className="flex gap-2">
                            <button onClick={() => handleAction('accept')} className="w-full bg-green-600 py-2 rounded-lg font-semibold">수락</button>
                            <button onClick={() => handleAction('decline')} className="w-full bg-red-600 py-2 rounded-lg font-semibold">거절</button>
                            <button onClick={() => handleAction('change')} className="w-full bg-yellow-600 py-2 rounded-lg font-semibold">변경</button>
                        </div>
                    </>
                );
            case 'declined':
                return (
                    <div>
                        <p className="bg-slate-700/50 p-3 rounded-lg text-sm mb-4 italic">"{notification.message}"</p>
                        <textarea rows="3" placeholder="답장 메시지..." className="w-full bg-slate-700 p-2 rounded-lg text-sm mb-4"></textarea>
                        <button onClick={handleSend} className="w-full bg-blue-600 py-2 rounded-lg font-semibold">확인</button>
                    </div>
                );
            case 'changed': return null;
            default: return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 text-white relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                <div className="flex flex-col items-center mb-4">
                    <UserAvatar user={notification.opponent} size="md" />
                    <p className="font-bold mt-2">{notification.opponent.name}</p>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};

const GifticonModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold">기프트콘 교환</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-4">
                {gifticonItems.map(category => (
                    <div key={category.category}>
                        <h3 className="font-semibold text-blue-400 mb-2">{category.category}</h3>
                        <div className="space-y-2">
                            {category.items.map(item => (
                                <div key={item} className="bg-slate-700/50 p-3 rounded-lg flex justify-between items-center">
                                    <span className="text-sm">{item}</span>
                                    <button onClick={() => alert(`${item} 교환 신청!`)} className="text-xs bg-slate-600 px-3 py-1 rounded-md hover:bg-slate-500">교환</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const QuestSelectionModal = ({ onClose, quests, onSave, completionSummary }) => {
    const [selectedIds, setSelectedIds] = React.useState(() => quests.filter(q => q.selected).map(q => q.id));

    const handleToggle = (questId) => {
        setSelectedIds(prev => {
            const isSelected = prev.includes(questId);
            if (isSelected) {
                return prev.filter(id => id !== questId);
            }
            if (prev.length < 10) {
                return [...prev, questId];
            }
            return prev;
        });
    };

    const selectedQuests = React.useMemo(() => quests.filter(q => selectedIds.includes(q.id)), [quests, selectedIds]);
    const totalReward = selectedQuests.reduce((sum, quest) => sum + quest.reward, 0);
    const selectionRatio = quests.length === 0 ? 0 : Math.round((selectedIds.length / Math.min(10, quests.length)) * 100);
    const completionRatio = completionSummary.totalQuests === 0 ? 0 : Math.round((completionSummary.completedQuests / completionSummary.totalQuests) * 100);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold">이달의 퀘스트 설정</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto space-y-2">
                    <div className="mb-4 p-3 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-semibold text-yellow-300">모든 퀘스트 완수 보너스</span>
                        </div>
                        <div className="text-xs text-slate-300">
                            전체 {completionSummary.totalQuests}개 퀘스트 완성 시 <span className="text-yellow-400 font-bold">+{completionSummary.completionBonus.toLocaleString()}P</span> 추가 지급!
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                            현재 진행률: {completionSummary.completedQuests}/{completionSummary.totalQuests} ({completionRatio}%)
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">최대 10개의 퀘스트를 선택할 수 있습니다.</p>
                    {quests.map(quest => {
                        const isSelected = selectedIds.includes(quest.id);
                        const canSelectMore = selectedIds.length < 10;
                        return (
                            <button key={quest.id} onClick={() => handleToggle(quest.id)} disabled={!isSelected && !canSelectMore}
                                className={cn("w-full text-left p-3 rounded-lg flex items-start gap-3 transition-colors", "bg-slate-700/50 text-slate-200 hover:bg-slate-700", !canSelectMore && !isSelected && "opacity-60 cursor-not-allowed")}>
                                {isSelected ? <CheckSquare className="w-5 h-5 text-blue-400 mt-0.5" /> : <Square className="w-5 h-5 text-slate-500 mt-0.5" />}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm font-medium">{quest.text}</span>
                                        <span className="text-xs text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded-full ml-2">{quest.reward}P</span>
                                    </div>
                                    <div className="text-xs text-slate-400 mt-1">
                                        진행률: {quest.current}/{quest.target}{quest.unit} ({Math.round(quest.current / quest.target * 100)}%)
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
                <div className="p-4 flex-shrink-0 border-t border-slate-700">
                    <div className="mb-3 text-center text-sm text-slate-300">
                        선택된 퀘스트: <span className="font-bold text-blue-400">{selectedIds.length}/10</span>
                        <br />
                        예상 리워드: <span className="font-bold text-yellow-400">{totalReward.toLocaleString()}P</span>
                        <br />
                        선택 비율: <span className="font-bold text-slate-200">{selectionRatio}%</span>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">취소</button>
                        <button onClick={() => onSave(selectedIds)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">저장</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GoalSettingModal = ({ onClose }) => {
    const [year, setYear] = React.useState(2025);
    const [isSaved, setIsSaved] = React.useState(false);

    const handleSave = () => { setIsSaved(true); setTimeout(() => { onClose(); }, 1500); };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 text-white relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                <h2 className="text-xl font-bold text-center mb-4">목표 설정</h2>
                <div className="flex justify-center bg-slate-700 p-1 rounded-lg mb-4">
                    <button onClick={() => setYear(2025)} className={cn('w-1/2 py-1.5 rounded-md text-sm font-semibold', year === 2025 ? 'bg-blue-600' : 'hover:bg-slate-600')}>2025년</button>
                    <button onClick={() => setYear(2026)} className={cn('w-1/2 py-1.5 rounded-md text-sm font-semibold', year === 2026 ? 'bg-blue-600' : 'hover:bg-slate-600')}>2026년</button>
                </div>
                <textarea rows={5} placeholder={`${year}년 목표를 입력하세요...`} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white placeholder:text-slate-500"></textarea>
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-slate-300 mb-2">기본 목표</h3>
                    <label className="flex items-center gap-2 cursor-pointer bg-slate-700/50 p-2 rounded-lg">
                        <input type="checkbox" className="w-4 h-4 accent-blue-500" />
                        <span>vs100명 대련</span>
                    </label>
                </div>
                <div className="flex gap-3 mt-4">
                    <button onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">취소</button>
                    <button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">저장</button>
                </div>
                {isSaved && <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-green-500/90 text-white px-4 py-2 rounded-lg text-sm">목표가 저장되었습니다.</div>}
            </div>
        </div>
    );
};

const PointHistoryModal = ({ history, onClose }) => {
    const maxHistory = 20;
    const [visibleCount, setVisibleCount] = React.useState(10);
    const displayedHistory = history.slice(0, Math.min(visibleCount, maxHistory));
    const canLoadMore = visibleCount < Math.min(maxHistory, history.length);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold">포인트 누적 히스토리</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto">
                    <div className="space-y-2">
                        {displayedHistory.map((item, index) => (
                            <div key={index} className="bg-slate-700/50 p-3 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-semibold">{item.reason}</p>
                                    <p className="text-xs text-slate-400">{item.date}</p>
                                </div>
                                <span className={cn("font-bold", item.change.startsWith('+') ? 'text-green-400' : 'text-red-400')}>{item.change}P</span>
                            </div>
                        ))}
                    </div>
                    {canLoadMore && (
                        <button
                            onClick={() => setVisibleCount(v => Math.min(v + 10, maxHistory))}
                            className="mt-4 w-full bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold py-2 rounded-lg"
                        >
                            더보기
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const MatchActionModal = ({ opponent, type, onClose }) => {
    const title = type === 'cancel' ? '대련 취소' : '대련 연장';
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 text-white">
                <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
                <p className="text-center text-sm text-slate-400 mb-4">{opponent.name}님에게 {type === 'cancel' ? '취소' : '연장'} 요청 메시지를 보냅니다.</p>
                {type === 'postpone' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-300 mb-1">날짜 제안</label>
                        <input type="date" className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white" />
                    </div>
                )}
                <textarea rows={3} placeholder="메시지를 입력하세요..." className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white placeholder:text-slate-500 mb-4"></textarea>
                <div className="flex gap-3">
                    <button onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">취소</button>
                    <button onClick={() => { alert('메시지를 발송했습니다.'); onClose(); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">발송</button>
                </div>
            </div>
        </div>
    );
};

const OpponentDetailModal = ({ opponent, onClose }) => {
    const [action, setAction] = React.useState(null); // 'cancel' or 'postpone'

    if (action) {
        return <MatchActionModal opponent={opponent} type={action} onClose={() => { setAction(null); onClose(); }} />;
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold">상대 정보</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto space-y-4">
                    <div className="flex items-center gap-4">
                        <UserAvatar user={opponent} size="lg" />
                        <div>
                            <p className="text-2xl font-bold">{opponent.name}</p>
                            <p className="text-md text-slate-300">{opponent.officialRank} / {opponent.location}</p>
                            <p className="text-md font-semibold text-blue-400">{opponent.platformRank}P</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-slate-700/50 p-2 rounded-lg">
                            <p className="text-xs text-slate-400">전적</p>
                            <p className="font-bold">{opponent.wins + opponent.losses}전</p>
                        </div>
                        <div className="bg-slate-700/50 p-2 rounded-lg">
                            <p className="text-xs text-slate-400">승</p>
                            <p className="font-bold text-green-400">{opponent.wins}승</p>
                        </div>
                        <div className="bg-slate-700/50 p-2 rounded-lg">
                            <p className="text-xs text-slate-400">패</p>
                            <p className="font-bold text-red-400">{opponent.losses}패</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-300 mb-2">특기</h4>
                        <p className="bg-slate-700/50 p-2 rounded-lg text-sm font-medium">{opponent.specialty}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-300 mb-2">특징</h4>
                        <div className="flex flex-wrap gap-2">
                            {opponent.characteristics.map(char => (
                                <span key={char} className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-2 py-1 rounded-full">{char}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-shrink-0 border-t border-slate-700 flex gap-3">
                    <button onClick={() => setAction('cancel')} className="w-full bg-red-600/80 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors">취소</button>
                    <button onClick={() => setAction('postpone')} className="w-full bg-yellow-600/80 hover:bg-yellow-700 text-white font-bold py-3 rounded-lg transition-colors">연장</button>
                </div>
            </div>
        </div>
    );
};

const QuestDetailModal = ({ quest, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 text-white">
            <h2 className="text-xl font-bold text-center mb-2">{quest.text}</h2>
            <p className="text-center text-sm text-slate-400 mb-4">{quest.description}</p>
            <button onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">닫기</button>
        </div>
    </div>
);

const GoalChecklistModal = ({ goals, onClose }) => {
    const [checkedGoals, setCheckedGoals] = React.useState(goals.filter(g => g.completed).map(g => g.id));

    const handleToggle = (goalId) => {
        setCheckedGoals(prev => 
            prev.includes(goalId) ? prev.filter(id => id !== goalId) : [...prev, goalId]
        );
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                 <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold">2025년 목표</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto space-y-3">
                    {goals.map(goal => (
                         <label key={goal.id} className="flex items-center gap-3 cursor-pointer bg-slate-700/50 p-3 rounded-lg">
                            <input type="checkbox" checked={checkedGoals.includes(goal.id)} onChange={() => handleToggle(goal.id)} className="w-5 h-5 accent-blue-500" />
                            <span className={cn("flex-grow", checkedGoals.includes(goal.id) && "line-through text-slate-500")}>{goal.text}</span>
                            {goal.target && (
                                <span className="text-sm font-semibold">{goal.current} / {goal.target}</span>
                            )}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};
const OpponentSuggestionModal = ({ onClose }) => {
    const [visibleCount, setVisibleCount] = React.useState(10);

    const opponents = React.useMemo(() => {
        const extras = Array.from({ length: 12 }, (_, i) => ({
            ...mockUsers[i % mockUsers.length],
            id: 100 + i,
            name: `추천상대${i + 1}`,
            experienceYears: 1 + Math.floor(Math.random() * 10),
        }));
        const pool = [...mockUsers, ...extras];
        return pool.map(u => {
            const diff = currentUser.platformRank - u.platformRank;
            const winRate = Math.max(5, Math.min(95, Math.round(50 + diff / 10)));
            const characteristics = [
                u.characteristics[0] || '분석력이 뛰어남',
                u.characteristics[1] || '속도가 빠름',
                u.characteristics[2] || '체력이 좋음',
                '집중력이 강함',
            ];
            const strategies = [
                '초반 주도권을 잡으세요',
                '상대의 빈틈을 공략하세요',
                '지속적인 압박으로 체력을 소모시키세요',
                '기회가 오면 과감히 치세요',
            ];
            const years = u.experienceYears || (1 + Math.floor(Math.random() * 10));
            return { ...u, winRate, aiCharacteristics: characteristics, aiStrategies: strategies, experienceYears: years };
        }).sort((a, b) => b.winRate - a.winRate);
    }, []);

    const displayed = opponents.slice(0, visibleCount);
    const canLoadMore = visibleCount < opponents.length;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-md border border-slate-700 text-white flex flex-col max-h-[90vh] relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                <h2 className="text-xl font-bold text-center my-4">AI 추천 대련 상대</h2>
                <div className="px-4 overflow-y-auto space-y-4">
                    {displayed.map(op => (
                        <div key={op.id} className="bg-slate-700/50 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold">{op.name}</p>
                                    <p className="text-sm text-slate-400">{op.location} / {op.dojang}</p>
                                    <p className="text-sm text-slate-300">단: {op.officialRank} | 검력: {op.experienceYears}년</p>
                                </div>
                                <span className="text-blue-400 font-bold text-lg">{op.winRate}%</span>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm font-semibold">특징</p>
                                {op.aiCharacteristics.map((c, i) => (
                                    <p key={i} className="text-sm text-slate-300">- {c}</p>
                                ))}
                            </div>
                            <div className="mt-2">
                                <p className="text-sm font-semibold">승리 전략</p>
                                {op.aiStrategies.map((s, i) => (
                                    <p key={i} className="text-sm text-slate-300">- {s}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                    {canLoadMore && (
                        <button
                            onClick={() => setVisibleCount(v => v + 10)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg mb-4"
                        >
                            더보기
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const HomeScreen = ({ user, onNavigate, notifications, onSelectNotification }) => {
  const upcomingMatches = mockMatchHistory.filter(m => m.status === 'upcoming');
  const [modal, setModal] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [showMiniDojo, setShowMiniDojo] = React.useState(false);
  const [quests, setQuests] = React.useState(() => initialQuestList.map(quest => ({ ...quest })));
  const newsBanners = [
    '새로운소식, 정승연님으로부터 새로운 댓글이 달렸습니다',
    '새로운소식, 이정연님으로부터 좋아요를 받았습니다',
  ];
  const bannerMessages = [
    '새로운소식, 정승연님으로부터 새로운 댓글이 달렸습니다',
    '새로운소식, 이정연님으로부터 좋아요를 받았습니다',
  ];

  const openModal = (type, item = null) => { setModal(type); setSelectedItem(item); };
  const closeModal = () => { setModal(null); setSelectedItem(null); };
  const handleQuestSelectionSave = (selectedIds) => {
    setQuests(prev => prev.map(quest => ({ ...quest, selected: selectedIds.includes(quest.id) })));
    closeModal();
  };
  const completionSummary = React.useMemo(() => ({
    totalQuests: quests.length,
    completionBonus: QUEST_COMPLETION_BONUS,
    completedQuests: quests.filter(q => q.current >= q.target).length,
  }), [quests]);

  const getNotificationMessage = (notification) => {
    if (!notification) return '';
    const opponentName = notification.opponent.name;
    switch (notification.type) {
        case 'new_request': return `${opponentName}님으로부터 새로운 대련 신청이 도착했습니다.`;
        case 'declined': return `${opponentName}님이 대련을 거절했습니다.`;
        case 'changed': return `${opponentName}님이 대련 변경을 신청했습니다.`;
        case 'comment': return `${opponentName}님으로부터 새로운 댓글이 달렸습니다.`;
        case 'like': return `${opponentName}님으로부터 좋아요를 받았습니다.`;
        default: return `${opponentName}님으로부터 새로운 알림이 도착했습니다.`;
    }
  };

  const getDday = (dateString) => {
      const today = new Date();
      const matchDate = new Date(dateString);
      const diffTime = matchDate.setHours(0,0,0,0) - today.setHours(0,0,0,0);
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(0, days);
  };

  const selectedQuests = quests.filter(q => q.selected);

  return (
  <>
    <div className="p-4 space-y-6 text-white">
        <div className="space-y-2">
            <div className="text-center">
                <p className="text-xs text-slate-400">환영합니다, <span className="text-white font-medium">한승오님</span></p>
            </div>
            <Card className="py-2">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-3">
                        <UserAvatar user={user} size="sm" onClick={() => onNavigate('profile')} />
                        <div className="text-sm">
                            <div className="flex flex-wrap items-center gap-x-1 text-white font-bold text-lg">
                                <span>한승오</span>
                                <span>4단</span>
                                <span>대전</span>
                                <span>주이회</span>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setShowMiniDojo(true)} className="cursor-pointer rounded-lg overflow-hidden">
                        <div className="relative">
                            <img src={dojoImage} alt="미니도장" className="w-full aspect-video object-cover" />
                            <div className="absolute inset-0 bg-black/50 flex flex-col justify-between items-start p-1">
                                <span className="text-[8px] text-white">- 한승오의 미니도장</span>
                                <div className="flex gap-3 text-xs text-white">
                                    <div className="relative flex items-center gap-1">
                                        <span className="absolute -top-3 left-0 text-[8px] text-yellow-300 font-bold animate-pulse">[new]</span>
                                        <Heart size={10} className="text-red-400" />
                                        <span>좋아요 2.5k</span>
                                    </div>
                                    <div className="relative flex items-center gap-1">
                                        <span className="absolute -top-3 left-0 text-[8px] text-yellow-300 font-bold animate-pulse">[new]</span>
                                        <MessageSquare size={10} className="text-blue-400" />
                                        <span>댓글 124</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
        <div className="space-y-2">
            {newsBanners.map((msg, idx) => (
                <Card
                    key={idx}
                    className="bg-yellow-400/40 border-yellow-500/50 text-black overflow-hidden"
                >
                    <p className="text-sm font-bold whitespace-nowrap animate-marquee">{msg}</p>
                </Card>
            ))}
            {notifications.map(notification => (
                <Card key={notification.id} onClick={() => onSelectNotification(notification)} className="bg-red-900/40 border-red-500/50 animate-pulse hover:bg-red-900/60 cursor-pointer">
                    <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-red-400" />
                        <div>
                            <p className="font-bold text-red-300">새로운 소식</p>
                            <p className="text-sm">{getNotificationMessage(notification)}</p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
        <Card onClick={() => openModal('points')} className="bg-gradient-to-br from-blue-600 to-blue-800 border-blue-500">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-blue-200">플랫폼 랭크</p>
                    <p className="text-3xl font-bold text-white">{user.platformRank} P</p>
                </div>
                <div className="text-right">
                    <p className="text-blue-200">공인 등급</p>
                    <p className="text-xl font-semibold text-white flex items-center gap-2">{user.officialRank} <ShieldCheck className="w-5 h-5 text-yellow-300"/></p>
                </div>
            </div>
             <button onClick={(e) => { e.stopPropagation(); openModal('gift'); }} className="mt-3 w-full flex items-center justify-center gap-2 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 font-bold py-2 rounded-lg text-sm transition-colors">
                <Gift size={16} /> 기프트콘 교환하기
            </button>
        </Card>

        {upcomingMatches.length > 0 && <div>
            <h2 className="text-xl font-semibold mb-3">다가오는 대련</h2>
            <div className="space-y-3">
            {upcomingMatches.slice(0, 3).map(match => {
                const dDay = getDday(match.date);
                return (
                    <Card key={match.id} onClick={() => openModal('opponent', match.opponent)}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <UserAvatar user={match.opponent} size="sm" />
                                <div>
                                    <p className="font-semibold">{match.opponent.name}</p>
                                    <p className="text-sm text-slate-400">{match.opponent.officialRank} / {match.opponent.platformRank}P</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-blue-400">{match.date}</p>
                                <p className={cn("text-sm font-bold", dDay <= 7 ? "text-red-400" : "text-slate-500")}>D-{dDay}</p>
                            </div>
                        </div>
                    </Card>
                )
            })}
            </div>
        </div>}

        <div>
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">이달의 퀘스트</h2>
                <button onClick={() => openModal('quest_select')} className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-lg transition-colors">퀘스트 설정</button>
            </div>
            <div className="space-y-3">
                {selectedQuests.map(quest => (
                     <Card key={quest.id} onClick={() => openModal('quest_detail', quest)} className="bg-gradient-to-r from-green-500 to-teal-600 border-green-500">
                        <div className="flex justify-between items-center">
                            <p className="font-bold">{quest.text}</p>
                            <p className="text-sm font-semibold opacity-90">{`${quest.current} / ${quest.target}${quest.unit}`}</p>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2.5 mt-2">
                            <div className="bg-white rounded-full h-2.5" style={{ width: `${(quest.current / quest.target) * 100}%` }}></div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>

        <div>
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">2025년 목표</h2>
                <button onClick={() => openModal('goal_edit')} className="p-2 text-slate-400 hover:text-white"><Settings size={18} /></button>
            </div>
            <Card onClick={() => openModal('goal_check')}>
                <div className="space-y-4">
                    {mockGoals.map(goal => (
                         <div key={goal.id}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-medium">{goal.text}</span>
                                {goal.target ? (
                                    <span className="font-semibold text-sm">{goal.current} / {goal.target}명</span>
                                ) : (
                                    <span className={cn("flex items-center gap-1.5 font-semibold text-sm", goal.completed ? "text-green-400" : "text-slate-500")}>
                                        {goal.completed ? <><CheckCircle2 className="w-4 h-4" /> 완료</> : '예정'}
                                    </span>
                                )}
                            </div>
                            {goal.target && <div className="w-full bg-slate-700 rounded-full h-2.5"><div className="bg-blue-500 rounded-full h-2.5" style={{ width: `${(goal.current / goal.target) * 100}%` }}></div></div>}
                        </div>
                    ))}
                </div>
            </Card>
        </div>

        <div>
            <h2 className="text-xl font-semibold mb-3">빠른 메뉴</h2>
            <div className="grid grid-cols-2 gap-4">
                <Card onClick={() => openModal('ai_opponent')} className="items-center justify-center flex flex-col text-center"><Swords className="w-8 h-8 text-blue-400 mb-2" /><span className="font-semibold">대련 상대 찾기</span></Card>
                <Card onClick={() => onNavigate('community')} className="items-center justify-center flex flex-col text-center"><Users className="w-8 h-8 text-green-400 mb-2" /><span className="font-semibold">커뮤니티</span></Card>
            </div>

        </div>
    </div>
    {modal === 'goal_edit' && <GoalSettingModal onClose={closeModal} />}
    {modal === 'gift' && <GifticonModal onClose={closeModal} />}
    {modal === 'quest_select' && (
        <QuestSelectionModal
            onClose={closeModal}
            quests={quests}
            onSave={handleQuestSelectionSave}
            completionSummary={completionSummary}
        />
    )}
    {modal === 'avatar_space' && <AvatarSpaceModal user={user} onClose={closeModal} />}
    {modal === 'points' && <PointHistoryModal history={mockPointHistory} onClose={closeModal} />}
    {modal === 'opponent' && <OpponentDetailModal opponent={selectedItem} onClose={closeModal} />}
    {modal === 'quest_detail' && <QuestDetailModal quest={selectedItem} onClose={closeModal} />}
    {modal === 'goal_check' && <GoalChecklistModal goals={mockGoals} onClose={closeModal} />}
    {modal === 'ai_opponent' && <OpponentSuggestionModal onClose={closeModal} />}
    {showMiniDojo && <MiniDojoModal onClose={() => setShowMiniDojo(false)} />}
  </>
  );
};
const MatchRequestModal = ({ user, onClose }) => {
    const [message, setMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [matchType, setMatchType] = React.useState('public');
    const [privacySettings, setPrivacySettings] = React.useState({ video: true, comments: true, likes: true, commentary: true });
    const [isSent, setIsSent] = React.useState(false);

    const handleCheckboxChange = (key) => { setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] })); };
    
    const handleGenerateMessage = async () => {
        setIsLoading(true);
        setMessage("생성 중...");
        const date = new Date().toISOString().split('T')[0];
        const prompt = `너는 검도를 즐기는 예의 바른 검도인이야. ${user.name}님에게 대련을 신청하려고 해. 정중하고 친근한 어조로 대련 신청 메시지를 작성해줘. 날짜는 ${date} 근처로 제안해줘.`;

        const result = await callGemini(prompt);

        if (result.ok) {
            setMessage(result.message);
        } else if (result.reason === 'missing_api_key') {
            setMessage('API 키가 설정되지 않아 준비된 예시 메시지를 제공합니다.\n이번 주 중 시간 괜찮으시면 대련 한 판 어떠실까요?');
        } else {
            setMessage('메시지 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }

        setIsLoading(false);
    };

    const handleSendRequest = () => { setIsSent(true); setTimeout(() => { onClose(); }, 1500); };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 text-white relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                <h2 className="text-xl font-bold text-center mb-4">대련 신청</h2>
                <Card className="mb-4">
                    <div className="flex items-center gap-4">
                        <UserAvatar user={user} size="md" />
                        <div>
                            <p className="text-lg font-bold">{user.name}</p>
                            <p className="text-sm text-slate-300">{user.officialRank} / {user.location}</p>
                            <p className="text-sm text-slate-400">{user.wins}승 {user.losses}패</p>
                        </div>
                    </div>
                </Card>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">날짜 선택</label>
                        <input type="date" className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Match Type</label>
                        <div className="flex bg-slate-700 p-1 rounded-lg">
                            <button onClick={() => setMatchType('public')} className={cn('w-1/2 py-1.5 rounded-md text-sm font-semibold', matchType === 'public' ? 'bg-blue-600' : 'hover:bg-slate-600')}>전체 공개</button>
                            <button onClick={() => setMatchType('private')} className={cn('w-1/2 py-1.5 rounded-md text-sm font-semibold', matchType === 'private' ? 'bg-blue-600' : 'hover:bg-slate-600')}>협의 공개</button>
                        </div>
                    </div>
                    {matchType === 'private' && (
                        <div className="bg-slate-700/50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-slate-300 mb-2">공개 범위 설정</p>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.keys(privacySettings).map(key => (
                                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={privacySettings[key]} onChange={() => handleCheckboxChange(key)} className="w-4 h-4 accent-blue-500"/>
                                        <span className="text-sm capitalize">{key}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                     <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium text-slate-300">메시지</label>
                            <button onClick={handleGenerateMessage} disabled={isLoading} className="text-xs flex items-center gap-1 px-2 py-1 bg-blue-600/50 text-blue-300 rounded-md hover:bg-blue-600/80 disabled:opacity-50">
                                <Sparkles size={12} /> AI로 작성
                            </button>
                        </div>
                        <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="하고 싶은 말을 남겨주세요." className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white placeholder:text-slate-500"></textarea>
                    </div>
                </div>
                <div className="flex gap-3 mt-6">
                    <button onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">취소</button>
                    <button onClick={handleSendRequest} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">신청</button>
                </div>
                 {isSent && <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-green-500/90 text-white px-4 py-2 rounded-lg text-sm">{user.name}님에게 대련을 신청했습니다.</div>}
            </div>
        </div>
    );
};

const MatchScreen = () => {
    const [filter, setFilter] = React.useState('distance');
    const [modalUser, setModalUser] = React.useState(null);

    const filterTabs = [
        { id: 'distance', label: '거리순' }, { id: 'experience', label: '경력순' }, { id: 'rank', label: '단수' },
        { id: 'score', label: '최고점수' }, { id: 'wins', label: '최다승' }, { id: 'matches', label: '최다도전' },
    ];

    const sortedUsers = [...mockUsers].sort((a, b) => {
        switch(filter) {
            case 'experience':
                return (b.wins + b.losses) - (a.wins + a.losses);
            case 'rank':
                return parseInt(b.officialRank) - parseInt(a.officialRank);
            case 'score':
                return b.platformRank - a.platformRank;
            case 'wins':
                return b.wins - a.wins;
            case 'matches':
                return (b.wins + b.losses) - (a.wins + a.losses);
            case 'distance':
            default: {
                const distanceA = calculateDistanceKm(currentUser.location, a.location);
                const distanceB = calculateDistanceKm(currentUser.location, b.location);
                const isFiniteA = Number.isFinite(distanceA);
                const isFiniteB = Number.isFinite(distanceB);

                if (!isFiniteA && !isFiniteB) {
                    return 0;
                }
                if (!isFiniteA) {
                    return 1;
                }
                if (!isFiniteB) {
                    return -1;
                }

                return distanceA - distanceB;
            }
        }
    });

    return (
        <>
            <div className="p-4 space-y-4 text-white">
                <h1 className="text-2xl font-bold">대련 상대 찾기</h1>
                <div className="flex border-b border-slate-700 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {filterTabs.map(tab => (
                        <button key={tab.id} onClick={() => setFilter(tab.id)} className={cn('px-4 py-2 text-sm font-semibold whitespace-nowrap', filter === tab.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 border-b-2 border-transparent hover:text-slate-200')}>
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="space-y-3">
                    {sortedUsers.map(user => {
                        const distanceKm = calculateDistanceKm(currentUser.location, user.location);
                        const hasDistance = Number.isFinite(distanceKm);

                        return (
                        <Card key={user.id} className="flex items-center space-x-4">
                            <UserAvatar user={user} />
                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <p className="text-lg font-bold">{user.name}</p>
                                    <span className="text-sm font-semibold text-yellow-400 flex items-center"><Star className="w-4 h-4 mr-1" />{user.officialRank}</span>
                                </div>
                                <p className="text-sm text-slate-400 flex items-center"><MapPin className="w-3 h-3 mr-1.5" />{user.location} / {user.dojang}</p>
                                <p className="text-sm text-slate-300 mt-1">{user.platformRank}P ({user.wins}승 / {user.losses}패)</p>
                                <p className="text-xs text-slate-500 mt-1">
                                    {hasDistance ? `나와의 거리 약 ${distanceKm.toFixed(1)}km` : '거리 정보가 없습니다'}
                                </p>
                            </div>
                            <button onClick={() => setModalUser(user)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors flex-shrink-0">신청</button>
                        </Card>
                    );
                    })}
                </div>
            </div>
            {modalUser && <MatchRequestModal user={modalUser} onClose={() => setModalUser(null)} />}
        </>
    );
};

const RankingTrendModal = ({ user, onClose }) => {
    const data = user.rankHistory;
    const minRank = Math.min(...data.map(p => p.rank));
    const maxRank = Math.max(...data.map(p => p.rank));
    const getY = (rank) => {
        if (maxRank === minRank) {
            return 50;
        }
        return 90 - ((rank - minRank) / (maxRank - minRank)) * 80;
    };
    const points = data.map((p, i) => `${i * 60},${getY(p.rank)}`).join(' ');

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700 text-white relative">
                 <button onClick={onClose} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                 <div className="flex items-center gap-3 mb-4">
                    <UserAvatar user={user} size="sm" />
                    <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-sm text-slate-400">최근 랭크 추이</p>
                    </div>
                </div>
                <div className="h-40">
                    <svg viewBox="0 0 180 100" className="w-full h-full">
                        <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={points} />
                        {data.map((p, i) => <circle key={i} cx={i * 60} cy={getY(p.rank)} r="3" fill="#3b82f6" />)}
                    </svg>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1월</span><span>3월</span><span>5월</span><span>7월</span>
                </div>
            </div>
        </div>
    );
};

const RankingScreen = () => {
    const [period, setPeriod] = React.useState('month');
    const [criteria, setCriteria] = React.useState('score');
    const [selectedUser, setSelectedUser] = React.useState(null);

    const playersOnMap = allUsers;
    const userLocations = [
        { user: allUsers[0], lat: 37.5665, lng: 126.9780, city: '서울', mapX: '45%', mapY: '35%' },
        { user: allUsers[1], lat: 36.3504, lng: 127.3845, city: '대전', mapX: '48%', mapY: '55%' },
        { user: allUsers[2], lat: 36.3504, lng: 127.3845, city: '대전', mapX: '52%', mapY: '58%' },
        { user: allUsers[3], lat: 36.3504, lng: 127.3845, city: '대전', mapX: '46%', mapY: '52%' },
        { user: allUsers[4], lat: 37.5665, lng: 126.9780, city: '서울', mapX: '42%', mapY: '32%' },
        { user: allUsers[5], lat: 36.1000, lng: 128.4000, city: '구미', mapX: '65%', mapY: '60%' },
        { user: allUsers[6], lat: 37.5665, lng: 126.9780, city: '서울', mapX: '40%', mapY: '38%' },
        { user: allUsers[7], lat: 35.1796, lng: 129.0756, city: '부산', mapX: '75%', mapY: '75%' },
        { user: allUsers[8], lat: 37.4563, lng: 126.7052, city: '인천', mapX: '38%', mapY: '40%' }
    ];
    const currentRankings = allRankings[period][criteria];
    const [selectedMapUser, setSelectedMapUser] = React.useState(null);

    const KoreaMapComponent = () => {
        return (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 h-64 rounded-lg relative overflow-hidden">
                {/* 한국 지도 베이스 */}
                <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                    {/* 한반도 외곽선 */}
                    <path 
                        d="M20,85 Q25,80 30,75 L35,70 Q40,65 45,60 L50,55 Q55,50 60,45 L65,40 Q70,35 75,30 L80,25 Q85,20 90,15 L85,10 Q80,15 75,20 L70,25 Q65,30 60,35 L55,40 Q50,45 45,50 L40,55 Q35,60 30,65 L25,70 Q20,75 15,80 L20,85 Z" 
                        fill="#374151" 
                        stroke="#6b7280" 
                        strokeWidth="0.5"
                    />
                    {/* 내륙 지역 */}
                    <path 
                        d="M25,80 Q30,75 35,70 L40,65 Q45,60 50,55 L55,50 Q60,45 65,40 L70,35 Q75,30 80,25 L75,20 Q70,25 65,30 L60,35 Q55,40 50,45 L45,50 Q40,55 35,60 L30,65 Q25,70 25,80 Z" 
                        fill="#4b5563"
                    />
                    {/* 주요 도시 표시 */}
                    <circle cx="42" cy="35" r="1" fill="#fbbf24" />
                    <text x="42" y="30" fontSize="3" fill="#e5e7eb" textAnchor="middle">서울</text>
                    <circle cx="48" cy="55" r="1" fill="#fbbf24" />
                    <text x="48" y="50" fontSize="3" fill="#e5e7eb" textAnchor="middle">대전</text>
                    <circle cx="75" cy="75" r="1" fill="#fbbf24" />
                    <text x="75" y="70" fontSize="3" fill="#e5e7eb" textAnchor="middle">부산</text>
                    <circle cx="65" cy="60" r="1" fill="#fbbf24" />
                    <text x="65" y="55" fontSize="3" fill="#e5e7eb" textAnchor="middle">구미</text>
                    <circle cx="38" cy="40" r="1" fill="#fbbf24" />
                    <text x="38" y="35" fontSize="3" fill="#e5e7eb" textAnchor="middle">인천</text>
                </svg>
                
                {/* 사용자 아이콘 마커 */}
                {userLocations.map((location, index) => (
                    <div 
                        key={location.user.id} 
                        className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2" 
                        style={{ left: location.mapX, top: location.mapY }}
                        onClick={() => setSelectedMapUser(selectedMapUser?.id === location.user.id ? null : location.user)}
                    >
                        <div className="relative">
                            <UserAvatar user={location.user} size="sm" />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                                <Trophy className="w-2 h-2 text-slate-900" />
                            </div>
                        </div>
                        
                        {/* 호버 정보 */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            <div className="bg-slate-900/90 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                                <div className="flex items-center gap-1">
                                    <Trophy className="w-3 h-3 text-yellow-400"/>
                                    <span>{location.user.name}</span>
                                </div>
                                <div className="text-slate-300 text-[10px]">{location.city} · {location.user.officialRank}</div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* 선택된 사용자 상세 정보 */}
                {selectedMapUser && (
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 rounded-lg p-3 border border-slate-600">
                        <div className="flex items-center gap-3">
                            <UserAvatar user={selectedMapUser} size="md" />
                            <div className="flex-1">
                                <div className="font-bold text-white">{selectedMapUser.name}</div>
                                <div className="text-sm text-slate-300">{selectedMapUser.dojang} · {selectedMapUser.location}</div>
                                <div className="text-xs text-slate-400 flex gap-4">
                                    <span>랭크: {selectedMapUser.platformRank}</span>
                                    <span>공식단수: {selectedMapUser.officialRank}</span>
                                    <span>{selectedMapUser.wins}승 {selectedMapUser.losses}패</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedMapUser(null)}
                                className="text-slate-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
        <div className="p-4 space-y-4 text-white">
            <h1 className="text-2xl font-bold">랭킹</h1>
            <Card>
                <h3 className="font-semibold mb-3">지역별 TOP 검도인</h3>
                <KoreaMapComponent />
            </Card>
            <div>
                <div className="flex justify-center bg-slate-800 p-1 rounded-lg mb-2">
                     <button onClick={() => setPeriod('month')} className={cn('w-1/3 py-1.5 rounded-md text-sm font-semibold', period === 'month' ? 'bg-blue-600' : 'hover:bg-slate-700')}>1달</button>
                     <button onClick={() => setPeriod('season')} className={cn('w-1/3 py-1.5 rounded-md text-sm font-semibold', period === 'season' ? 'bg-blue-600' : 'hover:bg-slate-700')}>시즌</button>
                     <button onClick={() => setPeriod('year')} className={cn('w-1/3 py-1.5 rounded-md text-sm font-semibold', period === 'year' ? 'bg-blue-600' : 'hover:bg-slate-700')}>1년</button>
                </div>
                 <div className="flex justify-center bg-slate-800 p-1 rounded-lg">
                     <button onClick={() => setCriteria('score')} className={cn('w-1/2 py-1.5 rounded-md text-sm font-semibold', criteria === 'score' ? 'bg-blue-600' : 'hover:bg-slate-700')}>최고점</button>
                     <button onClick={() => setCriteria('wins')} className={cn('w-1/2 py-1.5 rounded-md text-sm font-semibold', criteria === 'wins' ? 'bg-blue-600' : 'hover:bg-slate-700')}>최다승</button>
                </div>
            </div>
            <div className="space-y-2">
                {currentRankings.map(({ user, points, wins, rankChange }, index) => (
                    <Card key={user.id} onClick={() => setSelectedUser(user)} className={cn('flex items-center space-x-3', user.id === currentUser.id && 'bg-blue-900/50 border-blue-500')}>
                        <span className="text-xl font-bold w-8 text-center text-slate-400">{index + 1}</span>
                        <UserAvatar user={user} size="sm" />
                        <div className="flex-grow">
                            <div className="flex flex-col items-start">
                                <div className="flex items-center h-4">
                                    {index === 0 && <Trophy className="w-4 h-4 text-yellow-400" />}
                                    {rankChange >= 3 && <Flame className="w-4 h-4 text-orange-500" />}
                                </div>
                                <p className="font-bold">{user.name}</p>
                                <p className="text-sm text-slate-400">{user.officialRank} / {user.dojang}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 text-right">
                                {rankChange > 0 && <span className="flex items-center justify-end text-green-400 text-xs font-semibold"><ArrowUp size={14} /> +{rankChange}</span>}
                                {rankChange < 0 && <span className="flex items-center justify-end text-red-400 text-xs font-semibold"><ArrowDown size={14} /> {rankChange}</span>}
                                {rankChange === 0 && <span className="text-slate-500 text-xs font-semibold">-</span>}
                            </div>
                            <div className="text-right w-20">
                                <p className="font-semibold text-blue-400">{criteria === 'score' ? `${points} P` : `${wins} 승`}</p>
                                <p className="text-xs text-slate-500">{user.wins}W {user.losses}L</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
        {selectedUser && <RankingTrendModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
        </>
    );
};

const InviteModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold">멤버 초대</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-3">
                {allUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between bg-slate-700/50 p-2 rounded-lg">
                        <div className="flex items-center gap-3">
                            <UserAvatar user={user} size="sm" />
                            <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-xs text-slate-400">{user.dojang}</p>
                            </div>
                        </div>
                        <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                    </div>
                ))}
            </div>
            <div className="p-4 flex-shrink-0">
                 <button onClick={() => { alert('초대를 보냈습니다.'); onClose(); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">초대하기</button>
            </div>
        </div>
    </div>
);

const CommunityScreen = () => {
    const [activeCategory, setActiveCategory] = React.useState('chat');
    const [selectedChat, setSelectedChat] = React.useState(null);
    const [isInviteModalOpen, setIsInviteModalOpen] = React.useState(false);

    const CategoryButton = ({cat, label}) => (
        <button onClick={() => setActiveCategory(cat)} className={cn('px-4 py-2 text-sm font-semibold whitespace-nowrap', activeCategory === cat ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 border-b-2 border-transparent hover:text-slate-200')}>
            {label}
        </button>
    );
    
    const ChatWindow = ({ chat, onBack }) => (
        <div className="h-full flex flex-col">
            <div className="flex items-center p-3 border-b border-slate-700">
                <button onClick={onBack} className="mr-3 p-1 text-slate-300 hover:text-white"><ChevronsLeft size={20}/></button>
                <UserAvatar user={chat.partner} size="sm"/>
                <div className="ml-3">
                    <p className="font-bold">{chat.partner.name}</p>
                    {'members' in chat.partner && <p className="text-xs text-slate-400">{chat.partner.members}명</p>}
                </div>
                {chat.type === 'club' && (
                    <button onClick={() => setIsInviteModalOpen(true)} className="ml-auto p-2 text-slate-300 hover:text-white">
                        <PlusCircle size={20} />
                    </button>
                )}
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {chat.messages.map(msg => (
                    <div key={msg.id} className={cn('flex items-end gap-2', msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
                        {msg.sender !== 'me' && <UserAvatar user={allUsers.find(u => u.name === msg.sender) || {name: '?'}} size="sm"/>}
                        <div className={cn('max-w-[70%] p-3 rounded-2xl', msg.sender === 'me' ? 'bg-blue-600 rounded-br-none' : 'bg-slate-700 rounded-bl-none')}>
                            {msg.sender !== 'me' && <p className="text-xs font-bold text-blue-300 mb-1">{msg.sender}</p>}
                            <p>{msg.text}</p>
                            <p className="text-xs text-slate-400 mt-1 text-right">{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
                 {chat.messages.length === 0 && <p className="text-center text-sm text-slate-500">대화 기록이 없습니다.</p>}
            </div>
            <div className="p-2 border-t border-slate-700 flex items-center gap-2">
                <input type="text" placeholder="메시지 입력..." className="flex-1 bg-slate-700 rounded-full py-2 px-4 text-white placeholder:text-slate-500" />
                <button className="bg-blue-600 p-2 rounded-full"><Send size={18}/></button>
            </div>
        </div>
    );

    const ShopScreen = () => (
        <div className="grid grid-cols-2 gap-4">
            {shopItems.map((item) => (
                <Card key={item.id}>
                    <img src={item.imageUrl} alt={item.name} className="bg-slate-700 aspect-square rounded-lg mb-2 object-cover" />
                    <p className="font-semibold text-sm truncate">{item.name}</p>
                    <p className="text-xs text-blue-400">{item.price}</p>
                </Card>
            ))}
        </div>
    );

    if (selectedChat) {
        return (
            <>
                <ChatWindow chat={selectedChat} onBack={() => setSelectedChat(null)} />
                {isInviteModalOpen && <InviteModal onClose={() => setIsInviteModalOpen(false)} />}
            </>
        );
    }

    return (
        <div className="p-4 space-y-4 text-white">
            <h1 className="text-2xl font-bold">커뮤니티</h1>
            <div className="flex border-b border-slate-700 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <CategoryButton cat="chat" label="채팅" />
                <CategoryButton cat="general" label="수다방" />
                <CategoryButton cat="anonymous" label="익명방" />
                <CategoryButton cat="trade" label="거래방" />
                <CategoryButton cat="shop" label="상점" />
            </div>
            
            <div className="space-y-2">
                {activeCategory === 'chat' && mockChats.map(chat => (
                    <div key={chat.id} onClick={() => setSelectedChat(chat)} className="flex items-center p-2 gap-3 hover:bg-slate-800 rounded-lg cursor-pointer">
                        <UserAvatar user={chat.partner} size="sm" />
                        <div className="flex-1 overflow-hidden">
                            <div className="flex justify-between">
                                <p className="font-bold truncate">{chat.partner.name}{'members' in chat.partner && ` (${chat.partner.members})`}</p>
                                <p className="text-xs text-slate-400 flex-shrink-0">{chat.timestamp}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-slate-400 truncate">{chat.lastMessage}</p>
                                {chat.unread > 0 && <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">{chat.unread}</span>}
                            </div>
                        </div>
                    </div>
                ))}
                {activeCategory === 'general' && communityPosts.map(post => <GeneralPostCard key={post.id} post={post} />)}
                {activeCategory === 'anonymous' && anonymousPosts.map(post => <GeneralPostCard key={post.id} post={post} />)}
                {activeCategory === 'trade' && tradePosts.map(post => <TradePostCard key={post.id} post={post} />)}
                {activeCategory === 'shop' && <ShopScreen />}
            </div>
        </div>
    );
};

const MatchDetailModal = ({ match, onClose }) => {
    const [aiCommentary, setAiCommentary] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const scoreDetail = match.scoreDetail ?? { myScore: [], opponentScore: [] };

    const handleGenerateCommentary = async () => {
        setIsLoading(true);
        setAiCommentary('AI가 경기 내용을 분석하고 있습니다...');

        if (!match.result || !match.score) {
            setAiCommentary('경기 결과가 확정된 이후에 해설을 생성할 수 있습니다.');
            setIsLoading(false);
            return;
        }

        const winner = match.result === 'win' ? currentUser.name : match.opponent.name;
        const myScoreText = scoreDetail.myScore.length > 0 ? scoreDetail.myScore.join(', ') : '득점 없음';
        const opponentScoreText = scoreDetail.opponentScore.length > 0 ? scoreDetail.opponentScore.join(', ') : '득점 없음';

        const prompt = `너는 검도 해설가야. 다음 경기 결과에 대한 해설을 작성해줘. 경기는 ${currentUser.name} 선수와 ${match.opponent.name} 선수 간에 치러졌어. 최종 스코어는 ${match.score}로 ${winner} 선수가 승리했어. ${currentUser.name} 선수는 ${myScoreText} 부위로 득점했고, ${match.opponent.name} 선수는 ${opponentScoreText} 부위로 득점했어. 이 정보를 바탕으로 박진감 넘치는 경기 해설을 작성해줘.`;

        const result = await callGemini(prompt);

        if (result.ok) {
            setAiCommentary(result.message);
        } else if (result.reason === 'missing_api_key') {
            setAiCommentary(`${currentUser.name} 선수의 빠른 한판이 빛난 경기였습니다. API 키가 설정되지 않아 기본 해설을 제공합니다.`);
        } else {
            setAiCommentary('해설 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }

        setIsLoading(false);
    };

    const PrivacySettingItem = ({ enabled, label }) => (
        <div className="flex items-center gap-2">
            {enabled ? <Unlock size={14} className="text-green-400" /> : <Lock size={14} className="text-red-400" />}
            <span className={cn("text-sm", enabled ? "text-slate-300" : "text-slate-500 line-through")}>{label}</span>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700">
                    <h2 className="text-lg font-bold">경기 상세 정보</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                
                <div className="p-4 overflow-y-auto space-y-4">
                    <Card>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <UserAvatar user={currentUser} size="sm" />
                                <p className="font-bold">{currentUser.name}</p>
                            </div>
                            <div className="text-center">
                                <p className={cn("font-bold text-xl", match.result === 'win' ? 'text-green-400' : match.result === 'loss' ? 'text-red-400' : 'text-slate-400')}>{match.result?.toUpperCase()}</p>
                                <p className="font-semibold">{match.score}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="font-bold text-right">{match.opponent.name}</p>
                                <UserAvatar user={match.opponent} size="sm" />
                            </div>
                        </div>
                        <p className="text-center text-sm text-slate-400 mt-2">{match.date}</p>
                    </Card>

                    {match.privacy === 'public' && (
                        <>
                            {match.videoUrl && <div className="bg-slate-900 aspect-video rounded-lg flex items-center justify-center"><Video className="w-12 h-12 text-white/50"/></div>}
                            <div className="flex justify-center gap-4">
                                <button className="flex items-center gap-2 text-slate-300 hover:text-green-400"><ThumbsUp/> {match.likes}</button>
                                <button className="flex items-center gap-2 text-slate-300 hover:text-red-400"><ThumbsDown/> {match.dislikes}</button>
                            </div>
                            
                            <Card>
                                <h3 className="font-semibold mb-2 text-blue-400">해설</h3>
                                {match.commentary && <p className="text-sm text-slate-300 italic">"{match.commentary}"</p>}
                                {aiCommentary && <p className="text-sm text-slate-300 italic whitespace-pre-wrap">"{aiCommentary}"</p>}
                                {!match.commentary && !aiCommentary && (
                                    <button onClick={handleGenerateCommentary} disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-blue-600/80 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors disabled:opacity-50">
                                        <Sparkles size={16} /> {isLoading ? '생성 중...' : '✨ AI 경기 요약 생성'}
                                    </button>
                                )}
                            </Card>

                            <div>
                                <h3 className="font-semibold mb-2">익명 댓글 ({match.comments.length})</h3>
                                <div className="space-y-2">
                                    {match.comments.map(c => <p key={c.id} className="text-sm bg-slate-700 p-2 rounded-lg">{c.text}</p>)}
                                </div>
                            </div>
                        </>
                    )}

                    {match.privacy === 'private' && (
                         <>
                            {match.privacySettings?.video ? 
                                <div className="bg-slate-900 aspect-video rounded-lg flex items-center justify-center"><Video className="w-12 h-12 text-white/50"/></div>
                                : <Card className="text-center text-slate-500">비공개 영상입니다.</Card>
                            }
                            <Card>
                                <h3 className="font-semibold mb-3 text-blue-400">공개 설정</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <PrivacySettingItem enabled={match.privacySettings?.video ?? false} label="영상 공개" />
                                    <PrivacySettingItem enabled={match.privacySettings?.comments ?? false} label="댓글 허용" />
                                    <PrivacySettingItem enabled={match.privacySettings?.likes ?? false} label="좋아요 허용" />
                                    <PrivacySettingItem enabled={match.privacySettings?.commentary ?? false} label="해설 공개" />
                                </div>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const ExamResultHistoryModal = ({ history, onClose }) => {
    const chartHeight = 150; const chartWidth = 300; const yPadding = 20; const xPadding = 30;
    const getX = (index) => xPadding + (index / (history.length - 1)) * (chartWidth - xPadding);
    const getY = (score) => chartHeight - yPadding - (score / 100) * (chartHeight - yPadding * 2);
    const linePath = history.length > 1 ? history.map((h, i) => `${getX(i)},${getY(h.score)}`).join(' ') : '';

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold">시험 결과 이력</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto">
                    <h3 className="font-semibold text-blue-400 mb-2">점수 추이</h3>
                    <div className="bg-slate-900/50 p-2 rounded-lg">
                        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
                            {[0, 25, 50, 75, 100].map(score => (
                                <g key={score}>
                                    <line x1={xPadding} y1={getY(score)} x2={chartWidth} y2={getY(score)} stroke="#475569" strokeDasharray="2" />
                                    <text x={xPadding - 8} y={getY(score) + 4} fill="#94a3b8" fontSize="10" textAnchor="end">{score}</text>
                                </g>
                            ))}
                            {history.length > 1 && <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={linePath} />}
                            {history.map((h, i) => (<circle key={i} cx={getX(i)} cy={getY(h.score)} r="3" fill="#3b82f6" /> ))}
                        </svg>
                    </div>
                    <h3 className="font-semibold text-blue-400 mt-4 mb-2">점수 목록</h3>
                    <div className="space-y-2">
                        {history.slice().reverse().map((item, index) => (
                            <div key={index} className="bg-slate-700/50 p-3 rounded-lg flex justify-between items-center">
                                <span className="text-sm">{item.date}</span>
                                <span className="font-bold text-lg">{item.score}점</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExamQuestionScreen = ({ questions, onFinish }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [userAnswers, setUserAnswers] = React.useState(() => questions.map(q => Array(q.answers.length).fill('')) );

    const handleAnswerChange = (blankIndex, value) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex][blankIndex] = value;
        setUserAnswers(newAnswers);
    };

    const currentQuestion = questions[currentQuestionIndex];
    const textParts = currentQuestion.questionText.split('[BLANK]');

    const handleSubmit = () => {
        let correctCount = 0;
        questions.forEach((q, qIndex) => {
            if (q.answers.every((ans, ansIndex) => userAnswers[qIndex][ansIndex].trim() === ans.trim())) {
                correctCount++;
            }
        });
        const finalScore = Math.round((correctCount / questions.length) * 100);
        onFinish(finalScore);
    };

    return (
        <div className="p-4 flex flex-col h-full">
            <div className="flex-grow overflow-y-auto">
                <p className="text-sm text-blue-400 font-semibold mb-2">문제 {currentQuestionIndex + 1} / {questions.length}</p>
                <h3 className="font-bold text-lg mb-4">{currentQuestion.title}</h3>
                <div className="text-slate-300 leading-relaxed text-sm">
                    {textParts.map((part, index) => (
                        <React.Fragment key={index}>
                            {part.split('\n').map((line, lineIndex) => <React.Fragment key={lineIndex}>{line}<br/></React.Fragment>)}
                            {index < textParts.length - 1 && (
                                <input type="text" value={userAnswers[currentQuestionIndex][index]} onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    className="inline-block w-24 mx-1 bg-slate-700 border-b-2 border-slate-500 focus:border-blue-400 text-center text-white outline-none" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700 flex-shrink-0">
                <button onClick={() => setCurrentQuestionIndex(i => i - 1)} disabled={currentQuestionIndex === 0} className="flex items-center gap-2 px-4 py-2 bg-slate-600 rounded-lg disabled:opacity-50">
                    <ChevronsLeft size={16} /> 이전
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                    <button onClick={() => setCurrentQuestionIndex(i => i + 1)} className="flex items-center gap-2 px-4 py-2 bg-slate-600 rounded-lg">
                        다음 <ChevronsRight size={16} />
                    </button>
                ) : (
                    <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg">제출하기</button>
                )}
            </div>
        </div>
    );
};

const ExamResultScreen = ({ score, onRetry, onViewResults }) => (
    <div className="p-4 text-center flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-bold mb-2">시험 결과</h2>
        <p className="text-6xl font-bold text-blue-400 mb-6">{score}<span className="text-2xl text-slate-400">점</span></p>
        <div className="w-full space-y-3">
             <button onClick={onViewResults} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">결과 보기</button>
            <button onClick={onRetry} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">다시 풀기</button>
        </div>
    </div>
);

const TheoryExamScreen = () => {
    const [testState, setTestState] = React.useState('idle'); // 'idle', 'ongoing', 'finished'
    const [questions, setQuestions] = React.useState([]);
    const [score, setScore] = React.useState(null);
    const [showHistory, setShowHistory] = React.useState(false);
    const [scoreHistory, setScoreHistory] = React.useState(testScoreHistory);

    const startTest = () => {
        const shuffled = [...kendoTheoryData].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 5)); // 5 problems
        setTestState('ongoing'); setScore(null);
    };

    const finishTest = (finalScore) => {
        setScore(finalScore);
        const newHistoryEntry = { date: new Date().toISOString().split('T')[0], score: finalScore };
        setScoreHistory(prev => [...prev, newHistoryEntry]);
        setTestState('finished');
    };

    const resetTest = () => { setTestState('idle'); setQuestions([]); setScore(null); };

    if (showHistory) { return <ExamResultHistoryModal history={scoreHistory} onClose={() => setShowHistory(false)} />; }
    switch (testState) {
        case 'ongoing': return <ExamQuestionScreen questions={questions} onFinish={finishTest} />;
        case 'finished': return <ExamResultScreen score={score} onRetry={resetTest} onViewResults={() => setShowHistory(true)} />;
        case 'idle': default: return (
            <div className="p-4 space-y-4">
                <Card className="text-center">
                    <h2 className="text-xl font-bold mb-2">학과 심사 모의 시험</h2>
                    <p className="text-sm text-slate-400 mb-4">랜덤으로 5문제가 출제됩니다.</p>
                    <button onClick={startTest} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">시험 시작</button>
                </Card>
                <Card className="text-center">
                     <h2 className="text-xl font-bold mb-2">지난 결과 보기</h2>
                    <p className="text-sm text-slate-400 mb-4">이전 시험 결과 및 점수 추이를 확인합니다.</p>
                    <button onClick={() => setShowHistory(true)} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">결과 보기</button>
                </Card>
            </div> );
    }
};

const InfoModal = ({ title, date, location, details, onClose, showApplyButton }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold">{title}</h2>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-300"><Calendar size={14} /> <span>{date}</span></div>
                <div className="flex items-center gap-2 text-sm text-slate-300"><MapPin size={14} /> <span>{location}</span></div>
                <p className="text-sm bg-slate-700/50 p-3 rounded-lg">{details}</p>
            </div>
            {showApplyButton && (
                <div className="p-4 flex-shrink-0">
                    <button onClick={() => alert('신청 완료!')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">신청하기</button>
                </div>
            )}
        </div>
    </div>
);

const PromotionCard = ({ item }) => (
    <Card>
        <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover rounded-lg mb-3" />
        <p className="text-xs text-blue-400 font-semibold">{item.organizer}</p>
        <h3 className="font-bold text-lg">{item.title}</h3>
        <p className="text-sm text-slate-400 mt-1">{item.content}</p>
    </Card>
);

const TravelPackageDetailModal = ({ pkg, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="relative">
                <img src={pkg.imageUrl} alt={pkg.destination} className="w-full h-40 object-cover rounded-t-2xl" />
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-white bg-black/50 rounded-full hover:bg-black/80"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-4">
                <h2 className="text-xl font-bold">{pkg.destination}</h2>
                <p className="text-sm text-slate-400">{pkg.description}</p>
                <div className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                    <p className="font-bold text-lg text-blue-400">{pkg.price}</p>
                    <div className="text-right">
                        <p className="font-semibold">{pkg.currentApplicants} / {pkg.maxApplicants}명</p>
                        <p className="text-xs text-slate-400">신청 현황</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-blue-400 mb-2">커리큘럼</h3>
                    <div className="space-y-1">
                        {pkg.details.curriculum.map((c, i) => <p key={i} className="text-sm bg-slate-700/20 p-2 rounded-md">{c}</p>)}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-blue-400 mb-2">참고 사항</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        {pkg.details.notes.map((n, i) => <li key={i}>{n}</li>)}
                    </ul>
                </div>
            </div>
            <div className="p-4 flex-shrink-0">
                <button disabled={pkg.isConfirmed} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">
                    {pkg.isConfirmed ? '모집 마감' : '참가 신청'}
                </button>
            </div>
        </div>
    </div>
);

const AnnouncementsScreen = () => {
    const [activeTab, setActiveTab] = React.useState('theory_exam');
    const [modalContent, setModalContent] = React.useState(null);
    const [selectedTravelPackage, setSelectedTravelPackage] = React.useState(null);

    const announceTabs = [
        { id: 'theory_exam', label: '학과심사' }, { id: 'kka', label: '대한검도회' },
        { id: 'promo', label: '홍보' }, { id: 'training', label: '무도수행' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'theory_exam': return <TheoryExamScreen />;
            case 'kka': return (
                <div className="space-y-4">
                    <h2 className="font-semibold text-lg px-1 text-slate-300">대한검도회 공지</h2>
                    <Card>
                        <h3 className="text-lg font-semibold mb-2 text-blue-400">공식 시합</h3>
                        <p className="text-sm text-slate-300 mb-4">엑셀파일을 업로드하면, 자동으로 대련자와 매칭되어 시스템 업로드됩니다.</p>
                        <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors">
                            <FileUp size={18} /> 엑셀 파일 업로드
                        </button>
                    </Card>
                    <Card>
                         <h3 className="text-lg font-semibold mb-2 text-blue-400">심사 일정</h3>
                         <div className="space-y-2">
                            {danPromotions.map(p => (
                                <div key={p.id} className="flex justify-between items-center bg-slate-700/50 p-2 rounded-lg">
                                    <p className="font-medium text-sm">{p.title}</p>
                                    <button onClick={() => setModalContent({ ...p, type: 'apply' })} className="text-xs bg-slate-600 px-2 py-1 rounded">보기</button>
                                </div>
                            ))}
                         </div>
                    </Card>
                     <Card>
                         <h3 className="text-lg font-semibold mb-2 text-blue-400">강습회 일정</h3>
                         <div className="space-y-2">
                            {seminars.map(s => (
                                <div key={s.id} className="flex justify-between items-center bg-slate-700/50 p-2 rounded-lg">
                                    <p className="font-medium text-sm">{s.title}</p>
                                    <button onClick={() => setModalContent({ ...s, type: 'apply' })} className="text-xs bg-slate-600 px-2 py-1 rounded">보기</button>
                                </div>
                            ))}
                         </div>
                    </Card>
                </div> );
            case 'promo': return ( <div className="space-y-4"> {promoItems.map(item => <PromotionCard key={item.id} item={item} />)} </div> );
            case 'training': return (
                <div className="space-y-4">
                    <Card className="border-red-500/50 bg-red-500/10">
                         <h2 className="text-lg font-semibold mb-2 text-red-400 flex items-center gap-2"><Info/> 사전 강습 안내</h2>
                         <p className="text-sm text-slate-300">일본으로의 방문은 사전 2회에 걸친 강습이 필수입니다. 기본 일본어, 일본식 예법에 대한 강습이 진행되오니 반드시 참여해주시기 바랍니다.</p>
                    </Card>
                    {japanTravelPackages.map(pkg => (
                        <Card key={pkg.id} onClick={() => setSelectedTravelPackage(pkg)} className={cn(pkg.isConfirmed && "opacity-60")}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-slate-200">{pkg.destination}</p>
                                    <p className="text-xs text-slate-400">{pkg.duration}</p>
                                </div>
                                <div className="text-right">
                                     <p className="font-bold text-blue-400">{pkg.price}</p>
                                     {pkg.isConfirmed && <CheckCircle2 className="w-5 h-5 text-green-400 inline-block ml-2" />}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div> );
        }
    };

    return (
        <>
            <div className="p-4 space-y-4 text-white">
                <h1 className="text-2xl font-bold">공지 & 이벤트</h1>
                <div className="flex border-b border-slate-700 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {announceTabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn('px-4 py-2 text-sm font-semibold whitespace-nowrap', activeTab === tab.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 border-b-2 border-transparent hover:text-slate-200')}>
                            {tab.label}
                        </button>
                    ))}
                </div>
                {renderContent()}
            </div>
            {modalContent && ( <InfoModal {...modalContent} onClose={() => setModalContent(null)} showApplyButton={modalContent.type === 'apply'} /> )}
            {selectedTravelPackage && <TravelPackageDetailModal pkg={selectedTravelPackage} onClose={() => setSelectedTravelPackage(null)} />}
        </>
    );
};

const AIAnalysisModal = ({ user, onClose }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [analysis, setAnalysis] = React.useState('');

    React.useEffect(() => {
        const generateAnalysis = async () => {
            const stats = user.detailedStats;
            const interestingStatsText = stats.interestingStats.map(s => `${s.label}: ${s.value}`).join('\n');
            const prompt = `너는 검도 코치야. 다음 검도 수련자의 데이터를 보고, 이 사람의 검도 스타일, 강점, 그리고 개선점을 분석해줘. 친절하고 격려하는 말투로 답변해줘. 각 항목을 명확하게 구분해서 설명해줘.

### 선수 데이터
- **이름**: ${user.name}
- **공식 단수**: ${user.officialRank}
- **주특기**: ${user.specialty}
- **특징**: ${user.characteristics.join(', ')}
- **전체 전적**: ${user.wins}승 ${user.losses}패
- **득점 부위 분석**: 머리 ${stats.scoringBreakdown.head}%, 손목 ${stats.scoringBreakdown.wrist}%, 허리 ${stats.scoringBreakdown.waist}%, 찌름 ${stats.scoringBreakdown.thrust}%
- **고단자 상대 전적**: ${stats.vsHigherRank.wins}승 ${stats.vsHigherRank.losses}패 ${stats.vsHigherRank.draws}무
- **주요 기록**:
${interestingStatsText}`;

            const result = await callGemini(prompt);

            if (result.ok) {
                setAnalysis(result.message);
            } else if (result.reason === 'missing_api_key') {
                setAnalysis('API 키가 설정되지 않아 준비된 분석을 제공합니다. 현재 수비적 성향과 손목 득점 비중이 높아 안정감 있는 플레이가 돋보이며, 허리와 찌름 득점을 보완하면 더 완성도 높은 경기를 펼칠 수 있습니다.');
            } else {
                setAnalysis('분석 데이터를 생성하는 데 실패했습니다. 다시 시도해주세요.');
            }

            setIsLoading(false);
        };

        generateAnalysis();
    }, [user]);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold flex items-center gap-2"><Sparkles className="text-yellow-400" size={20}/> AI 스타일 분석</h2>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-4 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-48">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
                            <p className="mt-4 text-slate-400">AI가 데이터를 분석 중입니다...</p>
                        </div>
                    ) : (
                        <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{analysis}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProfileScreen = ({ user, onNavigate }) => {
    const [expandedRecord, setExpandedRecord] = React.useState(null);
    const [isAiModalOpen, setIsAiModalOpen] = React.useState(false);

    const toggleRecord = (type) => {
        setExpandedRecord(prev => (prev === type ? null : type));
    };

    const matchesToShow = mockMatchHistory.filter(m => m.status === 'completed' && m.result === expandedRecord);

    return (
        <>
            <div className="p-4 space-y-6 text-white">
                <Card>
                    <div className="flex items-center gap-4">
                        <UserAvatar user={user} size="lg" />
                        <div className="flex-1">
                             <h1 className="text-2xl font-bold">{user.name}</h1>
                            <p className="text-slate-400">{user.dojang} · {user.location}</p>
                            <div className="mt-2 flex items-center gap-4">
                                <span className="font-semibold text-yellow-400 flex items-center gap-1.5"><Star className="w-4 h-4" />{user.officialRank}</span>
                                <span className="font-semibold text-blue-400">{user.platformRank}P</span>
                            </div>
                        </div>
                    </div>
                </Card>
                
                <Card onClick={() => setIsAiModalOpen(true)} className="bg-gradient-to-r from-purple-500/30 to-blue-500/30 border-purple-500/50">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-6 h-6 text-yellow-300" />
                            <p className="font-bold text-lg">✨ AI로 내 검도 스타일 분석하기</p>
                        </div>
                        <ChevronsRight className="w-6 h-6 text-purple-400" />
                    </div>
                </Card>

                <div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <Card onClick={() => toggleRecord('win')}>
                            <div className="flex justify-center items-center gap-2">
                                <p className="text-2xl font-bold text-green-400">{user.wins}</p>
                                <p className="text-sm text-slate-400">승리</p>
                                <ChevronDown className={cn("transition-transform text-slate-400", expandedRecord === 'win' && "rotate-180")} size={20}/>
                            </div>
                        </Card>
                        <Card onClick={() => toggleRecord('loss')}>
                            <div className="flex justify-center items-center gap-2">
                                <p className="text-2xl font-bold text-red-400">{user.losses}</p>
                                <p className="text-sm text-slate-400">패배</p>
                                 <ChevronDown className={cn("transition-transform text-slate-400", expandedRecord === 'loss' && "rotate-180")} size={20}/>
                            </div>
                        </Card>
                    </div>
                    {expandedRecord && (
                        <div className="mt-2 bg-slate-800/50 border border-slate-700 rounded-xl p-2 max-h-60 overflow-y-auto">
                            <div className="space-y-1">
                            {matchesToShow.map(match => (
                                <div key={match.id} className="bg-slate-700/50 p-2 rounded-md text-sm flex justify-between items-center">
                                    <span className="truncate">vs {match.opponent.name} ({match.date})</span>
                                    <span className="font-semibold flex-shrink-0 ml-2">{match.score}</span>
                                </div>
                            ))}
                            </div>
                        </div>
                    )}
                </div>

                <Card>
                    <h3 className="font-semibold text-lg mb-3">뱃지</h3>
                    <div className="flex justify-around">
                        {user.badges.map(badge => <Badge key={badge} type={badge} />)}
                    </div>
                </Card>
                
                <Card onClick={() => onNavigate('matchHistory')} className="bg-blue-600/30 border-blue-500/50">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <FileText className="w-6 h-6 text-blue-300" />
                            <p className="font-bold text-lg">전체 전적 보기</p>
                        </div>
                        <ChevronsRight className="w-6 h-6 text-blue-400" />
                    </div>
                </Card>

                <Card>
                    <h3 className="font-semibold text-lg mb-3">나의 스타일</h3>
                    <div className="space-y-2">
                        <p className="text-sm"><strong className="text-slate-400 w-16 inline-block">특기:</strong> {user.specialty}</p>
                        <div className="flex items-start">
                            <strong className="text-slate-400 w-16 inline-block pt-1">특징:</strong>
                            <div className="flex flex-wrap gap-2 flex-1">
                                {user.characteristics.map(c => <span key={c} className="bg-slate-700 text-xs font-medium px-2 py-1 rounded-full">{c}</span>)}
                            </div>
                        </div>
                    </div>
                </Card>

                <DetailedStatsCard stats={user.detailedStats} />
            </div>

            {isAiModalOpen && <AIAnalysisModal user={user} onClose={() => setIsAiModalOpen(false)} />}
        </>
    );
};

const MatchHistoryScreen = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = React.useState('completed');
    const [selectedMatch, setSelectedMatch] = React.useState(null);

    const filteredMatches = mockMatchHistory.filter(m => m.status === activeTab);

    const MatchHistoryItem = ({ match }) => {
        const isWin = match.result === 'win';
        const isLoss = match.result === 'loss';
        const isDraw = match.result === 'draw';

        return (
            <Card onClick={() => setSelectedMatch(match)}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <UserAvatar user={match.opponent} size="sm" />
                        <div>
                            <p className="font-semibold">{match.opponent.name}</p>
                            <p className="text-sm text-slate-400">{match.date} {match.time || ''}</p>
                        </div>
                    </div>
                    {match.status === 'completed' && (
                        <div className="text-right">
                            <p className={cn( "font-bold text-lg", isWin && "text-green-400", isLoss && "text-red-400", isDraw && "text-slate-400" )}>{match.result?.toUpperCase()}</p>
                            <p className="text-sm font-semibold">{match.score}</p>
                        </div>
                    )}
                    {match.status === 'upcoming' && ( <div className="text-right"><p className="font-bold text-blue-400">예정</p></div> )}
                </div>
            </Card>
        );
    };

    return (
        <>
            <div className="p-4 space-y-4 text-white">
                <div className="flex items-center gap-2">
                    <button onClick={() => onNavigate('profile')} className="p-2 text-slate-300 hover:text-white"><ChevronsLeft size={24} /></button>
                    <h1 className="text-2xl font-bold">전적</h1>
                </div>
                <div className="flex bg-slate-800 p-1 rounded-lg">
                    <button onClick={() => setActiveTab('completed')} className={cn('w-1/2 py-2 rounded-md text-sm font-semibold', activeTab === 'completed' ? 'bg-blue-600' : 'hover:bg-slate-700')}>완료된 경기</button>
                    <button onClick={() => setActiveTab('upcoming')} className={cn('w-1/2 py-2 rounded-md text-sm font-semibold', activeTab === 'upcoming' ? 'bg-blue-600' : 'hover:bg-slate-700')}>예정된 경기</button>
                </div>
                <div className="space-y-3">
                    {filteredMatches.map(match => <MatchHistoryItem key={match.id} match={match} />)}
                </div>
            </div>
            {selectedMatch && <MatchDetailModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />}
        </>
    );
};

// --- MAIN APP COMPONENT ---
const KendoAppPage = () => {
  const [activeTab, setActiveTab] = React.useState('home');
  const [notifications, setNotifications] = React.useState(mockNotifications);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [selectedNotification, setSelectedNotification] = React.useState(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSelectNotification = (notification) => {
      setSelectedNotification(notification);
      setNotifications(notifications.map(n => n.id === notification.id ? { ...n, read: true } : n));
      setShowNotifications(false);
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen user={currentUser} onNavigate={setActiveTab} notifications={notifications.filter(n => !n.read)} onSelectNotification={handleSelectNotification} />;
      case 'match':
        return <MatchScreen />;
      case 'ranking':
        return <RankingScreen />;
      case 'community':
        return <CommunityScreen />;
      case 'announcements':
        return <AnnouncementsScreen />;
      case 'profile':
        return <ProfileScreen user={currentUser} onNavigate={setActiveTab} />;
      case 'matchHistory':
        return <MatchHistoryScreen onNavigate={setActiveTab} />;
      default:
        return <HomeScreen user={currentUser} onNavigate={setActiveTab} notifications={notifications.filter(n => !n.read)} onSelectNotification={handleSelectNotification} />;
    }
  };

  const navItems = [
    { id: 'home', label: '홈', icon: <Home /> },
    { id: 'match', label: '대련', icon: <Swords /> },
    { id: 'ranking', label: '랭킹', icon: <Trophy /> },
    { id: 'community', label: '커뮤니티', icon: <Users /> },
    { id: 'announcements', label: '수련', icon: <Megaphone /> },
    { id: 'profile', label: '프로필', icon: <UserIcon /> },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 font-sans">
      <style>{`
        @keyframes thrust {
            0%, 100% { transform: translateX(0) rotate(-15deg); }
            50% { transform: translateX(20px) rotate(-15deg); }
        }
        .animate-thrust {
            animation: thrust 1.5s ease-in-out infinite;
        }
      `}</style>
      <div className="w-full max-w-sm h-[800px] max-h-[90vh] bg-slate-950 rounded-3xl shadow-2xl shadow-blue-900/20 border-4 border-slate-800 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 border-b border-slate-800 flex-shrink-0">
            <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-blue-400" />
                <h1 className="font-bold text-xl text-white">일주일에 2회, 주이회</h1>
            </div>
            <div className="flex items-center gap-2">
                <NotificationBell count={unreadCount} onClick={() => setShowNotifications(true)} />
                <button className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                    <Settings className="w-5 h-5 text-slate-400" />
                </button>
            </div>
        </header>

        <div className="flex-grow overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#334155 #1e293b' }}>
          {renderContent()}
        </div>

        <nav className="flex justify-around items-center p-2 border-t border-slate-800 bg-slate-950/80 backdrop-blur-sm flex-shrink-0">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn( 'flex flex-col items-center justify-center w-1/5 p-1 rounded-lg transition-all duration-200', 'text-slate-400 hover:bg-slate-800', activeTab === item.id || (activeTab === 'matchHistory' && item.id === 'profile') ? 'text-blue-400' : '' )} >
              <div className={cn('mb-1 transition-transform', activeTab === item.id ? 'scale-110' : 'scale-100')}>{item.icon}</div>
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {showNotifications && <NotificationModal notifications={notifications} onSelect={handleSelectNotification} onClose={() => setShowNotifications(false)} />}
      {selectedNotification && <NotificationDetailModal notification={selectedNotification} onClose={() => setSelectedNotification(null)} />}
    </main>
  );
};

export default KendoAppPage;
