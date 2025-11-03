describe('58289 Administrar Etapa del Proceso electoral - Consulta de etapa proceso electoral', () => {
    beforeEach(() => {
        allure.epic("Sprint 1");
        allure.feature("Administrar Etapa del Proceso Electoral");
        cy.visit(Cypress.env('urlBase'))
        cy.screenshot('Paso 1 Inicio de sesión', { capture: 'runner' });
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(5000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
    })
    it('CP01 Acceso a la pantalla "Administrar Etapa del Proceso Electoral', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');

    })
    it('CP02 Visualización inicial de la grilla y sección de totales', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.get('.relative.z-10.text-h-1.font-title.font-bold').should('be.visible')

    })
    it('CP03 Validación Búsqueda de etapas (consultas exitosas, sin resultados y campo obligatorio)', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.get('input[placeholder="Nombre etapa"]').type('Nuevo')
        cy.contains('button', 'Consultar').click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible')
        cy.screenshot('Paso 3 Consulta', { capture: 'runner' });
        cy.reload()
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.get('input[placeholder="Nombre etapa"]').type('A-otra vez bitacora de prueba')
        cy.contains('button', 'Consultar').click()
        cy.contains('td', 'A-otra vez bitacora de prueba').should('contain.text', 'A-otra vez bitacora de prueba')
        cy.screenshot('Paso 4 Consulta', { capture: 'runner' });

    })
    it('CP04 Consulta exitosa con filtro aplicado', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.get('input[placeholder="Nombre etapa"]').type('Prueba')
        cy.contains('button', 'Consultar').click()
        cy.screenshot('Paso 2 Consulta exitosa', { capture: 'runner' });
        cy.contains('td', 'Prueba').click()

    })
    it('CP05 Funcionalidad del botón Limpiar', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.get('input[placeholder="Nombre etapa"]').type('Consulta')
        cy.contains('button', 'Limpiar').click()
        cy.screenshot('Paso 2 Limpiar', { capture: 'runner' });
    })
    it('CP06 Acciones en la grilla, creación y log de auditoría', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.screenshot('Paso 2 Administrar etapa', { capture: 'runner' });
        cy.get('input[placeholder="Nombre etapa"]').dblclick({force: true})
        cy.get('input[placeholder="Nombre etapa"]').type('Prueba')
        cy.contains('button', 'Consultar').click()
        cy.get('svg.fa-pen-to-square').first().click();
        cy.screenshot('Paso 3 Editar etapa', { capture: 'runner' });
        cy.get('h2.text-lg.font-title.font-medium').should('be.visible').and('contain.text','Editar Etapa Del Proceso')
        cy.contains('button', 'Cancelar').click()
        cy.get('svg.fa-trash').first().click();
        cy.screenshot('Paso 4 Mensaje de eliminación', { capture: 'runner' });
        cy.get('p.text-sm.text-gray-500').should('be.visible').and('contain.text','¿Está seguro de que desea eliminar esta etapa? Esta acción no se puede deshacer.')
    })
})