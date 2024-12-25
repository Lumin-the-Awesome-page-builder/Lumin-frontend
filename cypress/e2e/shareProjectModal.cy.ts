describe('Change Project Sharing Settings Modal', () => {
  beforeEach(() => {
    cy.login();
    cy.url().should('include', '/dashboard');

    cy.get('.btn', { timeout: 100000 }).contains('Продолжить').click();
    cy.get('.n-button__content', { timeout: 1000000 }).contains('Создать').click();
    cy.get('.n-button', { timeout: 100000 }).contains('Изменить параметры доступа').click();

    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes("Failed to construct 'WebSocket'")) {
        return false;
      }
    });
  });


  it('Должно отображать заголовки и текст', () => {
    cy.get('.container_title').should('contain.text', 'Параметры публикации');
    cy.get('.user_title').should('contain.text', 'Сейчас доступ');
  });

  it('Должно отображать кнопки и элементы управления', () => {
    cy.get('.btn').should('have.length', 2);
    cy.get('.n-checkbox').should('exist').and('be.visible');
    cy.get('input[readonly]').should('exist').and('be.visible');
  });

  it('Должно изменять настройку отображения в маркетплейсе', () => {
    // Нажимаем кнопку "включить общий доступ"
    cy.get('.btn', { timeout: 100000 })
      .contains('включить общий доступ')
      .click();

    // Проверяем, что кнопка изменилась на "скрыть из общего доступа"
    cy.get('.btn', { timeout: 100000 })
      .contains('скрыть из общего доступа')
      .should('exist')
      .and('be.visible');
  });

  it('Должно сохранять изменения и закрывать модальное окно', () => {
    cy.get('.btn').contains('Сохранить').click();
    cy.get('.n-modal').should('not.exist');
  });
});
