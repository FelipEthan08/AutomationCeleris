describe('58140 Modificación de envío de alertas o notificación', ()=> {
    beforeEach( ()=>{
        allure.epic('Sprint 4')
        allure.feature('Modificación de envío de alertas o notificación')
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(3000)
        cy.contains('button', 'Ingresar').click();
        cy.url().should("eq",'https://celerisawsqa.tps.net.co/dashboard')
        cy.contains('span','Administrar Alertas o Notificaciones').click({force:true})
        cy.url().should("eq",'https://celerisawsqa.tps.net.co/dashboard/alerts/manage-alerts')
        cy.get('input[type="date"]').first().click()
        cy.get('input[type="date"]').first().type('2026-04-01', { delay: 300 })
        cy.wait(1000)
        cy.get('input[type="date"]').eq(1).click()
        cy.get('input[type="date"]').eq(1).type('2026-04-30')
        cy.contains('button','Consultar').click({force:true})
    })
    it('CP01_Validar el acceso a la funcionalidad', ()=>{
        cy.get('celeris-pencil-draw-outline-icon').first().should('be.visible').click({force:true})
        cy.contains('h3','Editar Alerta').should('be.visible')
    })
    it('CP02 - Validar la estructura de la pantalla', ()=>{
        cy.get('celeris-pencil-draw-outline-icon').first().should('be.visible').click({force:true})
        cy.contains('h3','Editar Alerta').should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer.duration-300').eq(7).should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer.duration-300').eq(8).should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer.duration-300').eq(9).should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer.duration-300').eq(10).should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer.duration-300').eq(11).should('be.visible')
        cy.get('.bg-white.block.min-w-full.overflow-x-hidden.px-4').last().should('be.visible')
        cy.get('input[placeholder="Escribe su mensaje..."]').last().should('be.visible')
        cy.get('input[type="date"]').eq(3).should('be.visible')
        cy.get('input[type="time"]').should('be.visible')
        cy.get('.flex.items-center.shadow.rounded-lg').should('be.visible');
        cy.get('.bg-white.text-black').should('be.visible');
        cy.get('.button.bg-blue-btn').last().scrollIntoView();
        cy.get('button.border-blue-900').should('be.visible');
        cy.get('button.bg-blue-btn').should('be.visible');
    })
})