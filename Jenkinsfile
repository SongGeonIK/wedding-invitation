pipeline {
    agent any  // 어느 에이전트에서나 실행 (지금은 Jenkins 컨테이너)

    tools {
        nodejs 'node-lts'  // Jenkins에 등록한 NodeJS 이름
    }

    environment {
        // 레포 정보
        GIT_CREDENTIALS_ID = 'SongGeonIk'
        REPO_URL           = 'https://github.com/SongGeonIK/wedding-invitation.git'

        // Docker 관련 설정
        DOCKER_IMAGE       = 'wedding-invitation:latest'
        CONTAINER_NAME     = 'wedding-invitation-app'
        HOST_PORT          = '8080'   // NAS에서 사용할 포트

        // React 환경변수 (Jenkins 크리덴셜 사용, 개발참고만 하려고 냅둔경우, 실제로는 .env로 가져옴)
        // REACT_APP_GROOM_LAST_NAME=credentials('REACT_APP_GROOM_LAST_NAME')
        // REACT_APP_GROOM_FIRST_NAME=credentials('REACT_APP_GROOM_FIRST_NAME')
    }

    stages {
        stage('Checkout') {
            steps {
                // GitHub에서 현재 레포 코드 가져오기
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh '''
                node -v
                npm -v

                # 의존성 설치
                npm ci --legacy-peer-deps || npm install --legacy-peer-deps
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                echo "Building Docker image: ${DOCKER_IMAGE}"
                docker build -t ${DOCKER_IMAGE} .
                '''
            }
        }

        stage('Deploy Container on NAS') {
            steps {
                sh '''
                # 기존 컨테이너가 실행 중이면 정지
                if [ "$(docker ps -q -f name=${CONTAINER_NAME})" ]; then
                    echo "Stopping existing container: ${CONTAINER_NAME}"
                    docker stop ${CONTAINER_NAME}
                fi

                # 정지된 컨테이너라도 남아 있으면 삭제
                if [ "$(docker ps -aq -f name=${CONTAINER_NAME})" ]; then
                    echo "Removing existing container: ${CONTAINER_NAME}"
                    docker rm ${CONTAINER_NAME}
                fi

                # 새 컨테이너 실행
                echo "Running new container: ${CONTAINER_NAME}"
                docker run -d \
                    --name ${CONTAINER_NAME} \
                    -p ${HOST_PORT}:80 \
                    ${DOCKER_IMAGE}
                '''
            }
        }
    }
}
