describe('Тестирование LoginComponent', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/auth');
  });

  Cypress.on('uncaught:exception', (err) => {
    console.error('Unhandled exception:', err);
    return false;
  });

  it('Должен отобразить логотип и форму авторизации', () => {
    cy.get('.logo_svg').should('be.visible');
    cy.contains('Авторизация').should('be.visible');
    cy.get('input[placeholder="mail@example.ru"]').should('be.visible');
    cy.get('input[placeholder="password"]').should('be.visible');
    cy.get('.btn').contains('Войти').should('be.visible');
  });

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

  it('Должен позволять выполнить вход и перенаправить на dashboard', () => {
    cy.get('input[placeholder="mail@example.ru"]').type(
      'alinochkabelova28@gmail.com',
    );
    cy.get('input[placeholder="password"]').type('tresh123');

    cy.get('.btn').contains('Войти').click();

    cy.url().should('include', '/dashboard');
  });

  it('должен перенаправлять на страницу регистрации при нажатии на ссылку "Зарегистрируйтесь"', () => {
    cy.get('.signup').contains('Зарегестрируйтесь!').click();

    cy.url().should('include', '/signup');
  });
});
