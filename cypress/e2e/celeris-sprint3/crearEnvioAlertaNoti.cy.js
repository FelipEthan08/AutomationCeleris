describe('58127 Creación de envío de alertas o notificación',() =>{
    beforeEach( ()=>{
        allure.epic('Sprint 3')
        allure.feature('Creación de envío de alertas o notificación')
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(3000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Paso 1 Login exitoso', { capture: 'runner' });
        cy.url().should('eq','https://celerisawsqa.tps.net.co/dashboard')
        cy.contains('Administrar Alertas o Notificaciones').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/alerts/manage-alerts');
    })
    it('CP01_Abrir modal Crear alerta', () => {
        cy.contains('button','Crear Alerta').click({force:true})
        cy.get('.text-lg.font-title.font-semibold.text-primary-900').first().should('be.visible').and('contain.text','Crear Alerta')
        cy.contains('h2','Datos del destinatario')
        cy.contains('h2','Contenido del mensaje')
        cy.contains('h2','Previsualización del mensaje')
    });
    it('CP02_Verificar encabezado módulo y submódulo', () => {
        cy.contains('span','Alertas y notificaciones')
        cy.contains('h2','Administración de envío de alertas y notificaciones')
        cy.get('.py-4.px-4.text-center.text-p-2.text-gray-500').should('be.visible').and('contain.text','No se encontraron registros para los criterios seleccionados')
    });
    it('CP03_Indicadores tarjetas visibles y valores', () => {
        cy.get('.bg-white.flex.items-center.justify-between.min-h-24').should('be.visible').and('have.length',3)
    });
    it('CP04_Filtros fecha inicial y final presentes', () => {
        cy.get('input[type="date"]').should('be.visible').and('have.length',4)
        cy.contains('button','Limpiar').should('be.visible')
        cy.contains('button','Consultar').should('be.visible')
    });
    it('CP05_Menú lateral y opción Dashboard resaltada', () => {
        cy.get('a[href="/dashboard/alerts/manage-alerts"]').should('have.class', 'bg-[#07055C]');
    });
})