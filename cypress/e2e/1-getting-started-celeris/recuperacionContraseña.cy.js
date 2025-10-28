describe('57788 Recuperación de Contraseña desde Login Web', () =>{
    beforeEach( () => {
        cy.visit('https://celerisawsqa.tps.net.co/auth/login')
    })
    it('CP1_Acceso a pantalla recuperación de contraseña', () => {
        cy.get('.cursor-pointer.text-blue-700').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/auth/send-recovery')
    })
    it('CP3_Correo obligatorio y validación existencia', () => {
        cy.get('.cursor-pointer.text-blue-700').click()
        cy.get('.block.w-full').click()
        cy.get('button[type="submit"]').click({force: true})
        cy.get('.text-red-500').should('contain.text','Este campo es requerido.')
        cy.get('.block.w-full').type('asdasd@gmail.com')
        cy.get('button[type="submit"]').click()
        cy.get('.text-2xl').should('be.visible')
        cy.reload()
        cy.get('.block.w-full').type('andresuimbayo@thomasgreg.com')
        cy.get('button[type="submit"]').click()
        cy.get('.text-2xl').should('contain.text','¡Correo de recuperación en camino!')
    })
})