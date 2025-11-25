describe('58127 Creación de envío de alertas o notificación',() =>{
    beforeEach( ()=>{
        allure.epic('Sprint 3')
        allure.feature('Creación de envío de alertas o notificación')
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(3000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Paso 1 Login exitoso', { capture: 'runner' });
        cy.url().should('eq','https://celerisawsqa.tps.net.co/dashboard')
        cy.contains('Administrar Alertas o Notificaciones').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/alerts/manage-alerts');
        cy.wait(500)
    })
    it('CP01_Abrir modal Crear alerta', () => {
        cy.contains('button','Crear Alerta').click({force:true})
        cy.get('.text-lg.font-title.font-semibold.text-primary-900').first().should('be.visible').and('contain.text','Crear Alerta')
        cy.contains('h2','Datos del destinatario')
        cy.contains('h2','Contenido del mensaje')
        cy.contains('h2','Previsualización del mensaje')
    });
    it('CP02_Verificar encabezado módulo y submódulo', () => {
        cy.contains('span','Alertas y notificaciones')
        cy.contains('h2','Administración de envío de alertas y notificaciones')
        cy.get('.py-4.px-4.text-center.text-p-2.text-gray-500').should('be.visible').and('contain.text','No se encontraron registros para los criterios seleccionados')
    });
    it('CP03_Indicadores tarjetas visibles y valores', () => {
        cy.get('.bg-white.flex.items-center.justify-between.min-h-24').should('be.visible').and('have.length',3)
    });
    it('CP04_Filtros fecha inicial y final presentes', () => {
        cy.get('input[type="date"]').should('be.visible').and('have.length',4)
        cy.contains('button','Limpiar').should('be.visible')
        cy.contains('button','Consultar').should('be.visible')
    });
    it('CP05_Menú lateral y opción Dashboard resaltada', () => {
        cy.get('a[href="/dashboard/alerts/manage-alerts"]').should('have.class', 'bg-[#07055C]');
    });
    it('CP06_Listado de alertas y columnas', () => {
        cy.contains('button','Consultar').click({force: true})
        cy.wait(500)
        cy.get('tbody').should('be.visible')
    });
    it('CP07_Validar campos del formulario de creación de alerta', () => {
        cy.contains('button','Crear Alerta').click({force: true})
        cy.get('button[type="button"]').eq(2).should('be.visible')
        cy.get('button[type="button"]').eq(3).should('be.visible')
        cy.get('button[type="button"]').eq(4).should('be.visible')
        cy.get('button[type="button"]').eq(5).should('be.visible')
        cy.get('button[type="button"]').eq(6).should('be.visible')
        cy.get('button[type="button"]').eq(7).should('be.visible')
        cy.get('input[placeholder="Escribe su mensaje..."]').first().should('be.visible').click()
        cy.get('input[placeholder="Escribe su mensaje..."]').first().type('ASDASDHASADA ADA SDADASD ADSADA DASD ASD ASD ASD ASD ASD ASD AS DA D ASD  AS D ASD A D ASD A D AS DA D ASD A D ASD A SD  AS D AD ASD AD A D AD AD ADAD ASSDA DA S')
        cy.get('.text-red-500').should('be.visible').and('contain.text',' Ha excedido el límite de caracteres permitido. ')
        cy.get('input[placeholder="Escribe su mensaje..."]').first().clear()
        cy.get('input[placeholder="Escribe su mensaje..."]').first().should('be.visible').click()
        cy.get('input[placeholder="Escribe su mensaje..."]').first().type('PRUEBA QA')
        cy.get('.border.border-gray-300.rounded-md.p-4.min-h-24.bg-gray-50.overflow-x-hidden').first().should('be.visible').should('have.prop','innerText','PRUEBA QA')
        cy.get('input[type="date"]').eq(2).should('be.visible')
        cy.get('input[type="time"]').should('be.visible')
        cy.contains('span','Requiere envío de mensaje de texto')
        cy.contains('span','Requiere envío inmediato')
        cy.get('.bg-blue-btn.button.cursor-pointer.duration-300').eq(1).scrollIntoView();
        cy.contains('button','Cancelar')
        cy.contains('button','Enviar').should('be.visible')
    });
    it('CP08_Validaciones del formulario de creación', () => {
        cy.contains('button','Crear Alerta').click({force: true})
        cy.get('.bg-blue-btn.button.cursor-pointer.duration-300').eq(1).scrollIntoView();
        cy.contains('button','Enviar').should('be.visible').click()
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','Por favor, complete todos los campos requeridos.')
        cy.get('.bg-blue-btn.button.cursor-pointer.duration-300.flex.flex-row.font-paragraph').last().click({force: true})
        cy.get('.text-red-500.text-xs.italic.mt-1.flex.items-center ').first().should('be.visible').and('contain.text','Debe seleccionar un departamento.')
        cy.get('.text-red-500.text-xs.italic.mt-1.flex.items-center ').eq(1).should('be.visible').and('contain.text','No puede estar vacío.')
        cy.get('.text-red-500.text-xs.italic.mt-1.flex.items-center ').eq(2).should('be.visible').and('contain.text','Debe seleccionar una fecha.')
        cy.get('.text-red-500.text-xs.italic.mt-1.flex.items-center ').eq(3).should('be.visible').and('contain.text','Debe seleccionar una hora.')
    });
    it('CP09_Envío inmediato con checkbox marcado', () => {
        cy.contains('button','Crear Alerta').click({force: true})
        cy.get('button[type="button"]').eq(2).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Boyaca')
        cy.contains('ul li','Boyaca').click({force: true})
        cy.get('button[type="button"]').eq(3).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Socha')
        cy.contains('ul li','Socha').click({force: true})
        cy.get('button[type="button"]').eq(4).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Zona 00')
        cy.contains('ul li','Zona 00').click({force: true})
        cy.get('button[type="button"]').eq(5).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Puesto cabecera municipal')
        cy.contains('ul li','Puesto cabecera municipal').click({force: true})
        cy.get('button[type="button"]').eq(6).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('1')
        cy.contains('ul li','1').click({force: true})
        cy.get('button[type="button"]').eq(7).should('be.visible').click({force: true})
        cy.get('.peer.h-5.w-5.cursor-pointer.transition-all.appearance-none.rounded.shadow').click({force: true})
        cy.get('input[placeholder="Escribe su mensaje..."]').first().should('be.visible').click()
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 10000)
            const alerta = `${fixture.alerta}${random}`
            cy.get('input[placeholder="Escribe su mensaje..."]').first().type(alerta)
        })
        const today = new Date().toISOString().slice(0,10)
        cy.get('input[type="date"]').eq(2).type(today);
        cy.get('input[type="time"]').first().should('be.visible').click({force: true})
        cy.get('input[type="time"]').eq(0).type('12:00');
        cy.contains('span','Requiere envío inmediato').click({force: true})
        cy.get('.bg-blue-btn.button.cursor-pointer.duration-300').eq(1).scrollIntoView();
        cy.contains('button','Enviar').should('be.visible').click({force:true})
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','¿Está seguro de realizar la creación de la alerta o notificación?')
        cy.contains('button','Sí').should('be.visible').click({force:true})
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','Alerta o notificación creada exitosamente.')
    });
    it('CP10_Programación de envío futuro', ()=>{
        cy.contains('button','Crear Alerta').click({force: true})
        cy.get('button[type="button"]').eq(2).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Boyaca')
        cy.contains('ul li','Boyaca').click({force: true})
        cy.get('button[type="button"]').eq(3).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Socha')
        cy.contains('ul li','Socha').click({force: true})
        cy.get('button[type="button"]').eq(4).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Zona 00')
        cy.contains('ul li','Zona 00').click({force: true})
        cy.get('button[type="button"]').eq(5).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Puesto cabecera municipal')
        cy.contains('ul li','Puesto cabecera municipal').click({force: true})
        cy.get('button[type="button"]').eq(6).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('1')
        cy.contains('ul li','1').click({force: true})
        cy.get('button[type="button"]').eq(7).should('be.visible').click({force: true})
        cy.get('.peer.h-5.w-5.cursor-pointer.transition-all.appearance-none.rounded.shadow').click({force: true})
        cy.get('input[placeholder="Escribe su mensaje..."]').first().should('be.visible').click()
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 100)
            const alerta = `${fixture.alerta}${random}`
            cy.get('input[placeholder="Escribe su mensaje..."]').first().type(alerta)
        })
        const today = new Date().toISOString().slice(0,10)
        cy.get('input[type="date"]').eq(2).type(today);
        cy.get('input[type="time"]').first().should('be.visible').click({force: true})
        cy.get('input[type="time"]').eq(0).type('12:00');
        cy.get('.bg-blue-btn.button.cursor-pointer.duration-300').eq(1).scrollIntoView();
        cy.contains('button','Enviar').should('be.visible').click({force:true})
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','¿Está seguro de realizar la creación de la alerta o notificación?')
        cy.contains('button','Sí').should('be.visible').click({force:true})
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','Alerta o notificación creada exitosamente.')
    })
    it('CP11_Detección de mensajes duplicados (alerta)', ()=>{
        cy.contains('button','Crear Alerta').click({force: true})
        cy.get('button[type="button"]').eq(2).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Boyaca')
        cy.contains('ul li','Boyaca').click({force: true})
        cy.get('button[type="button"]').eq(3).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Socha')
        cy.contains('ul li','Socha').click({force: true})
        cy.get('button[type="button"]').eq(4).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Zona 00')
        cy.contains('ul li','Zona 00').click({force: true})
        cy.get('button[type="button"]').eq(5).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Puesto cabecera municipal')
        cy.contains('ul li','Puesto cabecera municipal').click({force: true})
        cy.get('button[type="button"]').eq(6).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('1')
        cy.contains('ul li','1').click({force: true})
        cy.get('button[type="button"]').eq(7).should('be.visible').click({force: true})
        cy.get('.peer.h-5.w-5.cursor-pointer.transition-all.appearance-none.rounded.shadow').click({force: true})
        cy.get('input[placeholder="Escribe su mensaje..."]').first().should('be.visible').click()
        cy.get('input[placeholder="Escribe su mensaje..."]').first().type('PRUEBA FUTURO')
        cy.get('input[type="date"]').eq(2).type('2026-12-31');
        cy.get('input[type="time"]').first().should('be.visible').click({force: true})
        cy.get('input[type="time"]').eq(0).type('08:47');
        cy.get('.bg-blue-btn.button.cursor-pointer.duration-300').eq(1).scrollIntoView();
        cy.contains('button','Enviar').should('be.visible').click({force:true})
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','¿Está seguro de realizar la creación de la alerta o notificación?')
        cy.contains('button','Sí').should('be.visible').click({force:true})
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','Ya existe un mensaje con el mismo contenido programado recientemente a los destinatarios seleccionados. ¿Está seguro de que desea enviarlo nuevamente?')
    })
    it('CP14_Manejo de fallo de envío (mensaje de error delegados)', ()=>{
        cy.contains('button','Crear Alerta').click({force: true})
        cy.get('button[type="button"]').eq(2).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Norte de san')
        cy.contains('ul li','Norte de san').click({force: true})
        cy.get('button[type="button"]').eq(3).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Todos')
        cy.contains('ul li','Todos').click({force: true})
        cy.get('input[placeholder="Escribe su mensaje..."]').first().should('be.visible').click()
        cy.get('input[placeholder="Escribe su mensaje..."]').first().type('PRUEBA FUTURO')
        cy.get('input[type="date"]').eq(2).type('2026-12-31');
        cy.get('input[type="time"]').first().should('be.visible').click({force: true})
        cy.get('input[type="time"]').eq(0).type('08:47');
        cy.get('.bg-blue-btn.button.cursor-pointer.duration-300').eq(1).scrollIntoView();
        cy.contains('button','Enviar').should('be.visible').click({force:true})
        cy.contains('button','Sí').should('be.visible').click({force:true})
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','No se encontraron delegados para los criterios seleccionados.')
    })
    it('CP16_Envío por SMS cuando check activado', () => {
        cy.contains('button','Crear Alerta').click({force: true})
        cy.get('button[type="button"]').eq(2).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Boyaca')
        cy.contains('ul li','Boyaca').click({force: true})
        cy.get('button[type="button"]').eq(3).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Socha')
        cy.contains('ul li','Socha').click({force: true})
        cy.get('button[type="button"]').eq(4).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Zona 00')
        cy.contains('ul li','Zona 00').click({force: true})
        cy.get('button[type="button"]').eq(5).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('Puesto cabecera municipal')
        cy.contains('ul li','Puesto cabecera municipal').click({force: true})
        cy.get('button[type="button"]').eq(6).should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').click({force: true})
        cy.get('input[placeholder="Buscar..."]').should('be.visible').type('1')
        cy.contains('ul li','1').click({force: true})
        cy.get('button[type="button"]').eq(7).should('be.visible').click({force: true})
        cy.get('.peer.h-5.w-5.cursor-pointer.transition-all.appearance-none.rounded.shadow').click({force: true})
        cy.get('input[placeholder="Escribe su mensaje..."]').first().should('be.visible').click()
        cy.fixture('crearEtapaPr').then((fixture) => {
            const random = Math.floor(Math.random() * 100)
            const alerta = `${fixture.alerta}${random}`
            cy.get('input[placeholder="Escribe su mensaje..."]').first().type(alerta)
        })
        const today = new Date().toISOString().slice(0,10)
        cy.get('input[type="date"]').eq(2).type(today);
        cy.get('input[type="time"]').first().should('be.visible').click({force: true})
        cy.get('input[type="time"]').eq(0).type('12:00');
        cy.contains('span','Requiere envío de mensaje de texto').click({force: true})
        cy.get('.bg-blue-btn.button.cursor-pointer.duration-300').eq(1).scrollIntoView();
        cy.contains('button','Enviar').should('be.visible').click({force:true})
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','¿Está seguro de realizar la creación de la alerta o notificación?')
        cy.contains('button','Sí').should('be.visible').click({force:true})
        cy.get('.text-sm.text-gray-500.mt-2.px-4.font-paragraph').should('be.visible').and('contain.text','Alerta o notificación creada exitosamente.')
    });
})