describe('Тестирование RegistrationComponent', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/auth');
  });

  Cypress.on('uncaught:exception', (err) => {
    console.error('Unhandled exception:', err);
    if (
      err.message.includes('Failed to fetch') ||
      err.message.includes('Too Many Requests')
    ) {
      return false;
    }
    return true;
  });

  Cypress.config('defaultCommandTimeout', 10000);

  it('Должен позволять вводить email и пароль', () => {
    cy.get('input[placeholder="mail@example.ru"]').type('test@example.ru');
    cy.get('input[placeholder="password"]').type('password123');

    cy.get('input[placeholder="mail@example.ru"]').should(
      'have.value',
      'test@example.ru',
    );
    cy.get('input[placeholder="password"]').should('have.value', 'password123');
  });

  it('Должен показывать/скрывать пароль при клике на кнопку', () => {
    cy.get('input[placeholder="password"]').should(
      'have.attr',
      'type',
      'password',
    );

    cy.get('.passInp').click();
    cy.get('input[placeholder="password"]').should('have.attr', 'type', 'text');

    cy.get('.passInp').click();
    cy.get('input[placeholder="password"]').should(
      'have.attr',
      'type',
      'password',
    );
  });

  it('Должен перенаправлять на страницу регистрации при нажатии на ссылку "Зарегестрируйтесь!"', () => {
    cy.get('.signup').contains('Зарегестрируйтесь!').click();

    cy.url().should('include', '/signup');
  });
});
