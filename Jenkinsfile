pipeline {
    agent any

    tools {
        nodejs 'node-lts'  
    }

    environment {
        GIT_CREDENTIALS_ID = 'SongGeonIk'
        REPO_URL           = 'https://github.com/SongGeonIK/wedding-invitation.git'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh '''
                node -v
                npm -v

                npm ci --legacy-peer-deps || npm install --legacy-peer-deps
                '''
            }
        }

        stage('Build & Deploy to GitHub Pages') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: "${GIT_CREDENTIALS_ID}",
                        usernameVariable: 'GIT_USERNAME',
                        passwordVariable: 'GIT_PASSWORD'
                    )
                ]) {
                    sh '''
                        set -e

                        # gh-pages 패키지가 사용하는 origin URL에 PAT 심어주기
                        git remote set-url origin https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/SongGeonIK/wedding-invitation.git

                        # package.json 의 "predeploy": "npm run build"
                        # 가 먼저 실행되고, 그 다음 "deploy": "gh-pages -d build" 실행됨
                        npm run deploy
                    '''
                }
            }
        }
    }
}
