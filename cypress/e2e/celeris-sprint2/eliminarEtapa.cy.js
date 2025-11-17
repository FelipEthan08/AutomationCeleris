describe('58296 Eliminar etapa del proceso electoral', () => {
    beforeEach( ()=> {
        allure.epic("Sprint 2");
        allure.feature("Eliminar etapa del proceso electoral");
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(4000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Paso 1 Login exitoso', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');

    })
    it('CP01_Visualización del botón y apertura del modal de confirmación de eliminación', () => {
        cy.contains('button','Consultar').click({force: true})
        cy.get('celeris-trash-outline-icon').first().should('be.visible')
    });
    it('CP02_Confirmación de eliminación exitosa', () => {
        cy.get('.button.bg-linear-90').click()
        cy.get('input[placeholder="Bitácora"]').type('ZZZZ Zzz zautomatización prueba eliminar')
        cy.contains('div', 'Delegado de puesto logístico').click()
        cy.get('.button.duration-300').contains('Guardar').click()
        cy.contains('button', 'Sí').click()
        cy.contains('button', 'Confirmar').click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4').contains('Etapa creada exitosamente.').should('be.visible');
        cy.contains('button', /^Cerrar$/).click({force: true})
        cy.contains('button','Consultar').click({force: true})
        cy.get('.px-3.py-1.rounded-md.cursor-pointer.bg-white.text-gray-700').last().should('be.visible').click({force: true});
        cy.wait(2000)
        cy.get('celeris-trash-outline-icon').last().click({force: true})
        cy.contains('button', 'Sí').click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','La etapa ha sido eliminada exitosamente.')
    });
    it('CP03_Cancelación de la eliminación desde el modal opción No', () => {
        cy.contains('button','Consultar').click({force: true})
        cy.get('celeris-trash-outline-icon').first().click()
        cy.get('button.border-blue-900').last().click({force: true})
    });
})