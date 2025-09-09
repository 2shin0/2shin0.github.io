# 캐미 - AI 기반 인터랙티브 스토리텔링 캐릭터챗봇

## 프로젝트 개요

캐미는 사내 AI 에이전트 스터디로 시작되어 진행된 프로젝트입니다. 사용자는 자신의 캐릭터를 생성하고, AI 기반의 다양한 페르소나와 상호작용하며 스토리텔링 형식으로 퀘스트를 해결합니다.. OpenAI GPT 모델과 DALL-E를 활용하여 개인화된 캐릭터 이미지 생성, 동적 스토리 전개, 그리고 몰입감 있는 대화 경험을 제공합니다.<br><br>
**📌 팀원**<br>
기획 및 개발 : [이신영](https://github.com/2shin0), [김현경](https://github.com/beubeu95), [손명근](https://github.com/son1473), [정도환](https://github.com/yuusakuu)<br><br>
**📌 기간**<br>
2025.02.11 ~ 2025.05.02

## 기술 스택

### Backend
- 프레임워크: FastAPI (Python)
- AI/머신러닝: OpenAI GPT-4, DALL-E 3, LangChain
- 데이터베이스: PostgreSQL (AsyncPG), Redis
- ORM: SQLAlchemy (비동기)
- 컨테이너: Docker

### Frontend
- 프레임워크: React 19 + TypeScript
- UI 라이브러리: Material-UI (MUI)
- 상태 관리: Zustand
- 스타일링: Emotion, Tailwind CSS
- 빌드 도구: Vite
- 라우팅: React Router DOM

### DevOps & Tools
- 컨테이너화: Docker, Docker Compose
- 프로세스 매니저: Gunicorn, Uvicorn
- 개발 도구: ESLint, TypeScript

## 주요 기능

### 1. 캐릭터 생성 및 커스터마이징
- 사용자 맞춤형 캐릭터 생성 (외모, 나이, 직업, 성격)
- DALL-E 3를 활용한 AI 기반 캐릭터 이미지 자동 생성
- 개성 있는 말투와 성격 설정

### 2. 동적 세계관 구축
- 테마별 스토리 배경 생성
- 장르별 세계관 설정 (판타지, SF, 현대 등)
- 사용자 캐릭터에 맞춤화된 스토리 환경

### 3. 퀘스트 시스템
- 단계별 퀘스트 진행 관리
- 퀘스트 완료 조건 및 성공 기준 설정
- 진행 상황 실시간 추적

### 4. AI 페르소나 대화
- 다중 AI 캐릭터와의 자연스러운 대화
- 컨텍스트 기반 응답 생성
- 캐릭터별 고유한 성격과 말투 구현

### 5. 관계 시스템
- 캐릭터 간 관계 설정 및 관리
- 상호작용에 따른 관계 변화
- 관계 기반 스토리 분기

## 시스템 아키텍처

```
┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  FastAPI Backend│
│   (Port: 5173)  │◄──►│   (Port: 8000)  │
└─────────────────┘    └─────────────────┘
                                │
                       ┌────────┼────────┐
                       │        │        │
              ┌─────────▼──┐ ┌──▼──┐ ┌───▼────┐
              │ PostgreSQL │ │Redis│ │OpenAI  │
              │ Database   │ │Cache│ │API     │
              └────────────┘ └─────┘ └────────┘
```

### 주요 컴포넌트
- 상태 관리: 사용자 상태, 세계 상태, 퀘스트 진행 관리
- Persona Agent: AI 캐릭터 생성 및 대화 처리
- Image Generator: DALL-E 기반 캐릭터 이미지 생성
- Quest Engine: 퀘스트 로직 및 진행 상황 추적

## 실행 방법

### 사전 요구사항
- Docker & Docker Compose
- OpenAI API Key

### 환경 설정
1. `.env` 파일 생성:
```bash
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=postgresql://username:password@localhost/character_chat
REDIS_URL=redis://localhost:6379
```

### Docker Compose 실행
```bash
# 프로젝트 클론
git clone <repository-url>
cd character-chat

# Docker Compose로 실행
docker-compose up -d

# 또는 개발 환경에서 실행
cd main/back
pip install -r requirements.txt
uvicorn app:app --reload

cd ../front
npm install
npm run dev
```

### 접속
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## 데이터 및 알고리즘

### 데이터베이스 스키마
- UserChar: 사용자 캐릭터 정보 (이름, 외모, 나이, 직업, 성격, 말투, 이미지 URL)
- Theme: 스토리 테마 및 세계관 (제목, 설명, 장르, 스토리, 이미지 URL)
- Persona: AI 캐릭터 정보 (이름, 나이, 직업, 성격, 관계, 이미지 URL)
- Quest: 퀘스트 데이터 (제목, 목표, 설명, 영향, 성공 기준, 난이도)
- Chat: 대화 기록 (발신자, 메시지, 타임스탬프)

### AI 알고리즘
- 캐릭터 생성: GPT-4를 활용한 성격, 배경 스토리 생성
- 이미지 생성: DALL-E 3 기반 아니메 스타일 캐릭터 이미지 생성
- 대화 처리: LangChain을 통한 컨텍스트 유지 대화 시스템
- 퀘스트 관리: Tool Calling을 활용한 퀘스트 완료 감지 및 진행 관리
- 상태 관리: Redis 기반 실시간 사용자/세계/퀘스트 상태 추적

## 역할 및 기여

### 개발 구조
- main/: 메인 개발 버전 (개발 및 테스트용)
- server/: 서버 배포 버전 (프로덕션용)
- 백엔드와 프론트엔드 완전 분리 아키텍처
- RESTful API 설계 및 비동기 처리

### 주요 개발 영역
- AI 통합: OpenAI API 통합 및 프롬프트 엔지니어링
- 상태 관리: 복잡한 게임 상태 실시간 관리 시스템
- UI/UX: 모바일 우선 반응형 디자인 및 직관적 인터페이스
- 데이터베이스: 비동기 PostgreSQL 연동 및 성능 최적화
- 컨테이너화: Docker 기반 배포 환경 구축

## 한계와 개선 방향

### 현재 한계
- 비용 의존성: OpenAI API 사용량에 따른 높은 운영 비용
- 응답 속도: AI 모델 응답 시간으로 인한 사용자 대기 시간
- 스토리 복잡성: 복잡한 다중 분기 스토리 처리의 한계
- 컨텍스트 제한: 긴 대화에서의 컨텍스트 유지 한계
- 확장성: 동시 사용자 증가 시 성능 저하 가능성

### 개선 방향
- 성능 최적화
  - Redis 캐싱 전략 확대
  - AI 응답 시간 단축을 위한 스트리밍 구현
  - 데이터베이스 쿼리 최적화

- 기능 확장
  - 음성 대화 기능 추가
  - 멀티미디어 콘텐츠 (이미지, 동영상) 지원
  - 실시간 멀티플레이어 기능

- AI 모델 다양화
  - 로컬 LLM 통합으로 비용 절감
  - 특화된 모델 사용으로 품질 향상
  - 하이브리드 AI 시스템 구축

- 사용자 경험
  - 더 직관적인 UI/UX 개선
  - 접근성 (Accessibility) 강화
  - 개인화 추천 시스템

- 스토리 엔진
  - 더 복잡한 스토리 분기 시스템
  - 동적 결말 생성 알고리즘
  - 사용자 선택 기반 스토리 진화

## 스크린샷 / 데모
<details>
  <summary>📌 관련 자료</summary>
  
  <p align="center">
    <img src="https://github.com/user-attachments/assets/e15aadc2-f1d3-4d5d-9e4c-3d3d3fc1024f" width="45%" />
    <img src="https://github.com/user-attachments/assets/11565912-3a6f-4a10-a5fe-68025ada6283" width="45%" />
  </p>
  <p align="center">
    <img src="https://github.com/user-attachments/assets/f1ad2432-71af-455b-a83e-3306c43aca71" width="45%" />
    <img src="https://github.com/user-attachments/assets/0dd613c4-c468-424f-bc38-e9680b10fae8" width="45%" />
  </p>
  <p align="center">
    <img src="https://github.com/user-attachments/assets/251e00e6-bf8d-486c-b0c4-8c51a5bf3def" width="45%" />
  </p>  
</details>

### 주요 화면 구성
1. Welcome Page (`/`): 프로젝트 소개 및 시작 화면
2. Character Creation (`/character`): 사용자 캐릭터 생성 및 커스터마이징
3. World Building (`/world`, `/world2`): 세계관 및 테마 설정
4. Relationship (`/relate`): 캐릭터 간 관계 설정 및 관리
5. Chat Interface (`/chat`): AI 캐릭터와의 실시간 대화

### 기술적 특징
- 모바일 우선 반응형 디자인: 다양한 디바이스에서 최적화된 경험
- Material-UI 기반 모던 인터페이스: 일관성 있는 디자인 시스템
- 실시간 상태 동기화: 사용자 액션에 따른 즉시 반영
- Progressive Web App: 네이티브 앱과 유사한 사용자 경험
