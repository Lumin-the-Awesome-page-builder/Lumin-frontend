describe('Тестирование HeaderComponent', () => {
  beforeEach(() => {
    cy.login();
    cy.url().should('include', '/dashboard');

    cy.get('.btn', { timeout: 100000 }).contains('Продолжить').click();
  });

  it('Должен отображать логотип', () => {
    cy.get('.logo-wrapper img', { timeout: 100000 })
      .should('be.visible')
      .and('have.attr', 'src')
      .should('include', 'lumin-logo-1-1.svg');
  });

  it('Должен выполнять переходы по кнопкам "Библиотека проектов" и "Библиотека виджетов"', () => {
    cy.get('.nav-element', { timeout: 100000 }).contains('Библиотека виджетов').click();
    cy.url().should('include', '/dashboard');

    cy.get('.nav-element', { timeout: 100000 }).contains('Библиотека проектов').click();
    cy.url().should('include', '/dashboard');
  });

  it('Должен быть заблокированными кнопки "Удалить" и "Скачать", если ничего не выбрано', () => {
    cy.get('.buttons-group', { timeout: 100000 }).contains('Удалить').should('be.disabled');

    cy.get('.buttons-group', { timeout: 100000 }).contains('Скачать').should('be.disabled');
  });

  it('Должен быть активными кнопки "Удалить" и "Скачать", если что-то выбрано', () => {
    cy.get('.n-checkbox', { timeout: 100000 }).eq(0).click();

    cy.get('.buttons-group', { timeout: 100000 }).contains('Удалить').should('not.be.disabled');

    cy.get('.buttons-group', { timeout: 100000 }).contains('Скачать').should('not.be.disabled');
  });

  /*it('Должен создать новый проект и перенаправить на страницу редактирования', () => {
    cy.get('.buttons-group').contains('Создать').click();

    cy.url().should('match', /\/project\/\d+\/edit/);
  });*/
});
