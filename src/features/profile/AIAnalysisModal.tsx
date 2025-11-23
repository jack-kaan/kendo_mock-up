import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { KendoUser } from '../../types';

interface AIAnalysisModalProps {
    user: KendoUser;
    onClose: () => void;
}

export const AIAnalysisModal: React.FC<AIAnalysisModalProps> = ({ user, onClose }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [analysis, setAnalysis] = React.useState('');

    React.useEffect(() => {
        const generateAnalysis = async () => {
            const stats = user.detailedStats;
            if (!stats) return;
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
                    setAnalysis(text);
                } else {
                    setAnalysis("분석 데이터를 생성하는 데 실패했습니다. 다시 시도해주세요.");
                }
            } catch (error) {
                console.error("Error generating analysis:", error);
                setAnalysis("오류가 발생했습니다. 네트워크 연결을 확인해주세요.");
            } finally {
                setIsLoading(false);
            }
        };

        generateAnalysis();
    }, [user]);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-lg font-bold flex items-center gap-2"><Sparkles className="text-yellow-400" size={20} /> AI 스타일 분석</h2>
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
