export const getDday = (dateString: string) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export const getNotificationMessage = (notification: any) => {
    if (notification.type === 'new_request') return `${notification.opponent.name}님이 대련을 신청했습니다.`;
    if (notification.type === 'declined') return `${notification.opponent.name}님이 대련을 거절했습니다.`;
    return '';
};

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
