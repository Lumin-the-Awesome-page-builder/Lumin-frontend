describe('SignupView Page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('Должна отображать контейнер parentContainer', () => {
    cy.get('.parentContainer').should('exist');
    cy.get('.parentContainer').should('be.visible');
  });

  it('Должна отображать футер с текстом "LuminTech 2024"', () => {
    cy.get('.footer').should('exist');
    cy.get('.footerText').should('contain.text', 'LuminTech 2024');
  });

  it('Должна корректно заполнять высоту и ширину экрана', () => {
    cy.viewport(1280, 720);
    cy.get('.parentContainer').should('have.css', 'width', '1280px');
    cy.get('.parentContainer').should('have.css', 'height', '720px');
  });

  it('Фон в mainPartContent должен быть изображением', () => {
    cy.get('.mainPartContent').should('have.css', 'background-image').and('include', 'bg.jpg');
  });
});
