# 변경 이력

이 프로젝트의 주요 변경사항을 기록합니다.

형식은 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)를 따르며,
버전 관리는 [Semantic Versioning](https://semver.org/spec/v2.0.0.html)을 따릅니다.

---

## [1.0.2] - 2026-01-02

### 수정

- pnpm-lock.yaml을 .gitignore에서 제외하여 Koyeb 빌드 실패 해결
  - 의존성 버전 고정을 위해 lock 파일을 git에 포함

---

## [1.0.1] - 2026-01-02

### 추가

- 학습시간 조회용 브랜드 색상 추가 (TIME_QUERY: 파란색)

### 변경

- Embed 여백 개선으로 가독성 향상
  - Title 아래 여백 추가
  - 필드 사이에 빈 필드 삽입으로 시각적 구분 강화
  - 세션 목록 항목 간 여백 추가
- 서버 별명(닉네임)으로 유저 표시
  - username 대신 GuildMember.displayName 사용
- 작업용 md 파일 .gitignore에 추가

### 수정

- ready 이벤트를 clientReady로 변경하여 Discord.js v15 deprecation warning 해결
- ephemeral을 MessageFlags로 변경하여 deprecation warning 해결

---
## [1.0.0] - 2026-01-01

### 추가

- Discord 봇 기본 구조 및 클라이언트 초기화
- 브랜딩 시스템 (색상, 이모지, 말투 가이드)
- 시간 추적 서비스 (메모리 기반)
- 시간 유틸리티 함수 (KST 변환, 포맷팅)
- Discord Embed 빌더
- 시간대별/참여시간별 랜덤 메시지 시스템
- 관리자 슬래시 명령어 (유저등록, 유저해제, 유저목록, 음성채널설정, 알림채널설정)
- 유저 슬래시 명령어 (내시간, 전체시간)
- 음성 채널 입퇴장 이벤트 핸들러
- 슬래시 명령어 상호작용 핸들러
- 일일 리포트 자동 생성 (매일 09:00 KST)
- Health Check HTTP 서버
- Self Ping 메커니즘 (3분마다)
- Dockerfile 및 배포 설정

### 변경

- 환경변수 검증 강화 및 로깅 추가

---

## [0.1.0] - 2026-01-01

### 추가

- 프로젝트 초기 설정
- TypeScript 설정
- 프로젝트 문서 (README.md, LICENSE)
- 환경변수 템플릿 (.env.example)
- GitHub 이슈 및 PR 템플릿
