import React from 'react';

interface RadarChartProps {
    data: { [key: string]: number };
    size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, size = 200 }) => {
    const labels: { [key: string]: string } = { head: '머리', wrist: '손목', waist: '허리', thrust: '찌름' };
    const keys = Object.keys(labels);
    const center = size / 2;
    const radius = size * 0.35;
    const numAxes = keys.length;
    const angleSlice = (Math.PI * 2) / numAxes;

    const maxVal = Math.max(...Object.values(data));

    const points = keys.map((key, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const r = (data[key] / maxVal) * radius;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {[0.25, 0.5, 0.75, 1].map(scale => (
                <polygon key={scale}
                    points={keys.map((_, i) => {
                        const angle = angleSlice * i - Math.PI / 2;
                        const r = radius * scale;
                        const x = center + r * Math.cos(angle);
                        const y = center + r * Math.sin(angle);
                        return `${x},${y}`;
                    }).join(' ')}
                    className="fill-none stroke-slate-600"
                />
            ))}
            {keys.map((_, i) => {
                const angle = angleSlice * i - Math.PI / 2;
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                return <line key={i} x1={center} y1={center} x2={x} y2={y} className="stroke-slate-600" />;
            })}
            <polygon points={points} className="fill-blue-500/50 stroke-blue-400" strokeWidth="2" />
            {keys.map((key, i) => {
                const angle = angleSlice * i - Math.PI / 2;
                const r = radius * 1.2;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                return (
                    <text key={key} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-slate-300 text-xs font-semibold">
                        {labels[key]}
                    </text>
                );
            })}
        </svg>
    );
};
