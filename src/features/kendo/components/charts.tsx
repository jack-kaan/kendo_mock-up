import type { FC } from 'react';
import { useMemo } from 'react';

export interface ChartDatum {
  label: string;
  value: number;
  color: string;
}

export const StatDistributionGraph: FC = () => {
  const userPercentile = useMemo(() => Math.random() * 80 + 10, []);
  const percentileLabel = 100 - Math.round(userPercentile);

  return (
    <div className="mt-2 rounded-lg bg-slate-900/50 p-3">
      <p className="mb-2 text-center text-xs text-slate-400">전체 사용자 중 나의 위치</p>
      <div className="relative h-4 w-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
        <div
          className="absolute flex h-full items-center"
          style={{ left: `${userPercentile}%`, transform: 'translateX(-50%)' }}
        >
          <div className="h-6 w-1 rounded-full border-2 border-slate-900 bg-white" />
          <div className="absolute -top-5 whitespace-nowrap text-xs font-bold text-white">나</div>
        </div>
      </div>
      <div className="mt-1 flex justify-between text-xs text-slate-500">
        <span>하위</span>
        <span>평균</span>
        <span>상위</span>
      </div>
      <p className="mt-2 text-center text-sm font-semibold text-blue-300">상위 {percentileLabel}%</p>
    </div>
  );
};

type RadarChartData = Record<string, number>;

interface RadarChartProps {
  data: RadarChartData;
  size?: number;
}

export const RadarChart: FC<RadarChartProps> = ({ data, size = 200 }) => {
  const labels = { head: '머리', wrist: '손목', waist: '허리', thrust: '찌름' } as const;
  const keys = Object.keys(labels) as Array<keyof typeof labels>;
  const center = size / 2;
  const radius = size * 0.35;
  const angleSlice = (Math.PI * 2) / keys.length;
  const maxVal = Math.max(...Object.values(data), 1);

  const buildPolygon = (scale: number) =>
    keys
      .map((_, index) => {
        const angle = angleSlice * index - Math.PI / 2;
        const r = radius * scale;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');

  const dataPoints = keys
    .map((key, index) => {
      const angle = angleSlice * index - Math.PI / 2;
      const ratio = maxVal === 0 ? 0 : (data[key] ?? 0) / maxVal;
      const r = radius * ratio;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[0.25, 0.5, 0.75, 1].map((scale) => (
        <polygon key={scale} points={buildPolygon(scale)} className="fill-none stroke-slate-600" />
      ))}
      {keys.map((_, index) => {
        const angle = angleSlice * index - Math.PI / 2;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return <line key={index} x1={center} y1={center} x2={x} y2={y} className="stroke-slate-600" />;
      })}
      <polygon points={dataPoints} className="fill-blue-500/50 stroke-blue-400" strokeWidth={2} />
      {keys.map((key, index) => {
        const angle = angleSlice * index - Math.PI / 2;
        const x = center + (radius + 20) * Math.cos(angle);
        const y = center + (radius + 20) * Math.sin(angle);
        return (
          <text key={key} x={x} y={y} dy={5} textAnchor="middle" className="fill-slate-400 text-xs">
            {labels[key]}
          </text>
        );
      })}
    </svg>
  );
};

interface PieChartProps {
  data: ChartDatum[];
  size?: number;
}

export const PieChart: FC<PieChartProps> = ({ data, size = 120 }) => {
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      {data.map((item) => {
        const segment = (item.value / total) * circumference;
        const circle = (
          <circle
            key={item.label}
            cx={radius}
            cy={radius}
            r={radius - 10}
            fill="transparent"
            stroke={item.color}
            strokeWidth={10}
            strokeDasharray={`${segment} ${circumference}`}
            strokeDashoffset={offset}
          />
        );
        offset -= segment;
        return circle;
      })}
      <circle cx={radius} cy={radius} r={radius - 24} className="fill-slate-900" />
    </svg>
  );
};

interface StackedBarChartProps {
  data: ChartDatum[];
}

export const StackedBarChart: FC<StackedBarChartProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  let xOffset = 0;

  return (
    <div className="rounded-lg bg-slate-900/50 p-2">
      <svg width="100%" height="30">
        {data.map((item) => {
          const widthPercent = (item.value / total) * 100;
          const rect = (
            <rect
              key={item.label}
              x={`${xOffset}%`}
              y="0"
              width={`${widthPercent}%`}
              height="30"
              fill={item.color}
            />
          );
          xOffset += widthPercent;
          return rect;
        })}
      </svg>
    </div>
  );
};
