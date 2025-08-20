# Mapack (SIDE1)

Mapack - 위치 기반 장소 추천 토너먼트 서비스

> 위치 기반으로 장소를 검색하고 토너먼트 방식으로 최종 선택할 수 있는 웹 애플리케이션

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

🎯 프로젝트 소개
맛집을 고를 때 "어디가 좋을까?" 하며 고민했던 경험이 있으신가요? Mapack은 이런 일상적인 선택의 어려움을 토너먼트 방식으로 재미있게 해결하는 서비스입니다.
왜 이 프로젝트를 만들었나요?
- 선택 장애를 겪는 사람들을 위한 실용적인 솔루션 제공
- 복잡한 다중 선택을 간단한 1:1 비교로 단순화
- 실제 위치 데이터를 활용한 현실적인 추천
- 점심 메뉴 선정

### Frontend (client/)
```
components/
├── common/             # 재사용 컴포넌트 (Button, Modal, Layout 등)
├── account/           # 로그인/회원가입 관련
└── service/map/       # 지도 서비스 컴포넌트

hooks/                 # 비즈니스 로직 분리
├── map/              # 지도 관련 커스텀 훅
└── user/             # 사용자 관련 커스텀 훅

store/                # Redux Toolkit 상태 관리
├── authSlice.ts      # 인증 상태
├── modalSlice.ts     # 모달 상태
└── toastSlice.ts     # 알림 상태

types/                # TypeScript 타입 정의
api/                  # API 통신 레이어
utils/                # 유틸리티 함수들
pages/                # Next.js 페이지 라우팅
styles/               # 스타일 관련 파일
```

### Backend (server/)
```
src/
├── controllers/ # 비즈니스 로직 처리
│ ├── authController.ts # 토큰 관리
│ ├── userController.ts # 사용자 CRUD 및 인증
│ └── serviceController.ts # 지도/장소 관련 서비스
├── models/ # 데이터베이스 모델
│ ├── auth.ts # 토큰 관련 모델
│ ├── user.ts # 사용자 모델
│ └── map.ts # 장소 및 사용자-장소 관계 모델
├── routes/ # API 엔드포인트 라우팅
│ ├── authRoutes.ts # 인증 관련 라우트
│ ├── userRoutes.ts # 사용자 관련 라우트
│ └── serviceRoutes.ts # 지도 서비스 라우트
├── middlewares/ # 미들웨어
│ └── auth.ts # JWT 토큰 검증
├── sql/ # SQL 쿼리 관리
│ ├── auth/ # 인증 관련 쿼리
│ ├── user/ # 사용자 관련 쿼리
│ └── map/ # 지도 관련 쿼리
├── utils/ # 유틸리티 함수
│ ├── auth/ # 인증 유틸리티
│ ├── service/ # 서비스 유틸리티
│ └── validation.ts # 입력 검증
├── types/ # TypeScript 타입 정의
└── config/ # 데이터베이스 연결 설정
```



## 🛠️ 기술 스택

### Frontend
- **Next.js 15**
- **TypeScript**
- **Redux Toolkit**
- **React Query**
- **Styled-components**
- **Naver, Kakao API** 

### Backend  
- **Node.js + Express**
- **MySQL + Sequelize**
- **JWT**
- **bcrypt**
- **Nodemailer**

**📖 더 자세한 기능 설명과 화면은 [프로젝트 노션](https://mesquite-rake-aae.notion.site/SIDE1-Mapack-252d1d9d58e38044876eef74d404d3ac)에서 확인하실 수 있습니다.**

