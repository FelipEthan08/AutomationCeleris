describe('58249 Cargue Inicial de Archivo Jurados', () => {
    beforeEach(() => {
        allure.epic("Sprint 1");
        allure.feature("Cargue Inicial de Archivo Jurados");
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(4000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')

    })
    it('CP01_Acceso y autorización a la pantalla "Archivos Básicos', () => {
        cy.contains('Cargue de Archivo').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/basic-files/load-file');
    })
    it('CP02 Validación de la estructura visual de la pantalla', () => {
        cy.contains('Cargue de Archivo').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/basic-files/load-file');
        cy.get('[id="file-input-JURADOS"]').should('exist')
    })
    it('CP03 Cargue exitoso de archivo válido', () => {
        cy.contains('Cargue de Archivo').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/basic-files/load-file');
        cy.contains('button', 'Aceptar').click({ force: true });
        const nombres = ["MIGUEL","CARMEN","JUAN","LAURA","ANDRES","ISABEL"];
        const apellidos = ["RAMIREZ","MARTINEZ","GOMEZ","LOPEZ","HERNANDEZ","PEREZ"];
        const departamentos = [
            {codigo: "110", nombre: "ATLANTICO", municipios: [{codigo:"078", nombre:"SOLEDAD"}]},
            {codigo: "20", nombre: "CESAR", municipios: [{codigo:"01", nombre:"VALLEDUPAR"}]}
        ];
        const puestos = [
            {codigo_zona:"006", codigo_puesto:"01", descripcion_puesto:"NORMAL SUPERIOR", cargo:"JURADO TITULAR"},
            {codigo_zona:"004", codigo_puesto:"32", descripcion_puesto:"IES NORTE 32", cargo:"JURADO SUPLENTE"}
        ];

        const numRegistros = 1; // cuántos registros generar
        let registros = [];

        for (let i = 0; i < numRegistros; i++) {
            const dep = departamentos[Math.floor(Math.random()*departamentos.length)];
            const mun = dep.municipios[Math.floor(Math.random()*dep.municipios.length)];
            const puesto = puestos[Math.floor(Math.random()*puestos.length)];
            const id = Math.floor(Math.random() * 1_000_000_000_000_0000).toString().padStart(16,'0');
            const nombre1 = nombres[Math.floor(Math.random()*nombres.length)];
            const nombre2 = nombres[Math.floor(Math.random()*nombres.length)];
            const apellido1 = apellidos[Math.floor(Math.random()*apellidos.length)];
            const apellido2 = apellidos[Math.floor(Math.random()*apellidos.length)];
            const mesas = Math.floor(Math.random()*999).toString().padStart(3,'0');

            registros.push([
                dep.codigo,
                dep.nombre,
                mun.codigo,
                mun.nombre,
                puesto.codigo_zona,
                puesto.codigo_puesto,
                puesto.descripcion_puesto,
                mesas,
                puesto.cargo,
                id,
                nombre1,
                nombre2,
                apellido1,
                apellido2
            ].join(','));
        }

        const contenido = registros.join('\n');
        cy.task('crearArchivo', { nombreArchivo: 'archivo_divipola_test.txt', contenido });
        cy.wait(5000)
        cy.get('#file-input-JURADOS').selectFile('cypress/fixtures/archivo_divipola_test.txt', { force: true });
        cy.wait(15000)
        cy.get('svg.lucide.text-green-600').should('be.visible');
    })
})