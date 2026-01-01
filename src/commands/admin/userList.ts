import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
} from 'discord.js';
import { registeredUsers } from '../../services/timeTracker';
import { BRAND_COLORS, OWL_EMOJI } from '../../branding';

export async function handleUserList(
  interaction: ChatInputCommandInteraction
) {
  if (!interaction.member || !interaction.guild) {
    await interaction.reply({
      content: '이 명령어는 서버에서만 사용할 수 있어요.',
      ephemeral: true,
    });
    return;
  }

  const member = await interaction.guild.members.fetch(interaction.user.id);

  if (
    !member.permissions.has(PermissionFlagsBits.Administrator) &&
    !member.permissions.has(PermissionFlagsBits.ManageGuild)
  ) {
    await interaction.reply({
      content: '관리자 권한이 필요해요.',
      ephemeral: true,
    });
    return;
  }

  const embed = new EmbedBuilder()
    .setColor(BRAND_COLORS.ENTRY)
    .setTitle(`${OWL_EMOJI} 등록된 유저 목록`)
    .setTimestamp();

  if (registeredUsers.size === 0) {
    embed.setDescription('아직 등록된 유저가 없어요.');
    await interaction.reply({ embeds: [embed] });
    return;
  }

  const userList = Array.from(registeredUsers)
    .map((userId) => `<@${userId}>`)
    .join('\n');

  embed.setDescription(`총 ${registeredUsers.size}명의 유저가 등록되어 있어요.`);
  embed.addFields({
    name: '📚 등록된 유저',
    value: userList,
  });

  await interaction.reply({ embeds: [embed] });
}
