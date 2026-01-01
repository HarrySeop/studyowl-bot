import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { config } from '../config';

const commands = [
  new SlashCommandBuilder()
    .setName('유저등록')
    .setDescription('학습 시간 추적 유저를 등록합니다')
    .addUserOption((option) =>
      option.setName('유저').setDescription('등록할 유저').setRequired(true)
    )
    .setDefaultMemberPermissions(0),

  new SlashCommandBuilder()
    .setName('유저해제')
    .setDescription('학습 시간 추적 유저를 해제합니다')
    .addUserOption((option) =>
      option.setName('유저').setDescription('해제할 유저').setRequired(true)
    )
    .setDefaultMemberPermissions(0),

  new SlashCommandBuilder()
    .setName('유저목록')
    .setDescription('등록된 유저 목록을 확인합니다')
    .setDefaultMemberPermissions(0),

  new SlashCommandBuilder()
    .setName('음성채널설정')
    .setDescription('추적할 음성 채널을 설정합니다')
    .addChannelOption((option) =>
      option
        .setName('채널')
        .setDescription('추적할 음성 채널')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0),

  new SlashCommandBuilder()
    .setName('알림채널설정')
    .setDescription('알림을 보낼 텍스트 채널을 설정합니다')
    .addChannelOption((option) =>
      option
        .setName('채널')
        .setDescription('알림을 보낼 텍스트 채널')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0),

  new SlashCommandBuilder()
    .setName('내시간')
    .setDescription('나의 학습 시간을 확인합니다'),

  new SlashCommandBuilder()
    .setName('전체시간')
    .setDescription('전체 학습 시간을 확인합니다'),
].map((command) => command.toJSON());

const rest = new REST({ version: '10' }).setToken(config.discordToken);

async function registerCommands() {
  try {
    console.log('슬래시 명령어 등록 시작...');

    await rest.put(
      Routes.applicationGuildCommands(config.applicationId, config.guildId),
      { body: commands }
    );

    console.log('✅ 슬래시 명령어 등록 완료!');
    console.log(`📝 등록된 명령어 수: ${commands.length}개`);
  } catch (error) {
    console.error('❌ 슬래시 명령어 등록 실패:', error);
    process.exit(1);
  }
}

registerCommands();
