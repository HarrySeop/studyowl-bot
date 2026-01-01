import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagBits,
} from 'discord.js';
import { unregisterUser } from '../../services/timeTracker';
import { BRAND_COLORS, OWL_EMOJI } from '../../branding';

export async function handleUserUnregister(
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
    !member.permissions.has(PermissionFlagBits.Administrator) &&
    !member.permissions.has(PermissionFlagBits.ManageGuild)
  ) {
    await interaction.reply({
      content: '관리자 권한이 필요해요.',
      ephemeral: true,
    });
    return;
  }

  const targetUser = interaction.options.getUser('유저', true);

  const success = unregisterUser(targetUser.id);

  if (success) {
    const embed = new EmbedBuilder()
      .setColor(BRAND_COLORS.EXIT)
      .setTitle(`${OWL_EMOJI} 유저 해제 완료`)
      .setDescription(
        `${targetUser}님을 학습 시간 추적 유저에서 해제했어요.`
      )
      .setFooter({ text: '모든 기록이 삭제되었습니다' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  } else {
    const embed = new EmbedBuilder()
      .setColor(BRAND_COLORS.EXIT)
      .setTitle(`${OWL_EMOJI} 해제 실패`)
      .setDescription(`${targetUser}님은 등록되지 않은 유저예요.`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
}
