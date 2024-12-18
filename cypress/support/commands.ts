/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', () => {
  cy.visit('/login'); // Переход на страницу логина

  cy.url().should('include', '/login');

  // Вводим логин (username)
  cy.get('input[placeholder="mail@example.ru"]').type(
    'alinochkabelova28@gmail.com',
  );
  cy.get('input[placeholder="password"]').type('tresh123');

  cy.get('.btn').contains('Войти').click();

  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('setDashboardStoreData', (data) => {
  cy.window().then((win) => {
    const store = win.$pinia ? win.$pinia.useStore('dashboardStore') : null;

    if (store) {
      store.setData(data);
    } else {
      throw new Error('Pinia store не найден');
    }
  });
});
