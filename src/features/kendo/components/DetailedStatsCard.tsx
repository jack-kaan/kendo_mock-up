import type { FC } from 'react';
import { useState } from 'react';
import { BarChart2, ChevronDown } from 'lucide-react';

import type { KendoUser } from '@/types/kendo';
import { cn } from '@/lib/cn';
import { Card } from './layout';
import {
  PieChart,
  RadarChart,
  StackedBarChart,
  StatDistributionGraph,
  type ChartDatum,
} from './charts';

type DetailedStats = KendoUser['detailedStats'];

interface DetailedStatsCardProps {
  stats: DetailedStats;
}

interface MatchRecord {
  wins: number;
  losses: number;
}

const parseRecord = (record: string): MatchRecord => {
  const winMatch = record.match(/(\d+)승/);
  const lossMatch = record.match(/(\d+)패/);

  return {
    wins: winMatch ? Number.parseInt(winMatch[1], 10) : 0,
    losses: lossMatch ? Number.parseInt(lossMatch[1], 10) : 0,
  };
};

export const DetailedStatsCard: FC<DetailedStatsCardProps> = ({ stats }) => {
  const { scoringBreakdown, homeAway, vsHigherRank, interestingStats } = stats;
  const [expandedStat, setExpandedStat] = useState<string | null>(null);

  const homeRecord = parseRecord(homeAway.home);
  const awayRecord = parseRecord(homeAway.away);

  const homePieData: ChartDatum[] = [
    { label: '승', value: homeRecord.wins, color: '#4ade80' },
    { label: '패', value: homeRecord.losses, color: '#f87171' },
  ];

  const awayPieData: ChartDatum[] = [
    { label: '승', value: awayRecord.wins, color: '#4ade80' },
    { label: '패', value: awayRecord.losses, color: '#f87171' },
  ];

  const vsHigherRankData: ChartDatum[] = [
    { label: '승', value: vsHigherRank.wins, color: '#4ade80' },
    { label: '패', value: vsHigherRank.losses, color: '#f87171' },
    { label: '무', value: vsHigherRank.draws, color: '#94a3b8' },
  ];

  const toggleStat = (statLabel: string) => {
    setExpandedStat((current) => (current === statLabel ? null : statLabel));
  };

  return (
    <Card className="border-blue-500/50">
      <h3 className="mb-4 flex items-center text-lg font-semibold">
        <BarChart2 className="mr-2 h-5 w-5 text-blue-400" />
        분석 결과
      </h3>
      <div className="space-y-6">
        <div>
          <h4 className="mb-2 font-semibold text-slate-300">득점 부위 분석</h4>
          <div className="flex items-center justify-center rounded-lg bg-slate-900/50 p-2">
            <RadarChart data={scoringBreakdown} size={220} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <h4 className="mb-2 font-semibold text-slate-300">홈 성적</h4>
            <div className="mb-2 flex justify-center">
              <PieChart data={homePieData} />
            </div>
            <p className="text-sm">
              <span className="text-green-400">{homeRecord.wins}승</span> /{' '}
              <span className="text-red-400">{homeRecord.losses}패</span>
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-slate-300">어웨이 성적</h4>
            <div className="mb-2 flex justify-center">
              <PieChart data={awayPieData} />
            </div>
            <p className="text-sm">
              <span className="text-green-400">{awayRecord.wins}승</span> /{' '}
              <span className="text-red-400">{awayRecord.losses}패</span>
            </p>
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-semibold text-slate-300">고단자 상대 통계</h4>
          <div className="rounded-lg bg-slate-700/50 p-3">
            <StackedBarChart data={vsHigherRankData} />
            <div className="mt-2 flex justify-around text-xs">
              <span className="font-bold text-green-400">{vsHigherRank.wins}승</span>
              <span className="font-bold text-red-400">{vsHigherRank.losses}패</span>
              <span className="font-bold text-slate-400">{vsHigherRank.draws}무</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-semibold text-slate-300">흥미로운 기록</h4>
          <div className="space-y-1 rounded-lg bg-slate-800 p-2 text-sm">
            {interestingStats.map((stat) => (
              <div
                key={stat.label}
                className="border-b border-slate-700/50 py-2 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => toggleStat(stat.label)}
                  className="flex w-full items-center justify-between text-left text-slate-400"
                >
                  <span>{stat.label}</span>
                  <span className="flex items-center gap-2 text-base font-semibold text-white">
                    {stat.value}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        expandedStat === stat.label && 'rotate-180',
                      )}
                    />
                  </span>
                </button>
                {expandedStat === stat.label && <StatDistributionGraph />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
