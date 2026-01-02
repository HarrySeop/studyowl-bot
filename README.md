# StudyOwl 🦉

> Discord 음성 채널에서 학습 시간을 자동으로 추적하고, 따뜻한 격려로 동기부여를 제공하는 부엉이 친구

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Discord.js](https://img.shields.io/badge/Discord.js-v14-7289DA.svg)](https://discord.js.org/)

---

## ✨ 주요 기능

### 🎤 자동 시간 추적

- 설정된 음성 채널 입퇴장 자동 감지
- 학습 시간 실시간 누적
- 세션별 상세 기록

### 📊 통계 및 리포트

- `/내시간` - 개인 학습 시간 및 세션 내역 조회
- `/전체시간` - 전체 멤버 학습 시간 랭킹
- 매일 09:00 KST 자동 일일 리포트

### 🦉 부엉이 컨셉

- 지혜롭고 따뜻한 격려 메시지
- 시간대별 맞춤 인사 (아침/오전/오후/저녁/밤)
- 참여 시간에 따른 차별화된 응원

### 🎨 브랜딩

- 황금색(#F4A460), 갈색(#8B7355), 오렌지(#FF8C00) 색상 테마
- 일관된 부엉이 이모지 사용
- "호호~", "부엉!" 시그니처 말투

---

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 18 이상
- Discord 봇 토큰
- Discord 서버 관리자 권한

### 설치

1. **저장소 클론**

   ```bash
   git clone https://github.com/HarrySeop/studyowl-bot.git
   cd studyowl-bot
   ```

2. **의존성 설치**

   ```bash
   npm install
   # 또는
   pnpm install
   ```

3. **환경변수 설정**

   ```bash
   cp .env.example .env
   # .env 파일을 열어서 Discord 봇 정보 입력
   ```

4. **빌드**

   ```bash
   npm run build
   ```

5. **슬래시 명령어 등록**

   ```bash
   npm run register-commands
   ```

6. **실행**
   ```bash
   npm start
   # 개발 모드
   npm run dev
   ```

---

## 📖 사용법

### 관리자 명령어

| 명령어          | 설명                         | 예시                    |
| --------------- | ---------------------------- | ----------------------- |
| `/유저등록`     | 스터디 추적 대상 유저 등록   | `/유저등록 @해리섭`     |
| `/유저해제`     | 스터디 추적 대상 유저 해제   | `/유저해제 @해리섭`     |
| `/유저목록`     | 등록된 유저 목록 조회        | `/유저목록`             |
| `/음성채널설정` | 추적할 음성 채널 지정        | `/음성채널설정 #공부방` |
| `/알림채널설정` | 알림을 보낼 텍스트 채널 지정 | `/알림채널설정 #공지`   |

### 유저 명령어

| 명령어      | 설명                             | 예시        |
| ----------- | -------------------------------- | ----------- |
| `/내시간`   | 개인 학습 시간 및 세션 내역 조회 | `/내시간`   |
| `/전체시간` | 전체 멤버 학습 시간 확인         | `/전체시간` |

---

## 🐳 배포 (Koyeb)

### Koyeb 무료 플랜 배포

1. **GitHub 연동**

   - Koyeb 로그인 → "Create App" → "Deploy from GitHub"
   - 저장소 선택

2. **빌드 설정**

   - Builder: `Dockerfile`
   - Port: `8000`

3. **환경변수 설정**

   ```
   DISCORD_TOKEN=your_bot_token
   APPLICATION_ID=your_application_id
   GUILD_ID=your_guild_id
   ADMIN_USER_IDS=123456789,987654321
   PORT=8000
   ```

4. **Health Check 설정**

   - Protocol: `HTTP`
   - Port: `8000`
   - Path: `/health`

5. **배포 완료 후 Self Ping 설정**
   - 환경변수 추가: `KOYEB_URL=https://your-app.koyeb.app/health`
   - Redeploy

---

## 🛠️ 기술 스택

- **언어**: TypeScript 5.7
- **프레임워크**: Discord.js v14
- **런타임**: Node.js 18
- **스케줄러**: node-cron
- **서버**: Native HTTP (Health Check)
- **배포**: Koyeb (Docker)

---

## 📁 프로젝트 구조

```
studyowl-bot/
├── src/
│   ├── index.ts              # 메인 엔트리 포인트
│   ├── config.ts             # 환경변수 관리
│   ├── branding.ts           # 브랜드 색상 및 메시지 상수
│   ├── commands/             # 슬래시 명령어
│   ├── handlers/             # 이벤트 핸들러
│   ├── services/             # 비즈니스 로직
│   ├── utils/                # 유틸리티
│   └── server.ts             # Health Check 서버
├── .github/                  # GitHub 템플릿
├── Dockerfile                # Docker 설정
├── package.json              # 프로젝트 메타데이터
├── tsconfig.json             # TypeScript 설정
└── .env.example              # 환경변수 템플릿
```

---

## 🔧 환경변수

| 변수             | 필수 | 설명                             |
| ---------------- | ---- | -------------------------------- |
| `DISCORD_TOKEN`  | ✅   | Discord 봇 토큰                  |
| `APPLICATION_ID` | ✅   | Discord Application ID           |
| `GUILD_ID`       | ✅   | Discord 서버 ID                  |
| `ADMIN_USER_IDS` | ✅   | 관리자 User ID (쉼표 구분)       |
| `KOYEB_URL`      | ⬜   | Self Ping용 URL                  |
| `PORT`           | ⬜   | Health Check 포트 (기본값: 8000) |

---

## 💾 데이터 관리

**메모리 기반 저장**:

- 데이터베이스 불필요 (메모리에만 저장)
- 매일 09:00 KST 자동 초기화
- 서버 재시작 시 데이터 손실

**저장 데이터**:

- 등록된 유저 목록
- 현재 접속 중인 세션
- 오늘(09:00~현재) 누적 시간
- 세션별 입퇴장 기록

---

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 커밋 컨벤션

```
feat: 새 기능
fix: 버그 수정
docs: 문서 변경
style: 코드 포맷
refactor: 리팩토링
chore: 기타
```

---

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 📮 문의

프로젝트 링크: [https://github.com/HarrySeop/studyowl-bot](https://github.com/HarrySeop/studyowl-bot)

---

**Made with 🦉 by HarrySeop**
