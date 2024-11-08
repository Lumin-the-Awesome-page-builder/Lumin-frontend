import { defineStore } from 'pinia';

const useHelloFormStore = defineStore('helloFormComponent', {
  state: () => ({
    showModal: false,
  }),
  actions: {
    openModal() {
      if (!localStorage.getItem('seeHello')) {
        localStorage.setItem('seeHello', true);
        this.showModal = true;
      } else {
        this.showModal = false;
      }
    },
    closeModal() {
      this.showModal = false;
    },
  },
});
export default useHelloFormStore;
