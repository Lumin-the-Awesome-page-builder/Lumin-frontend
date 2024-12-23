describe('Тестирование AuthViewComponent', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/auth');
  });

  Cypress.on('uncaught:exception', (err) => {
    console.error('Unhandled exception:', err);
    return false;
  });
  it('Должен корректно отображать LoginComponent', () => {
    cy.get('.container').should('exist');
  });

  it('Должен корректно отображать футер с текстом "LuminTech 2024"', () => {
    cy.get('.footer').should('exist');

    cy.get('.footerText').should('contain.text', 'LuminTech 2024');

    cy.get('.footer').should('have.css', 'background-color', 'rgb(255, 255, 255)');
  });

  it('Должен корректно использовать Notification Provider', () => {
    cy.get('.parentContainer').should('exist');
  });

  it('Должен корректно отображать фон в основной части контента', () => {
    cy.get('.mainPartContent').should('have.css', 'background-image').and('include', 'bg.jpg');
  });

  it('Должен адаптивно заполнять высоту и ширину экрана', () => {
    cy.viewport(1280, 720);

    cy.get('.parentContainer')
      .invoke('css', 'width')
      .then((width) => {
        expect(parseInt(width)).to.be.closeTo(1280, 1);
      });

    cy.get('.parentContainer')
      .invoke('css', 'height')
      .then((height) => {
        expect(parseInt(height)).to.be.closeTo(720, 1);
      });
  });
});
