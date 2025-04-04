
---

## ⚙️ 주요 기술 스택

- **Frontend**: Vite + React  
- **Backend**: Spring Boot + MySQL + JWT 인증  
- **Config Server**: Spring Cloud Config (GitHub 연동)  
- **결제 모듈**: KakaoPay  
- **포트 구성**:
  - `8888` - 설정 서버
  - `8081` - 백엔드 API 서버
  - `5173` - 프론트엔드 개발 서버

---
## 🧾 주요 기능 요약

### ✅ 사용자 기능
- 메뉴 조회 및 주문
- 장바구니 및 결제 처리 (KakaoPay)
- 로그인 / 로그아웃 (JWT 기반) ✅
- 마이페이지 - 회원 정보 및 탈퇴 (삭제 API) ✅

### 🔐 관리자 기능
- 주문 내역 조회 및 상세 페이지
- 결제 내역 확인
- 메뉴 등록 / 수정 / 삭제

---

## 📁 디렉토리 구조 요약

kiosk-system-vite/ 
├── config-server/ # 설정 서버 (GitHub 연동) 
├── kiosk-app/ # 백엔드 API 서버 (JWT, MySQL, KakaoPay) 
├── kiosk-frontend-vite/ # 프론트엔드 (Vite + React) └── README.md

## ⚙️ 주요 설정

### ✅ 설정 서버: `application.yml`
```yaml
server:
  port: 8888
spring:
  cloud:
    config:
      server:
        git:
          uri: https://github.com/Youngjoon-Park/config-repo0327
          default-label: main
          search-paths: .

## 🔐 백엔드 application.properties 설정

```properties
spring.application.name=kiosk-basic
spring.config.import=optional:configserver:http://localhost:8888

server.port=8081

# KakaoPay 연동 키
kakao.admin-key=e58ec7c8605486c3e1......

# 로그 설정
logging.level.org.springframework=DEBUG

# 경로 매칭 설정 (JWT 필터와 호환성)
spring.mvc.pathmatch.matching-strategy=ant_path_matcher

# JWT 시크릿 키
jwt.secret=MySuperLongAndSecureJwtSecretKey.....

포트 정리
구성	포트	설명
Config Server	8888	Spring Config 서버 (GitHub 설정 로드)
Spring Boot API	8081	주문/결제/회원 관리 API 서버
Vite 프론트	5173	UI 및 백엔드 API 연동
