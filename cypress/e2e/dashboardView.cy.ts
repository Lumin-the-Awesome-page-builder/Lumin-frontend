describe('DashboardView Component', () => {
  beforeEach(() => {
    cy.login();
    cy.url().should('include', '/dashboard');

    cy.get('.btn').contains('Продолжить').click();
  });

  it('Должен рендерить компонент DashboardComponent', () => {
    cy.get('.dashboard').should('exist');
    cy.get('.content-wrapper').should('be.visible');
  });

  it('Должен отображать модальное окно HelloFormComponent', () => {
    cy.get('.dashboard').should('exist');
    cy.get('.container').should('be.visible');
  });

  it('Должен корректно рендерить футер', () => {
    cy.get('.footer').should('exist');
    cy.get('.footerText').should('contain.text', 'LuminTech 2024');
  });

  it('Компонент заполняет высоту и ширину экрана', () => {
    cy.viewport(1280, 720);
    cy.get('.dashboard').should('have.css', 'width', '1280px');
    cy.get('.dashboard').should('have.css', 'height', '720px');
  });
});
