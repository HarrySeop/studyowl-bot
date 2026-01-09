import { EmbedBuilder, User, VoiceChannel } from 'discord.js';
import { BRAND_COLORS, BRAND_FOOTERS, OWL_EMOJI } from '../branding';
import {
  formatDuration,
  formatTime,
  formatDate,
  formatDateWithDay,
  formatDateRange,
} from './time';

export function createEntryEmbed(user: User, channel: VoiceChannel, message: string): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(BRAND_COLORS.ENTRY)
    .setTitle(`${OWL_EMOJI} 입장`)
    .setDescription(`\n${user}님이 🎧 ${channel.name}에 입장하셨네요!\n\n💬 ${message}\n`)
    .setFooter({ text: BRAND_FOOTERS.ENTRY })
    .setTimestamp();
}

export function createExitEmbed(user: User, channel: VoiceChannel, duration: number, message: string): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(BRAND_COLORS.EXIT)
    .setTitle(`${OWL_EMOJI} 퇴장`)
    .setDescription(
      `\n${user}님이 🎧 ${channel.name}에서 퇴장하셨어요!\n\n⏱️ 참여 시간: ${formatDuration(
        duration,
      )}\n\n💬 ${message}\n`,
    )
    .setFooter({ text: BRAND_FOOTERS.EXIT })
    .setTimestamp();
}

interface ReportData {
  users: Array<{ user: User; time: number; displayName: string }>;
  totalTime: number;
}

export function createReportEmbed(data: ReportData): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setColor(BRAND_COLORS.REPORT)
    .setTitle(`${OWL_EMOJI}📊 ${formatDateWithDay()}의 학습 기록`)
    .setDescription(`${formatDateRange()}\n\n지혜로운 하루를 보내셨네요!\n`)
    .setFooter({ text: BRAND_FOOTERS.REPORT })
    .setTimestamp();

  embed.addFields({
    name: '\u200B',
    value: '\u200B',
  });

  if (data.users.length === 0) {
    embed.setDescription('\n오늘은 학습 기록이 없어요. 내일 다시 만나요!\n');
    return embed;
  }

  const userList = data.users.map(u => `🎓 ${u.displayName}: ${formatDuration(u.time)}`).join('\n\n');

  embed.addFields({
    name: '📚 참여자별 시간',
    value: userList,
  });

  embed.addFields({
    name: '\u200B',
    value: '\u200B',
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

export function createMyTimeEmbed(displayName: string, sessions: Session[], total: number): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setColor(BRAND_COLORS.TIME_QUERY)
    .setTitle(`${OWL_EMOJI}⏱️ ${displayName}님의 ${formatDateWithDay()} 학습 기록`)
    .setDescription(`${formatDateRange()}\n`)
    .setFooter({ text: BRAND_FOOTERS.MY_TIME })
    .setTimestamp();

  embed.addFields({
    name: '\u200B',
    value: '\u200B',
  });

  if (sessions.length === 0) {
    embed.addFields({
      name: '📌 세션 내역',
      value: '\n아직 학습 기록이 없어요.',
    });
    return embed;
  }

  const sessionList = sessions
    .map((session, index) => {
      const startTime = formatTime(session.start);
      const endTime = session.end ? formatTime(session.end) : '현재 접속 중';
      const duration = session.end ? formatDuration(session.duration) : `${formatDuration(session.duration)}째`;
      return `${index + 1}️⃣ ${startTime} ~ ${endTime} (${duration})`;
    })
    .join('\n\n');

  embed.addFields({
    name: '📌 세션 내역',
    value: sessionList,
  });

  embed.addFields({
    name: '\u200B',
    value: '\u200B',
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
  displayName: string;
}

export function createAllTimeEmbed(users: UserTime[]): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setColor(BRAND_COLORS.TIME_QUERY)
    .setTitle(`${OWL_EMOJI}⏱️ ${formatDateWithDay()} 전체 학습 시간`)
    .setDescription(`${formatDateRange()}\n`)
    .setFooter({ text: BRAND_FOOTERS.ALL_TIME })
    .setTimestamp();

  embed.addFields({
    name: '\u200B',
    value: '\u200B',
  });

  if (users.length === 0) {
    embed.addFields({
      name: '📚 참여자',
      value: '아직 학습 기록이 없어요.',
    });
    return embed;
  }

  const userList = users
    .map(u => `🎓 ${u.displayName}: ${formatDuration(u.time)} (${u.sessionCount}회 세션)`)
    .join('\n\n');

  const totalTime = users.reduce((sum, u) => sum + u.time, 0);

  embed.addFields({
    name: '📚 참여자별 시간',
    value: userList,
  });

  embed.addFields({
    name: '\u200B',
    value: '\u200B',
  });

  embed.addFields({
    name: '📊 총 학습 시간',
    value: formatDuration(totalTime),
  });

  return embed;
}
