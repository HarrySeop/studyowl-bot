import { TimeOfDay } from '../utils/time';

const ENTRY_MESSAGES: Record<TimeOfDay, string[]> = {
  아침: [
    '호호~ 아침부터 부지런하시네요!',
    '새벽 공기를 마시며 공부하는 모습이 멋져요!',
    '일찍 일어나는 새가 벌레를 잡는다더니, 오늘도 멋진 공부 되세요!',
  ],
  오전: [
    '좋은 오전입니다! 오늘도 힘차게 시작해봐요!',
    '호호~ 상쾌한 오전, 집중력이 좋을 시간이에요!',
    '오전 시간을 알차게 보내시길 바라요!',
  ],
  오후: [
    '오후도 힘차게 공부해봐요!',
    '점심 드셨나요? 힘내서 공부해요!',
    '호호~ 오후에도 열정이 넘치시네요!',
  ],
  저녁: [
    '저녁 공부 시작이네요. 화이팅!',
    '밤샘 준비 중이신가요? 응원할게요!',
    '호호~ 저녁에도 공부하시다니 대단해요!',
  ],
  밤: [
    '부엉부엉~ 밤샘 공부인가요? 무리하지 마세요!',
    '밤 늦게까지 수고하시네요. 적당히 쉬어가며 해요!',
    '호호~ 부엉이의 시간이에요. 하지만 건강도 챙기세요!',
  ],
};

const EXIT_MESSAGES_SHORT = [
  '수고하셨어요! 잠깐이라도 집중하셨네요.',
  '짧지만 알찬 시간이었어요!',
  '호호~ 다음에 또 만나요!',
];

const EXIT_MESSAGES_MEDIUM = [
  '수고하셨어요! 멋진 공부 시간이었어요.',
  '호호~ 꾸준함이 실력이 됩니다!',
  '잘 쉬시고 다음에 또 만나요!',
];

const EXIT_MESSAGES_LONG = [
  '대단해요! 긴 시간 집중하시느라 수고하셨어요!',
  '호호~ 오늘 정말 열심히 하셨네요. 푹 쉬세요!',
  '장시간 공부하시느라 고생하셨어요. 건강도 챙기세요!',
];

export function getEntryMessage(timeOfDay: TimeOfDay): string {
  const messages = ENTRY_MESSAGES[timeOfDay];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex] || '호호~ 환영해요!';
}

export function getExitMessage(duration: number): string {
  const hours = duration / 3600;

  let messages: string[];
  if (hours < 1) {
    messages = EXIT_MESSAGES_SHORT;
  } else if (hours < 3) {
    messages = EXIT_MESSAGES_MEDIUM;
  } else {
    messages = EXIT_MESSAGES_LONG;
  }

  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex] || '수고하셨어요!';
}
