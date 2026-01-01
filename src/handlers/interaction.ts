import { Interaction } from 'discord.js';
import { handleCommand } from '../commands';

export async function handleInteractionCreate(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  await handleCommand(interaction);
}
