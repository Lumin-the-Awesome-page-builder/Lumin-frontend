import { defineStore } from 'pinia';

export const useProjectStore = defineStore('deleteProjectModal', {
  state: () => ({
    projectName: 'Название проекта',
    showModal: false,
  }),
  getters: {
    getProjectName: (state) => state.projectName,
  },
  actions: {
    openModal(name) {
      this.projectName = name;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
});
