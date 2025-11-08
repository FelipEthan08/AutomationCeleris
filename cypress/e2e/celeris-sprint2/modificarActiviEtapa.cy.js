describe('58310 Modificación de Actividad por etapa', () => {
    beforeEach(() => {
        allure.epic("Sprint 2");
        allure.feature("Modificación de Actividad por etapa");
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
    it('CP01_Validar que al ingresar al modulo se visualice el botón de editar en la columna de acciones', () => {
        cy.contains('button', 'Consultar').click()
        cy.get('svg[data-icon="pen-to-square"]').last().click({force: true})
    })
    it('CP02_Validar la acción al dar clic en el botón de edición en el modulo de Actividad por etapa', () => {
        cy.contains('button', 'Consultar').click()
        cy.get('svg[data-icon="pen-to-square"]').last().click({force: true})
        cy.contains('h2', 'Editar Actividad Para Una Etapa').should('be.visible').and('contain.text', 'Editar Actividad Para Una Etapa')
    })
    it('CP03_Validar estructura de la pantalla de Administrar actividades al editar', () => {
        cy.contains('button', 'Consultar').click()
        cy.get('svg[data-icon="pen-to-square"]').last().click({force: true})
        cy.contains('h2', 'Editar Actividad Para Una Etapa').should('be.visible').and('contain.text', 'Editar Actividad Para Una Etapa')
        cy.get('[placeholder="Texto"]').should('be.visible')
        cy.get('.text-green-700').should('be.visible');
        cy.contains('.text-sm.font-normal', 'Delegado de puesto funcional').should('be.visible')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico').should('be.visible')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico / funcional').should('be.visible')
        cy.contains('button', /\s*(Activo|Inactivo)\s*/).should('be.visible')
        cy.contains('button', 'Guardar').should('be.visible')
        cy.contains('button', 'Cancelar').should('be.visible')
    })
    it('CP04_Validación de campos del formulario al editar registro de Actividad por etapa', () => {
        cy.contains('button', 'Consultar').click()
        cy.get('svg[data-icon="pen-to-square"]').last().click({force: true})
        cy.get('input[placeholder="Texto"]').eq(0).clear()
        cy.get('.text-red-500.text-xs.italic.mt-1.flex.items-center').eq(0).should('contain.text', 'Este campo es obligatorio')
        cy.get('input[placeholder="Texto"]').eq(0).type('ABCDEFGHIJKLAAAMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEQ');
        cy.get('.text-red-500.text-xs.italic.mt-1').contains('Ha excedido el límite de caracteres permitido.').should('contain.text', 'Ha excedido el límite de caracteres permitido.')
        cy.contains('button', 'Guardar').click()
        cy.get('button.bg-blue-btn').contains('Cerrar').click();
    })
    it('CP06_Validar comportamiento de selección del campo Tipo de delegado', () => {
        cy.contains('button', 'Consultar').click()
        cy.get('svg[data-icon="pen-to-square"]').last().click({force: true})
        cy.contains('.text-sm.font-normal', 'Delegado de puesto funcional').should('be.visible')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto funcional').click()
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico').should('be.visible')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico').click()
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico / funcional').should('be.visible')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico / funcional').click()
    })
    it('CP08_Validar que no permita guardar si hay error en algún campo', () => {
        cy.contains('button', 'Consultar').click()
        cy.get('svg[data-icon="pen-to-square"]').last().click({force: true})
        cy.get('input[placeholder="Texto"]').eq(0).type('ABCDEFGHIJKLAAAMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEQ');
        cy.get('.text-red-500.text-xs.italic.mt-1').contains('Ha excedido el límite de caracteres permitido.').should('contain.text', 'Ha excedido el límite de caracteres permitido.')
        cy.contains('button', 'Guardar').click({force: true})
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text', 'Por favor, complete todos los campos requeridos.')
    })
    it('CP9_Validar que si existe un campo vacio no guarde el registro', () => {
        cy.contains('button', 'Consultar').click()
        cy.get('svg[data-icon="pen-to-square"]').last().click({force: true})
        cy.get('input[placeholder="Texto"]').eq(0).clear()
        cy.contains('button', 'Guardar').click({force: true})
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text', 'Por favor, complete todos los campos requeridos.')
    })
    it('CP10_Validar al dar clic en guardar al editar un registro', () => {
        cy.contains('button', 'Consultar').click()
        cy.get('svg[data-icon="pen-to-square"]').last().click({force: true})
        cy.get('input[placeholder="Texto"]').eq(0).type('Pruebaqa10')
        cy.contains('button', 'Guardar').click({force: true})
    })
    it('CP11_Validar al dar clic en guardar los datos editados y se confirma SI', () => {
        cy.contains('button', 'Consultar').click()
        cy.get('svg[data-icon="pen-to-square"]').last().click({force: true})
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 1000)
            const nameActividad = `${fixture.etapa}${random}`
            cy.get('input[placeholder="Texto"]').eq(0).clear().type(nameActividad)
        })
        cy.contains('button', 'Guardar').click({force: true})
        cy.get('button.bg-blue-btn').contains('Sí').click();
    })
    it('CP17_Validar editar registro con nombre de la Actividad ya existente', () => {
        cy.contains('button', 'Consultar').click({force: true})
        cy.get('svg[data-icon="pen-to-square"]').eq(1).click({force: true})
        cy.get('input[placeholder="Texto"]').eq(0).clear().type('Automatizacion no tocar')
        cy.contains('button', 'Guardar').click({force: true})
        cy.get('button.bg-blue-btn').contains('Sí').click();
    })
    it('CP18 Validar inactivar registro de actividad sin subactividades', () => {
        cy.contains('button', 'Consultar').click()
        cy.get('svg[data-icon="pen-to-square"]').last().click({force: true})
        cy.contains('button', /\s*(Activo|Inactivo)\s*/).should('be.visible')
        cy.contains('button', 'Guardar').click({force: true})
        cy.get('button.bg-blue-btn').contains('Sí').click();
    })
})