import React from 'react';
import { BarChart2, ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { Card } from '../../components/ui/Card';
import { RadarChart } from '../../components/charts/RadarChart';
import { PieChart } from '../../components/charts/PieChart';
import { StackedBarChart } from '../../components/charts/StackedBarChart';
import { StatDistributionGraph } from '../../components/charts/StatDistributionGraph';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface DetailedStatsCardProps {
    stats: {
        year: number;
        scoringBreakdown: { head: number; wrist: number; waist: number; thrust: number };
        homeAway: { home: string; away: string };
        vsHigherRank: { wins: number; losses: number; draws: number };
        interestingStats: { label: string; value: string }[];
    };
}

export const DetailedStatsCard: React.FC<DetailedStatsCardProps> = ({ stats }) => {
    const { scoringBreakdown, homeAway, vsHigherRank, interestingStats } = stats;
    const [expandedStat, setExpandedStat] = React.useState<string | null>(null);

    const parseRecord = (recordStr: string) => {
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
            <h3 className="font-semibold text-lg flex items-center mb-4"><BarChart2 className="w-5 h-5 mr-2 text-blue-400" />분석 결과</h3>
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
                                        <ChevronDown className={cn("transition-transform", expandedStat === stat.label && "rotate-180")} size={16} />
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
