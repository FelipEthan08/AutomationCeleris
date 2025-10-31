import './commands';
import '@shelex/cypress-allure-plugin';

// ⚠️ Agrega esta línea:
const allure = Cypress.Allure.reporter.getInterface();
globalThis.allure = allure; // ← Esto hace que "allure" exista globalmente
