import React from 'react';
import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ExamQuestion } from '../../types';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ExamQuestionScreenProps {
    questions: ExamQuestion[];
    onFinish: (score: number) => void;
}

export const ExamQuestionScreen: React.FC<ExamQuestionScreenProps> = ({ questions, onFinish }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [userAnswers, setUserAnswers] = React.useState<string[][]>(() => questions.map(q => Array(q.answers.length).fill('')));

    const handleAnswerChange = (blankIndex: number, value: string) => {
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
        <div className="p-4 flex flex-col h-full text-white">
            <div className="flex-grow overflow-y-auto">
                <p className="text-sm text-blue-400 font-semibold mb-2">문제 {currentQuestionIndex + 1} / {questions.length}</p>
                <h3 className="font-bold text-lg mb-4">{currentQuestion.title}</h3>
                <div className="text-slate-300 leading-relaxed text-sm">
                    {textParts.map((part, index) => (
                        <React.Fragment key={index}>
                            {part.split('\n').map((line, lineIndex) => <React.Fragment key={lineIndex}>{line}<br /></React.Fragment>)}
                            {index < textParts.length - 1 && (
                                <input
                                    type="text"
                                    value={userAnswers[currentQuestionIndex][index] || ''}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    className="inline-block w-24 mx-1 bg-slate-700 border-b-2 border-slate-500 focus:border-blue-400 text-center text-white outline-none"
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
                {currentQuestion.imageUrl && (
                    <img src={currentQuestion.imageUrl} alt="참고 이미지" className="mt-4 rounded-lg w-full max-w-xs mx-auto" />
                )}
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700 flex-shrink-0">
                <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-600 rounded-lg disabled:opacity-50"
                >
                    <ChevronsLeft size={16} /> 이전
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                    <button
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-600 rounded-lg"
                    >
                        다음 <ChevronsRight size={16} />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-green-600 rounded-lg font-bold"
                    >
                        제출하기
                    </button>
                )}
            </div>
        </div>
    );
};
