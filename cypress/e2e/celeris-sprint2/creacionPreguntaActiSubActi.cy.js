describe('58363 Creación de pregunta por actividad o subactividad', ()=>{
    beforeEach(() => {
        allure.epic("Sprint 2");
        allure.feature("Creación de pregunta por actividad o subactividad");
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(4000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Paso 1 Login exitoso', {capture: 'runner'});
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
        cy.contains('Administrar Pregunta por Actividad').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-questions');
    })
    it('CP01_Acceso formulario creación pregunta', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
    });
})