describe('58307 Administrar Actividades - Consulta de Actividades', () => {
    beforeEach(() => {
        allure.epic("Sprint 2");
        allure.feature("Administrar Actividades - Consulta de Actividades");
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(3000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Paso 1 Login exitoso', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
    })
    it('CP1_Acceso a la pantalla únicamente perfil superadministrador', () => {
        cy.contains('Administrar Actividades').click()
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
    })
    it('CP2_Validar estructura de la pantalla', () => {
        cy.contains('Administrar Actividades').click()
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-900').should('contain.text','Crear Actividad')
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-500.h-full').should('contain.text','Crear Sub Actividad')
        cy.get('[label="Limpiar"]').should('contain.text','Limpiar')
        cy.get('[label="Consultar"]').should('contain.text','Consultar')
    })
    it('CP3_Validar comportamiento botones crear actividad y subactividad', () => {
        cy.contains('Administrar Actividades').click()
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-900').click()
        cy.get('.text-lg.font-title.font-medium.capitalize').should('be.visible').and('contain.text','Crear Actividad Para Una Etapa')
        cy.contains('button','Cancelar').click({force: true})
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-500.h-full').click()
        cy.get('.text-lg.font-title.font-medium.capitalize').should('be.visible').and('contain.text','Crear Sub-Actividad para una etapa')
    })
    it('CP4_Validar grid oculto por defecto hasta realizar consulta', () => {
        cy.contains('Administrar Actividades').click()
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
        cy.get('[role="cell"]').should('be.visible').and('contain.text','No se encontraron registros para los criterios seleccionados')
    })
    it('CP5_Validar filtros que se muestren por defecto', () => {
        cy.contains('Administrar Actividades').click()
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').first().should('be.visible').should('have.text', 'Seleccione una opción')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(1).should('be.visible').should('have.text', 'Seleccione una opción')
    })
    it('CP6_Datos de la lista desplegable Actividades asociadas a la etapa', () => {
        cy.contains('Administrar Actividades').click()
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').first().click().should('be.visible').and('have.text', 'Seleccione una opción')
        cy.get('[placeholder="Buscar..."]').first().type('Automatizar etapa')
        cy.get('ul li').contains('Automatizar etapa').should('be.visible').click({force: true});
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(1).click().should('be.visible').and('have.text', 'Seleccione una opción')
        cy.get('[placeholder="Buscar..."]').type('Automatizar actividad')
        cy.get('ul li').contains('Automatizar actividad').should('be.visible').click({force: true});

    })
    it('CP7_Validar botón limpiar', () => {
        cy.contains('Administrar Actividades').click()
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').first().click().should('be.visible').and('have.text', 'Seleccione una opción')
        cy.get('[placeholder="Buscar..."]').first().type('Automatizar etapa')
        cy.get('ul li').contains('Automatizar etapa').should('be.visible').click({force: true});
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(1).click().should('be.visible').and('have.text', 'Seleccione una opción')
        cy.get('[placeholder="Buscar..."]').type('Automatizar actividad')
        cy.get('ul li').contains('Automatizar actividad').should('be.visible').click({force: true});
        cy.contains('button','Consultar').click({force: true})
        cy.wait(500)
        cy.contains('button','Limpiar').click({force: true})
        cy.get('[role="cell"]').should('be.visible').and('contain.text','No se encontraron registros para los criterios seleccionados')
    })
    it('CP8_Consulta sin seleccionar filtros', () => {
        cy.contains('Administrar Actividades').click()
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
        cy.contains('button','Consultar').click({force: true})
        cy.wait(2000)
        cy.contains('span', 'Automatizar actividad').should('be.visible')
    })
    it('CP9_Validar consulta exitosa', () => {
        cy.contains('Administrar Actividades').click()
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').first().click().should('be.visible').and('have.text', 'Seleccione una opción')
        cy.get('[placeholder="Buscar..."]').first().type('Automatizar etapa')
        cy.get('ul li').contains('Automatizar etapa').should('be.visible').click({force: true});
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(1).click().should('be.visible').and('have.text', 'Seleccione una opción')
        cy.get('[placeholder="Buscar..."]').type('Automatizar actividad')
        cy.get('ul li').contains('Automatizar actividad').should('be.visible').click({force: true});
        cy.contains('button','Consultar').click({force: true})
        cy.wait(500)
        cy.contains('span', 'Automatizar').should('be.visible')
    })
    it('CP10_Consulta sin resultados o registros', () => {
        cy.contains('Administrar Actividades').click()
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').first().click().should('be.visible').and('have.text', 'Seleccione una opción')
        cy.get('[placeholder="Buscar..."]').first().type('Pruebaqa')
        cy.get('ul li').contains('Pruebaqa').should('be.visible').click({force: true});
        cy.contains('button','Consultar').click({force: true})
        cy.wait(500)
        cy.get('[role="cell"]').should('be.visible').and('contain.text','No se encontraron registros para los criterios seleccionados')
    })
    it('CP12_Validar que cada pagina muestre la cantidad adecuada de registros', () => {
        cy.contains('Administrar Actividades').click()
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
        cy.contains('button','Consultar').click({force: true})
        cy.get('table tbody tr').should('have.length', 15)
    })
    it('CP15_Validar tarjeta de totales de actividades de creadas', () => {
        cy.contains('Administrar Actividades').click()
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
        cy.contains('button','Consultar').click({force: true})
        cy.contains('p', 'Total de actividades creadas').should('be.visible');
        cy.get('p.text-h-1.font-title.font-bold').should('be.visible');
    })
    it('CP16_Validar que al realizar una nueva consulta refresque totalmente los resultados ', () => {
        cy.contains('Administrar Actividades').click()
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
        cy.contains('button','Consultar').click({force: true})
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').first().click().should('be.visible').and('have.text', 'Seleccione una opción')
        cy.get('[placeholder="Buscar..."]').first().type('Automatizar etapa')
        cy.get('ul li').contains('Automatizar etapa').should('be.visible').click({force: true});
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(1).click().should('be.visible').and('have.text', 'Seleccione una opción')
        cy.get('[placeholder="Buscar..."]').type('Automatizar actividad')
        cy.get('ul li').contains('Automatizar actividad').should('be.visible').click({force: true});
        cy.contains('button','Consultar').click({force: true})
    })
})