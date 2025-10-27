const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
    projectId: "s3u5ws",
    e2e: {
        setupNodeEvents(on, config) {
            allureWriter(on, config);
            return config;
        },
        experimentalRunAllSpecs: true,
    },
    reporter: "mocha-allure-reporter",
    reporterOptions: {
        resultsDir: "allure-results",
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout : 10000,
    env: {
        user: "1073253202",
        pass: "Bogota.2026*",
        urlBase: "https://celerisawsqa.tps.net.co/auth/login",
    },
});
