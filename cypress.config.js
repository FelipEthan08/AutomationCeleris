import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer";

export default defineConfig({
    projectId: "s3u5ws",

    e2e: {
        setupNodeEvents(on, config) {
            // Inicializa el escritor de resultados de Allure
            allureWriter(on, config);
            return config;
        },
        retries: {
            runMode: 2,  // cuando se ejecuta en modo headless (GitHub Actions)
            openMode: 1, // cuando se ejecuta en modo interactivo (local)
        },

        experimentalRunAllSpecs: true,
    },

    screenshotsFolder: "cypress/screenshots",
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 20000,
    screenshotOnRunFailure: false,

    env: {
        allure: true,
        allureResultsPath: "allure-results",
        user: "1073253202",
        pass: "Bogota.2026*",
        urlBase: "https://celerisawsqa.tps.net.co/auth/login",
    },
});
