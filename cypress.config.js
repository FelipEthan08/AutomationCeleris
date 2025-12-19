    import { defineConfig } from "cypress";
    import allureWriter from "@shelex/cypress-allure-plugin/writer";
    import fs from "fs";
    import path from "path";

    export default defineConfig({
        projectId: "s3u5ws",

        e2e: {
            pageLoadTimeout: 280000,
            setupNodeEvents(on, config) {
                // Inicializa el escritor de resultados de Allure
                allureWriter(on, config);

                // Task para crear un archivo dinámico
                on("task", {
                    crearArchivo({ nombreArchivo, contenido }) {
                        const filePath = path.join("cypress", "fixtures", nombreArchivo);
                        fs.writeFileSync(filePath, contenido);
                        return null; // siempre retornar algo
                    },
                });

                return config;
            },

            retries: {
                runMode: 4,
                openMode: 3,
            },

            experimentalRunAllSpecs: true,
        },

        screenshotsFolder: "cypress/screenshots",
        viewportWidth: 1920,
        viewportHeight: 1080,
        defaultCommandTimeout: 20000,
        screenshotOnRunFailure: false,
        chromeWebSecurity: false,
        scrollBehavior: false,

        env: {
            allure: true,
            allureResultsPath: "allure-results",
            user: "1073253202",
            pass: "Bogota.2025*",
            urlBase: "https://celerisawsqa.tps.net.co/auth/login",
        }
    });
