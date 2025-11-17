describe('58294 Modificación de etapa del proceso', () => {
    beforeEach(() => {
        allure.epic("Sprint 1");
        allure.feature("Modificación de etapa del proceso");
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(4000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard')
    })
    it('CP1_Validar que al ingresar al modulo se visualice el botón de editar en la columna de acciones', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
    })
    it('CP2_Validar la acción al dar clic en el botón de edición en el modulo de Etapas del proceso', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.contains('button', 'Consultar').click({force: true})
        cy.get('.px-3.py-1.rounded-md.cursor-pointer.bg-white.text-gray-700').last().should('be.visible').click({force: true});
        cy.wait(1000)
        cy.get('celeris-pencil-draw-outline-icon').last().click({force: true});
        cy.get('.text-lg.font-title.font-medium.capitalize').should('be.visible').and('contain.text', 'Editar Etapa Del Proceso')
    })
    it('CP4_Validación de campos del formulario al editar registro de Etapas del proceso', () => {
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.contains('button', 'Consultar').click({force: true});
        cy.get('.px-3.py-1.rounded-md.cursor-pointer.bg-white.text-gray-700').last().should('be.visible').click({force: true});
        cy.wait(1000)
        cy.get('celeris-pencil-draw-outline-icon').last().click({force: true});
        cy.get('.text-lg.font-title.font-medium.capitalize').should('be.visible').and('contain.text', 'Editar Etapa Del Proceso')
        cy.get('input[placeholder="Bitácora"]').clear()
        cy.get('.text-red-500.text-xs.italic.mt-1.flex.items-center').should('contain.text', 'Este campo es obligatorio')
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 1000)
            const nameEtapa = `${fixture.name2}${random}`
            cy.log(random)
            cy.get('input[placeholder="Bitácora"]').type(nameEtapa)
        })
        cy.get('.text-red-500.text-xs.italic.mt-1.flex.items-center').should('contain.text', 'Ha excedido el límite de caracteres permitido.')
        cy.get('input[placeholder="Bitácora"]').clear()
        cy.get('input[placeholder="Bitácora"]').type('Automatizacion no tocar')
        cy.get('.button.duration-300').contains('Guardar').click()
        cy.contains('button', 'Sí').click()
        cy.get('.text-2xl.font-bold.text-center.mt-5.font-title').should('have.text', 'Ya existe una etapa con el mismo texto registrada')
        cy.reload()
        cy.contains('button', 'Consultar').click({force: true});
        cy.get('.px-3.py-1.rounded-md.cursor-pointer.bg-white.text-gray-700').last().should('be.visible').click({force: true});
        cy.wait(2000)
        cy.get('celeris-pencil-draw-outline-icon').last().click({force: true});
        cy.get('.text-lg.font-title.font-medium.capitalize').should('be.visible').and('contain.text', 'Editar Etapa Del Proceso')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto funcional').should('be.visible')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico').should('be.visible')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico / funcional').should('be.visible')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico / funcional').click()
        cy.get('.text-red-500.text-xs.italic.mt-1.flex.items-center').should('contain.text', 'Debe seleccionar al menos una opción.')
        cy.contains('button', 'Activo').should('be.visible').click()
        cy.contains('Activo').should('be.visible')
        cy.contains('Inactivo').should('be.visible')
    })
    it('CP8_Validar que no permita guardar si hay error en algún campo', ()=>{
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.contains('button', 'Consultar').click({force : true})
        cy.get('.px-3.py-1.rounded-md.cursor-pointer.bg-white.text-gray-700').last().should('be.visible').click({force: true});
        cy.wait(2000)
        cy.get('celeris-pencil-draw-outline-icon').last().click({force: true});
        cy.get('.text-lg.font-title.font-medium.capitalize').should('be.visible').and('contain.text', 'Editar Etapa Del Proceso')
        cy.contains('.text-sm.font-normal', 'Delegado de puesto logístico / funcional').click()
        cy.get('.button.duration-300').contains('Guardar').click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text', 'Por favor, complete todos los campos requeridos.')
    })
    it('CP10_Validar la modal al dar clic en guardar los datos editados', ()=>{
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.contains('button', 'Consultar').click({force: true});
        cy.get('.px-3.py-1.rounded-md.cursor-pointer.bg-white.text-gray-700').last().should('be.visible').click({force: true});
        cy.wait(1000)
        cy.get('celeris-pencil-draw-outline-icon').last().click({force: true});
        cy.get('.text-lg.font-title.font-medium.capitalize').should('be.visible').and('contain.text', 'Editar Etapa Del Proceso')
        cy.get('.button.duration-300').contains('Guardar').click()
        cy.get('p.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('contain.text', '¿Está seguro de realizar la edición de la etapa?')
    })

    it('CP18_Validar inactivar registro de etapa del proceso', ()=>{
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.contains('button', 'Consultar').click({force: true});
        cy.get('.px-3.py-1.rounded-md.cursor-pointer.bg-white.text-gray-700').last().should('be.visible').click({force: true});
        cy.wait(1000)
        cy.get('celeris-pencil-draw-outline-icon').last().click({force: true});
        cy.get('.text-lg.font-title.font-medium.capitalize').should('be.visible').and('contain.text', 'Editar Etapa Del Proceso')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer.duration-300').last().click()
        cy.get('[placeholder="Buscar..."]').type('Inactivo')
        cy.contains('li','Inactivo').click()
        cy.get('.button.duration-300').contains('Guardar').click()
        cy.get('p.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('contain.text', '¿Está seguro de realizar la edición de la etapa?')
        cy.contains('button', 'Sí').click()
        cy.get('.bg-blue-btn.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph.font-semibold').last().click()
        cy.reload()
        cy.contains('button', 'Consultar').click({force: true});
        cy.get('.px-3.py-1.rounded-md.cursor-pointer.bg-white.text-gray-700').last().should('be.visible').click({force: true});
        cy.wait(1000)
        cy.get('celeris-pencil-draw-outline-icon').last().click({force: true});
        cy.get('.text-lg.font-title.font-medium.capitalize').should('be.visible').and('contain.text', 'Editar Etapa Del Proceso')
        cy.get('.bg-white.block.border.border-gray-300.cursor-pointer.duration-300').last().click()
        cy.get('[placeholder="Buscar..."]').type('Activo')
        cy.contains('li','Activo').click()
        cy.get('.button.duration-300').contains('Guardar').click()
        cy.get('p.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('contain.text', '¿Está seguro de realizar la edición de la etapa?')
        cy.contains('button', 'Sí').click()
    })
    it.only('CP11_Validar al dar clic en guardar los datos editados y se confirma', ()=>{
        cy.contains('Administrar Etapa Proceso Electoral').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-stages');
        cy.contains('button', 'Consultar').click({force : true})
        cy.get('.px-3.py-1.rounded-md.cursor-pointer.bg-white.text-gray-700').last().should('be.visible').click({force: true});
        cy.wait(1000)
        cy.get('celeris-pencil-draw-outline-icon').last().click({force: true});
        cy.get('.text-lg.font-title.font-medium.capitalize').should('be.visible').and('contain.text', 'Editar Etapa Del Proceso')
        cy.get('.button.duration-300').contains('Guardar').click()
        cy.get('p.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('contain.text', '¿Está seguro de realizar la edición de la etapa?')
        cy.contains('button', 'Sí').click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4').contains('Etapa actualizada exitosamente.').should('be.visible');
    })
})