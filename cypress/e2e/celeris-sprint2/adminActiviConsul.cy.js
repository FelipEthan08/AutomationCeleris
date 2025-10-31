describe('58307 : Administrar Actividades - Consulta de Actividades ', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(5000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Login exitoso', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
    })
    it('CP1_Acceso a la pantalla únicamente perfil superadministrador', () => {
        cy.contains('Administrar Actividades para una Etapa').click()
        cy.screenshot('Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');

    })
})