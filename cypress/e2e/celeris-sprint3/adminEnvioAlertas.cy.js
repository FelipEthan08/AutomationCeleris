describe('58105 Administrar envío de alertas o notificaciones - Consulta de alertas o notificaciones', ()=>{
    beforeEach( ()=>{
        allure.epic('Sprint 3')
        allure.feature('Administrar envío de alertas o notificaciones - Consulta de alertas o notificaciones')
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(3000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Paso 1 Login exitoso', { capture: 'runner' });
        cy.url().should('eq','https://celerisawsqa.tps.net.co/dashboard')
        cy.contains('Administrar Alertas o Notificaciones').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/alerts/manage-alerts');
        cy.wait(500)
    })
    it('CP01_Validar acceso a la pantalla de administrar envío de Alertas o notificaciones', () => {
        cy.get('.font-medium.text-h2.text-lg').should('be.visible').and('contain.text','Administración de envío de alertas y notificaciones')
    });
    it('CP02_Validar estructura de la pantalla', () => {
        cy.get('.font-medium.text-h2.text-lg').should('be.visible').and('contain.text','Administración de envío de alertas y notificaciones')
        cy.get('.bg-white.flex.items-center.justify-between.min-h-24.min-w-60.overflow-hidden.p-4.relative.rounded-lg.shadow-md').should('be.visible').and('have.length',3)
        cy.get('.appearance-none.bg-white.block.border.border-gray-300.cursor-pointer.duration-300').eq(0).should('be.visible')
        cy.get('.appearance-none.bg-white.block.border.border-gray-300.cursor-pointer.duration-300').eq(1).should('be.visible')
        cy.contains('button','Limpiar').should('be.visible')
        cy.contains('button','Consultar').should('be.visible')
        cy.get('tbody').should('be.visible')
    });
    it('CP03_Validar los filtros de búsqueda de la pantalla', () => {
        cy.get('.hide-calendar-icon').first().should('be.visible').click({force: true})
        cy.get('.hide-calendar-icon').first().type('2025-11-25')
        cy.get('.hide-calendar-icon').eq(1).should('be.visible').click({force:true});
        cy.get('.hide-calendar-icon').eq(1).type('2025-11-28');
        cy.contains('button','Consultar').should('be.visible')
        cy.get('tbody').should('be.visible')
    });
    it('CP05_Validar la funcionalidad de la consulta', () => {
        cy.get('.hide-calendar-icon').first().should('be.visible').click({force: true})
        cy.get('.hide-calendar-icon').first().type('2027-11-25')
        cy.get('.hide-calendar-icon').eq(1).should('be.visible').click({force:true});
        cy.get('.hide-calendar-icon').eq(1).type('2027-11-25');
        cy.contains('button','Consultar').should('be.visible').click({force:true});
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','No se encontraron registros para los criterios seleccionados.')
        cy.get('.bg-blue-btn').last().click({force:true});
        cy.contains('button','Limpiar').should('be.visible').click({force:true});
        cy.contains('button','Consultar').should('be.visible').click({force:true});
        cy.get('celeris-pencil-draw-outline-icon').first().should('be.visible')
        cy.get('celeris-trash-outline-icon').first().should('be.visible')
    });
    it('CP06_Validar el botón de Crear alerta', () => {
        cy.contains('button','Crear Alerta').click({force: true})
        cy.get('.text-lg.font-title.font-semibold.text-primary-900').first().should('be.visible')
    });
})