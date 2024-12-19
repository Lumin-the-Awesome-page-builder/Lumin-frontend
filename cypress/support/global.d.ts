/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Авторизация пользователя через токен
     * @param authToken - Токен авторизации
     * @example cy.login('valid-auth-token')
     */
    login(authToken?: string): Chainable<void>;

    /**
     * Установить данные в Pinia store
     * @param data - Данные для установки в store
     * @example cy.setDashboardStoreData([{ id: 1, title: 'Project 1' }])
     */
    setDashboardStoreData(data: any[]): Chainable<void>;
  }

  interface Window {
    $pinia?: any; // Для Pinia
    $store?: any; // Для Vuex
    helloFormStore: any; // Ваш store helloFormStore
  }
}
