import React from 'react';
import { cn } from '../../../utils/cn';

export const StatDistributionGraph: React.FC = () => {
  const userPercentile = React.useMemo(() => Math.random() * 80 + 10, []);

  return (
    <div className="mt-2 p-3 bg-slate-900/50 rounded-lg">
      <p className="text-xs text-center text-slate-400 mb-2">전체 사용자 중 나의 위치</p>
      <div className="relative w-full h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full">
        <div
          className="absolute h-full flex items-center"
          style={{ left: `${userPercentile}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-1 h-6 bg-white rounded-full border-2 border-slate-900" />
          <div className="absolute -top-5 text-xs font-bold text-white whitespace-nowrap">나</div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-slate-500 mt-1">
        <span>하위</span>
        <span>평균</span>
        <span>상위</span>
      </div>
      <p className="text-center text-sm font-semibold text-blue-300 mt-2">
        상위 {100 - Math.round(userPercentile)}%
      </p>
    </div>
  );
};

interface RadarChartProps {
  data: Record<string, number>;
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, size = 200 }) => {
  const labels = { head: '머리', wrist: '손목', waist: '허리', thrust: '찌름' } as const;
  const keys = Object.keys(labels);
  const center = size / 2;
  const radius = size * 0.35;
  const numAxes = keys.length;
  const angleSlice = (Math.PI * 2) / numAxes;
  const maxVal = Math.max(...Object.values(data));

  const points = keys
    .map((key, index) => {
      const angle = angleSlice * index - Math.PI / 2;
      const r = (data[key] / maxVal) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[0.25, 0.5, 0.75, 1].map((scale) => (
        <polygon
          key={scale}
          points={keys
            .map((_, index) => {
              const angle = angleSlice * index - Math.PI / 2;
              const r = radius * scale;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(' ')}
          className="fill-none stroke-slate-600"
        />
      ))}
      {keys.map((_, index) => {
        const angle = angleSlice * index - Math.PI / 2;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return <line key={index} x1={center} y1={center} x2={x} y2={y} className="stroke-slate-600" />;
      })}
      <polygon points={points} className="fill-blue-500/50 stroke-blue-400" strokeWidth={2} />
      {keys.map((key, index) => {
        const angle = angleSlice * index - Math.PI / 2;
        const x = center + (radius + 20) * Math.cos(angle);
        const y = center + (radius + 20) * Math.sin(angle);
        return (
          <text key={key} x={x} y={y} dy={5} textAnchor="middle" className="fill-slate-400 text-xs">
            {labels[key as keyof typeof labels]}
          </text>
        );
      })}
    </svg>
  );
};

interface ChartDatum {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: ChartDatum[];
  size?: number;
}

export const PieChart: React.FC<PieChartProps> = ({ data, size = 120 }) => {
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      {data.map((item) => {
        const dashArray = `${(item.value / total) * circumference} ${circumference}`;
        const circle = (
          <circle
            key={item.label}
            cx={radius}
            cy={radius}
            r={radius - 10}
            fill="transparent"
            stroke={item.color}
            strokeWidth={10}
            strokeDasharray={dashArray}
            strokeDashoffset={offset}
          />
        );
        offset -= (item.value / total) * circumference;
        return circle;
      })}
      <circle
        cx={radius}
        cy={radius}
        r={radius - 24}
        className="fill-slate-900"
      />
    </svg>
  );
};

interface StackedBarChartProps {
  data: ChartDatum[];
}

export const StackedBarChart: React.FC<StackedBarChartProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let xOffset = 0;

  return (
    <div className="bg-slate-900/50 rounded-lg p-2">
      <svg width="100%" height="30">
        {data.map((item) => {
          const barWidth = (item.value / total) * 100;
          const rect = (
            <rect
              key={item.label}
              x={`${xOffset}%`}
              y="0"
              width={`${barWidth}%`}
              height="30"
              fill={item.color}
            />
          );
          xOffset += barWidth;
          return rect;
        })}
      </svg>
    </div>
  );
};

export type { ChartDatum };
