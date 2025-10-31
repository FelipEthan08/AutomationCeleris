import './commands';
import '@shelex/cypress-allure-plugin';

const allure = Cypress.Allure.reporter.getInterface();
globalThis.allure = allure;
