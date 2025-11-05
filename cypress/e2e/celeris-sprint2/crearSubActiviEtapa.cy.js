describe('58378 : Creación de sub - actividad para una actividad', () => {
    beforeEach(() => {
        allure.epic("Sprint 2");
        allure.feature("Creación de Sub-Actividad para una etapa");
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(4000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Paso 1 Login exitoso', {capture: 'runner'});
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
        cy.contains('Administrar Actividades para una Etapa').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
    })
    it('CP01_Acceso a la pantalla', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-500').click()
        cy.screenshot('Paso 2 Crear Sub-Actividad', { capture: 'runner' });
    })
    it('CP02_Validar la estructura de la pantalla', () => {
        cy.get('.text-h2.text-lg.font-medium').should('be.visible')
        cy.get('.relative.z-10.text-h-1.font-title.font-bold').should('be.visible')
        cy.get('select').first().should('be.visible')
        cy.get('select').eq(1).should('be.visible')
        cy.contains('button','Consultar').click()
        cy.get('svg.fa-pen-to-square').first().should('be.visible');
        cy.get('svg.fa-trash').first().should('be.visible');
        cy.get('svg.fa-magnifying-glass').first().should('be.visible');
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-900').should('contain.text','Crear Actividad')
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-500.h-full').should('contain.text','Crear Sub Actividad')
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-500.h-full').click()
        cy.screenshot('Paso 2 Crear Sub-Actividad', { capture: 'runner' });
        cy.get('select.block.w-full.cursor-pointer').eq(4).should('be.visible')
        cy.get('select.block.w-full.cursor-pointer').eq(5).should('be.visible')
        cy.get('input[placeholder="Texto"]').should('be.visible')
        cy.get('.flex.transition-all.text-center.duration-300.ease-in-out.text-wrap.break-words.outline-1').should('be.visible')
        cy.get('select.block.w-full.cursor-pointer.text-sm.font-paragraph.text-normal.appearance-none.py-2.px-3.pr-10.bg-white.rounded-full').last().should('be.visible')
    })
    it('CP03_Validar estructura del formulario de creación de actividad', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-500').click()
        cy.screenshot('Paso 2 Crear Sub-Actividad', { capture: 'runner' });
    })
})