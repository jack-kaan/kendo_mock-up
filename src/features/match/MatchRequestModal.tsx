import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { Card } from '../../components/ui/Card';
import { UserAvatar } from '../../components/ui/UserAvatar';
import { KendoUser } from '../../types';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface MatchRequestModalProps {
    user: KendoUser;
    onClose: () => void;
}

export const MatchRequestModal: React.FC<MatchRequestModalProps> = ({ user, onClose }) => {
    const [message, setMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [matchType, setMatchType] = React.useState('public');
    const [privacySettings, setPrivacySettings] = React.useState({ video: true, comments: true, likes: true, commentary: true });
    const [isSent, setIsSent] = React.useState(false);

    const handleCheckboxChange = (key: keyof typeof privacySettings) => { setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] })); };

    const handleGenerateMessage = async () => {
        setIsLoading(true);
        setMessage("생성 중...");
        const date = new Date().toISOString().split('T')[0];
        const prompt = `너는 검도를 즐기는 예의 바른 검도인이야. ${user.name}님에게 대련을 신청하려고 해. 정중하고 친근한 어조로 대련 신청 메시지를 작성해줘. 날짜는 ${date} 근처로 제안해줘.`;

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
                setMessage(text);
            } else {
                setMessage("메시지 생성에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("Error generating message:", error);
            setMessage("오류가 발생했습니다. 네트워크 연결을 확인해주세요.");
        } finally {
            setIsLoading(false);
        }
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
                                        <input type="checkbox" checked={privacySettings[key as keyof typeof privacySettings]} onChange={() => handleCheckboxChange(key as keyof typeof privacySettings)} className="w-4 h-4 accent-blue-500" />
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
