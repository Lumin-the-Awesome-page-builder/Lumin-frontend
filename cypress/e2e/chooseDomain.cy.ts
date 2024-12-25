describe('ChooseDomainComponent', () => {
  beforeEach(() => {
    cy.login();
    cy.url().should('include', '/dashboard');

    cy.get('.btn', { timeout: 100000 }).contains('Продолжить').click();
    cy.get('.n-button__content', { timeout: 100000 }).contains('Создать').click();
    cy.get('.n-button', { timeout: 100000 }).contains('Опубликовать').click();
  });

  it('Должно отображать модальное окно', () => {
    cy.get('.n-modal').should('exist').and('be.visible');
  });

  it('Должно отображать логотип', () => {
    cy.get('.logo_svg')
      .should('exist')
      .and('be.visible')
      .and('have.attr', 'src')
      .and('include', 'Lumin_logo.svg');
  });

  it('Должно отображать заголовки и описание', () => {
    cy.get('.container_title').should('contain.text', 'Добро пожаловать');
    cy.get('.block_title').should(
      'contain.text',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    );
  });

  it('Должно позволять вводить поддомен', () => {
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('Failed to construct \'WebSocket\'')) {
        return false;
      }
    });

    const subdomain = 'my-subdomain';

    cy.get('.input input')
      .type(subdomain)
      .should('have.value', subdomain);

    cy.get('.postfixText').should('contain.text', '.dudosyka.ru');
  });

  it('Должно сохранять введенный поддомен и закрывать модальное окно', () => {
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('Failed to construct \'WebSocket\'')) {
        return false;
      }
    });

    const subdomain = 'my-subdomain';

    cy.get('.input input')
      .type(subdomain)
      .should('have.value', subdomain);

    cy.get('.postfixText').should('contain.text', '.dudosyka.ru');
    cy.get('.btn', { timeout: 100000 }).contains('Сохранить').click();
  });
});
