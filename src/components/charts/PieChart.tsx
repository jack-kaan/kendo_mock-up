import React from 'react';

interface PieChartProps {
    data: { label: string; value: number; color: string }[];
    size?: number;
}

export const PieChart: React.FC<PieChartProps> = ({ data, size = 120 }) => {
    const center = size / 2;
    const radius = size / 2;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = -Math.PI / 2;

    const getCoords = (angle: number) => `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {data.map(item => {
                const angle = (item.value / total) * 2 * Math.PI;
                const endAngle = startAngle + angle;
                const largeArcFlag = angle > Math.PI ? 1 : 0;
                const pathData = `M ${center},${center} L ${getCoords(startAngle)} A ${radius},${radius} 0 ${largeArcFlag},1 ${getCoords(endAngle)} Z`;
                startAngle = endAngle;
                return <path key={item.label} d={pathData} fill={item.color} />;
            })}
        </svg>
    );
};
