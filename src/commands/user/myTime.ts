import { ChatInputCommandInteraction } from 'discord.js';
import {
  isUserRegistered,
  getUserSessions,
  getDailyTotal,
} from '../../services/timeTracker';
import { createMyTimeEmbed } from '../../utils/embed';

export async function handleMyTime(interaction: ChatInputCommandInteraction) {
  const userId = interaction.user.id;

  if (!isUserRegistered(userId)) {
    await interaction.reply({
      content: '등록된 유저만 사용할 수 있어요.',
      ephemeral: true,
    });
    return;
  }

  const sessions = getUserSessions(userId);
  const total = getDailyTotal(userId);

  const embed = createMyTimeEmbed(interaction.user, sessions, total);

  await interaction.reply({ embeds: [embed] });
}
