const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "s3u5ws",
    e2e: {
        setupNodeEvents(on, config) {
        },
        experimentalRunAllSpecs: true,
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    env: {
        user : '1073253202',
        pass : 'Bogota.2026*',
        urlBase : 'https://celerisawsqa.tps.net.co/auth/login'
    }
});
