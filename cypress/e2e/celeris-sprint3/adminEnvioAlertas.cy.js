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
    it('CP01 - Validar acceso a la pantalla de administrar envío de Alertas o notificaciones', () => {
        cy.get('.font-medium.text-h2.text-lg').should('be.visible').and('contain.text','Administración de envío de alertas y notificaciones')
    });
})