import { ChatInputCommandInteraction } from 'discord.js';
import { handleUserRegister } from './admin/userRegister';
import { handleUserUnregister } from './admin/userUnregister';
import { handleUserList } from './admin/userList';
import { handleSetVoiceChannel } from './admin/setVoiceChannel';
import { handleSetNotifyChannel } from './admin/setNotifyChannel';
import { handleMyTime } from './user/myTime';
import { handleAllTime } from './user/allTime';

export type CommandHandler = (
  interaction: ChatInputCommandInteraction
) => Promise<void>;

export const commandHandlers: Record<string, CommandHandler> = {
  유저등록: handleUserRegister,
  유저해제: handleUserUnregister,
  유저목록: handleUserList,
  음성채널설정: handleSetVoiceChannel,
  알림채널설정: handleSetNotifyChannel,
  내시간: handleMyTime,
  전체시간: handleAllTime,
};

export async function handleCommand(
  interaction: ChatInputCommandInteraction
): Promise<void> {
  const commandName = interaction.commandName;
  const handler = commandHandlers[commandName];

  if (!handler) {
    await interaction.reply({
      content: '알 수 없는 명령어예요.',
      ephemeral: true,
    });
    return;
  }

  try {
    await handler(interaction);
  } catch (error) {
    console.error(`Error handling command ${commandName}:`, error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: '명령어 실행 중 오류가 발생했어요.',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: '명령어 실행 중 오류가 발생했어요.',
        ephemeral: true,
      });
    }
  }
}
