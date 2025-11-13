describe('58311 : Eliminar actividad de una etapa', () => {
    beforeEach(() => {
        allure.epic("Sprint 2");
        allure.feature("Eliminar actividad de una etapa");
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(4000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Paso 1 Login exitoso', {capture: 'runner'});
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
        cy.contains('Administrar Actividades').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
    })
    it('CP01_Eliminación exitosa de una actividad configurada en una etapa', () => {
        cy.contains('button', 'Consultar').click()
        cy.get('.px-3.py-1.rounded-md.cursor-pointer.bg-white.text-gray-700').last().should('be.visible').click({force: true});
        cy.get('svg[data-icon="trash"]').last().click({force: true})
        cy.get('button.bg-blue-btn').contains('Sí').click();
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text', 'La actividad ha sido eliminada exitosamente.')
    })
    it('CP02_Cancelación del proceso de eliminacióna', () => {
        cy.contains('button', 'Consultar').click()
        cy.get('svg[data-icon="trash"]').last().click({force: true})
        cy.get('button.border-blue-900').last().click({force: true})
    })
})