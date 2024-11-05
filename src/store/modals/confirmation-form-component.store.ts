import { defineStore } from 'pinia';

export const useConfirmationStore = defineStore('ConfirmationModal', {
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
