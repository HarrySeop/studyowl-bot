import http from 'http';
import { config } from './config';

export function startHealthCheckServer(): http.Server {
  const server = http.createServer((req, res) => {
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          status: 'ok',
          timestamp: new Date().toISOString(),
        })
      );
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  server.listen(config.port, () => {
    console.log(`Health Check 서버가 포트 ${config.port}에서 실행 중입니다.`);
  });

  return server;
}

export function startSelfPing(): void {
  if (!config.koyebUrl) {
    console.log(
      'KOYEB_URL이 설정되지 않아 Self Ping을 시작하지 않습니다.'
    );
    return;
  }

  const pingInterval = 3 * 60 * 1000;
  const healthUrl = config.koyebUrl;

  const ping = async () => {
    try {
      const response = await fetch(healthUrl);
      if (response.ok) {
        console.log('Self Ping 성공');
      } else {
        console.error(
          `Self Ping 실패: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error('Self Ping 오류:', error);
    }
  };

  // 즉시 한 번 실행
  ping();

  // 이후 3분마다 실행
  setInterval(ping, pingInterval);

  console.log(`Self Ping이 시작되었습니다. (3분마다 실행)`);
  console.log(`Target URL: ${healthUrl}`);
}
