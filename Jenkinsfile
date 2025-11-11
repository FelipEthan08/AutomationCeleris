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
				bat 'npm install'
			}
		}

		stage('Install Cypress binary') {
			steps {
				// 👇 Este paso descarga e instala el binario en el entorno del usuario SYSTEM
				bat 'npx cypress install'
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
			archiveArtifacts artifacts: 'cypress/reports/**/*.*', allowEmptyArchive: true
		}
	}
}
