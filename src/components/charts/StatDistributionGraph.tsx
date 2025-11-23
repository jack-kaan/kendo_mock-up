import React from 'react';

export const StatDistributionGraph: React.FC = () => {
    const userPercentile = React.useMemo(() => Math.random() * 80 + 10, []);

    return (
        <div className="mt-2 p-3 bg-slate-900/50 rounded-lg">
            <p className="text-xs text-center text-slate-400 mb-2">전체 사용자 중 나의 위치</p>
            <div className="relative w-full h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full">
                <div className="absolute h-full flex items-center" style={{ left: `${userPercentile}%`, transform: 'translateX(-50%)' }}>
                    <div className="w-1 h-6 bg-white rounded-full border-2 border-slate-900"></div>
                    <div className="absolute -top-5 text-xs font-bold text-white whitespace-nowrap">나</div>
                </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>하위</span>
                <span>평균</span>
                <span>상위</span>
            </div>
            <p className="text-center text-sm font-semibold text-blue-300 mt-2">상위 {100 - Math.round(userPercentile)}%</p>
        </div>
    );
};
