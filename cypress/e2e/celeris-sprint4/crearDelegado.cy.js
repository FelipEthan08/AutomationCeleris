describe('57862 Crear delegado', ()=>{
    beforeEach( ()=>{
        allure.epic('Sprint 4')
        allure.feature('Crear delegado')
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type('45467')
        cy.get('input[placeholder="Contraseña"]').type('Bogota.2025*')
        cy.wait(4000)
        cy.contains('button','Ingresar').click({force:true})
        cy.contains('a','Administrar Delegados de Puesto').click({force:true})
        cy.url().should('eq','https://celerisawsqa.tps.net.co/dashboard/delegates/manage-delegates')
    })
    it('CP01_Apertura del modal Crear delegado', ()=>{
        cy.get('.bg-linear-90.button.duration-300.flex.flex-row.font-paragraph').click()
    })
    it('CP02_Validar encabezado de módulo y submódulo y validar acciones rápidas disponibles', ()=>{
        cy.contains('span','Delegados de puesto')
        cy.contains('h2','Administración de delegados de puesto')
    })
    it('CP03_Verificación de tarjetas de métricas', ()=>{
        cy.get('.bg-white.flex.items-center.justify-between.min-h-24').should('be.visible').and('have.length','3')
    })
    it('CP04_Verificar menú lateral y opción Dashboard resaltada', ()=>{
        cy.get('a[href="/dashboard/delegates/manage-delegates"]').should('have.class', 'bg-[#07055C]');
    })
    it('CP05_Validación de búsqueda general', ()=>{
        cy.get('lucide-angular').first().click({force:true})
        cy.get('input[placeholder="Número de documento"]').first().click().type('506618')
        cy.get('.bg-blue-btn.button.cursor-pointer.duration-300').first().click()
        cy.contains('span',' Cataño Sepulveda ')
    })
    it('CP06_Validar estructura de tabla de usuarios y validar paginador activo', ()=>{
        cy.get('lucide-angular').first().click({force:true})
        cy.get('.bg-blue-btn.button.cursor-pointer.duration-300').first().click()
        cy.get('table tbody tr').should('have.length', 15)
    })
})