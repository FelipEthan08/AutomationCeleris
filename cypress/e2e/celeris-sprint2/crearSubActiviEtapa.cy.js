describe('58378 Creación de sub - actividad para una actividad', () => {
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
        cy.contains('Administrar Actividades').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-activities');
    })
    it.only('CP01_Acceso a la pantalla', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-500').click()
        cy.screenshot('Paso 2 Crear Sub-Actividad', { capture: 'runner' });
    })
    it('CP02_Validar la estructura de la pantalla', () => {
        cy.get('.text-h2.text-lg.font-medium').should('be.visible')
        cy.get('.relative.z-10.text-h-1.font-title.font-bold').should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').first().should('be.visible').and('have.text', 'Seleccione una opción')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(1).should('be.visible').and('have.text', 'Seleccione una opción')
        cy.contains('button','Consultar').click()
        cy.get('svg.fa-pen-to-square').first().should('be.visible');
        cy.get('svg.fa-trash').first().should('be.visible');
        cy.get('svg.fa-magnifying-glass').first().should('be.visible');
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-900').should('contain.text','Crear Actividad')
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-500.h-full').should('contain.text','Crear Sub Actividad')
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-500.h-full').click()
        cy.screenshot('Paso 2 Crear Sub-Actividad', { capture: 'runner' });
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(3).should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(4).should('be.visible')
        cy.get('input[placeholder="Texto"]').should('be.visible')
        cy.get('.flex.transition-all.text-center.duration-300.ease-in-out.text-wrap.break-words.outline-1').should('be.visible')
        cy.get('.bg-gray-100.bg-white.block.border.border-gray-300.cursor-not-allowed.duration-300.opacity-50.overflow-hidden').should('be.visible').and('contain.text','Activo')
    })
    it('CP03_Validar estructura del formulario de creación de actividad', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-500').click()
        cy.screenshot('Paso 2 Crear Sub-Actividad', { capture: 'runner' });
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(3).should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(4).should('be.visible')
        cy.get('input[placeholder="Texto"]').should('be.visible')
        cy.get('.flex.transition-all.text-center.duration-300.ease-in-out.text-wrap.break-words.outline-1').should('be.visible')
        cy.get('.bg-gray-100.bg-white.block.border.border-gray-300.cursor-not-allowed.duration-300.opacity-50.overflow-hidden').should('be.visible').and('contain.text','Activo')
        cy.contains('button','Guardar').click({force:true})
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','Por favor, complete todos los campos requeridos.')
        cy.get('button.bg-blue-btn').contains('Cerrar').click();
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(3).click().should('be.visible')
        cy.get('[placeholder="Buscar..."]').type('Automatizar etapa')
        cy.get('ul li').contains('Automatizar etapa').should('be.visible').click({force: true});
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(4).click().should('be.visible')
        cy.get('[placeholder="Buscar..."]').type('Automatizar actividad')
        cy.get('ul li').contains('Automatizar actividad').should('be.visible').click({force: true});
        cy.get('input[placeholder="Texto"]').eq(1).type('Automatizacion sub actividad no tocar')
        cy.get('button.bg-blue-btn.button.font-semibold').eq(2).click({ force: true });
        cy.get('button.bg-blue-btn').contains('Sí').click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','Ya existe una sub-actividad con este nombre en esta actividad.')
    })
    it('CP04 - Validar los botones del formulario', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold.from-primary-500').click()
        cy.screenshot('Paso 2 Crear Sub-Actividad', { capture: 'runner' });
        cy.contains('button','Guardar').click({force:true})
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','Por favor, complete todos los campos requeridos.')
        cy.get('button.bg-blue-btn').contains('Cerrar').click();
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(3).click().should('be.visible')
        cy.get('[placeholder="Buscar..."]').type('Automatizar etapa')
        cy.get('ul li').contains('Automatizar etapa').should('be.visible').click({force: true});
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer').eq(4).click().should('be.visible')
        cy.get('[placeholder="Buscar..."]').type('Automatizar actividad')
        cy.get('ul li').contains('Automatizar actividad').should('be.visible').click({force: true});
        cy.get('input[placeholder="Texto"]').eq(1).type('Automatizacion sub actividad no tocar')
        cy.get('button.bg-blue-btn.button.font-semibold').eq(2).click({ force: true });
        cy.get('button.bg-transparent.border-blue-900').last().click({ force: true });
        cy.get('button.bg-blue-btn.button.font-semibold').eq(2).click({ force: true });
        cy.get('button.bg-blue-btn').contains('Sí').click()
        cy.get('button.bg-blue-btn').contains('Cerrar').click();
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 1000)
            const nameSubActividad = `${fixture.name1}${random}`
            cy.get('input[placeholder="Texto"]').eq(1).clear().type(nameSubActividad)
        })
        cy.get('button.bg-blue-btn.button.font-semibold').eq(2).click({ force: true });
        cy.get('button.bg-blue-btn').contains('Sí').click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','Sub - actividad creada exitosamente.')
    });
})