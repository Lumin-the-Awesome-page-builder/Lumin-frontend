import { defineStore } from 'pinia';

export const useHelloFormStore = defineStore('helloFormComponent', {
  state: () => ({
    showModal: false,
  }),
  actions: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
});
