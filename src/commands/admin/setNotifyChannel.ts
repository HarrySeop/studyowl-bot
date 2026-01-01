import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagBits,
  ChannelType,
} from 'discord.js';
import { settings } from '../../services/timeTracker';
import { BRAND_COLORS, OWL_EMOJI } from '../../branding';

export async function handleSetNotifyChannel(
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

  const channel = interaction.options.getChannel('채널', true);

  if (channel.type !== ChannelType.GuildText) {
    await interaction.reply({
      content: '텍스트 채널만 설정할 수 있어요.',
      ephemeral: true,
    });
    return;
  }

  settings.notifyChannelId = channel.id;

  const embed = new EmbedBuilder()
    .setColor(BRAND_COLORS.ENTRY)
    .setTitle(`${OWL_EMOJI} 알림 채널 설정 완료`)
    .setDescription(`알림 채널: ${channel}`)
    .setFooter({
      text: '이제 이 채널로 입퇴장 알림을 보냅니다',
    })
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}
