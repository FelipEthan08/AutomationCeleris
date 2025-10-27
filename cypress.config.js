const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "s3u5ws",
    e2e: {
        setupNodeEvents(on, config) {
        },
        experimentalRunAllSpecs: true,
    },
});
