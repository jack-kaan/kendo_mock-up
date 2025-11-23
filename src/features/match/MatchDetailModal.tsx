import React from 'react';
import { X, Video, ThumbsUp, ThumbsDown, Sparkles, Unlock, Lock } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { Card } from '../../components/ui/Card';
import { UserAvatar } from '../../components/ui/UserAvatar';
import { Match } from '../../types';
import { currentUser } from '../../data/mockData';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface MatchDetailModalProps {
    match: Match;
    onClose: () => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({ match, onClose }) => {
    const [aiCommentary, setAiCommentary] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleGenerateCommentary = async () => {
        setIsLoading(true);
        setAiCommentary("AI가 경기 내용을 분석하고 있습니다...");

        const winner = match.result === 'win' ? currentUser.name : match.opponent.name;
        const myScoreText = match.scoreDetail?.myScore.length ? match.scoreDetail.myScore.join(', ') : "득점 없음";
        const opponentScoreText = match.scoreDetail?.opponentScore.length ? match.scoreDetail.opponentScore.join(', ') : "득점 없음";

        const prompt = `너는 검도 해설가야. 다음 경기 결과에 대한 해설을 작성해줘. 경기는 ${currentUser.name} 선수와 ${match.opponent.name} 선수 간에 치러졌어. 최종 스코어는 ${match.score}로 ${winner} 선수가 승리했어. ${currentUser.name} 선수는 ${myScoreText} 부위로 득점했고, ${match.opponent.name} 선수는 ${opponentScoreText} 부위로 득점했어. 이 정보를 바탕으로 박진감 넘치는 경기 해설을 작성해줘.`;

        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            const apiKey = ""
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setAiCommentary(text);
            } else {
                setAiCommentary("해설 생성에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("Error generating commentary:", error);
            setAiCommentary("오류가 발생했습니다. 네트워크 연결을 확인해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    const PrivacySettingItem = ({ enabled, label }: { enabled: boolean; label: string }) => (
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
                            {match.videoUrl && <div className="bg-slate-900 aspect-video rounded-lg flex items-center justify-center"><Video className="w-12 h-12 text-white/50" /></div>}
                            <div className="flex justify-center gap-4">
                                <button className="flex items-center gap-2 text-slate-300 hover:text-green-400"><ThumbsUp /> {match.likes}</button>
                                <button className="flex items-center gap-2 text-slate-300 hover:text-red-400"><ThumbsDown /> {match.dislikes}</button>
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
                                <h3 className="font-semibold mb-2">익명 댓글 ({match.comments?.length || 0})</h3>
                                <div className="space-y-2">
                                    {match.comments?.map(c => <p key={c.id} className="text-sm bg-slate-700 p-2 rounded-lg">{c.text}</p>)}
                                </div>
                            </div>
                        </>
                    )}

                    {match.privacy === 'private' && (
                        <>
                            {match.privacySettings?.video ?
                                <div className="bg-slate-900 aspect-video rounded-lg flex items-center justify-center"><Video className="w-12 h-12 text-white/50" /></div>
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
