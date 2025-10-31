describe('58307 : Administrar Actividades - Consulta de Actividades', () => {
    beforeEach(() => {
        allure.epic("Sprint 2");
        allure.feature("Administrar Actividades - Consulta de Actividades");
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(5000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Paso 1 Login exitoso', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
    })
    it('CP1_Acceso a la pantalla únicamente perfil superadministrador', () => {
        cy.contains('Administrar Actividades para una Etapa').click()
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');

    })
})