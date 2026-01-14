describe('57862 Crear delegado', ()=>{
    beforeEach( ()=>{
        allure.epic('Sprint 4')
        allure.feature('Crear delegado')
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type('45467')
        cy.get('input[placeholder="Contraseña"]').type('Bogota.2025*')
        cy.wait(4000)
        cy.contains('button','Ingresar').dblclick({force:true})
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
    it('CP07_Validar estructura del formulario Crear Usuario', ()=>{
        cy.get('.bg-linear-90.button.duration-300.flex.flex-row.font-paragraph').click()
        cy.get('input[placeholder="Número de documento"]').eq(1).should('be.visible')
        cy.get('input[placeholder="Nombres de usuario"]').should('be.visible')
        cy.get('input[placeholder="Apellidos de usuario"]').should('be.visible')
        cy.get('input[placeholder="Texto"]').first().should('be.visible')
        cy.get('input[placeholder="Texto"]').eq(1).should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer.duration-300').eq(5).should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer.duration-300').eq(6).should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer.duration-300').eq(7).should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer.duration-300').eq(8).should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer.duration-300').eq(9).should('be.visible')
        cy.get('.flex.flex-wrap.gap-2.p-3.overflow-x-hidden').first().should('be.visible')
        cy.get('input[placeholder="Texto"]').eq(2).should('be.visible')
        cy.get('.bg-gray-100.bg-white.block.border.border-gray-300').should('be.visible')
        cy.contains('.button','Cancelar').scrollIntoView();
        cy.contains('button','Cancelar').should('be.visible')
        cy.contains('button','Guardar').should('be.visible')
    })
    it('CP08_Validar estado del campo Estado por defecto', ()=>{
        cy.get('.bg-linear-90.button.duration-300.flex.flex-row.font-paragraph').click()
        cy.get('.bg-gray-100.bg-white.block.border.border-gray-300').should('be.visible').and('have.prop','outerText','Activo')
    })
})