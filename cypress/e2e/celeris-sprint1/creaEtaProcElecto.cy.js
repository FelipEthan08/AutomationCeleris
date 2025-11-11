describe('58291 Creación de etapa del proceso electoral', () => {
    beforeEach(() => {
        allure.epic("Sprint 1");
        allure.feature("Creación de etapa del proceso electoral");
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(4000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')

    })
    it.only('CP01_Visualización del formulario de creación de etapa', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('.button.bg-linear-90').click()
        cy.get('.text-lg.font-title.font-medium').should('have.text', 'Crear Etapa Del Proceso')
        cy.get('.button.duration-300').contains('Guardar').should('be.visible');
    })
    it('CP02_Creación exitosa de una nueva etapa', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('.button.bg-linear-90').click()
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 1000)
            const nameEtapa = `${fixture.name1}${random}`
            cy.get('input[placeholder="Bitácora"]').type(nameEtapa)
            cy.log('Nombre de etapa: ' + random)
            cy.contains('div', 'Delegado de puesto logístico').click()
            cy.contains('div', 'Delegado de puesto funcional').click()
            cy.contains('div', 'Delegado de puesto logístico / funcional').click()
            cy.get('.button.duration-300').contains('Guardar').click({force: true})
            cy.contains('button', 'Sí').click()
            cy.get('.text-sm.text-gray-500.mt-2.px-4').contains('Etapa creada exitosamente.').should('be.visible');
        })
    })
    it('CP03_Validación de campos obligatorios y mensajes de validación', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('.button.bg-linear-90').click()
        cy.get('.button.duration-300').contains('Guardar').click({force: true})
        cy.contains('button', /^Cerrar$/).click({force: true})
        cy.get('.text-red-500.text-xs.italic.mt-1.flex.items-center').contains(' Este campo es obligatorio.').should('contain.text', 'Este campo es obligatorio.')
        cy.get('.text-red-500.text-xs.italic.mt-1').contains(' Debe seleccionar al menos una opción. ').should('contain.text', ' Debe seleccionar al menos una opción. ')
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 1000)
            const nameEtapa = `${fixture.name2}${random}`
            cy.log(random)
            cy.get('input[placeholder="Bitácora"]').type(nameEtapa)
            cy.contains('div', 'Delegado de puesto logístico / funcional').click()
            cy.get('.button.duration-300').contains('Guardar').click({force: true})
            cy.contains('button', /^Cerrar$/).click({force: true})
            cy.get('.text-red-500.text-xs.italic.mt-1').contains('Ha excedido el límite de caracteres permitido.').should('contain.text', 'Ha excedido el límite de caracteres permitido.')
            cy.contains('button', /^Cancelar$/).click({force: true})
            cy.get('.button.bg-linear-90').click()
            cy.get('input[placeholder="Bitácora"]').type('PruebaQA')
            cy.get('.button.duration-300').contains('Guardar').click({force: true})
            cy.contains('button', /^Cerrar$/).click({force: true})
            cy.get('.text-red-500.text-xs.italic.mt-1').contains(' Debe seleccionar al menos una opción. ').should('contain.text', ' Debe seleccionar al menos una opción. ')
        })
    })
    it('CP04_Cancelación de la creación de etapa', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('.button.bg-linear-90').click()
        cy.get('input[placeholder="Bitácora"]').type('PRUEBAS')
        cy.contains('div', 'Delegado de puesto logístico / funcional').click()
        cy.get('.button.bg-transparent').contains('Cancelar').click()
        cy.get('.button.bg-linear-90').click()
        cy.get('input[placeholder="Bitácora"]').type('PRUEBAS')
        cy.contains('div', 'Delegado de puesto logístico / funcional').click()
        cy.get('.transition-all.duration-300.flex.flex-row').contains('Cerrar').click()
    })
    it('CP05_Visualización de etapas duplicadas. (Confirmar y Cancelar Duplicados)', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.get('.button.bg-linear-90').click()
        cy.get('input[placeholder="Bitácora"]').type('PruebaQA')
        cy.contains('div', 'Delegado de puesto logístico').click()
        cy.contains('div', 'Delegado de puesto funcional').click()
        cy.contains('div', 'Delegado de puesto logístico / funcional').click()
        cy.get('.button.duration-300').contains('Guardar').click({force: true})
        cy.contains('button', 'Sí').click()
        cy.get('.text-2xl.font-bold.text-center.mt-5.font-title').should('have.text', 'Ya existe una etapa con el mismo texto registrada')
        cy.contains('button', 'Confirmar').click()
        cy.contains('button', /^Cerrar$/).click({force: true})
        cy.get('.button.bg-linear-90').click()
        cy.get('input[placeholder="Bitácora"]').type('pruebaqa')
        cy.contains('div', 'Delegado de puesto logístico / funcional').click()
        cy.get('.button.duration-300').contains('Guardar').click({force: true})
        cy.contains('button', 'Sí').click()
        cy.get('.text-2xl.font-bold.text-center.mt-5.font-title').should('have.text', 'Ya existe una etapa con el mismo texto registrada')
        cy.contains('button', 'Confirmar').click()
        cy.contains('button', /^Cerrar$/).click({force: true})
        cy.get('.button.bg-linear-90').click()
        cy.get('input[placeholder="Bitácora"]').type('PRUEBAQA')
        cy.contains('div', 'Delegado de puesto logístico / funcional').click()
        cy.get('.button.duration-300').contains('Guardar').click()
        cy.contains('button', 'Sí').click()
        cy.get('.text-2xl.font-bold.text-center.mt-5.font-title').should('have.text', 'Ya existe una etapa con el mismo texto registrada')
        cy.contains('button', 'Confirmar').click()
        cy.contains('button', /^Cerrar$/).click({force: true})
    })
})