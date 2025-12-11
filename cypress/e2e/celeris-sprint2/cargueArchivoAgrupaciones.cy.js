describe('62750 Cargue de Archivo de Agrupaciones Políticas', () => {
    beforeEach(() => {
        allure.feature('Cargue de Archivo de Agrupaciones Políticas')
        allure.epic('Sprint 2')
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(3000)
        cy.contains('button', 'Ingresar').click();
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
    })
    it('CP01_Acceso a la pantalla de cargue de agrupaciones politicas', () => {
        cy.contains('Cargue de Archivo').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/basic-files/load-file');
        cy.wait(2000)
        cy.contains('button', ' Agrupaciones políticas ').click({force: true})
    })
    it('CP02_Estructura de la pantalla "Cargue Archivos Basicos"', () => {
        cy.contains('Cargue de Archivo').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/basic-files/load-file');
        cy.wait(1000)
        cy.contains('button', ' Agrupaciones políticas ').click({force: true})
        cy.get('.text-base.block').should('be.visible')
        cy.get('.border.rounded-lg.p-12.text-center').should('be.visible')
        cy.get('.text-slate-600.max-w-md.mx-auto.text-sm').should('be.visible').and('contain.text', ' Seleccione o arrastre aquí el archivo .txt o csv con la estructura de Agrupaciones Políticas. Tamaño máximo permitido 5MB ')
    })
    it('CP03_Validación del archivo de “Agrupaciones politicas" publicado en el sistema (Subir archivo) - No validación de campos', () => {
        cy.contains('Cargue de Archivo').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/basic-files/load-file');
        cy.wait(1000)
        cy.contains('button', ' Agrupaciones políticas ').click({force: true})
        cy.get('.text-base.block').should('be.visible')
        cy.get('#file-input-AGRUPACIONES_POLITICAS').selectFile('cypress/fixtures/archivoVacio.txt', {force: true});
        cy.get('.flex.items-center.space-x-3.text-red-600').should('be.visible').and('contain.text', 'Archivo vacío: no se procesará')
    })
    it('CP04_Validación del archivo de “Agrupaciones politicas" extensión incorrecta', () => {
        cy.contains('Cargue de Archivo').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/basic-files/load-file');
        cy.wait(1000)
        cy.contains('button', ' Agrupaciones políticas ').click({force: true})
        cy.get('.text-base.block').should('be.visible')
        cy.get('#file-input-AGRUPACIONES_POLITICAS').selectFile('cypress/fixtures/archivoPDF.pdf', {force: true});
        cy.get('.text-red-600.max-w-md.mx-auto.text-sm.font-medium.mb-2').should('be.visible').and('contain.text', ' Archivo inválido. Asegúrese de subir un archivo .txt o .csv de hasta 5 MB de tamaño.')
    })
    it('CP05_Validación del archivo de “Agrupaciones politicas" excede limite de tamaño 5MB', () => {
        cy.contains('Cargue de Archivo').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/basic-files/load-file');
        cy.wait(1000)
        cy.contains('button', ' Agrupaciones políticas ').click({force: true})
        cy.get('.text-base.block').should('be.visible')
        cy.get('#file-input-AGRUPACIONES_POLITICAS').selectFile('cypress/fixtures/archivo6MB.xlsx', {force: true});
        cy.get('.text-red-600.max-w-md.mx-auto.text-sm.font-medium.mb-2').should('be.visible').and('contain.text', ' Archivo inválido. Asegúrese de subir un archivo .txt o .csv de hasta 5 MB de tamaño.')
    })
    it('CP06_Validación de cada uno de los campos del "Archivo Basico" publicado en el sistema', () => {
        cy.contains('Cargue de Archivo').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/basic-files/load-file');
        cy.wait(1000)
        cy.contains('button', ' Agrupaciones políticas ').click({force: true})
        cy.get('.text-base.block').should('be.visible')
        cy.get('#file-input-AGRUPACIONES_POLITICAS').selectFile('cypress/fixtures/EstructuraMalformadaAgrupaciones.csv', {force: true});
        cy.wait(5000)
        cy.get('.px-6.py-4.text-sm.text-slate-600.whitespace-normal.break-words.align-top').should('be.visible')
    })
    it('CP07_Cargue exitoso de archivo valido', () => {
        cy.contains('Cargue de Archivo').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/basic-files/load-file');
        cy.wait(1000)
        cy.contains('button', ' Agrupaciones políticas ').click({force: true})
        cy.get('.text-base.block').should('be.visible')
        const codigo1 = "004";
        const agrupacion = "Coaliciones";
        const numeroBase = 90022;
        const nombreBase = "PRUEBA NUEVA";

        const numeroRegistros = 1;
        let registros = [];

        for (let i = 0; i < numeroRegistros; i++) {

            const numeroAleatorio = numeroBase + Math.floor(Math.random() * 9999) + 1;
            const nombreFinal = `${nombreBase}_${Math.floor(Math.random() * 1000)}`;
            registros.push([codigo1, agrupacion, numeroAleatorio, nombreFinal].join(';'));
        }
        const contenido = registros.join('\n');
        cy.task('crearArchivo', {nombreArchivo: 'archivo_agrupaciones_test.txt', contenido
        });
        cy.get('#file-input-AGRUPACIONES_POLITICAS').selectFile('cypress/fixtures/archivo_agrupaciones_test.txt', {force: true});
        cy.wait(5000);
        cy.get('svg.lucide.text-green-600').should('be.visible');
    })
})