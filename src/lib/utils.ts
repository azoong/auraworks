import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInDays, isToday } from 'date-fns';
import { format, toZonedTime } from 'date-fns-tz';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDueDate = (dueDateString: string | null) => {
  if (!dueDateString) return;

  const timeZone = 'Asia/Seoul';
  const dueDate = toZonedTime(dueDateString, timeZone);

  if (isToday(dueDate)) return '오늘';

  // 이번 주인지 확인
  const diffInDays = differenceInDays(dueDate, new Date());

  if (diffInDays < -1) {
    return `${Math.abs(diffInDays)} 일전`;
  }

  return format(dueDate, 'MMM dd', { timeZone: timeZone });
};