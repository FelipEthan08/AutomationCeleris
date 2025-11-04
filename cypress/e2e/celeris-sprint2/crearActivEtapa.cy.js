describe('58309 : Creación de Actividad para una etapa', () => {
    beforeEach( ()=>{
        allure.epic("Sprint 2");
        allure.feature("Creación de Actividad para una etapa");
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(4000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Paso 1 Login exitoso', { capture: 'runner' });
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
        cy.contains('Administrar Actividades para una Etapa').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
    })
    it('CP01_Validar acceso al formulario de creación', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-900.h-full').click()
        cy.screenshot('Paso 2 Crear Actividad', { capture: 'runner' });
    })
    it('CP02_Validar estructura panel izquierdo y pantalla principal', () => {
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
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-900.h-full').click()
    })
    it('CP03_Validar estructura del formulario de creación de actividad', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-900').click()
        cy.get('[placeholder="Texto"]').should('be.visible')
        cy.get('.block.w-full.cursor-pointer.text-sm.font-paragraph.text-normal').eq(2).should('be.visible');
        cy.contains('.text-sm.font-normal', 'Delegado de puesto funcional').should('be.visible')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico').should('be.visible')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico / funcional').should('be.visible')
        cy.get('select').eq(3).find('option').should('contain.text','Activo')
        cy.contains('button','Guardar').should('be.visible')
        cy.contains('button','Cancelar').should('be.visible')
        cy.get('input[placeholder="Texto"]').eq(0).type('ABCDEFGHIJKLAAAMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEQ');
        cy.get('.text-red-500.text-xs.italic.mt-1').contains('Ha excedido el límite de caracteres permitido.').should('contain.text', 'Ha excedido el límite de caracteres permitido.')
        cy.get('input[placeholder="Texto"]').eq(0).clear().type('ABCDEFGHIJKLA')
        cy.contains('button','Guardar').click()
        cy.get('button.bg-blue-btn').contains('Cerrar').click();
        cy.get('.text-red-500.text-xs.italic.mt-1.flex.items-center').eq(0).should('contain.text', 'Este campo es obligatorio')
        cy.get('.text-red-500.text-xs.italic.mt-1.flex.items-center').eq(1).should('contain.text', 'Debe seleccionar al menos una opción')
        cy.get('input[placeholder="Texto"]').eq(0).clear().type('Automatizacion no tocar')
        cy.get('select').eq(2).select('Pruebaqa12')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico').click()
        cy.contains('button','Guardar').click()
        cy.get('button.bg-blue-btn').contains('Sí').click();
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text', 'Ya existe una actividad con este nombre en esta etapa.')
    })
    it('CP04_Validar campo Estado y botones del formulario de creación', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-900').click()
        cy.get('select').eq(3).find('option').should('contain.text','Activo')///SI
        cy.contains('button','Guardar').should('be.visible')
        cy.contains('button','Cancelar').should('be.visible')
        cy.get('input[placeholder="Texto"]').eq(0).type('ABCDEFGHIJKLAAAMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEQ');
        cy.get('.text-red-500.text-xs.italic.mt-1').contains('Ha excedido el límite de caracteres permitido.').should('contain.text', 'Ha excedido el límite de caracteres permitido.')
        cy.get('input[placeholder="Texto"]').eq(0).clear().type('ABCDEFGHIJKLA')
        cy.contains('button','Guardar').click()
        cy.get('button.bg-blue-btn').contains('Cerrar').click();
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 1000)
            const nameEtapa = `${fixture.name1}${random}`
            cy.get('input[placeholder="Texto"]').eq(0).type(nameEtapa)
        })
        cy.get('select').eq(2).select('Pruebaqa12')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico').click()
        cy.contains('button','Guardar').click()
        cy.get('button.bg-blue-btn').contains('Sí').click();
        cy.contains('p', 'Actividad creada exitosamente.').should('be.visible').and('have.text', 'Actividad creada exitosamente.');
    })
})