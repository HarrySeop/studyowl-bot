import { ChatInputCommandInteraction, MessageFlags } from 'discord.js';
import {
  isUserRegistered,
  getAllUsersTime,
  getUserSessions,
} from '../../services/timeTracker';
import { createAllTimeEmbed } from '../../utils/embed';

export async function handleAllTime(
  interaction: ChatInputCommandInteraction
) {
  const userId = interaction.user.id;

  if (!isUserRegistered(userId)) {
    await interaction.reply({
      content: '등록된 유저만 사용할 수 있어요.',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const allTimes = getAllUsersTime();
  const users = [];

  for (const [uid, time] of allTimes) {
    try {
      const user = await interaction.client.users.fetch(uid);
      const sessions = getUserSessions(uid);

      let displayName = user.username;
      if (interaction.guild) {
        try {
          const member = await interaction.guild.members.fetch(uid);
          displayName = member.displayName;
        } catch {
          displayName = user.username;
        }
      }

      users.push({
        user,
        time,
        sessionCount: sessions.length,
        displayName,
      });
    } catch (error) {
      console.error(`Failed to fetch user ${uid}:`, error);
    }
  }

  users.sort((a, b) => b.time - a.time);

  const embed = createAllTimeEmbed(users);

  await interaction.reply({ embeds: [embed] });
}
