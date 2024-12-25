describe('ChangeDataComponent', () => {
  beforeEach(() => {
    cy.login();
    cy.url().should('include', '/dashboard');

    cy.get('.btn', { timeout: 100000 }).contains('Продолжить').click();
    cy.get('.n-button__content', { timeout: 1000000 }).contains('Создать').click();
    cy.get('.n-button', { timeout: 100000 }).contains('Изменить данные').click();
  });

  it('Должно отображать модальное окно с заголовками и полями', () => {
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('Failed to construct \'WebSocket\'')) {
        return false;
      }
    });

    cy.get('.container_title').should('contain.text', 'Изменение данных');
    cy.get('.user_title').eq(0).should('contain.text', 'В данном разделе возможна смена параметров проекта');
    cy.get('.user_title').eq(1).should('contain.text', 'Если поле не заполнить, то значение останется прежним');

    cy.get('.input')
      .should('have.length', 2)
      .then((inputs) => {
        cy.log('Найденные поля:', inputs);
      });
  });

  it('Должно позволять вводить данные в поле "Название"', () => {
    const projectName = 'Новый проект';

    cy.get('.input input').eq(0)
      .type(projectName)
      .should('have.value', projectName);
  });

  it('Должно отображать выпадающее меню для выбора категории', () => {
    cy.get('#hover-btn').click();
    cy.get('.n-dropdown-option').should('exist').and('be.visible');
  });

  it('Должно позволять выбирать категорию из выпадающего меню', () => {
    const categoryName = 'category 1';

    cy.intercept('GET', '/api/library/categories', {
      success: true,
      data: [
        { id: 1, name: 'Категория 1' },
        { id: 2, name: 'Категория 2' },
      ],
    });

    cy.get('#hover-btn').click();
    cy.get('.n-dropdown-option').contains(categoryName).click();

    cy.get('#hover-btn').should('contain.text', categoryName);
  });

  it('Должно позволять вводить теги', () => {
    const tags = '#Тег1 #Тег2';

    cy.get('.input input').eq(1)
      .type(tags)
      .should('have.value', tags);
  });

  it('Должно сохранять данные при нажатии на кнопку "Сохранить"', () => {
    const projectName = 'Новый проект';
    const tags = '#Тег1 #Тег2';
    const categoryName = 'category 1';

    cy.intercept('GET', '/api/library/categories', {
      success: true,
      data: [
        { id: 1, name: 'Категория 1' },
        { id: 2, name: 'Категория 2' },
      ],
    });

    cy.get('.input input').eq(0).type(projectName);
    cy.get('#hover-btn').click();
    cy.get('.n-dropdown-option').contains(categoryName).click();
    cy.get('.input input').eq(1).type(tags);

    cy.get('.btn').contains('Сохранить').click();

    cy.intercept('POST', '/api/library/update', (req) => {
      expect(req.body).to.include({
        projectName,
        tags: ['Тег1', 'Тег2'],
      });
    });
  });
});
