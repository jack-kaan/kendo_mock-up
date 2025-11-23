import React from 'react';

interface StackedBarChartProps {
    data: { label: string; value: number; color: string }[];
    height?: number;
    width?: number | string;
}

export const StackedBarChart: React.FC<StackedBarChartProps> = ({ data, height = 20, width = 200 }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let xOffset = 0;

    return (
        <div style={{ width, height }}>
            <svg width="100%" height="100%">
                {data.map(item => {
                    const barWidth = (item.value / total) * 100;
                    const rect = <rect key={item.label} x={`${xOffset}%`} y="0" width={`${barWidth}%`} height={height} fill={item.color} />;
                    xOffset += barWidth;
                    return rect;
                })}
            </svg>
        </div>
    );
};
