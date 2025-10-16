describe('58291 Creación de etapa del proceso electoral', () => {
    beforeEach(() => {
        cy.visit('https://celerisawsqa.tps.net.co/auth/login')
        cy.viewport(1920, 1080)
    })
    it('CP01 Visualización del formulario de creación de etapa', () => {
        cy.get('input[placeholder="Usuario"]').type('andres.quimbayo@thomasgreg.com')
        cy.get('input[placeholder="Contraseña"]').type('Bogota.2025*')
        cy.wait(2000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick()
        cy.get('.px-6.py-2').click()
        cy.wait(2000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard');
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('.button.bg-linear-90').click()
        cy.get('.text-lg.font-title.font-medium').should('have.text','Crear Etapa Del Proceso')
        cy.get('.button.duration-300').contains('Guardar').should('be.visible');
    })
    it('CP02 Creación exitosa de una nueva etapa', () => {
        cy.get('input[placeholder="Usuario"]').type('andres.quimbayo@thomasgreg.com')
        cy.get('input[placeholder="Contraseña"]').type('Bogota.2025*')
        cy.wait(2000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.get('.px-6.py-2').click()
        cy.wait(2000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard');
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('.button.bg-linear-90').click()
        const random = 'PruebaQA' + Math.floor(Math.random() * 100)
        cy.get('input[placeholder="Bitácora"]').type(random)
        cy.log('Nombre de etapa: ' +random)
        cy.contains('div','Delegado Funcional').click()
        cy.contains('div','Delegado Logistico').click()
        cy.contains('div','Delegado Logistico Funcional').click()
        cy.get('.button.duration-300').contains('Guardar').click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4').contains('El registro ha sido creado con exito')
    })
    it('CP03 Validación de campos obligatorios y mensajes de validación', () => {
        cy.get('input[placeholder="Usuario"]').type('andres.quimbayo@thomasgreg.com')
        cy.get('input[placeholder="Contraseña"]').type('Bogota.2025*')
        cy.wait(2000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.get('.px-6.py-2').click()
        cy.wait(2000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard');
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.get('.button.duration-300').contains('Guardar').click()
    })
})