import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer";

export default defineConfig({
    projectId: "s3u5ws",

    e2e: {
        setupNodeEvents(on, config) {
            // Inicializa el escritor de resultados de Allure
            allureWriter(on, config);

            // Agregar flags al navegador antes de lanzarlo
            on("before:browser:launch", (browser = {}, launchOptions) => {
                if (browser.family === "chromium") {
                    launchOptions.args.push(
                        "--disable-gpu",
                        "--no-sandbox",
                        "--disable-dev-shm-usage",
                        "--remote-allow-origins=*"
                    );
                }
                return launchOptions;
            });

            return config;
        },

        retries: {
            runMode: 4,
            openMode: 1,
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
        user: "1212121212",
        pass: "Bogota.2025*",
        urlBase: "https://celerisawsqa.tps.net.co/auth/login",
    },
});
