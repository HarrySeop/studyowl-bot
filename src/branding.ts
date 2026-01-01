export const BRAND_COLORS = {
  ENTRY: 0xf4a460, // 황금색 (입장)
  EXIT: 0x8b7355, // 갈색 (퇴장)
  REPORT: 0xff8c00, // 오렌지 (리포트)
} as const;

export const BRAND_FOOTERS = {
  ENTRY: '지혜로운 부엉이 선생님이 응원합니다',
  EXIT: '오늘도 수고하셨어요',
  REPORT: 'StudyOwl 일일 리포트',
  MY_TIME: '나의 학습 기록',
  ALL_TIME: '전체 학습 기록',
} as const;

export const OWL_EMOJI = '🦉';

export const TONE_GUIDE = {
  HONORIFIC: true, // 존댓말 사용
  PHRASES: ['호호~', '부엉!'], // 부엉이 특유 표현
  STYLE: 'positive', // 긍정적, 격려하는 톤
} as const;
