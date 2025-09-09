# 지니 - AI 수능 국어 지문/문항 자동 생성 서비스

## 프로젝트 개요

지니는 교육 현장의 문제 출제 업무 경감을 위해 개발된 AI 수능 국어 지문 및 문항 자동 생성 플랫폼입니다. Google Gemini AI를 활용하여 다양한 유형의 지문(단일 지문, 독서론, 복합 지문)과 그에 맞는 문항을 자동으로 생성하며, 교육자들이 효율적으로 평가 자료를 제작할 수 있도록 지원합니다.<br><br>
**📌 팀원**<br>
기획 : [손명근](https://github.com/son1473)<br>
백엔드 개발: [이신영](https://github.com/2shin0), [이효준](https://github.com/glassesholder), [권홍준](https://github.com/k-3730), [정도환](https://github.com/yuusakuu)<br>
프론트엔드 개발: [김현경](https://github.com/beubeu95), [최광훈](https://github.com/hoonee-math)<br><br>
**📌 기간**<br>
2025.02 ~ 07 (참여 기간)
  
<p align="center">
  <img src="https://github.com/user-attachments/assets/10ce053a-e157-430c-a106-d9afea584fe0" width="45%" />
  <img src="https://github.com/user-attachments/assets/d84b34a6-ce90-4166-ba7e-16ac5a8dd1c9" width="45%" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/973d360f-b777-489d-b712-36643546b419" width="45%" />
  <img src="https://github.com/user-attachments/assets/669ac75b-4804-43ca-a11f-c8e32df96fcf" width="45%" />
</p>


## 기술 스택

### API Server (Python)
- 프레임워크: FastAPI
- AI 모델: Google Gemini 2.5 Pro/Flash
- 자연어 처리: LangChain, OpenAI
- 데이터 처리: FAISS (벡터 검색), BeautifulSoup4
- 인증: JWT (python-jose)
- 클라우드: AWS S3 (boto3)
- 서버: Gunicorn, Uvicorn

### Backend (Java)
- 프레임워크: Spring Boot 3.4.3
- 보안: Spring Security, OAuth2
- 데이터베이스: MariaDB, JPA/Hibernate
- 캐싱: Redis
- 인증: JWT (jjwt)
- 문서화: Swagger (SpringDoc OpenAPI)
- 파일 처리: Apache POI, PDFBox, iText7

### Frontend (Vue.js)
- 프레임워크: Vue 3 + Composition API
- 상태 관리: Pinia
- UI 라이브러리: Tailwind CSS, TW Elements
- 텍스트 에디터: TipTap
- 라우팅: Vue Router 4
- 빌드 도구: Vite
- 기타: SortableJS, XLSX, EmailJS

### DevOps & Tools
- 버전 관리: Git
- 빌드 도구: Maven (Java), Vite (Vue)
- 개발 도구: Lombok, Vue DevTools

## 주요 기능

### 1. 지문 생성
- 단일 지문 생성: 특정 주제나 키워드 기반 단일 지문 자동 생성
- 독서론 지문 생성: 독서 이론 및 방법론 관련 전문 지문 생성
- 복합 지문 생성: 여러 관점이나 자료를 종합한 복합 지문 생성
- 맞춤형 난이도 조절: 학습자 수준에 맞는 지문 복잡도 설정

### 2. 문항 생성
- 지문 분석 기반 문항 생성: 생성된 지문을 분석하여 적합한 문항 자동 생성
- 다양한 문항 유형: 객관식, 주관식, 서술형 등 다양한 평가 문항
- 문항 품질 관리: AI 기반 문항 적절성 및 난이도 검증
- 예시 문항 제공: 문항 유형별 참고 예시 제공

### 3. 사용자 관리
- OAuth2 소셜 로그인: 간편한 소셜 계정 연동 로그인
- JWT 기반 인증: 안전한 토큰 기반 사용자 인증
- 사용량 추적: API 호출 비용 및 사용량 모니터링
- 권한 관리: 사용자별 기능 접근 권한 제어

### 4. 콘텐츠 관리
- 지문/문항 저장: 생성된 콘텐츠 데이터베이스 저장 및 관리
- 편집 기능: TipTap 에디터를 통한 실시간 콘텐츠 편집
- 파일 출력: PDF, Word 등 다양한 형식으로 내보내기
- 템플릿 관리: 재사용 가능한 지문/문항 템플릿 제공

## 시스템 아키텍처

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vue Frontend  │    │  Spring Backend │    │   FastAPI       │
│   (Port: 5173)  │◄──►│   (Port: 8080)  │◄──►│   AI Server     │
│                 │    │                 │    │   (Port: 8501)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                        │
                       ┌────────┼────────┐              │
                       │        │        │              │
              ┌─────────▼──┐ ┌──▼──┐ ┌───▼────┐ ┌──────▼──────┐
              │  MariaDB   │ │Redis│ │  AWS   │ │   Google    │
              │ Database   │ │Cache│ │   S3   │ │   Gemini    │
              └────────────┘ └─────┘ └────────┘ └─────────────┘
```

### 주요 컴포넌트
- AI 서비스 계층: Gemini API를 활용한 지문/문항 생성 로직
- 비즈니스 로직 계층: Spring Boot 기반 핵심 비즈니스 처리
- 프레젠테이션 계층: Vue.js 기반 사용자 인터페이스
- 데이터 계층: MariaDB 영구 저장소 및 Redis 캐시

## 실행 방법

### 사전 요구사항
- Java 17+
- Python 3.8+
- Node.js 16+
- MariaDB
- Redis
- Google Gemini API Key

### 환경 설정
1. API 서버 환경 변수 (`.env` 파일):
```bash
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

2. 백엔드 설정 (`application.yml`):
```yaml
spring:
  datasource:
    url: jdbc:mariadb://localhost:3306/genieq
    username: your_db_username
    password: your_db_password
  redis:
    host: localhost
    port: 6379
```

### 실행 순서
```bash
# 1. API 서버 실행
cd api
pip install -r requirements.txt
python main.py

# 2. 백엔드 서버 실행
cd back
./mvnw spring-boot:run

# 3. 프론트엔드 실행
cd front
npm install
npm run dev
```

### 접속
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- AI API Server: http://localhost:8501
- Swagger UI: http://localhost:8080/swagger-ui.html

## 데이터 및 알고리즘

### 데이터베이스 스키마
- User: 사용자 정보 및 인증 데이터
- Passage: 생성된 지문 정보 및 메타데이터
- Question: 문항 정보 및 정답 데이터
- Template: 재사용 가능한 템플릿 정보
- Usage: API 사용량 및 비용 추적 데이터

### AI 알고리즘
- 지문 생성: Gemini 2.5 Pro를 활용한 맥락적 지문 생성
- 문항 생성: 지문 분석 후 적합한 평가 문항 자동 생성
- 난이도 조절: 학습자 수준에 맞는 콘텐츠 복잡도 자동 조정
- 품질 검증: 생성된 콘텐츠의 교육적 적절성 AI 검증
- 벡터 검색: FAISS를 활용한 유사 콘텐츠 검색 및 중복 방지

## 역할 및 기여
기획 및 API 개발

### 주요 개발 영역
- API 설계 및 개발: FastAPI 기반 AI 서비스 서버 구축
  - Google Gemini API 통합 및 프롬프트 엔지니어링
  - 지문/문항 생성 알고리즘 설계 및 구현

## 한계와 개선 방향

### 현재 한계
- AI 모델 의존성: Google Gemini API 서비스 중단 시 영향
- 생성 품질 편차: 주제나 난이도에 따른 콘텐츠 품질 차이
- 비용 관리: AI API 사용량 증가에 따른 운영 비용 상승
- 실시간 처리: 복잡한 지문 생성 시 응답 시간 지연
- 다국어 지원: 현재 한국어 중심의 콘텐츠 생성

### 개선 방향
- AI 모델 다양화
  - 다중 AI 모델 지원으로 안정성 확보
  - 로컬 LLM 통합으로 비용 절감
  - 교육 도메인 특화 모델 파인튜닝

- 품질 향상
  - 교육 전문가 피드백 기반 품질 개선
  - A/B 테스트를 통한 생성 알고리즘 최적화
  - 사용자 평가 시스템 도입

- 성능 최적화
  - 캐싱 전략 확대로 응답 속도 개선
  - 비동기 처리를 통한 대용량 요청 처리
  - CDN 도입으로 전역 서비스 성능 향상

- 기능 확장
  - 다양한 교과목 지원 확대
  - 멀티미디어 콘텐츠 생성 기능
  - 협업 도구 및 공유 기능 강화

## 스크린샷 / 데모

### 주요 화면 구성
1. 랜딩 페이지: 서비스 소개 및 주요 기능 안내
2. 지문 생성: 단일/독서론/복합 지문 생성 인터페이스
3. 문항 생성: 지문 기반 다양한 유형의 문항 생성
4. 에디터: TipTap 기반 실시간 콘텐츠 편집 도구
5. 마이페이지: 사용량 추적 및 생성 이력 관리
6. 저장소: 생성된 콘텐츠 관리 및 재사용

### 기술적 특징
- 반응형 디자인: 다양한 디바이스에서 최적화된 사용자 경험
- 실시간 편집: TipTap 에디터를 통한 즉시 콘텐츠 수정
- 드래그 앤 드롭: SortableJS를 활용한 직관적인 콘텐츠 정렬
- 파일 처리: 다양한 형식의 문서 입출력 지원

### 데모 시나리오
1. 사용자 로그인 → 소셜 계정 연동
2. 지문 생성 요청 → AI 기반 자동 생성
3. 문항 생성 → 지문 분석 후 적합한 문항 제공
4. 콘텐츠 편집 → 실시간 수정 및 미리보기
5. 파일 출력 → PDF/Word 형식으로 다운로드
