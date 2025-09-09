# 코스매쓰 - AI 수학 교육 플랫폼 (다각형 대단원 평가)

## 프로젝트 개요

KSM과 IRT 이론을 기반으로 KDT PM7기 교육생들이 기획한 초등수학 AI코스웨어 "코스매쓰" MVP 모델 제작 결과물입니다. 초등학교 수학 교육과정 중 '다각형' 단원을 대상으로 한 AI 기반 적응형 학습 시스템으로, 학습자의 답변을 분석하여 개념별 이해도를 측정하고, 시각적인 지식맵을 통해 학습 현황을 직관적으로 제공합니다.<br><br>
**📌 팀원**<br>
기획 : PM 7기 유수진, 박유진, 최은지, 정진용<br>
개발 : [이신영](https://github.com/2shin0), [이효준](https://github.com/glassesholder)<br><br>
**📌 기간**<br>
2024.11.27 ~ 2025.01.02

### 주요 특징
- 적응형 평가: 학습자의 답변 패턴을 분석하여 개념별 이해도 측정
- 시각적 피드백: 지식맵을 통한 학습 진도 및 취약점 시각화
- 다양한 문제 유형: 객관식, 주관식, 드래그앤드롭 등 다양한 인터랙션 지원
- 개인화된 학습 경험: 개별 학습자의 수준에 맞춘 맞춤형 콘텐츠 제공

## 기술 스택

### Frontend
- React 18.3.1 
- TypeScript 5.5.3 
- Material-UI 5.15.2 
- Styled Components 6.1.3 

### 상태 관리 & 라우팅
- React Context API 
- React Router DOM 

### UI/UX 라이브러리
- React Beautiful DnD 
- React Signature Canvas  
- Recharts
- Emotion (React, Styled) 

### 개발 도구
- Vite 
- ESLint 
- Axios 

## 주요 기능

### 1. 다양한 문제 유형 지원
- 객관식 문제: 선택지 중 정답 선택
- 주관식 문제: 직접 답안 입력
- 드롭다운 문제: 드롭다운에서 답안 선택
- 드래그앤드롭 문제: 요소를 드래그하여 정답 배치

### 2. 실시간 학습 진도 추적
- 문제별 답변 상태 실시간 업데이트
- 진도율 시각화 (프로그레스 바)
- 이전/다음 문제 네비게이션

### 3. 지식맵 시각화
- 개념 간 연관관계를 노드와 엣지로 표현
- 학습자의 이해도에 따른 색상 구분
- 인터랙티브한 지식 구조 탐색

### 4. 개념별 성취도 분석
- 18개 문제를 통한 6개 핵심 개념 평가
  - 다각형 기본 개념
  - 정다각형
  - 대각선
  - 모양조각과 모양 만들기
  - 모양 채우기
- 개념별 정답률 및 취약점 분석

### 5. 학습 결과 리포트
- 전체 성취도 요약
- 개념별 상세 분석
- 학습 권장사항 제공

## 시스템 아키텍처

```
src/
├── components/           # React 컴포넌트
│   ├── questions/       # 문제 유형별 컴포넌트
│   │   ├── MultipleChoice.tsx
│   │   ├── ShortAnswerQuestion.tsx
│   │   ├── DropdownQuestion.tsx
│   │   └── DragDropQuestion.tsx
│   ├── EvaluationPage.tsx    # 평가 메인 페이지
│   ├── ResultPage.tsx        # 결과 페이지
│   ├── KnowledgeMap.tsx      # 지식맵 컴포넌트
│   └── CircleItem.tsx        # 지식맵 노드 컴포넌트
├── context/             # React Context
│   └── EvaluationContext.tsx # 평가 상태 관리
├── data/               # 정적 데이터
│   └── questions.ts    # 문제 데이터
├── types/              # TypeScript 타입 정의
└── App.tsx            # 메인 애플리케이션
```

### 데이터 흐름
1. 문제 데이터 로드: questions.ts에서 18개 문제 데이터 로드
2. 상태 관리: EvaluationContext를 통한 답변 상태 및 진도 관리
3. 답변 처리: 각 문제 유형별 컴포넌트에서 답변 수집
4. 결과 분석: 개념별 정답률 계산 및 성취도 분석
5. 시각화: 지식맵을 통한 학습 현황 시각적 표현

## 실행 방법

### 사전 요구사항
- Node.js 16.0 이상
- npm 

### 설치 및 실행
```bash
# 의존성 설치
npm install 

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build 

# 빌드 결과 미리보기
npm run preview
```

### 환경 설정
- 개발 서버: http://localhost:3000
- 문제 이미지: public/images/questions/ 디렉토리에 위치
- 샘플 데이터: public/json/sample.json에서 지식맵 데이터 로드

## 데이터 및 알고리즘

### 문제 데이터 구조
```typescript
interface Question {
  id: number;
  type: 'multiple-choice' | 'short-answer' | 'dropdown' | 'drag-drop';
  content: string;
  imageUrl?: string;
  options?: string[];
  correctAnswer: string;
  concepts: string[];
  answerCount: number;
  explanation: {
    understanding: string;
    planning: string;
    solving: string;
  };
  difficulty: number;
}
```

### 성취도 계산 알고리즘
1. 개념별 정답률: (정답 수 / 전체 문제 수) × 100
2. 난이도 가중치: 문제별 difficulty 값을 활용한 가중 평균
3. 지식맵 시각화: 정답률에 따른 4단계 색상 구분
   - Let's Try! (0-25%): 빨간색
   - Good (26-50%): 주황색  
   - Great (51-75%): 노란색
   - Excellent (76-100%): 초록색

### 적응형 학습 로직
- 실시간 답변 분석을 통한 개념별 이해도 측정
- 취약 개념 식별 및 추가 학습 권장사항 제공
- 학습 경로 개인화를 위한 데이터 수집

## 역할 및 기여

### 주요 개발 영역
- 데이터 모델링: 문제 데이터 구조 및 평가 로직 설계
- 프론트엔드 아키텍처 설계: React + TypeScript 기반 컴포넌트 구조 설계
- 상태 관리 시스템: Context API를 활용한 전역 상태 관리 구현
- UI/UX 개발: Material-UI와 Styled Components를 활용한 반응형 인터페이스 구현
- 문제 유형별 컴포넌트: 4가지 문제 유형에 대한 인터랙티브 컴포넌트 개발

### 기술적 도전과 해결
- 복잡한 상태 관리: Context API와 useReducer를 조합하여 효율적인 상태 관리 구현
- 동적 지식맵 렌더링: SVG와 CSS Transform을 활용한 실시간 노드 위치 계산
- 다양한 입력 방식: 각 문제 유형별 최적화된 사용자 인터페이스 설계
- 성능 최적화: React.memo와 useCallback을 활용한 불필요한 리렌더링 방지

## 한계와 개선 방향

### 현재 한계점
1. 정적 문제 데이터: 하드코딩된 18개 문제로 제한
2. 단방향 평가: 학습자 피드백 기반 문제 난이도 조정 부재
3. 제한적 분석: 기본적인 정답률 분석에 국한
4. 오프라인 제한: 네트워크 연결 없이는 사용 불가

### 개선 방향
1. 동적 문제 생성: AI 기반 문제 자동 생성 시스템 도입
2. 적응형 알고리즘 고도화: 
   - 실시간 난이도 조정
   - 개인별 학습 패턴 분석
   - 예측 모델 기반 추천 시스템
3. 백엔드 시스템 구축:
   - 사용자 데이터 영구 저장
   - 학습 이력 추적
   - 교사용 대시보드
4. 확장 기능:
   - 음성 인식 답변 입력
   - 게임화 요소 추가
   - 협력 학습 기능
   - 다국어 지원

### 기술적 개선사항
- PWA 구현: 오프라인 학습 지원
- 실시간 동기화: WebSocket 기반 실시간 데이터 동기화
- 마이크로서비스 아키텍처: 확장 가능한 백엔드 구조
- AI/ML 통합: TensorFlow.js를 활용한 클라이언트 사이드 AI

## 스크린샷 / 데모

### 메인 평가 화면

<p align="left">
  <img src="https://github.com/user-attachments/assets/2bcae65c-580d-4335-b29e-91f5b7c04074" width="45%" />
  <img src="https://github.com/user-attachments/assets/d39c24e4-99ec-4d8c-87b1-57fa10849b8e" width="45%" />
</p>
<p>
  <img src="https://github.com/user-attachments/assets/c5b9c6b0-de31-4be5-ac4a-8818c7192220" width="45%" />
</p>

- 문제 진행률 표시
- 다양한 문제 유형 지원
- 직관적인 네비게이션

### 지식맵 시각화

<p align="left">
  <img src="https://github.com/user-attachments/assets/0261dbe4-77ae-4021-a3af-9fa2770e2279" width="45%" />
</p>

- 개념 간 연관관계 시각화
- 학습 성취도별 색상 구분
- 인터랙티브한 탐색 기능

### 결과 분석 화면

<p align="left">
  <img src="https://github.com/user-attachments/assets/2713279d-ee93-4ce9-b77a-22029e7c04c4" width="45%" />
  <img src="https://github.com/user-attachments/assets/ebce56ec-0ada-44ec-ba9d-de67008cb5b4" width="45%" />
</p>

- 문제 풀이 결과 및 해설
- 개념별 성취도 분석
- 상세한 학습 피드백


