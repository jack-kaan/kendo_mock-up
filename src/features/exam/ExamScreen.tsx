import React from 'react';
import { BookOpen, History, Award } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { ExamQuestionScreen } from './ExamQuestionScreen';
import { ExamResultHistoryModal } from './ExamResultHistoryModal';
import { kendoTheoryData, testScoreHistory } from '../../data/mockData';
import { ExamQuestion } from '../../types';

export const ExamScreen: React.FC = () => {
    const [testState, setTestState] = React.useState<'idle' | 'ongoing' | 'finished'>('idle');
    const [questions, setQuestions] = React.useState<ExamQuestion[]>([]);
    const [score, setScore] = React.useState<number | null>(null);
    const [showHistory, setShowHistory] = React.useState(false);
    const [scoreHistory, setScoreHistory] = React.useState(testScoreHistory);

    const startTest = () => {
        const shuffled = [...kendoTheoryData].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 5)); // 5 problems
        setTestState('ongoing');
        setScore(null);
    };

    const finishTest = (finalScore: number) => {
        setScore(finalScore);
        const newHistoryEntry = { date: new Date().toISOString().split('T')[0], score: finalScore };
        setScoreHistory(prev => [...prev, newHistoryEntry]);
        setTestState('finished');
    };

    const resetTest = () => {
        setTestState('idle');
        setQuestions([]);
        setScore(null);
    };

    const ExamResultScreen = ({ score, onRetry, onViewResults }: { score: number, onRetry: () => void, onViewResults: () => void }) => (
        <div className="p-4 text-center flex flex-col items-center justify-center h-full">
            <h2 className="text-xl font-bold mb-2">시험 결과</h2>
            <p className="text-6xl font-bold text-blue-400 mb-6">{score}<span className="text-2xl text-slate-400">점</span></p>
            <div className="w-full space-y-3">
                <button onClick={onViewResults} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">결과 보기</button>
                <button onClick={onRetry} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">다시 풀기</button>
            </div>
        </div>
    );

    if (showHistory) { return <ExamResultHistoryModal history={scoreHistory} onClose={() => setShowHistory(false)} />; }

    switch (testState) {
        case 'ongoing': return <ExamQuestionScreen questions={questions} onFinish={finishTest} />;
        case 'finished': return <ExamResultScreen score={score!} onRetry={resetTest} onViewResults={() => setShowHistory(true)} />;
        case 'idle': default: return (
            <div className="p-4 space-y-4 text-white pb-20">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">학과 시험</h1>
                    <button onClick={() => setShowHistory(true)} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
                        <History size={20} />
                    </button>
                </div>

                <Card className="bg-gradient-to-r from-blue-900 to-slate-900 border-blue-500/50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-full">
                            <Award className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                            <p className="font-bold text-lg">나의 평균 점수</p>
                            <p className="text-3xl font-bold text-white">85.5<span className="text-sm text-slate-400 font-normal ml-1">점</span></p>
                        </div>
                    </div>
                </Card>

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
            </div>
        );
    }
};
