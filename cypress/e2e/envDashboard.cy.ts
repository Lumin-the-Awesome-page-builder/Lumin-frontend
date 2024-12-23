describe('EnvDashboardComponent', () => {
  beforeEach(() => {
    cy.login();
    cy.url().should('include', '/dashboard');

    cy.get('.btn').contains('Продолжить').click();
  });

  it('Должен корректно отображать компонент', () => {
    cy.get('.dashboard').should('exist');

    cy.get('.dashboard').should('have.css', 'background-color', 'rgb(244, 244, 244)');
  });

  it('Должен отображать футер с текстом "LuminTech 2024"', () => {
    cy.get('.footer').should('exist');

    cy.get('.footerText').should('contain.text', 'LuminTech 2024');
  });
});
