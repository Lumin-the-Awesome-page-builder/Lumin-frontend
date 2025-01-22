describe('Тестирование DashboardComponent', () => {
  beforeEach(() => {
    cy.login();
    cy.url().should('include', '/dashboard');

    cy.get('.btn', { timeout: 100000 }).contains('Продолжить').click();
  });

  it('Должен корректно отображать заголовок и количество проектов с правильным склонением', () => {
    cy.get('.prj-count', { timeout: 100000 }).invoke('text').then((text) => {
      const projectCount = parseInt(text.split(' ')[0], 10); // Извлечение числа проектов
      const expectedLabel = (count) => {
        if (count % 10 === 1 && count % 100 !== 11) {
          return 'проект';
        } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 10 || count % 100 >= 20)) {
          return 'проекта';
        } else {
          return 'проектов';
        }
      };

      const label = expectedLabel(projectCount);

      cy.get('.prj-count', { timeout: 100000 })
        .should('contain.text', `${projectCount} ${label}`);
    });
  });

  it('Должен отображать строку поиска', () => {
    cy.get('.n-input__prefix', { timeout: 100000 }).should('exist');
  });

  it('Должен отображать компонент CardGrid', () => {
    cy.get('.card-grid', { timeout: 100000 }).should('exist');
  });

  it('Должен обновлять результаты поиска при вводе в поле поиска и сверять с названием на карточке', () => {
    const searchTerm = 'spoiled-car';

    cy.get('.search-input', { timeout: 100000 }).type(searchTerm);

    cy.get('.card-content', { timeout: 100000 })
      .filter(':visible')
      .should('have.length', 1)
      .first()
      .find('.card-title')
      .should('contain.text', searchTerm);
  });
});
