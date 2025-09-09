# 생성형 AI를 활용한 중등 수학 개념 및 풀이 챗봇

## 프로젝트 개요

KDT 개발 멘토로 참여한 결과물로, RAG(Retrieval-Augmented Generation) 기술을 활용하여 중학교 1학년 수학 개념과 문제 풀이를 단계별로 제공하는 AI 챗봇입니다. PDF 형태의 수학 교재를 벡터 데이터베이스에 저장하고, 학생의 질문에 맞는 관련 내용을 검색하여 GPT-4를 통해 친근하고 이해하기 쉬운 설명을 제공합니다.<br><br>
**📌 팀원**<br>
기획 : PM 7기 김민정, 김지민, 김화영, 유영채, 윤수정<br>
개발 멘토 : [김현경](https://github.com/beubeu95), [이신영](https://github.com/2shin0), [이효준](https://github.com/glassesholder)<br><br>
**📌 기간**<br>
2024/11/7(목) ~ 11/14(목) 총 6일, 개발 약 4일

## 기술 스택

### Backend
- 프레임워크: Flask (Python)
- AI 모델: OpenAI GPT-4o
- 자연어 처리: LangChain
- 벡터 데이터베이스: FAISS
- 임베딩: OpenAI Embeddings
- 문서 처리: PyPDF2, PyPDF

### Frontend
- 템플릿 엔진: Flask Jinja2
- 스타일링: CSS
- 스크립팅: JavaScript

### 개발 환경
- Python 3.10.0
- VSCode
- 가상환경: venv

## 주요 기능

### 1. RAG 기반 문서 검색
- PDF 교재를 청킹하여 벡터 데이터베이스에 저장
- 사용자 질문과 관련된 문서 내용을 MMR(Maximal Marginal Relevance) 방식으로 검색
- 검색된 문서를 기반으로 정확한 답변 생성

### 2. 단계별 수학 풀이 제공
- RAG 3단계 전략에 대응하는 GPT 단계별 풀이 반환 구현
- 중학교 1학년 수준에 맞는 친근한 말투로 설명
- 복잡한 개념을 단계별로 나누어 이해하기 쉽게 설명

### 3. 적응형 학습 지원
- 추가 설명 요청 시 더 이해하기 쉬운 방식으로 재설명
- 학생 수준에 맞는 용어 사용
- 존댓말과 친근한 "~에요" 말투 사용

### 4. 웹 기반 채팅 인터페이스
- 실시간 채팅 형태의 질의응답
- 직관적이고 사용하기 쉬운 웹 인터페이스
- 대화 기록 유지 및 연속적인 학습 지원

## 시스템 아키텍처

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Browser   │    │   Flask Server  │    │   OpenAI API    │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (GPT-4o)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌────────┼────────┐
                       │        │        │
              ┌─────────▼──┐ ┌──▼──────┐ ┌───▼────────┐
              │    PDF     │ │  FAISS  │ │  LangChain │
              │ Documents  │ │ Vector  │ │   Chain    │
              │            │ │   DB    │ │            │
              └────────────┘ └─────────┘ └────────────┘
```

### 주요 컴포넌트
- 문서 처리 계층: PDF 문서를 청킹하고 임베딩하여 벡터 DB에 저장
- 검색 계층: FAISS를 통한 유사도 기반 문서 검색
- 생성 계층: LangChain과 GPT-4o를 활용한 답변 생성
- 웹 인터페이스: Flask 기반 실시간 채팅 인터페이스

## 실행 방법

### 사전 요구사항
- Python 3.10.0
- OpenAI API Key
- PDF 형태의 수학 교재

### 환경 설정
1. OpenAI API KEY 준비
   - API 키를 발급받아 `.env` 파일에 설정
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

2. RAG 문서 준비
   - PDF 폴더에 수학 교재 PDF 파일들을 넣어주세요

### 실행 순서
```bash
# 1. 가상환경 생성
python -m venv venv

# 2. 가상환경 활성화 (Windows)
venv\Scripts\activate

# 3. 패키지 설치
pip install -r requirements.txt

# 4. PDF 청킹, 임베딩, 벡터DB에 저장
python file_trans.py

# 5. 챗봇 실행
python main.py
```

### 접속
- 웹 인터페이스: http://localhost:5000

## 데이터 및 알고리즘

### 데이터 처리 파이프라인
- 문서 로딩: PyPDFDirectoryLoader를 통한 PDF 문서 일괄 로딩
- 텍스트 분할: RecursiveCharacterTextSplitter로 청크 크기 100, 오버랩 30으로 분할
- 임베딩: OpenAI Embeddings를 통한 텍스트 벡터화
- 벡터 저장: FAISS 벡터 데이터베이스에 코사인 유사도 기반 저장

### AI 알고리즘
- 검색 알고리즘: MMR(Maximal Marginal Relevance) 방식으로 관련 문서 검색
- 답변 생성: Map-Reduce 체인을 통한 문서 기반 답변 생성
- 프롬프트 엔지니어링: 중학교 1학년 수준에 맞는 친근한 말투 설정
- 컨텍스트 관리: 검색된 문서들을 결합하여 일관성 있는 답변 제공

## 역할 및 기여

### 개발 멘토 역할
- 시스템 설계: RAG 아키텍처 설계 및 구현 가이드
- 기술 지도: LangChain, FAISS, OpenAI API 활용 방법 멘토링
- 코드 리뷰: 효율적인 벡터 검색 및 답변 생성 로직 개선
- 성능 최적화: 청킹 전략 및 검색 파라미터 튜닝

### 주요 기여 영역
- RAG 3단계 전략 구현 및 최적화
- 교육용 프롬프트 엔지니어링
- 벡터 데이터베이스 구축 및 관리
- 웹 인터페이스 개발 지원

## 한계와 개선 방향

### 현재 한계
- 문서 범위 제한: PDF 형태의 교재에만 의존
- 단일 학년 대상: 중학교 1학년 수학에만 특화
- 실시간 학습 부족: 사용자 피드백 기반 개선 기능 없음
- 멀티미디어 지원 부족: 수식, 그래프, 도형 등 시각적 요소 처리 한계

### 개선 방향
- 다양한 문서 형식 지원
  - Word, PPT, 이미지 파일 등 다양한 교재 형식 지원
  - OCR 기술을 통한 이미지 내 텍스트 추출

- 학습 범위 확장
  - 중학교 전 학년 수학 과정으로 확장
  - 다른 과목(과학, 영어 등)으로 적용 범위 확대

- 개인화 학습
  - 학습자별 이해도 추적 및 맞춤형 설명 제공
  - 오답 패턴 분석을 통한 약점 보완

- 시각적 요소 강화
  - 수식 렌더링 기능 추가
  - 그래프, 도형 생성 및 시각화 기능
  - 단계별 풀이 과정 시각화

## 스크린샷 / 데모

### 기획 발표자료
<details>
  <summary>📌 기획 발표자료</summary>
  
  <p align="center">
    <img src="https://github.com/user-attachments/assets/d5b211fc-391a-4489-b606-770729b453da" width="45%" />
    <img src="https://github.com/user-attachments/assets/329fbb80-a861-4981-bbdd-0ecd9300baeb" width="45%" />
  </p>
  <p align="center">
    <img src="https://github.com/user-attachments/assets/eba2010c-58a3-400a-84cb-2724ad2ca3c4" width="45%" />
    <img src="https://github.com/user-attachments/assets/c6095827-5489-4358-ae2b-8eec07f4141d" width="45%" />
  </p>
  <p align="center">
    <img src="https://github.com/user-attachments/assets/6fc2f42a-6aa8-4067-b151-402e253b0f38" width="45%" />
    <img src="https://github.com/user-attachments/assets/9af8db2c-5393-4738-a379-e5ca365ffc4e" width="45%" />
  </p>
  <p align="center">
    <img src="https://github.com/user-attachments/assets/8359e8c3-b586-462a-b798-2edda6c11518" width="45%" />
    <img src="https://github.com/user-attachments/assets/100a1257-35ac-463e-9396-7ab2e76a1328" width="45%" />
  </p>
  <p align="center">
    <img src="https://github.com/user-attachments/assets/ecd770ea-2952-4ffa-9fc3-80af57946cec" width="45%" />
  </p>
  
</details>

### 개발 발표자료
<details>
  <summary>📌 개발 발표자료</summary>
  
  <p align="center">
    <img src="https://github.com/user-attachments/assets/63830cfc-46b5-44e1-89be-0dc52c782f9f" width="45%" />
    <img src="https://github.com/user-attachments/assets/63370a05-fd85-420b-a822-4515a2155044" width="45%" />
  </p>
  <p align="center">
    <img src="https://github.com/user-attachments/assets/8eaa9dba-de1f-4dfd-b6a3-88a7a60cdf7f" width="45%" />
    <img src="https://github.com/user-attachments/assets/fbdecc6a-2230-4a34-a967-ee801c667783" width="45%" />
  </p>
  <p align="center">
    <img src="https://github.com/user-attachments/assets/dfd84f78-38ff-4cac-83b1-a0040939ff5c" width="45%" />
    <img src="https://github.com/user-attachments/assets/4b271fe9-2ba6-4d5a-a38b-7b8e6b000c5a" width="45%" />
  </p>

</details>

### 주요 특징
- 교육 전문성: 중학교 1학년 수준에 맞춘 맞춤형 설명
- RAG 기술: 실제 교재 내용을 기반으로 한 정확한 답변
- 단계별 풀이: 복잡한 수학 문제를 이해하기 쉽게 단계별로 설명
- 친근한 인터페이스: 학생들이 부담 없이 질문할 수 있는 채팅 형태

### 데모 시나리오
1. PDF 교재 업로드 → 벡터 데이터베이스 구축
2. 학생 질문 입력 → 관련 교재 내용 검색
3. GPT-4 기반 답변 생성 → 친근한 말투로 단계별 설명
4. 추가 질문 → 더 자세한 설명 제공
