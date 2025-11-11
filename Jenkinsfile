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
				// Configura NPM para usar la carpeta cache
				bat "npm config set cache %NPM_CACHE%"
				bat 'npm ci' // instalación más limpia y rápida que npm install
			}
		}

		stage('Install Cypress binary (if needed)') {
			steps {
				// Le decimos a Cypress dónde guardar el binario
				bat "set CYPRESS_CACHE_FOLDER=%CYPRESS_CACHE% && npx cypress install"
			}
		}

		stage('Run Cypress tests') {
			steps {
				bat "set CYPRESS_CACHE_FOLDER=%CYPRESS_CACHE% && npx cypress run"
			}
		}
	}
}