describe('Тестирование CardComponent', () => {
  beforeEach(() => {
    cy.login();
    cy.url().should('include', '/dashboard');

    cy.get('.btn', {timeout: 200000}).contains('Продолжить').click();
  });

  it('Должен отображать компонент карточки', () => {
    cy.get('.card', { timeout: 200000 }).should('exist');
  });

  /*it('Должен отображать изображение проекта', () => {
    cy.get('.image-card-project')
      .should('have.attr', 'src')
      .and('include', 'https://example.com/preview.jpg');
  });*/

  it('Должен отображать название проекта', () => {
    cy.get('.card', { timeout: 200000 }).each(($card) => {
      cy.wrap($card).find('.card-title').filter(':visible').and('not.be.empty');
    });
  });

  it('Должен отображать количество звезд', () => {
    cy.get('.stars-count', { timeout: 200000 }).each(($starsCount) => {
      const starsText = $starsCount.text();
      const stars = parseInt(starsText, 10);
      expect(stars).to.be.at.least(0);
    });
  });


  /*it('Должен отображать дату проекта в правильном формате', () => {
    const dateFormatRegex = /^\d{2}\.\d{2}\.\d{4}$/;

    cy.get('.card-date', { timeout: 200000 }).eq(0).should('match', dateFormatRegex);
  });*/

  it('Должен вызывать openModal при клике на оверлей', () => {
    cy.get('.overlay', { timeout: 200000 }).eq(0).click();
    cy.get('.container').should('be.visible');
  });

  it('Должен вызывать editProject при клике на иконку редактирования', () => {
    cy.get('.edit-title', { timeout: 200000 }).eq(0).click();
    cy.url().should('match', /\/project\/\d+\/edit/);
  });

  it('Должна появится галочка при изменении состояния checkbox', () => {
    cy.get('.n-checkbox', { timeout: 200000 }).eq(0).click();
  });


  it('Должна исчезнуть галочка при изменении состояния checkbox', () => {
    cy.get('.n-checkbox', { timeout: 200000 }).eq(0).click();
    cy.get('.n-checkbox', { timeout: 200000 }).eq(0).click();
  });
});
