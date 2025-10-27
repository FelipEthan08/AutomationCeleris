describe('Administrar Etapa del Proceso electoral - Consulta de etapa proceso electoral', () => {
    beforeEach(() => {
        cy.viewport(1920,1080)
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(2000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
    })
    it('CP01 Acceso a la pantalla "Administrar Etapa del Proceso Electoral', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
    })
    it('CP02 Visualización inicial de la grilla y sección de totales', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('.relative.z-10.text-h-1.font-title.font-bold').should('be.visible')
    })
    it('CP03 Validación Búsqueda de etapas (consultas exitosas, sin resultados y campo obligatorio)', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.contains('button', 'Consultar').click()
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.get('input[placeholder="Nombre etapa"]').type('aaaaaaaaaa')
        cy.contains('button', 'Consultar').click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible')
        cy.reload()
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.get('input[placeholder="Nombre etapa"]').type('Consulta')
        cy.contains('button', 'Consultar').click()
    })
    it('CP04 Consulta exitosa con filtro aplicado', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.get('input[placeholder="Nombre etapa"]').type('Consulta')
        cy.contains('button', 'Consultar').click()
        cy.contains('td', 'Consulta 1').click()
    })
    it('CP05 Funcionalidad del botón Limpiar', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.get('input[placeholder="Nombre etapa"]').type('Consulta')
        cy.contains('button', 'Limpiar').click()
    })
    it('CP06 Acciones en la grilla, creación y log de auditoría', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.get('input[placeholder="Nombre etapa"]').type('Consulta')
        cy.contains('button', 'Consultar').click()
        cy.get('.ng-fa-icon.text-blue-500').first().click()
        cy.get('h2.text-lg.font-title.font-medium').should('be.visible').and('contain.text','Editar Etapa Del Proceso')
        cy.contains('button', 'Cancelar').click()
        cy.get('.ng-fa-icon.text-red-500').first().click()
        cy.get('p.text-sm.text-gray-500').should('be.visible').and('contain.text','¿Está seguro de que desea eliminar la etapa "Consulta 1"? Esta acción no se puede deshacer.')

    })
})