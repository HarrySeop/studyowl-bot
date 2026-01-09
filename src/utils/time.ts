export function getKSTDate(date: Date = new Date()): Date {
  const utc = date.getTime();
  const kstOffset = 9 * 60 * 60 * 1000; // UTC+9
  return new Date(utc + kstOffset);
}

export function getDayBasedOnNineAM(date: Date = new Date()): Date {
  const kst = getKSTDate(date);
  const hour = kst.getUTCHours();

  // 09:00 이전이면 전날 날짜 반환
  if (hour < 9) {
    const yesterday = new Date(kst);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    return yesterday;
  }

  return kst;
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours}시간 ${minutes}분`;
  } else if (hours > 0) {
    return `${hours}시간`;
  } else if (minutes > 0) {
    return `${minutes}분`;
  } else {
    return `${seconds}초`;
  }
}

export function formatTime(date: Date): string {
  const kst = getKSTDate(date);
  const hours = String(kst.getUTCHours()).padStart(2, '0');
  const minutes = String(kst.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function formatDate(date: Date): string {
  const kst = getKSTDate(date);
  const year = kst.getUTCFullYear();
  const month = kst.getUTCMonth() + 1;
  const day = kst.getUTCDate();
  return `${year}년 ${month}월 ${day}일`;
}

export function formatDayOfWeek(date: Date): string {
  const kst = getKSTDate(date);
  const dayOfWeek = kst.getUTCDay();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[dayOfWeek]!;
}

export function formatDateRange(date: Date = new Date()): string {
  const baseDay = getDayBasedOnNineAM(date);
  const month = baseDay.getUTCMonth() + 1;
  const day = baseDay.getUTCDate();

  const nextDay = new Date(baseDay);
  nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  const nextMonth = nextDay.getUTCMonth() + 1;
  const nextDayNum = nextDay.getUTCDate();

  return `(${month}월 ${day}일 09:00 ~ ${nextMonth}월 ${nextDayNum}일 08:59 기준)`;
}

export function formatDateWithDay(date: Date = new Date()): string {
  const baseDay = getDayBasedOnNineAM(date);
  const month = baseDay.getUTCMonth() + 1;
  const day = baseDay.getUTCDate();
  const dayOfWeek = formatDayOfWeek(baseDay);

  return `${month}월 ${day}일 (${dayOfWeek})`;
}

export type TimeOfDay = '아침' | '오전' | '오후' | '저녁' | '밤';

export function getTimeOfDay(date: Date = new Date()): TimeOfDay {
  const kst = getKSTDate(date);
  const hour = kst.getUTCHours();

  if (hour >= 5 && hour < 9) {
    return '아침';
  } else if (hour >= 9 && hour < 12) {
    return '오전';
  } else if (hour >= 12 && hour < 18) {
    return '오후';
  } else if (hour >= 18 && hour < 22) {
    return '저녁';
  } else {
    return '밤';
  }
}
