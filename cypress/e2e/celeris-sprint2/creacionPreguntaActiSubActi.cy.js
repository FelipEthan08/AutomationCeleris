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
    it('CP10_Agregar opciones respuesta', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get('select').eq(0).select('Automatizar etapa')
        cy.get('select').eq(1).select('Automatizar actividad')
        cy.get('select').last().select('Automatizacion sub actividad no tocar')
        cy.get('input.w-full.px-3.py-2.bg-gray-50.border.border-gray-200.rounded-full.text-gray-500').eq(1).type('Pruebas')
        cy.get('.flex.items-center.gap-2.cursor-pointer.px-3.py-2.bg-gray-100.rounded-lg.border.border-gray-200').eq(1).should('be.visible').click()
        cy.get('.px-4.py-2.bg-blue-600.text-white.text-sm.font-medium.rounded-full').should('be.visible').click()
        cy.get('[placeholder="Texto"]').last().should('be.visible').and('have.attr','maxlength',150)
        cy.get('[type="checkbox"]').last().should('be.visible')
        cy.get('.px-4.py-2.bg-white.border.border-blue-600.text-blue-600.text-sm.font-medium.rounded-full').last().should('be.visible')
    });
    it('CP11_Eliminar opción respuesta', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get('select').eq(0).select('Automatizar etapa')
        cy.get('select').eq(1).select('Automatizar actividad')
        cy.get('select').last().select('Automatizacion sub actividad no tocar')
        cy.get('input.w-full.px-3.py-2.bg-gray-50.border.border-gray-200.rounded-full.text-gray-500').eq(1).type('Pruebas')
        cy.get('.flex.items-center.gap-2.cursor-pointer.px-3.py-2.bg-gray-100.rounded-lg.border.border-gray-200').eq(1).should('be.visible').click()
        cy.get('.px-4.py-2.bg-blue-600.text-white.text-sm.font-medium.rounded-full').should('be.visible').click()
        cy.get('.px-4.py-2.bg-white.border.border-blue-600.text-blue-600.text-sm.font-medium.rounded-full').last().should('be.visible').click()
    });
    it('CP12_Habilitar formulario dependencia', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get('select').eq(0).select('Automatizar etapa')
        cy.get('select').eq(1).select('Automatizar actividad')
        cy.get('select').last().select('Automatizacion sub actividad no tocar')
        cy.get('input.w-full.px-3.py-2.bg-gray-50.border.border-gray-200.rounded-full.text-gray-500').eq(1).type('Pruebas')
        cy.get('.flex.items-center.gap-2.cursor-pointer.px-3.py-2.bg-gray-100.rounded-lg.border.border-gray-200').eq(1).should('be.visible').click()
        cy.get('[type="checkbox"]').last().should('be.visible').click()
        cy.get('[type="checkbox"]').eq(1).should('be.visible')
        cy.get('[type="checkbox"]').eq(2).should('be.visible')
        cy.get('[type="checkbox"]').eq(3).should('be.visible')
        cy.get('[type="checkbox"]').eq(4).should('be.visible')
    });
    it('CP13_Validar campos obligatorios de formulario', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get("select").eq(0).should('be.visible')
        cy.get("select").eq(1).should('be.visible')
        cy.get('[inputmode="numeric"]').click()
        cy.get('[inputmode="numeric"]').clear()
        cy.get('[placeholder="Text"]').eq(1).should('be.visible')
        cy.get('.flex.items-center.gap-2.cursor-pointer.px-3.py-2.bg-gray-100.rounded-lg.border.border-gray-200').eq(0).should('be.visible')
        cy.get('.flex.items-center.gap-2.cursor-pointer.px-3.py-2.bg-gray-100.rounded-lg.border.border-gray-200').eq(1).should('be.visible')
        cy.get('input[placeholder="Text"]').eq(2).should('have.value', 'Activa')
        cy.get('.px-6.py-2.border.border-gray-300.text-gray-700').should('be.visible')
        cy.get('.px-6.py-2.bg-blue-600.text-white.font-medium.rounded-full').should('be.visible')
        cy.get('.px-6.py-2.bg-blue-600.text-white.font-medium.rounded-full').should('be.visible').click()
        cy.get('div.text-red-500.text-sm.mt-1').should('have.length', 5)
    });
    it('CP14_Validar duplicidad pregunta', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get('select').eq(0).select('Automatizar etapa')
        cy.get('select').eq(1).select('Automatizar actividad')
        cy.get('select').last().select('Automatizacion sub actividad no tocar')
        cy.get('input.w-full.px-3.py-2.bg-gray-50.border.border-gray-200.rounded-full.text-gray-500').eq(1).type('Pregunta automatizada no tocar')
        cy.get('.flex.items-center.gap-2.cursor-pointer.px-3.py-2.bg-gray-100.rounded-lg.border.border-gray-200').eq(0).should('be.visible').click()
        cy.get('.px-6.py-2.bg-blue-600.text-white.font-medium.rounded-full').should('be.visible').click()
        cy.get('button.bg-blue-btn').contains('Sí').click();
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','Ya existe una pregunta configurada con las mismas características para esta actividad y/o sub-actividad')
        cy.get('button.bg-blue-btn').contains('Aceptar').click();
        cy.get('.flex.items-center.gap-2.cursor-pointer.px-3.py-2.bg-gray-100.rounded-lg.border.border-gray-200').eq(1).should('be.visible').click()
        cy.get('[placeholder="Texto"]').last().should('be.visible').type('Pruebas')
        cy.get('.px-6.py-2.bg-blue-600.text-white.font-medium.rounded-full').should('be.visible').click()
        cy.get('button.bg-blue-btn').contains('Sí').click();
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','Ya existe una pregunta configurada con las mismas características para esta actividad y/o sub-actividad')
    });
    it('CP15_Validar mensajes de error longitud', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get('input.w-full.px-3.py-2.bg-gray-50.border.border-gray-200.rounded-full.text-gray-500').eq(1).should('have.attr', 'maxlength', '250')
        cy.contains('label', 'Respuesta Abierta').click({force:true});
        cy.contains('label', 'Respuesta Cerrada').click({force:true});
        cy.get('[placeholder="Texto"]').last().should('be.visible').and('have.attr','maxlength',150)
    });
    it('CP16_Validar campo estado solo lectura', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get('input[placeholder="Text"]').last().should('have.prop', 'readOnly', true)
    });
    it('CP17_Acción botón guardar confirmación', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get('select').eq(0).select('Automatizar etapa')
        cy.get('select').eq(1).select('Automatizar actividad')
        cy.get('select').last().select('Automatizacion sub actividad no tocar')
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 200) + 1
            const ordenPregunta = `${fixture.orden}${random}`
            cy.get('[inputmode="numeric"]').clear()
            cy.get('[inputmode="numeric"]').type(random, {delay: 2200}, {force : true})
        })
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 10000)
            const namePregunta = `${fixture.pregunta}${random}`
            cy.get('input.w-full.px-3.py-2.bg-gray-50.border.border-gray-200.rounded-full.text-gray-500').eq(1).type(namePregunta)
        })
        cy.get('.flex.items-center.gap-2.cursor-pointer.px-3.py-2.bg-gray-100.rounded-lg.border.border-gray-200').eq(0).should('be.visible').click()
        cy.get('.px-6.py-2.bg-blue-600.text-white.font-medium.rounded-full').should('be.visible').click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','¿Está seguro de realizar la creación de la pregunta?')
        cy.get('button.border-blue-900').last().click({force: true})
        cy.get('.px-6.py-2.bg-blue-600.text-white.font-medium.rounded-full').should('be.visible').click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','¿Está seguro de realizar la creación de la pregunta?')
        cy.get('button.bg-blue-btn').contains('Sí').click();
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','Pregunta creada exitosamente')
    });
    it('CP18_Cancelar creación pregunta', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get('select').eq(0).select('Automatizar etapa')
        cy.get('select').eq(1).select('Automatizar actividad')
        cy.get('select').last().select('Automatizacion sub actividad no tocar')
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 100)
            const ordenPregunta = `${fixture.orden}${random}`
            cy.get('[inputmode="numeric"]').type(ordenPregunta)
        })
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 10000)
            const namePregunta = `${fixture.pregunta}${random}`
            cy.get('input.w-full.px-3.py-2.bg-gray-50.border.border-gray-200.rounded-full.text-gray-500').eq(1).type(namePregunta)
        })
        cy.get('.flex.items-center.gap-2.cursor-pointer.px-3.py-2.bg-gray-100.rounded-lg.border.border-gray-200').eq(0).should('be.visible').click()
        cy.get('.px-6.py-2.bg-blue-600.text-white.font-medium.rounded-full').should('be.visible').click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','¿Está seguro de realizar la creación de la pregunta?')
        cy.contains('button','Cerrar').click({force: true})
        cy.get('.px-6.py-2.border.border-gray-300.text-gray-700').should('be.visible').click()
    });
    it('CP20_Visualizar pregunta creada formulario asignado', () => {
        cy.get('.bg-linear-90.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').should('be.visible').click()
        cy.get('.text-xl.font-semibold.text-gray-900').should('be.visible').and('contain.text','Crear pregunta por actividad')
        cy.get('select').eq(0).select('Automatizar etapa')
        cy.get('select').eq(1).select('Automatizar actividad')
        cy.get('select').last().select('Automatizacion sub actividad no tocar')
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 100)
            const ordenPregunta = `${fixture.orden}${random}`
            cy.get('[inputmode="numeric"]').type(ordenPregunta)
        })
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 10000)
            const namePregunta = `${fixture.pregunta}${random}`
            cy.get('input.w-full.px-3.py-2.bg-gray-50.border.border-gray-200.rounded-full.text-gray-500').eq(1).type(namePregunta)
        })
        cy.get('.flex.items-center.gap-2.cursor-pointer.px-3.py-2.bg-gray-100.rounded-lg.border.border-gray-200').eq(0).should('be.visible').click()
        cy.get('.px-6.py-2.bg-blue-600.text-white.font-medium.rounded-full').should('be.visible').click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','¿Está seguro de realizar la creación de la pregunta?')
        cy.get('button.bg-blue-btn').contains('Sí').click();
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','Pregunta creada exitosamente')
    });
})