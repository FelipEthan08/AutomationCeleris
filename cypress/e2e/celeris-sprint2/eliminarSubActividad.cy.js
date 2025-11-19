describe('58380 Eliminar sub - actividad para una actividad', () => {
    beforeEach( ()=>{
        allure.epic("Sprint 2")
        allure.feature("Eliminar sub - actividad para una actividad")
        cy.visit(Cypress.env("urlBase"))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(4000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Paso 1 Login exitoso', {capture: 'runner'});
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
        cy.contains('Administrar Actividades').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
    })
    it('CP01_Validar que se visualice el icono de eliminar en la grilla en la columna de acciones', () => {
        cy.contains('button','Consultar').click({force: true})
        cy.get('celeris-search-outline-icon').eq(10).should('be.visible')
     })
    it('CP02_Validar al dar clic el botón Eliminar de cualquier registro', () => {
        cy.contains('button','Consultar').click({force: true})
        cy.get('celeris-search-outline-icon').eq(4).should('be.visible').click({force: true});
        cy.wait(2000)
        cy.get('celeris-trash-outline-icon').eq(19).should('be.visible').click({force: true});
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').last().should('be.visible').and('contain.text','¿Está seguro de que desea eliminar esta sub - actividad para la actividad seleccionada? Esta acción no se puede deshacer.')
    })
    it('CP03_Validar cuando se selecciona NO en la confirmación al momento de eliminar el registro', () => {
        cy.contains('button','Consultar').click({force: true})
        cy.get('celeris-search-outline-icon').eq(4).should('be.visible').click({force: true});
        cy.wait(2000)
        cy.get('celeris-trash-outline-icon').eq(19).should('be.visible').click({force: true});
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').last().should('be.visible').and('contain.text','¿Está seguro de que desea eliminar esta sub - actividad para la actividad seleccionada? Esta acción no se puede deshacer.')
        cy.contains('button', 'No').click()
    })
    it('CP04_Validar cuando se selecciona SI en la confirmación al momento de eliminar el registro', () => {
        cy.contains('button','Consultar').click({force: true})
        cy.get('celeris-search-outline-icon').eq(4).should('be.visible').click({force: true});
        cy.wait(2000)
        cy.get('celeris-trash-outline-icon').eq(19).should('be.visible').click({force: true});
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').last().should('be.visible').and('contain.text','¿Está seguro de que desea eliminar esta sub - actividad para la actividad seleccionada? Esta acción no se puede deshacer.')
        cy.get('.bg-blue-btn').last().click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','La sub - actividad ha sido eliminada exitosamente.')
    })
})