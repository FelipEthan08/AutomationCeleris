describe('58361 Administrar Pregunta por actividad o subactividad', () => {
    beforeEach(() => {
        allure.epic('Sprint 2')
        allure.feature('Administrar Pregunta por actividad o subactividad')
        cy.visit(Cypress.env('urlBase'))
        cy.get('input[placeholder="Usuario"]').type(Cypress.env('user'))
        cy.get('input[placeholder="Contraseña"]').type(Cypress.env('pass'))
        cy.wait(3000)
        cy.get('button[type="submit"]').contains('Ingresar').dblclick({force: true})
        cy.screenshot('Paso 1 Login exitoso', { capture: 'runner' });
        cy.url().should('eq','https://celerisawsqa.tps.net.co/dashboard')
        cy.contains('Administrar Pregunta por Actividad').click()
        cy.url().should('eq', 'https://celerisawsqa.tps.net.co/dashboard/parameterization/manage-questions');
    })
    it('CP01_Validar estructura de la pantalla', () => {
        cy.get('.relative.z-10.text-p-1.font-paragraph.font-medium').eq(0).should('be.visible').and('contain.text','Total de preguntas creadas')
        cy.get('.relative.z-10.text-p-1.font-paragraph.font-medium').eq(1).should('be.visible').and('contain.text','Total preguntas activas')
        cy.get('.relative.z-10.text-p-1.font-paragraph.font-medium').eq(2).should('be.visible').and('contain.text','Total preguntas inactivas')
        cy.get('.bg-white.block.border.border-gray-300').eq(0).should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300').eq(1).should('be.visible')
        cy.get('.bg-white.block.border.border-gray-300').eq(2).should('be.visible')
        cy.contains('button','Crear pregunta')
        cy.contains('button','Limpiar').should('be.visible')
        cy.contains('button','Consultar').should('be.visible')
    });
    it('CP02_Consulta inicial sin resultados', () => {
        cy.get('.py-4.px-4.text-center.text-p-2.text-gray-500').should('be.visible').and('contain.text',' No se encontraron registros para los criterios seleccionados ')
    });
    it('CP03_Validación de campos obligatorios en filtros', () => {
        cy.contains('button','Consultar').click({force: true})
        cy.get('.text-red-500.text-xs.italic.mt-1.flex.items-center').first().should('be.visible').and('contain.text',' La etapa es requerida. ')
        cy.get('.text-red-500.text-xs.italic.mt-1.flex.items-center').last().should('be.visible').and('contain.text',' La actividad es requerida. ')
    });
    it('CP04_Dependencia de listas desplegables', () => {
        cy.get('.bg-white.block.border.border-gray-300').eq(0).should('be.visible').click({force: true})
        cy.get('[placeholder="Buscar..."]').type('Automatizar etapa')
        cy.contains('ul li','Automatizar etapa').click({force: true})
        cy.get('.bg-white.block.border.border-gray-300').eq(1).should('be.visible').click({force: true})
        cy.get('[placeholder="Buscar..."]').type('Automatizar actividad')
        cy.contains('ul li','Automatizar actividad').click({force:true})
        cy.get('.bg-white.block.border.border-gray-300').eq(2).should('be.visible').click({force: true})
        cy.get('[placeholder="Buscar..."]').type('Automatizacion sub actividad no tocar')
        cy.contains('ul li','Automatizacion sub actividad no tocar').click({force:true})
    });
    it('CP05_Consulta exitosa con resultados', () => {
        cy.get('.bg-white.block.border.border-gray-300').eq(0).should('be.visible').click({force: true})
        cy.get('[placeholder="Buscar..."]').type('Automatizar etapa')
        cy.contains('ul li','Automatizar etapa').click({force: true})
        cy.get('.bg-white.block.border.border-gray-300').eq(1).should('be.visible').click({force: true})
        cy.get('[placeholder="Buscar..."]').type('Automatizar actividad')
        cy.contains('ul li','Automatizar actividad').click({force:true})
        cy.get('.bg-white.block.border.border-gray-300').eq(2).should('be.visible').click({force: true})
        cy.get('[placeholder="Buscar..."]').type('Automatizacion sub actividad no tocar')
        cy.contains('ul li','Automatizacion sub actividad no tocar').click({force:true})
        cy.contains('button','Consultar').click({force: true})
        cy.wait(500)
        cy.get('tbody').should('be.visible');
        cy.contains('td', 'Automatizar etapa').should('be.visible');
    });
    it('CP06_Tarjetas de indicadores', () => {
        cy.get('.bg-white.flex.flex-col.h-28.items-center.justify-center').should('have.length',3)
        cy.get('.relative.z-10.text-p-1.font-paragraph.font-medium').should('have.length',3)
        cy.get('.relative.z-10.text-p-1.font-paragraph.font-medium').eq(0).should('be.visible').and('contain.text','Total de preguntas creadas')
        cy.get('.relative.z-10.text-p-1.font-paragraph.font-medium').eq(1).should('be.visible').and('contain.text','Total preguntas activas')
        cy.get('.relative.z-10.text-p-1.font-paragraph.font-medium').eq(2).should('be.visible').and('contain.text','Total preguntas inactivas')
    });
    it('CP07_Funcionalidad del botón “Limpiar”', () => {
        cy.get('.bg-white.block.border.border-gray-300').eq(0).should('be.visible').click({force: true})
        cy.get('[placeholder="Buscar..."]').type('Automatizar etapa')
        cy.contains('ul li','Automatizar etapa').click({force: true})
        cy.get('.bg-white.block.border.border-gray-300').eq(1).should('be.visible').click({force: true})
        cy.get('[placeholder="Buscar..."]').type('Automatizar actividad')
        cy.contains('ul li','Automatizar actividad').click({force:true})
        cy.get('.bg-white.block.border.border-gray-300').eq(2).should('be.visible').click({force: true})
        cy.get('[placeholder="Buscar..."]').type('Automatizacion sub actividad no tocar')
        cy.contains('ul li','Automatizacion sub actividad no tocar').click({force:true})
        cy.contains('button','Consultar').click({force: true})
        cy.wait(500)
        cy.get('tbody').should('be.visible');
        cy.contains('td', 'Automatizar etapa').should('be.visible');
        cy.contains('button','Limpiar').click({force: true})
    });
    it('CP08_Acciones en la grilla', () => {
        cy.get('.bg-white.block.border.border-gray-300').eq(0).should('be.visible').click({force: true})
        cy.get('[placeholder="Buscar..."]').type('Automatizar etapa')
        cy.contains('ul li','Automatizar etapa').click({force: true})
        cy.get('.bg-white.block.border.border-gray-300').eq(1).should('be.visible').click({force: true})
        cy.get('[placeholder="Buscar..."]').type('Automatizar actividad')
        cy.contains('ul li','Automatizar actividad').click({force:true})
        cy.get('.bg-white.block.border.border-gray-300').eq(2).should('be.visible').click({force: true})
        cy.get('[placeholder="Buscar..."]').type('Automatizacion sub actividad no tocar')
        cy.contains('ul li','Automatizacion sub actividad no tocar').click({force:true})
        cy.contains('button','Consultar').click({force: true})
        cy.wait(500)
        cy.get('tbody').should('be.visible');
        cy.contains('td', 'Automatizar etapa').should('be.visible');
        cy.get('celeris-pencil-draw-outline-icon').should('be.visible')
        cy.get('celeris-trash-outline-icon').should('be.visible')
    });
})