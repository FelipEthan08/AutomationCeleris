describe('58363 Creación de pregunta por actividad o subactividad', ()=>{
    beforeEach(() => {
        allure.epic("Sprint 2");
        allure.feature("Creación de pregunta por actividad o subactividad");
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(4000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Paso 1 Login exitoso', {capture: 'runner'});
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
        cy.contains('Administrar Pregunta por Actividad').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-questions');
    })
    it('CP01_Acceso formulario creación pregunta', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
    });
    it('CP02_Estructura visual formulario creación', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get("select").eq(0).should('be.visible')
        cy.get("select").eq(1).should('be.visible')
        cy.get('[inputmode="numeric"]').should('be.visible')
        cy.get('[placeholder="Text"]').eq(1).should('be.visible')
        cy.get('.flex.items-center.gap-2.cursor-pointer.px-3.py-2.bg-gray-100.rounded-lg.border.border-gray-200').eq(0).should('be.visible')
        cy.get('.flex.items-center.gap-2.cursor-pointer.px-3.py-2.bg-gray-100.rounded-lg.border.border-gray-200').eq(1).should('be.visible')
        cy.get('input[placeholder="Text"]').eq(2).should('have.value', 'Activa')
        cy.get('.px-6.py-2.border.border-gray-300.text-gray-700').should('be.visible')
        cy.get('.px-6.py-2.bg-blue-600.text-white.font-medium.rounded-full').should('be.visible')
    });
    it('CP03_Validar listas desplegables etapa actividad subactividad', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get("select").eq(0).select('Automatizar etapa')
        cy.wait(4000)
        cy.get("select").eq(1).select('Automatizar actividad')
        cy.wait(4000)
        cy.get('select').last().select('Automatizacion sub actividad no tocar')
    });
    it('CP04_Validar campo orden pregunta numérico', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get('[inputmode="numeric"]').click()
        cy.get('[inputmode="numeric"]').type('999999')
    });
    it('CP05 Validar texto de pregunta longitud máxima', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get('input.w-full.px-3.py-2.bg-gray-50.border.border-gray-200.rounded-full.text-gray-500').eq(1).should('have.attr', 'maxlength', '250')
    });
    it('CP06_Validar texto pregunta obligatorio', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get('select').eq(0).select('Automatizar etapa')
        cy.get('select').eq(1).select('Automatizar actividad')
        cy.get('select').last().select('Automatizacion sub actividad no tocar')
        cy.get('.flex.items-center.gap-2.cursor-pointer.px-3.py-2.bg-gray-100.rounded-lg.border.border-gray-200').eq(0).click().should('be.visible')
        cy.get('.px-6.py-2.bg-blue-600.text-white.font-medium.rounded-full').should('be.visible').click()
        cy.get('.text-red-500.text-sm.mt-1').should('be.visible').and('contain.text','Este campo es obligatorio')
    });
    it('CP07_Validar tipo de respuesta obligatorio', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get('select').eq(0).select('Automatizar etapa')
        cy.get('select').eq(1).select('Automatizar actividad')
        cy.get('select').last().select('Automatizacion sub actividad no tocar')
        cy.get('input.w-full.px-3.py-2.bg-gray-50.border.border-gray-200.rounded-full.text-gray-500').eq(1).type('Pruebas')
        cy.get('.px-6.py-2.bg-blue-600.text-white.font-medium.rounded-full').should('be.visible').click()
        cy.get('.text-red-500.text-sm.mt-1').should('be.visible').and('contain.text','Este campo es obligatorio')
    });
    it('CP08_Visualización campo respuesta abierta', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get('select').eq(0).select('Automatizar etapa')
        cy.get('select').eq(1).select('Automatizar actividad')
        cy.get('select').last().select('Automatizacion sub actividad no tocar')
        cy.get('input.w-full.px-3.py-2.bg-gray-50.border.border-gray-200.rounded-full.text-gray-500').eq(1).type('Pruebas')
        cy.get('.flex.items-center.gap-2.cursor-pointer.px-3.py-2.bg-gray-100.rounded-lg.border.border-gray-200').eq(0).should('be.visible')
    });
    it('CP09_Visualización de campos respuesta cerrada', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get('select').eq(0).select('Automatizar etapa')
        cy.get('select').eq(1).select('Automatizar actividad')
        cy.get('select').last().select('Automatizacion sub actividad no tocar')
        cy.get('input.w-full.px-3.py-2.bg-gray-50.border.border-gray-200.rounded-full.text-gray-500').eq(1).type('Pruebas')
        cy.get('.flex.items-center.gap-2.cursor-pointer.px-3.py-2.bg-gray-100.rounded-lg.border.border-gray-200').eq(1).should('be.visible').click()
        cy.get('[value="unica"]').should('be.visible')
        cy.get('[value="multiple"]').should('be.visible')
        cy.get('.text-base.font-medium.text-gray-900').should('be.visible')
        cy.get('.px-4.py-2.bg-blue-600.text-white.text-sm.font-medium.rounded-full').should('be.visible').and('contain.text',' Agregar Respuesta ')
        cy.get('.px-6.py-2.border.border-gray-300.text-gray-700').should('be.visible')
        cy.get('.px-6.py-2.bg-blue-600.text-white.font-medium.rounded-full').should('be.visible')
    });
})