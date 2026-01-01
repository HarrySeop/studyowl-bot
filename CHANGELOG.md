# 변경 이력

이 프로젝트의 주요 변경사항을 기록합니다.

형식은 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)를 따르며,
버전 관리는 [Semantic Versioning](https://semver.org/spec/v2.0.0.html)을 따릅니다.

---

## [Unreleased]

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
