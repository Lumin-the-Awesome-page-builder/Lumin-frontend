describe('Тестирование ProjectPreviewModalComponent', () => {
  beforeEach(() => {
    cy.login();
    cy.url().should('include', '/dashboard');

    cy.get('.btn').contains('Продолжить').click();
  });


  it('Отображение модального окна с корректными данными', () => {
    cy.get('.overlay').eq(0).click();
    cy.get('.container').should('be.visible');

    cy.get('.titleProj').should('be.visible').invoke( 'text').should('not.be.empty');
    cy.get('.cardDate').should('be.visible');
    cy.get('.starsCount').should('be.visible').invoke( 'text').should('not.be.empty');
  });

  it('Закрытие модального окна', () => {
    cy.get('.overlay').eq(0).click();
    cy.get('.container').should('be.visible');
    cy.get('.closePart').click();

    cy.get('.container').should('not.exist');
  });

  it('Переход в редактор', () => {
    cy.get('.overlay').eq(0).click();
    cy.get('.container').should('be.visible');
    cy.get('.n-button__content').contains('Редактировать').click();

    cy.url().should('include', '/edit');
  });

  it('Скачивание проекта', () => {
    cy.get('.overlay').eq(0).click();
    cy.get('.container').should('be.visible');
    cy.get('.n-button__content').contains('Скачать').click();
  });

  it('Проверка кнопки "Поделиться"', () => {
    cy.get('.overlay').eq(0).click();
    cy.get('.container').should('be.visible');
    cy.get('.btn').contains('Поделиться').click();
  });
});
