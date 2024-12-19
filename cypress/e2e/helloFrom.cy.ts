describe('Тестирование HelloFormComponent', () => {
  beforeEach(() => {
    cy.login();
    cy.url().should('include', '/dashboard');
  });

  it('Модальное окно отображается при загрузке страницы', () => {
    cy.get('.n-modal').should('be.visible');

    cy.get('.logo_svg').should('be.visible');
    cy.contains('Добро пожаловать!').should('be.visible');
    cy.contains('Мы рады Вас приветствовать на нашей платформе!').should(
      'be.visible',
    );

    cy.get('.btn').contains('Продолжить').should('be.visible');
  });

  it('Нажатие на кнопку "Продолжить" закрывает модальное окно', () => {
    cy.get('.btn').contains('Продолжить').click();

    cy.get('.n-modal').should('not.exist');
  });

  it('Проверка, что модальное окно точно закрыто', () => {
    cy.get('.btn').contains('Продолжить').click();

    cy.get('.n-modal').should('not.exist');
  });
});
