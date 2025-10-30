describe('58289 Administrar Etapa del Proceso electoral - Consulta de etapa proceso electoral', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(5000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Login exitoso', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
    })
    it('CP01 Acceso a la pantalla "Administrar Etapa del Proceso Electoral', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.screenshot('Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');

    })
    it('CP02 Visualización inicial de la grilla y sección de totales', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.screenshot('Administrar etapa', { capture: 'runner' });
        cy.get('.relative.z-10.text-h-1.font-title.font-bold').should('be.visible')

    })
    it('CP03 Validación Búsqueda de etapas (consultas exitosas, sin resultados y campo obligatorio)', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.screenshot('Administrar etapa', { capture: 'runner' });
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.get('input[placeholder="Nombre etapa"]').type('Nuevo')
        cy.contains('button', 'Consultar').click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible')
        cy.screenshot('Consulta', { capture: 'runner' });
        cy.reload()
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.get('input[placeholder="Nombre etapa"]').type('Prueba')
        cy.contains('button', 'Consultar').click()
        cy.get('.py-2.px-4.border-b.border-gray-200.text-p-3.font-paragraph.text-black-txt').should('contain.text',' Prueba')
        cy.screenshot('Consulta', { capture: 'runner' });

    })
    it('CP04 Consulta exitosa con filtro aplicado', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.get('input[placeholder="Nombre etapa"]').type('Prueba')
        cy.contains('button', 'Consultar').click()
        cy.screenshot('Consulta exitosa', { capture: 'runner' });
        cy.contains('td', 'Prueba').click()

    })
    it('CP05 Funcionalidad del botón Limpiar', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.get('input[placeholder="Nombre etapa"]').type('Consulta')
        cy.contains('button', 'Limpiar').click()
        cy.screenshot('Limpiar', { capture: 'runner' });
    })
    it('CP06 Acciones en la grilla, creación y log de auditoría', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.get('input[placeholder="Nombre etapa"]').type('Prueba')
        cy.contains('button', 'Consultar').click()
        cy.get('svg.fa-pen-to-square').first().click();
        cy.get('h2.text-lg.font-title.font-medium').should('be.visible').and('contain.text','Editar Etapa Del Proceso')
        cy.contains('button', 'Cancelar').click()
        cy.get('svg.fa-trash').first().click();
        cy.get('p.text-sm.text-gray-500').should('be.visible').and('contain.text','Está seguro de que desea eliminar la etapa')
    })
})