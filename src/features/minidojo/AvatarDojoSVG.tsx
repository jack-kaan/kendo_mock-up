import React from 'react';

export const AvatarDojoSVG: React.FC = () => (
    <svg width="100%" height="100%" viewBox="0 0 160 120" className="absolute inset-0">
        <defs>
            <pattern id="tatami" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(0)">
                <rect width="8" height="8" fill="#92400e" />
                <rect x="0" y="0" width="8" height="1" fill="#451a03" />
                <rect x="0" y="7" width="8" height="1" fill="#451a03" />
                <rect x="0" y="0" width="1" height="8" fill="#451a03" />
                <rect x="7" y="0" width="1" height="8" fill="#451a03" />
            </pattern>
            <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
        </defs>
        <rect width="160" height="60" fill="url(#wallGrad)" />
        <rect y="60" width="160" height="60" fill="url(#tatami)" />

        <g transform="translate(10, 45)">
            <rect x="0" y="0" width="25" height="8" fill="#7c2d12" rx="1" />
            <rect x="2" y="-3" width="2" height="11" fill="#a16207" />
            <rect x="6" y="-3" width="2" height="11" fill="#a16207" />
            <rect x="10" y="-3" width="2" height="11" fill="#a16207" />
            <rect x="14" y="-3" width="2" height="11" fill="#a16207" />
            <rect x="18" y="-3" width="2" height="11" fill="#a16207" />
            <rect x="21" y="-3" width="2" height="11" fill="#a16207" />
        </g>

        <g transform="translate(125, 40)">
            <rect x="0" y="0" width="30" height="25" fill="#1e293b" rx="2" />
            <circle cx="8" cy="8" r="6" fill="#f1f5f9" stroke="#374151" strokeWidth="1" />
            <rect x="5" y="5" width="6" height="3" fill="#374151" />
            <rect x="18" y="6" r="4" width="8" height="12" fill="#f59e0b" rx="2" />
        </g>

        <g transform="translate(60, 15)">
            <rect x="0" y="0" width="40" height="25" fill="#fef3c7" stroke="#92400e" strokeWidth="2" rx="2" />
            <text x="20" y="15" textAnchor="middle" fontSize="8" fill="#92400e" fontFamily="serif">검도의 도</text>
        </g>

        <g transform="translate(40, 50)">
            <rect x="0" y="0" width="20" height="15" fill="#eab308" rx="2" />
            <circle cx="10" cy="5" r="3" fill="#f59e0b" />
            <rect x="8" y="8" width="4" height="7" fill="#a16207" />
        </g>

        <g transform="translate(75, 75)">
            <rect x="0" y="0" width="12" height="25" fill="#1e293b" rx="6" />
            <circle cx="6" cy="-5" r="6" fill="#f3e8ff" />
            <rect x="12" y="8" width="20" height="2" fill="#a16207" rx="1" />
            <g className="animate-pulse">
                <circle cx="32" cy="9" r="2" fill="#fbbf24" opacity="0.7" />
                <circle cx="35" cy="7" r="1" fill="#f59e0b" opacity="0.5" />
            </g>
        </g>
        <ellipse cx="80" cy="105" rx="15" ry="3" fill="#78350f" opacity="0.3" />
    </svg>
);
