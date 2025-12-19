describe('63121 Administrar Notificaciones automáticas de actividades y subactividades - Consulta de notificaciones automáticas', ()=>{
    beforeEach( ()=>{
        allure.epic('Sprint 4')
        allure.feature('Administrar Notificaciones automáticas de actividades y subactividades - Consulta de notificaciones automáticas')
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
