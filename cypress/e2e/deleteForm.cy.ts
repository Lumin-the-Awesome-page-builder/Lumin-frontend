describe('Тестирование DeleteFormComponent', () => {
  beforeEach(() => {
    cy.login();
    cy.url().should('include', '/dashboard');

    cy.get('.btn').contains('Продолжить').click();
  });

  it('Должна работать кнопка "Удалить"', () => {
    cy.get('.overlay').eq(0).click();
    cy.get('.container').should('be.visible');
    cy.get('.n-button__content').contains('Удалить').click();

    cy.get('.btn').contains('Удалить').click();
  });

  it('Должно закрывать модальное окно при клике на отмену', () => {
    cy.get('.overlay').eq(0).click();
    cy.get('.container').should('be.visible');
    cy.get('.n-button__content').contains('Удалить').click();

    cy.get('.n-base-icon').click();
  });
});
