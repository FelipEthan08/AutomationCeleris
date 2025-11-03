describe('58309 : Creación de Actividad para una etapa', () => {
    beforeEach( ()=>{
        allure.epic("Sprint 2");
        allure.feature("Creación de Actividad para una etapa");
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(3000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Paso 1 Login exitoso', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
        cy.contains('Administrar Actividades para una Etapa').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
    })
    it('CP01_Validar acceso al formulario de creación', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-900.h-full').click()
        cy.screenshot('Paso 2 Crear Actividad', { capture: 'runner' });
    })
})