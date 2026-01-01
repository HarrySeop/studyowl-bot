import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  ChannelType,
} from 'discord.js';
import { settings } from '../../services/timeTracker';
import { BRAND_COLORS, OWL_EMOJI } from '../../branding';

export async function handleSetVoiceChannel(
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

  const channel = interaction.options.getChannel('채널', true);

  if (channel.type !== ChannelType.GuildVoice) {
    await interaction.reply({
      content: '음성 채널만 설정할 수 있어요.',
      ephemeral: true,
    });
    return;
  }

  settings.voiceChannelId = channel.id;

  const embed = new EmbedBuilder()
    .setColor(BRAND_COLORS.ENTRY)
    .setTitle(`${OWL_EMOJI} 음성 채널 설정 완료`)
    .setDescription(`추적할 음성 채널: ${channel}`)
    .setFooter({
      text: '이제 이 채널의 입퇴장을 추적합니다',
    })
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}
