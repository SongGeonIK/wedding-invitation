# 1단계: node로 React 앱 빌드하는 단계
FROM node:18-alpine AS build

# 컨테이너 안에서 작업 폴더 지정
WORKDIR /app

# --- env 추가  ---
ARG REACT_APP_GROOM_LAST_NAME
ARG REACT_APP_GROOM_FIRST_NAME
ENV REACT_APP_GROOM_LAST_NAME=$REACT_APP_GROOM_LAST_NAME
ENV REACT_APP_GROOM_FIRST_NAME=$REACT_APP_GROOM_FIRST_NAME
# -----------------

# 의존성 설치를 위해 package.json만 먼저 복사
COPY package*.json ./

# npm 패키지 설치
RUN npm install --legacy-peer-deps

# 나머지 소스코드 전체 복사
COPY . .

# React 빌드 (build/ 폴더 생성)
RUN npm run build


# 2단계: nginx로 정적 파일 서빙
FROM nginx:alpine

# 1단계에서 만든 build 결과물을 nginx 기본 루트로 복사
COPY --from=build /app/build /usr/share/nginx/html

# nginx는 기본적으로 80포트로 서비스
EXPOSE 80

# nginx 실행 명령
CMD ["nginx", "-g", "daemon off;"]
