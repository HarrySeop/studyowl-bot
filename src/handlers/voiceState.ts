import { VoiceState, TextChannel, VoiceChannel } from 'discord.js';
import {
  isUserRegistered,
  settings,
  startSession,
  endSession,
  isUserActive,
} from '../services/timeTracker';
import { createEntryEmbed, createExitEmbed } from '../utils/embed';
import { getEntryMessage, getExitMessage } from '../services/messages';
import { getTimeOfDay } from '../utils/time';

export async function handleVoiceStateUpdate(
  oldState: VoiceState,
  newState: VoiceState
) {
  const userId = newState.id;

  if (!isUserRegistered(userId)) {
    return;
  }

  if (!settings.voiceChannelId || !settings.notifyChannelId) {
    return;
  }

  const oldChannel = oldState.channel;
  const newChannel = newState.channel;

  const targetChannelId = settings.voiceChannelId;
  const notifyChannelId = settings.notifyChannelId;

  const wasInTargetChannel = oldChannel?.id === targetChannelId;
  const isInTargetChannel = newChannel?.id === targetChannelId;

  if (!wasInTargetChannel && isInTargetChannel) {
    startSession(userId);

    const timeOfDay = getTimeOfDay();
    const message = getEntryMessage(timeOfDay);

    const embed = createEntryEmbed(
      newState.member!.user,
      newChannel as VoiceChannel,
      message
    );

    try {
      const channel = (await newState.guild.channels.fetch(
        notifyChannelId
      )) as TextChannel;
      await channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Failed to send entry message:', error);
    }
  } else if (wasInTargetChannel && !isInTargetChannel) {
    const duration = endSession(userId);

    if (duration > 0) {
      const message = getExitMessage(duration);

      const embed = createExitEmbed(
        oldState.member!.user,
        oldChannel as VoiceChannel,
        duration,
        message
      );

      try {
        const channel = (await oldState.guild.channels.fetch(
          notifyChannelId
        )) as TextChannel;
        await channel.send({ embeds: [embed] });
      } catch (error) {
        console.error('Failed to send exit message:', error);
      }
    }
  }
}
