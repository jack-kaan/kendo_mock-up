import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationBellProps {
    count: number;
    onClick: () => void;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ count, onClick }) => (
    <button onClick={onClick} className="relative p-2 rounded-full hover:bg-slate-800 transition-colors">
        <Bell className="w-5 h-5 text-slate-400" />
        {count > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        )}
    </button>
);
