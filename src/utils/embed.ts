import { EmbedBuilder, User, VoiceChannel } from 'discord.js';
import { BRAND_COLORS, BRAND_FOOTERS, OWL_EMOJI } from '../branding';
import { formatDuration, formatTime, formatDate } from './time';

export function createEntryEmbed(
  user: User,
  channel: VoiceChannel,
  message: string
): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(BRAND_COLORS.ENTRY)
    .setTitle(`${OWL_EMOJI} 입장`)
    .setDescription(
      `${user}님이 🎧 ${channel.name}에 입장하셨네요!\n💬 ${message}`
    )
    .setFooter({ text: BRAND_FOOTERS.ENTRY })
    .setTimestamp();
}

export function createExitEmbed(
  user: User,
  channel: VoiceChannel,
  duration: number,
  message: string
): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(BRAND_COLORS.EXIT)
    .setTitle(`${OWL_EMOJI} 퇴장`)
    .setDescription(
      `${user}님이 🎧 ${channel.name}에서 퇴장하셨어요!\n⏱️ 참여 시간: ${formatDuration(duration)}\n💬 ${message}`
    )
    .setFooter({ text: BRAND_FOOTERS.EXIT })
    .setTimestamp();
}

interface ReportData {
  users: Array<{ user: User; time: number }>;
  totalTime: number;
}

export function createReportEmbed(data: ReportData): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setColor(BRAND_COLORS.REPORT)
    .setTitle(`${OWL_EMOJI}📊 오늘의 학습 기록`)
    .setDescription('지혜로운 하루를 보내셨네요!')
    .setFooter({ text: BRAND_FOOTERS.REPORT })
    .setTimestamp();

  if (data.users.length === 0) {
    embed.setDescription('오늘은 학습 기록이 없어요. 내일 다시 만나요!');
    return embed;
  }

  const userList = data.users
    .map((u) => `🎓 ${u.user.username}: ${formatDuration(u.time)}`)
    .join('\n');

  embed.addFields({
    name: '📚 참여자별 시간',
    value: userList,
  });

  embed.addFields({
    name: '📊 총 학습 시간',
    value: formatDuration(data.totalTime),
  });

  return embed;
}

interface Session {
  start: Date;
  end: Date | null;
  duration: number;
}

export function createMyTimeEmbed(
  user: User,
  sessions: Session[],
  total: number
): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setColor(BRAND_COLORS.ENTRY)
    .setTitle(`${OWL_EMOJI}⏱️ ${user.username}님의 학습 기록`)
    .setDescription(`📅 ${formatDate(new Date())}`)
    .setFooter({ text: BRAND_FOOTERS.MY_TIME })
    .setTimestamp();

  if (sessions.length === 0) {
    embed.addFields({
      name: '📌 세션 내역',
      value: '아직 학습 기록이 없어요.',
    });
    return embed;
  }

  const sessionList = sessions
    .map((session, index) => {
      const startTime = formatTime(session.start);
      const endTime = session.end ? formatTime(session.end) : '현재 접속 중';
      const duration = session.end
        ? formatDuration(session.duration)
        : `${formatDuration(session.duration)}째`;
      return `${index + 1}️⃣ ${startTime} ~ ${endTime} (${duration})`;
    })
    .join('\n');

  embed.addFields({
    name: '📌 세션 내역',
    value: sessionList,
  });

  embed.addFields({
    name: '⏱️ 총 학습 시간',
    value: formatDuration(total),
  });

  return embed;
}

interface UserTime {
  user: User;
  time: number;
  sessionCount: number;
}

export function createAllTimeEmbed(users: UserTime[]): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setColor(BRAND_COLORS.ENTRY)
    .setTitle(`${OWL_EMOJI}⏱️ 전체 학습 시간`)
    .setDescription(`📅 ${formatDate(new Date())} 기준`)
    .setFooter({ text: BRAND_FOOTERS.ALL_TIME })
    .setTimestamp();

  if (users.length === 0) {
    embed.addFields({
      name: '📚 참여자',
      value: '아직 학습 기록이 없어요.',
    });
    return embed;
  }

  const userList = users
    .map(
      (u) =>
        `🎓 ${u.user.username}: ${formatDuration(u.time)} (${u.sessionCount}회 세션)`
    )
    .join('\n');

  const totalTime = users.reduce((sum, u) => sum + u.time, 0);

  embed.addFields({
    name: '📚 참여자별 시간',
    value: userList,
  });

  embed.addFields({
    name: '📊 총 학습 시간',
    value: formatDuration(totalTime),
  });

  return embed;
}
