import { defineConfig } from "cypress";
import {allureCypress} from "allure-cypress/reporter";

export default defineConfig({
    projectId: "s3u5ws",

    e2e: {
        setupNodeEvents(on, config) {
            return allureCypress(on, config, {
                resultsDir: "allure-results",
            });
        },

        experimentalRunAllSpecs: true,
    },

    screenshotsFolder: "cypress/screenshots",
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 20000,
    screenshotOnRunFailure: false,

    env: {
        user: "1073253202",
        pass: "Bogota.2026*",
        urlBase: "https://celerisawsqa.tps.net.co/auth/login",
    },
});
