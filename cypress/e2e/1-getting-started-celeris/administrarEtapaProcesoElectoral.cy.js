describe('Administrar Etapa del Proceso electoral - Consulta de etapa proceso electoral', () => {
    beforeEach( () => {
        cy.visit('https://celerisawsqa.tps.net.co/auth/login');
        cy.viewport(1920,1080)

    })
    it('CP01 Acceso a la pantalla "Administrar Etapa del Proceso Electoral', () => {
        cy.get('input[placeholder="Usuario"]').type('1073253202')
        cy.get('input[placeholder="Contraseña"]').type('Bogota.2026*')
        cy.wait(4000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard');
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');

    })

})