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

                # package-lock.json 을 기준으로 깨끗하게 설치
                rm -rf node_modules
                npm ci --legacy-peer-deps
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                // Jenkins Credentials에 등록한 Secret file(.env) 사용
                withCredentials([file(credentialsId: 'react_env_file', variable: 'ENV_FILE')]) {
                    sh '''
                    echo "Copying .env from Jenkins credentials"
                    # Secret file(.env) 을 현재 워크스페이스의 .env 로 복사
                    cp "$ENV_FILE" .env

                    echo "Building Docker image: ${DOCKER_IMAGE}"
                    docker build -t ${DOCKER_IMAGE} .
                    '''
                }
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

    // 어떤 경우든(성공/실패) 마지막에 워크스페이스 정리
    post {
        always {
            echo "Cleaning workspace..."
            cleanWs()
        }
    }  
}
