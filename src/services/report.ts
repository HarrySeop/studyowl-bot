import { Client, TextChannel } from 'discord.js';
import {
  getAllUsersTime,
  resetDailyData,
  settings,
} from './timeTracker';
import { createReportEmbed } from '../utils/embed';

export async function sendDailyReport(client: Client): Promise<void> {
  if (!settings.notifyChannelId) {
    console.log('알림 채널이 설정되지 않아 리포트를 전송하지 않습니다.');
    return;
  }

  try {
    const channel = (await client.channels.fetch(
      settings.notifyChannelId
    )) as TextChannel;

    if (!channel) {
      console.error('알림 채널을 찾을 수 없습니다.');
      return;
    }

    const allTimes = getAllUsersTime();
    const users = [];
    let totalTime = 0;

    const guild = channel.guild;

    for (const [userId, time] of allTimes) {
      try {
        const user = await client.users.fetch(userId);

        let displayName = user.username;
        if (guild) {
          try {
            const member = await guild.members.fetch(userId);
            displayName = member.displayName;
          } catch {
            displayName = user.username;
          }
        }

        users.push({ user, time, displayName });
        totalTime += time;
      } catch (error) {
        console.error(`Failed to fetch user ${userId}:`, error);
      }
    }

    users.sort((a, b) => b.time - a.time);

    const embed = createReportEmbed({
      users,
      totalTime,
    });

    await channel.send({ embeds: [embed] });

    console.log('일일 리포트를 전송했습니다.');

    resetDailyData();

    console.log('일일 데이터를 초기화했습니다.');
  } catch (error) {
    console.error('일일 리포트 전송 실패:', error);
  }
}
