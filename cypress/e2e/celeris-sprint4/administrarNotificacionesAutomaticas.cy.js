describe('63121 Administrar Notificaciones automáticas de actividades y subactividades - Consulta de notificaciones automáticas', () => {
    beforeEach(() => {
        allure.epic('Sprint 4')
        allure.feature('Administrar Notificaciones automáticas de actividades y subactividades - Consulta de notificaciones automáticas')
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(3000)
        cy.contains('button', 'Ingresar').click();
        cy.url().should("eq", 'https://celerisawsqa.tps.net.co/dashboard')

    })
    it('CP01_Acceso a la opción Administrar notificaciones automáticas', () => {
        cy.contains('span', 'Administrar notificaciones automaticas').click({force: true})
        cy.url().should("eq", 'https://celerisawsqa.tps.net.co/dashboard/alerts/manage-notification')
    })
    it('CP02_Validar encabezado de pantalla', () => {
        cy.contains('span', 'Administrar notificaciones automaticas').click({force: true})
        cy.url().should("eq", 'https://celerisawsqa.tps.net.co/dashboard/alerts/manage-notification')
        cy.contains('span','Alertas y notificaciones')
        cy.contains('h2','Administración de notificaciones automáticas')
        cy.contains('button','Crear notificación').should('be.visible')
    })
    it('CP03_Verificar presencia del botón Crear notificación', () => {
        cy.contains('span', 'Administrar notificaciones automaticas').click({force: true})
        cy.url().should("eq", 'https://celerisawsqa.tps.net.co/dashboard/alerts/manage-notification')
        cy.contains('button','Crear notificación').should('be.visible')
    })
    it('CP04_Visualización inicial sin datos', () => {
        cy.contains('span', 'Administrar notificaciones automaticas').click({force: true})
        cy.url().should("eq", 'https://celerisawsqa.tps.net.co/dashboard/alerts/manage-notification')
        cy.contains('button','Crear notificación').should('be.visible')
        cy.contains('h1','Listado de Notificaciones Automáticas')
        cy.get('.border-b.border-gray-200.font-paragraph').should('be.visible').and('contain.text','No se encontraron registros para los criterios seleccionados')
    })
    it('CP05_Validar tarjetas de métricas totales', () => {
        cy.contains('span', 'Administrar notificaciones automaticas').click({force: true})
        cy.url().should("eq", 'https://celerisawsqa.tps.net.co/dashboard/alerts/manage-notification')
        cy.get('.bg-white.flex.items-center.justify-between.min-h-24').should('be.visible').and('have.length',2)
        cy.contains('p','Total de notificaciones creadas')
        cy.contains('p','Total de notificaciones inactivas')

    })
})
