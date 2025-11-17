describe('58309 Creación de Actividad para una etapa', () => {
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
        cy.contains('Administrar Actividades').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
    })
    it('CP01_Validar acceso al formulario de creación', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-900.h-full').click()
        cy.screenshot('Paso 2 Crear Actividad', { capture: 'runner' });
    })
    it('CP02_Validar estructura panel izquierdo y pantalla principal', () => {
        cy.get('.text-h2.text-lg.font-medium').should('be.visible')
        cy.get('.relative.z-10.text-h-1.font-title.font-bold').should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').first().should('be.visible').should('have.text', 'Seleccione una opción')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(1).should('be.visible').should('have.text', 'Seleccione una opción')
        cy.contains('button','Consultar').click({force: true})
        cy.get('celeris-pencil-draw-outline-icon').first().should('be.visible');
        cy.get('celeris-trash-outline-icon').first().should('be.visible');
        cy.get('celeris-search-outline-icon').first().should('be.visible');
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-900').should('contain.text','Crear Actividad')
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-500.h-full').should('contain.text','Crear Sub Actividad')
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-900.h-full').click()
        cy.screenshot('Paso 2 Crear Actividad', { capture: 'runner' });
    })
    it('CP03_Validar formulario de creación de actividad', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-900').click()
        cy.get('[placeholder="Texto"]').should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(2).should('be.visible').should('have.text', 'Seleccione una opción')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto funcional').should('be.visible')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico').should('be.visible')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico / funcional').should('be.visible')
        cy.contains('button', 'Activo').should('be.visible').and('have.class', 'cursor-not-allowed').and('have.class', 'text-gray-500');
        cy.contains('button','Guardar').should('be.visible')
        cy.contains('button','Cancelar').should('be.visible')
        cy.get('input[placeholder="Texto"]').eq(0).type('ABCDEFGHIJKLAAAMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEQ');
        cy.get('.text-red-500.text-xs.italic.mt-1').contains('Ha excedido el límite de caracteres permitido.').should('contain.text', 'Ha excedido el límite de caracteres permitido.')
        cy.get('input[placeholder="Texto"]').eq(0).clear().type('ABCDEFGHIJKLA')
        cy.contains('button','Guardar').click()
        cy.get('button.bg-blue-btn').contains('Cerrar').click();
        cy.get('.text-red-500.text-xs.italic.mt-1.flex.items-center').eq(0).should('contain.text', 'Este campo es obligatorio')
        cy.get('.text-red-500.text-xs.italic.mt-1.flex.items-center').eq(1).should('contain.text', 'Debe seleccionar al menos una opción')
        cy.screenshot('Paso 2 Crear Actividad', { capture: 'runner' });
        cy.get('input[placeholder="Texto"]').eq(0).clear().type('Automatizacion no tocar')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(2).click().should('be.visible').should('have.text', 'Seleccione una opción')
        cy.get('[placeholder="Buscar..."]').first().type('Pruebaqa12')
        cy.get('ul li').contains('Pruebaqa12').should('be.visible').click({force: true});
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico').click()
        cy.contains('button','Guardar').click()
        cy.get('button.bg-blue-btn').contains('Sí').click();
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text', 'Ya existe una actividad con este nombre en esta etapa.')
    })
    it('CP04_Validar campo Estado y botones del formulario de creación', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-900').click()
        cy.contains('button', 'Activo').should('be.visible').and('have.class', 'cursor-not-allowed').and('have.class', 'text-gray-500');
        cy.contains('button','Guardar').should('be.visible')
        cy.contains('button','Cancelar').should('be.visible')
        cy.get('input[placeholder="Texto"]').eq(0).type('ABCDEFGHIJKLAAAMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEQ');
        cy.get('.text-red-500.text-xs.italic.mt-1').contains('Ha excedido el límite de caracteres permitido.').should('contain.text', 'Ha excedido el límite de caracteres permitido.')
        cy.get('input[placeholder="Texto"]').eq(0).clear().type('ABCDEFGHIJKLA')
        cy.contains('button','Guardar').click()
        cy.get('button.bg-blue-btn').contains('Cerrar').click();
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 1000)
            const nameActividad = `${fixture.actividad}${random}`
            cy.get('input[placeholder="Texto"]').eq(0).clear().type(nameActividad)
        })
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(2).click().should('be.visible').should('have.text', 'Seleccione una opción')
        cy.get('[placeholder="Buscar..."]').first().type('Z automatizada etapa no tocar177')
        cy.get('ul li').contains('Z automatizada etapa no tocar177').should('be.visible').click({force: true});
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico').click()
        cy.contains('button','Guardar').click()
        cy.get('button.bg-blue-btn').contains('Sí').click();
        cy.contains('p', 'Actividad creada exitosamente.').should('be.visible').and('have.text', 'Actividad creada exitosamente.');
    })

})