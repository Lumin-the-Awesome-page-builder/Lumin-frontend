import { defineStore } from 'pinia';

export const useDeleteProjectModalStore = defineStore('deleteProjectModal', {
  state: () => ({
    project: { id: 0, name: 'Название проекта' },
    showModal: false,
  }),
  getters: {
    getProjectName: (state) => state.projectName,
  },
  actions: {
    openModal(project: { id: number, name: string }) {
      this.project = project;
      this.showModal = true;
    },
    deleteProject() {
      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
    },
  },
});
