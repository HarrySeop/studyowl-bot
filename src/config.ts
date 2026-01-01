import dotenv from 'dotenv';

dotenv.config();

interface Config {
  discordToken: string;
  applicationId: string;
  guildId: string;
  adminUserIds: string[];
  koyebUrl?: string;
  port: number;
}

function validateEnv(): Config {
  const requiredEnvVars = [
    'DISCORD_TOKEN',
    'APPLICATION_ID',
    'GUILD_ID',
    'ADMIN_USER_IDS',
  ];

  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `필수 환경변수가 누락되었습니다: ${missing.join(', ')}\n` +
        '.env 파일을 확인해주세요. (.env.example 참고)'
    );
  }

  const adminIds = process.env.ADMIN_USER_IDS!.split(',').map((id) =>
    id.trim()
  );

  const config: Config = {
    discordToken: process.env.DISCORD_TOKEN!,
    applicationId: process.env.APPLICATION_ID!,
    guildId: process.env.GUILD_ID!,
    adminUserIds: adminIds,
    koyebUrl: process.env.KOYEB_URL,
    port: parseInt(process.env.PORT || '8000', 10),
  };

  return config;
}

export const config = validateEnv();
