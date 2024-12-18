describe('Тестирование DashboardComponent', () => {
  beforeEach(() => {
    cy.login();
    cy.url().should('include', '/dashboard');

    cy.get('.btn').contains('Продолжить').click();
  });

  it('Должен корректно отображать заголовок и количество проектов с правильным склонением', () => {
    cy.get('.prj-count').invoke('text').then((text) => {
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

      cy.get('.prj-count')
        .should('contain.text', `${projectCount} ${label}`);
    });
  });

  it('Должен отображать строку поиска', () => {
    cy.get('.n-input__prefix').should('exist');
  });

  it('Должен отображать компонент CardGrid', () => {
    cy.get('.card-grid').should('exist');
  });

  it('Должен обновлять результаты поиска при вводе в поле поиска и сверять с названием на карточке', () => {
    const searchTerm = 'able-kite';

    cy.get('.search-input').type(searchTerm);

    cy.get('.card-content')
      .filter(':visible')
      .should('have.length', 1)
      .first()
      .find('.card-title')
      .should('contain.text', searchTerm);
  });
});
