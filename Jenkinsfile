pipeline {
	agent any

	environment {
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

		stage('Install Cypress binary') {
			steps {
				bat """
                set CYPRESS_CACHE_FOLDER=%CYPRESS_CACHE%
                npx cypress install
                """
			}
		}

		stage('Run Cypress tests') {
			steps {
				bat """
                set CYPRESS_CACHE_FOLDER=%CYPRESS_CACHE%
                npx cypress run --browser chrome --headless
                """
			}
		}

		stage('Generate Allure report') {
			steps {
				bat 'npx allure generate allure-results --clean -o allure-report'
			}
		}
	}

	post {
		always {
			allure([
				includeProperties: false,
				jdk: '',
				results: [[path: 'allure-results']]
			])
		}
	}
}
