import { Client, GatewayIntentBits } from 'discord.js';
import cron from 'node-cron';
import { config } from './config';
import { handleVoiceStateUpdate } from './handlers/voiceState';
import { handleInteractionCreate } from './handlers/interaction';
import { sendDailyReport } from './services/report';
import { startHealthCheckServer, startSelfPing } from './server';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once('clientReady', () => {
  console.log(`✅ StudyOwl 봇이 로그인했습니다!`);
  console.log(`🦉 봇 이름: ${client.user?.tag}`);
  console.log(`📊 서버 수: ${client.guilds.cache.size}`);

  startHealthCheckServer();

  startSelfPing();

  cron.schedule('0 0 * * *', () => {
    console.log('일일 리포트 스케줄 실행 중...');
    sendDailyReport(client);
  });

  console.log('일일 리포트 스케줄러가 시작되었습니다. (UTC 00:00 = KST 09:00)');
});

client.on('voiceStateUpdate', handleVoiceStateUpdate);
client.on('interactionCreate', handleInteractionCreate);

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
