describe('58294 Modificación de etapa del proceso', ()=> {
    beforeEach( ()=> {
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(4000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
    })
    it('CP1 Validar que al ingresar al modulo se visualice el botón de editar en la columna de acciones', ()=>{
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
    })
    it('CP2 Validar la acción al dar clic en el botón de edición en el modulo de Etapas del proceso', ()=>{
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('input[placeholder="Nombre etapa"]').type('Consulta')
        cy.contains('button', 'Consultar').click()
        cy.get('svg.fa-pen-to-square').click();
        cy.get('h2.text-lg.font-title.font-medium').should('be.visible').and('contain.text','Editar Etapa Del Proceso')
    })
})