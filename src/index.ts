import { Client, GatewayIntentBits } from 'discord.js';
import { config } from './config';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once('ready', () => {
  console.log(`✅ StudyOwl 봇이 로그인했습니다!`);
  console.log(`🦉 봇 이름: ${client.user?.tag}`);
  console.log(`📊 서버 수: ${client.guilds.cache.size}`);
});

client.login(config.discordToken).catch((error) => {
  console.error('❌ Discord 로그인 실패:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('⚠️ Unhandled Promise Rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('⚠️ Uncaught Exception:', error);
  process.exit(1);
});
