pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/FelipEthan08/AutomationCeleris'
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install'  // usa 'sh' en lugar de 'bat' si Jenkins corre en Linux
            }
        }

        stage('Run Cypress tests') {
            steps {
                bat 'npx cypress run'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/videos/**/*.*, cypress/screenshots/**/*.*', allowEmptyArchive: true
        }
    }
}
