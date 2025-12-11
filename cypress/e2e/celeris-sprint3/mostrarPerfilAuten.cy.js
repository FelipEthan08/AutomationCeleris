describe('63319 Mostrar perfil de usuario autenticado', ()=>{
    beforeEach(()=>{
        allure.epic('Sprint 3')
        allure.feature('Mostrar perfil de usuario autenticado')
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(3000)
        cy.contains('button', 'Ingresar').click();
        cy.screenshot('Paso 1 Login exitoso', { capture: 'runner' });
        cy.url().should('eq','https://celerisawsqa.tps.net.co/dashboard')

    })
    it('CP01_Perfil visualización datos básicos', () => {
        cy.get('.text-xs.font-semibold').first().should('be.visible')
        cy.get('.h-7').first().should('be.visible')
    });
    it('CP02_Perfil icono predeterminado sin foto', () => {
        cy.get('.h-7').first().should('be.visible')
    });
    it('CP04_Perfil visualización rol usuario', () => {
        cy.get('.text-xs.font-normal.text-gray-500').first().should('be.visible')
    });
    it('CP05_Perfil visualización ubicación', () => {
        cy.get('.text-xs.font-normal.text-gray-500').last().should('be.visible')
        cy.get('.text-xs.font-semibold').last().should('be.visible')
        cy.get('.h-7').last().should('be.visible')
    });
    it('CP09_Perfil sesión expirada', () => {
        cy.get('.text-xs.font-normal.text-gray-500').last().should('be.visible')
        cy.get('.text-xs.font-semibold').last().should('be.visible')
        cy.get('.h-7').last().should('be.visible')
        cy.get('.transition-all.duration-300.cursor-pointer').first().click({ force: true })
        cy.get('.block.px-4.py-2.text-sm.text-gray-700').click({ force: true })
    });
})