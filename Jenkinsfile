pipeline {
	agent any

	environment {
		// Ruta para cachear dependencias y binario Cypress
		NPM_CACHE = 'C:\\jenkins_cache\\npm'
		CYPRESS_CACHE = 'C:\\jenkins_cache\\cypress'
	}

	stages {
		stage('Checkout') {
			steps {
				git branch: 'main', url: 'https://github.com/FelipEthan08/AutomationCeleris'
			}
		}

		stage('Install dependencies') {
			steps {
				bat "npm config set cache %NPM_CACHE%"
				bat 'npm ci'
			}
		}

		stage('Install Cypress binary (if needed)') {
			steps {
				bat "set CYPRESS_CACHE_FOLDER=%CYPRESS_CACHE% && npx cypress install"
			}
		}

		stage('Run Cypress tests') {
			steps {
				bat "set CYPRESS_CACHE_FOLDER=%CYPRESS_CACHE% && npx cypress run"
			}
		}

		stage('Run Cypress tests') {
			steps {
				bat """
        set CYPRESS_CACHE_FOLDER=%CYPRESS_CACHE%
        npx cypress run --browser chrome --headless --disable-gpu
        """
			}
		}
	}

	post {
		always {
			// Publica el reporte en Jenkins
			allure([
				includeProperties: false,
				jdk: '',
				results: [[path: 'allure-results']]
			])
		}
	}
}