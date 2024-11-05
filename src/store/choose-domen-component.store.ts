import { defineStore } from 'pinia';

export const useChooseDomenStore = defineStore('chooseDomenComponent', {
  state: () => ({
    showModal: false,
    domen: '',
  }),
  actions: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    setDomen(domen) {
      this.domen = domen;
    },
  },
});
