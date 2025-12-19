describe('63126 Creación de notificación automática para actividades y subactividades', ()=>{
    beforeEach( ()=>{
        allure.epic('Sprint 4')
        allure.feature('Creación de notificación automática para actividades y subactividades')
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(3000)
        cy.contains('button', 'Ingresar').click();
        cy.url().should("eq",'https://celerisawsqa.tps.net.co/dashboard')

    })
    it('CP01_Acceso a la opción Administrar notificaciones automáticas', ()=>{
        cy.contains('span','Administrar notificaciones automaticas').click({force:true})
        cy.url().should("eq",'https://celerisawsqa.tps.net.co/dashboard/alerts/manage-notification')    })
})
